import { useState } from 'react'
import { useAccount } from 'wagmi'
import { ListingModal } from '../components/ListingModal'
import { useActiveListings } from '../hooks/useRentals'

export function ListPage() {
  const { isConnected } = useAccount()
  const [showModal, setShowModal] = useState(false)
  const { refetch } = useActiveListings()

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 text-center">
        <div className="text-6xl">🔒</div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Connect Your Wallet</h2>
          <p className="text-gray-400">
            You need to connect your wallet to list an asset for rent.
          </p>
        </div>
        <appkit-button label="Connect Wallet" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white">List an Asset</h1>
        <p className="text-gray-400">
          Put your ERC-721 NFT up for rent. You'll receive the full payment
          instantly when a renter pays. The NFT is held in escrow by the smart
          contract until the rental period ends.
        </p>
      </div>

      {/* How it works */}
      <div className="card space-y-4">
        <h2 className="text-lg font-semibold text-white">How it works</h2>
        <div className="space-y-3">
          {[
            {
              step: '1',
              title: 'Approve NFT Transfer',
              desc: 'Allow the Own2Rent contract to hold your NFT in escrow.',
            },
            {
              step: '2',
              title: 'Set Rental Terms',
              desc: 'Choose your daily price in BOT and the rental duration.',
            },
            {
              step: '3',
              title: 'Get Paid Instantly',
              desc: 'When a renter pays, the BOT goes straight to your wallet.',
            },
            {
              step: '4',
              title: 'Claim Back After Expiry',
              desc: 'Once the rental period ends, reclaim your NFT from escrow.',
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-4">
              <div className="w-7 h-7 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {step}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notice */}
      <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4 text-sm text-yellow-300 space-y-1">
        <p className="font-semibold">⚠️ Testnet Only</p>
        <p className="text-yellow-400/70">
          This platform runs on the Bohr Testnet. Use only test BOT tokens.
          All transactions are free of real value.
        </p>
      </div>

      {/* CTA */}
      <button
        className="btn-primary w-full py-4 text-base"
        onClick={() => setShowModal(true)}
      >
        + List My Asset
      </button>

      {showModal && (
        <ListingModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false)
            refetch()
          }}
        />
      )}
    </div>
  )
}
