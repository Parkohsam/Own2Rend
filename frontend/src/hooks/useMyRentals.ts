import { useAccount } from 'wagmi'
import { useAllListings, useRentalByListing, type Listing, type RentalAgreement } from './useRentals'

export interface ListingWithRental extends Listing {
  rental?: RentalAgreement
}

/** Returns listings where the connected wallet is the owner. */
export function useMyListedAssets() {
  const { address } = useAccount()
  const { listings, isLoading, refetch } = useAllListings()

  const myListings = address
    ? listings.filter(
        (l) => l.owner.toLowerCase() === address.toLowerCase() && l.active
      )
    : []

  return { listings: myListings, isLoading, refetch }
}

/**
 * Hook to get a single rental's details — used inside MyRentalsPage to
 * render the renter section per listing.
 */
export function useRentalForListing(listingId: bigint) {
  const { data } = useRentalByListing(listingId)
  return data as RentalAgreement | undefined
}

/**
 * Returns all listings where the connected wallet is the active renter
 * and the rental has not yet expired.
 */
export function useMyActiveRentals() {
  const { address } = useAccount()
  const { listings, isLoading, refetch } = useAllListings()

  // Filter to listings that are rented out
  const rentedListings = listings.filter((l) => l.active && l.rented)

  return {
    rentedListings,
    address,
    isLoading,
    refetch,
  }
}
