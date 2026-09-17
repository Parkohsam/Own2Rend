import { useState } from 'react'
import { formatEther } from 'viem'
import { useAccount } from 'wagmi'
import { type Listing } from '../hooks/useRentals'
import { useRentAsset } from '../hooks/useRentAsset'
import { StatusBadge } from './StatusBadge'
import { RentalTimer } from './RentalTimer'

interface AssetCardProps {
  listing: Listing
  rentalEndTime?: bigint   // passed if listing.rented === true
  onSuccess?: () => void
}

function shortenAddr(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`
}

export function AssetCard({ listing, rentalEndTime, onSuccess }: AssetCardProps) {
  const { address, isConnected } = useAccount()
  const { rentAsset, isPending, isConfirming, isSuccess, error, reset } =
    useRentAsset()
  const [showConfirm, setShowConfirm] = useState(false)

  const totalCost = listing.pricePerDay * listing.durationDays
  const isOwner =
    address?.toLowerCase() === listing.owner.toLowerCase()

  // Derive status
  const nowSec = BigInt(Math.floor(Date.now() / 1000))
  let status: 'available' | 'rented' | 'expired' | 'cancelled' = 'cancelled'
  if (!listing.active) {
    status = 'cancelled'
  } else if (listing.rented) {
    if (rentalEndTime && nowSec < rentalEndTime) {
      status = 'rented'
    } else {
      status = 'expired'
    }
  } else {
    status = 'available'
  }

  const canRent =
    isConnected &&
    !isOwner &&
    status === 'available' &&
    !isPending &&
    !isConfirming

  const handleRent = () => {
    rentAsset(listing.id, totalCost)
    setShowConfirm(false)
  }

  // Reset after success
  if (isSuccess && onSuccess) {
    onSuccess()
    reset()
  }

  return (
    <div className="card flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <StatusBadge status={status} />
          </div>
          <p className="text-xs text-gray-500 font-mono truncate">
            NFT: {shortenAddr(listing.nftContract)}
          </p>
          <p className="text-xs text-gray-500 font-mono">
            Token ID: #{listing.tokenId.toString()}
          </p>
        </div>
        {/* NFT placeholder art */}
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600/30 to-cyan-600/30 border border-purple-500/20 flex items-center justify-center shrink-0">
          <span className="text-2xl">🖼️</span>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-gray-800/50 rounded-xl p-3 space-y-1.5">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Price / day</span>
          <span className="font-semibold text-white">
            {formatEther(listing.pricePerDay)} BOT
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Duration</span>
          <span className="font-semibold text-white">
            {listing.durationDays.toString()} day{Number(listing.durationDays) > 1 ? 's' : ''}
          </span>
        </div>
        <div className="border-t border-gray-700 pt-1.5 flex justify-between text-sm">
          <span className="text-gray-300 font-medium">Total cost</span>
          <span className="font-bold text-purple-400">
            {formatEther(totalCost)} BOT
          </span>
        </div>
      </div>

      {/* Owner */}
      <p className="text-xs text-gray-600">
        Owner:{' '}
        <a
          href={`https://scan.bohr.life/address/${listing.owner}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-300 transition-colors font-mono"
        >
          {shortenAddr(listing.owner)}
          {isOwner ? ' (you)' : ''}
        </a>
      </p>

      {/* Rental timer */}
      {status === 'rented' && rentalEndTime !== undefined && (
        <div className="flex items-center justify-between bg-yellow-500/5 border border-yellow-500/20 rounded-lg px-3 py-2">
          <span className="text-xs text-gray-400">Expires in</span>
          <RentalTimer endTime={rentalEndTime} />
        </div>
      )}

      {status === 'expired' && rentalEndTime !== undefined && (
        <div className="flex items-center justify-between bg-red-500/5 border border-red-500/20 rounded-lg px-3 py-2">
          <span className="text-xs text-gray-400">Rental ended</span>
          <span className="text-xs text-red-400 font-medium">Ready to claim back</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-xs text-red-400 bg-red-500/10 rounded-lg px-3 py-2 break-all">
          {(error as Error).message?.split('(')[0] ?? 'Transaction failed'}
        </p>
      )}

      {/* Action button */}
      {status === 'available' && (
        <>
          {!showConfirm ? (
            <button
              className="btn-primary w-full mt-auto"
              onClick={() => setShowConfirm(true)}
              disabled={!canRent}
            >
              {!isConnected
                ? 'Connect wallet to rent'
                : isOwner
                ? 'Your listing'
                : 'Rent Now'}
            </button>
          ) : (
            <div className="space-y-2 mt-auto">
              <p className="text-xs text-gray-400 text-center">
                Pay <strong className="text-white">{formatEther(totalCost)} BOT</strong> to rent for{' '}
                <strong className="text-white">{listing.durationDays.toString()} days</strong>?
              </p>
              <div className="flex gap-2">
                <button
                  className="btn-secondary flex-1 text-sm"
                  onClick={() => setShowConfirm(false)}
                  disabled={isPending || isConfirming}
                >
                  Cancel
                </button>
                <button
                  className="btn-primary flex-1 text-sm"
                  onClick={handleRent}
                  disabled={isPending || isConfirming}
                >
                  {isPending
                    ? 'Confirm in wallet…'
                    : isConfirming
                    ? 'Processing…'
                    : 'Confirm Rent'}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
