import { useReadContract } from 'wagmi'
import { useChainId } from 'wagmi'
import { getAddresses } from '../contracts/addresses'
import Own2RentABI from '../contracts/Own2Rent.abi.json'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Listing {
  id: bigint
  owner: `0x${string}`
  nftContract: `0x${string}`
  tokenId: bigint
  pricePerDay: bigint
  durationDays: bigint
  active: boolean
  rented: boolean
}

export interface RentalAgreement {
  listingId: bigint
  renter: `0x${string}`
  startTime: bigint
  endTime: bigint
  active: boolean
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

/** Fetches every listing ever created from the contract. */
export function useAllListings() {
  const chainId = useChainId()
  const { OWN2RENT } = getAddresses(chainId)

  const { data, isLoading, error, refetch } = useReadContract({
    address: OWN2RENT,
    abi: Own2RentABI,
    functionName: 'getAllListings',
  })

  const listings = (data as Listing[] | undefined) ?? []

  return { listings, isLoading, error, refetch }
}

/** Returns only active (not cancelled, not yet reclaimed) listings. */
export function useActiveListings() {
  const { listings, isLoading, error, refetch } = useAllListings()
  const active = listings.filter((l) => l.active)
  return { listings: active, isLoading, error, refetch }
}

/** Fetches the rental agreement tied to a specific listing. */
export function useRentalByListing(listingId: bigint | undefined) {
  const chainId = useChainId()
  const { OWN2RENT } = getAddresses(chainId)

  return useReadContract({
    address: OWN2RENT,
    abi: Own2RentABI,
    functionName: 'getRentalByListing',
    args: listingId !== undefined ? [listingId] : undefined,
    query: { enabled: listingId !== undefined },
  })
}

/** Returns whether a rental is currently within its active window. */
export function useIsRentalActive(listingId: bigint | undefined) {
  const chainId = useChainId()
  const { OWN2RENT } = getAddresses(chainId)

  return useReadContract({
    address: OWN2RENT,
    abi: Own2RentABI,
    functionName: 'isRentalActive',
    args: listingId !== undefined ? [listingId] : undefined,
    query: { enabled: listingId !== undefined },
  })
}

/** Convenience: total number of listings ever created. */
export function useTotalListings() {
  const chainId = useChainId()
  const { OWN2RENT } = getAddresses(chainId)

  return useReadContract({
    address: OWN2RENT,
    abi: Own2RentABI,
    functionName: 'getTotalListings',
  })
}
