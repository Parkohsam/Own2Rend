import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
} from 'wagmi'
import { getAddresses } from '../contracts/addresses'
import Own2RentABI from '../contracts/Own2Rent.abi.json'
import { BOHR_GAS_FEES } from './useListAsset'

/** Pays the rental fee and starts a rental agreement for a listing. */
export function useRentAsset() {
  const chainId = useChainId()
  const { OWN2RENT } = getAddresses(chainId)

  const {
    writeContract,
    data: hash,
    isPending,
    error,
    reset,
  } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  /**
   * @param listingId  The listing to rent
   * @param totalCost  Exact payment in wei (pricePerDay × durationDays)
   */
  const rentAsset = (listingId: bigint, totalCost: bigint) => {
    writeContract({
      address: OWN2RENT,
      abi: Own2RentABI,
      functionName: 'rentAsset',
      args: [listingId],
      value: totalCost,
      ...BOHR_GAS_FEES,
    })
  }

  return { rentAsset, hash, isPending, isConfirming, isSuccess, error, reset }
}
