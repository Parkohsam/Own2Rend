import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useActiveListings } from '../hooks/useRentals'
import { useRentalByListing } from '../hooks/useRentals'
import { AssetCard } from '../components/AssetCard'
import { ListingModal } from '../components/ListingModal'
import { type Listing } from '../hooks/useRentals'

// Render each card and fetch its rental details
function ListingCard({ listing, onSuccess }: { listing: Listing; onSuccess: () => void }) {
  const { data: rental } = useRentalByListing(listing.rented ? listing.id : undefined)
  return (
    <AssetCard
      listing={listing}
      rentalEndTime={(rental as any)?.endTime}
      onSuccess={onSuccess}
    />
  )
}

export function HomePage() {
  const { isConnected } = useAccount()
  const { listings, isLoading, refetch } = useActiveListings()
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState<'all' | 'available' | 'rented'>('all')

  const filtered = listings.filter((l) => {
    if (filter === 'available') return !l.rented
    if (filter === 'rented') return l.rented
    return true
  })

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center space-y-4 py-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Rent Digital Assets{' '}
          <span className="gradient-text">On-Chain</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Browse NFT listings, rent with BOT tokens, and own access rights —
          all enforced by smart contracts on the Bohr testnet.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {isConnected ? (
            <button className="btn-primary" onClick={() => setShowModal(true)}>
              + List Your Asset
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <appkit-button label="Connect Wallet to Start" />
            </div>
          )}
          <a
            href="https://scan.bohr.life"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm"
          >
            View on Explorer ↗
          </a>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Listings', value: listings.length },
          { label: 'Available Now', value: listings.filter((l) => !l.rented).length },
          { label: 'Active Rentals', value: listings.filter((l) => l.rented).length },
        ].map(({ label, value }) => (
          <div key={label} className="card text-center py-4">
            <p className="text-2xl font-bold gradient-text">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 mr-2">Filter:</span>
        {(['all', 'available', 'rented'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                : 'text-gray-500 hover:text-white border border-transparent'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <span className="ml-auto text-sm text-gray-600">
          {filtered.length} listing{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="card h-64 animate-pulse bg-gray-800/50"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 space-y-3">
          <p className="text-5xl">📭</p>
          <p className="text-xl font-semibold text-gray-300">No listings found</p>
          <p className="text-gray-500 text-sm">
            {filter === 'all'
              ? 'Be the first to list an asset!'
              : `No ${filter} listings at the moment.`}
          </p>
          {isConnected && filter === 'all' && (
            <button
              className="btn-primary mt-2"
              onClick={() => setShowModal(true)}
            >
              List Your First Asset
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((listing) => (
            <ListingCard
              key={listing.id.toString()}
              listing={listing}
              onSuccess={refetch}
            />
          ))}
        </div>
      )}

      {/* Listing modal */}
      {showModal && (
        <ListingModal
          onClose={() => setShowModal(false)}
          onSuccess={refetch}
        />
      )}
    </div>
  )
}
