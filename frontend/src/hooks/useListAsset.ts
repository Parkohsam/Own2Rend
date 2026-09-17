import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
  useReadContract,
} from 'wagmi'
import { getAddresses } from '../contracts/addresses'
import Own2RentABI from '../contracts/Own2Rent.abi.json'
import ERC721ABI from '../contracts/ERC721.abi.json'

export const BOHR_GAS_FEES = {
  maxPriorityFeePerGas: 25_000_000_000n, // 25 Gwei
  maxFeePerGas: 50_000_000_000n,         // 50 Gwei
}

// ─── Approve NFT ──────────────────────────────────────────────────────────────

/** Step 1: Approve the Own2Rent contract to transfer a specific NFT token. */
export function useApproveNFT() {
  const { writeContractAsync, isPending, error } = useWriteContract()
  const chainId = useChainId()
  const { OWN2RENT } = getAddresses(chainId)

  const approve = async (nftContract: `0x${string}`, tokenId: bigint) => {
    return writeContractAsync({
      address: nftContract,
      abi: ERC721ABI,
      functionName: 'approve',
      args: [OWN2RENT, tokenId],
      ...BOHR_GAS_FEES,
    })
  }

  return { approve, isPending, error }
}

/** Check the approved address for a specific token. */
export function useGetApproved(
  nftContract: `0x${string}` | undefined,
  tokenId: bigint | undefined
) {
  const chainId = useChainId()
  const { OWN2RENT } = getAddresses(chainId)

  const { data: approvedAddress } = useReadContract({
    address: nftContract,
    abi: ERC721ABI,
    functionName: 'getApproved',
    args: tokenId !== undefined ? [tokenId] : undefined,
    query: { enabled: !!nftContract && tokenId !== undefined },
  })

  const isApproved =
    approvedAddress?.toString().toLowerCase() === OWN2RENT.toLowerCase()

  return { approvedAddress, isApproved }
}

// ─── List Asset ───────────────────────────────────────────────────────────────

/** Step 2: List the NFT on Own2Rent after approval. */
export function useListAsset() {
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

  const listAsset = (
    nftContract: `0x${string}`,
    tokenId: bigint,
    pricePerDay: bigint,
    durationDays: bigint
  ) => {
    writeContract({
      address: OWN2RENT,
      abi: Own2RentABI,
      functionName: 'listAsset',
      args: [nftContract, tokenId, pricePerDay, durationDays],
      ...BOHR_GAS_FEES,
    })
  }

  return { listAsset, hash, isPending, isConfirming, isSuccess, error, reset }
}

// ─── Cancel Listing ───────────────────────────────────────────────────────────

/** Cancel a listing that has not yet been rented. Returns the NFT. */
export function useCancelListing() {
  const chainId = useChainId()
  const { OWN2RENT } = getAddresses(chainId)

  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const cancelListing = (listingId: bigint) => {
    writeContract({
      address: OWN2RENT,
      abi: Own2RentABI,
      functionName: 'cancelListing',
      args: [listingId],
      ...BOHR_GAS_FEES,
    })
  }

  return { cancelListing, hash, isPending, isConfirming, isSuccess, error }
}

// ─── Claim Back ───────────────────────────────────────────────────────────────

/** Owner claims NFT back after rental expiry. */
export function useClaimBack() {
  const chainId = useChainId()
  const { OWN2RENT } = getAddresses(chainId)

  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const claimBack = (listingId: bigint) => {
    writeContract({
      address: OWN2RENT,
      abi: Own2RentABI,
      functionName: 'claimBack',
      args: [listingId],
      ...BOHR_GAS_FEES,
    })
  }

  return { claimBack, hash, isPending, isConfirming, isSuccess, error }
}
