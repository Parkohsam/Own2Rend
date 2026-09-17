import { useAccount } from 'wagmi'
import { formatEther } from 'viem'
import { useMyListedAssets, useMyActiveRentals, useRentalForListing } from '../hooks/useMyRentals'
import { useRentalByListing } from '../hooks/useRentals'
import { useCancelListing, useClaimBack } from '../hooks/useListAsset'
import { RentalTimer } from '../components/RentalTimer'
import { StatusBadge } from '../components/StatusBadge'
import { type Listing, type RentalAgreement } from '../hooks/useRentals'

function shortenAddr(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`
}

// ─── My Listed Asset Row ─────────────────────────────────────────────────────

function MyListedRow({ listing }: { listing: Listing }) {
  const { data: rental } = useRentalByListing(listing.rented ? listing.id : undefined)
  const { cancelListing, isPending: isCancelPending, isConfirming: isCancelConfirming } = useCancelListing()
  const { claimBack, isPending: isClaimPending, isConfirming: isClaimConfirming } = useClaimBack()

  const rentalData = rental as RentalAgreement | undefined
  const nowSec = BigInt(Math.floor(Date.now() / 1000))
  const rentalExpired = rentalData ? nowSec >= rentalData.endTime : false

  const status = listing.rented
    ? rentalExpired ? 'expired' : 'rented'
    : 'available'

  return (
    <div className="card space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-0.5 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge status={status as any} />
            <span className="text-xs text-gray-500 font-mono">
              #{listing.tokenId.toString()}
            </span>
          </div>
          <p className="text-xs text-gray-600 font-mono truncate">
            {shortenAddr(listing.nftContract)}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-sm font-bold text-purple-400">
            {formatEther(listing.pricePerDay)} BOT/day
          </p>
          <p className="text-xs text-gray-500">
            {listing.durationDays.toString()}d rental
          </p>
        </div>
      </div>

      {/* Rental info */}
      {rentalData && (
        <div className="bg-gray-800/50 rounded-lg px-3 py-2 text-xs text-gray-400 space-y-1">
          <div className="flex justify-between">
            <span>Renter</span>
            <span className="font-mono">{shortenAddr(rentalData.renter)}</span>
          </div>
          <div className="flex justify-between">
            <span>{rentalExpired ? 'Expired' : 'Expires in'}</span>
            <RentalTimer endTime={rentalData.endTime} />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        {!listing.rented && (
          <button
            className="btn-danger flex-1 text-sm py-2"
            onClick={() => cancelListing(listing.id)}
            disabled={isCancelPending || isCancelConfirming}
          >
            {isCancelPending || isCancelConfirming ? 'Cancelling…' : 'Cancel Listing'}
          </button>
        )}
        {(status === 'expired' || !listing.rented) && listing.rented && (
          <button
            className="btn-primary flex-1 text-sm py-2"
            onClick={() => claimBack(listing.id)}
            disabled={isClaimPending || isClaimConfirming || !rentalExpired}
          >
            {isClaimPending || isClaimConfirming
              ? 'Claiming…'
              : !rentalExpired
              ? 'Wait for expiry'
              : 'Claim NFT Back'}
          </button>
        )}
        {!listing.rented && (
          <button
            className="btn-primary flex-1 text-sm py-2"
            onClick={() => claimBack(listing.id)}
            disabled={isClaimPending || isClaimConfirming}
          >
            {isClaimPending || isClaimConfirming ? 'Claiming…' : 'Claim NFT Back'}
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Rented Listing Row (renter's view) ──────────────────────────────────────

function MyRentedRow({ listing }: { listing: Listing }) {
  const { data: rental } = useRentalByListing(listing.id)
  const rentalData = rental as RentalAgreement | undefined
  const { address } = useAccount()

  // Only show if this wallet is the renter
  if (!rentalData || rentalData.renter.toLowerCase() !== address?.toLowerCase()) {
    return null
  }

  const nowSec = BigInt(Math.floor(Date.now() / 1000))
  const isActive = nowSec < rentalData.endTime

  return (
    <div className="card space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-0.5 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge status={isActive ? 'rented' : 'expired'} />
            <span className="text-xs text-gray-500 font-mono">
              #{listing.tokenId.toString()}
            </span>
          </div>
          <p className="text-xs text-gray-600 font-mono truncate">
            {shortenAddr(listing.nftContract)}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-sm font-bold text-cyan-400">
            {formatEther(listing.pricePerDay * listing.durationDays)} BOT paid
          </p>
          <p className="text-xs text-gray-500">
            {listing.durationDays.toString()}d total
          </p>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-lg px-3 py-2 text-xs text-gray-400 space-y-1">
        <div className="flex justify-between">
          <span>Owner</span>
          <a
            href={`https://scan.bohr.life/address/${listing.owner}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono hover:text-purple-400 transition-colors"
          >
            {shortenAddr(listing.owner)} ↗
          </a>
        </div>
        <div className="flex justify-between">
          <span>{isActive ? 'Access expires in' : 'Rental ended'}</span>
          <RentalTimer endTime={rentalData.endTime} />
        </div>
      </div>

      {!isActive && (
        <p className="text-xs text-gray-500 bg-gray-800/40 rounded-lg px-3 py-2">
          ℹ️ Rental has ended. The owner can now claim back their NFT.
        </p>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function MyRentalsPage() {
  const { isConnected, address } = useAccount()
  const { listings: myListings, isLoading: myListingsLoading } = useMyListedAssets()
  const { rentedListings, isLoading: rentedLoading } = useMyActiveRentals()

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 text-center">
        <div className="text-6xl">👛</div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Connect Your Wallet</h2>
          <p className="text-gray-400">
            Connect your wallet to see your listed assets and active rentals.
          </p>
        </div>
        <appkit-button label="Connect Wallet" />
      </div>
    )
  }

  const isLoading = myListingsLoading || rentedLoading

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-white">My Rentals</h1>
        <p className="text-gray-400 text-sm font-mono">{address}</p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card h-32 animate-pulse bg-gray-800/50" />
          ))}
        </div>
      ) : (
        <>
          {/* ── Assets I'm Renting ── */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              🔑 Assets I'm Renting
              <span className="text-sm font-normal text-gray-500">
                ({rentedListings.length})
              </span>
            </h2>

            {rentedListings.length === 0 ? (
              <div className="card text-center py-10 text-gray-500">
                <p className="text-4xl mb-3">📭</p>
                <p>You haven't rented any assets yet.</p>
                <a href="/" className="text-purple-400 text-sm hover:underline mt-1 block">
                  Browse available listings →
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                {rentedListings.map((listing) => (
                  <MyRentedRow key={listing.id.toString()} listing={listing} />
                ))}
              </div>
            )}
          </section>

          {/* ── Assets I've Listed ── */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              📋 Assets I've Listed
              <span className="text-sm font-normal text-gray-500">
                ({myListings.length})
              </span>
            </h2>

            {myListings.length === 0 ? (
              <div className="card text-center py-10 text-gray-500">
                <p className="text-4xl mb-3">🖼️</p>
                <p>You haven't listed any assets yet.</p>
                <a href="/list" className="text-purple-400 text-sm hover:underline mt-1 block">
                  List your first asset →
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                {myListings.map((listing) => (
                  <MyListedRow key={listing.id.toString()} listing={listing} />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  )
}
