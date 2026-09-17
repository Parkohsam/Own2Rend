import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
  useAccount,
} from 'wagmi'
import { getAddresses } from '../contracts/addresses'
import MockNFTABI from '../contracts/MockNFT.abi.json'
import { BOHR_GAS_FEES } from './useListAsset'

/** Mints a test NFT from the MockNFT contract to the connected wallet. */
export function useMintNFT() {
  const chainId = useChainId()
  const { address } = useAccount()
  const addresses = getAddresses(chainId)
  const mockNftAddress = addresses.MOCK_NFT

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

  const mintNFT = (metadataURI: string = 'ipfs://own2rent-test-asset') => {
    if (!address) return
    writeContract({
      address: mockNftAddress,
      abi: MockNFTABI,
      functionName: 'mint',
      args: [address, metadataURI],
      ...BOHR_GAS_FEES,
    })
  }

  return {
    mintNFT,
    mockNftAddress,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
    reset,
  }
}
