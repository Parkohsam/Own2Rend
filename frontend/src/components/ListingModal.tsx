import { useState, useEffect } from 'react'
import { parseEther } from 'viem'
import { useChainId, useAccount, useReadContract } from 'wagmi'
import {
  useApproveNFT,
  useGetApproved,
  useListAsset,
} from '../hooks/useListAsset'
import { useMintNFT } from '../hooks/useMintNFT'
import { getAddresses } from '../contracts/addresses'
import ERC721ABI from '../contracts/ERC721.abi.json'

interface ListingModalProps {
  onClose: () => void
  onSuccess: () => void
}

type Step = 'form' | 'approve' | 'list' | 'done'

export function ListingModal({
  onClose,
  onSuccess,
}: ListingModalProps) {
  const chainId = useChainId()
  const addresses = getAddresses(chainId)
  const { address: userAddress } = useAccount()

  // Form state
  const [nftContract, setNftContract] = useState<string>(
    addresses.MOCK_NFT
  )
  const [tokenId, setTokenId] = useState('0')
  const [pricePerDay, setPricePerDay] = useState('0.1')
  const [durationDays, setDurationDays] = useState('1')
  const [step, setStep] = useState<Step>('form')
  const [formError, setFormError] = useState('')

  const isValidTokenId =
    tokenId !== '' &&
    !isNaN(Number(tokenId)) &&
    Number(tokenId) >= 0

  const {
    data: tokenOwner,
    isError: isOwnerError,
    isLoading: isCheckingOwner,
  } = useReadContract({
    address: (nftContract as `0x${string}`) || undefined,
    abi: ERC721ABI,
    functionName: 'ownerOf',
    args: isValidTokenId ? [BigInt(tokenId)] : undefined,
    query: {
      enabled: !!nftContract && isValidTokenId,
    },
  })

  const isUserOwner =
    tokenOwner &&
    userAddress &&
    tokenOwner.toString().toLowerCase() ===
      userAddress.toLowerCase()

  // Hooks
  const {
    approve,
    isPending: isApprovePending,
    error: approveError,
  } = useApproveNFT()

  const { isApproved } = useGetApproved(
    nftContract as `0x${string}` | undefined,
    tokenId ? BigInt(tokenId) : undefined
  )

  const {
    listAsset,
    isPending: isListPending,
    isConfirming,
    isSuccess: isListSuccess,
    error: listError,
  } = useListAsset()

  const {
    mintNFT,
    isPending: isMintPending,
    isConfirming: isMintConfirming,
    isSuccess: isMintSuccess,
  } = useMintNFT()

  // After list success
  useEffect(() => {
    if (isListSuccess) {
      setStep('done')

      const timer = setTimeout(() => {
        onSuccess()
        onClose()
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isListSuccess, onSuccess, onClose])

  const validate = () => {
    if (!nftContract.match(/^0x[0-9a-fA-F]{40}$/)) {
      setFormError('Invalid NFT contract address')
      return false
    }

    if (
      !tokenId ||
      isNaN(Number(tokenId)) ||
      Number(tokenId) < 0
    ) {
      setFormError('Invalid token ID')
      return false
    }

    if (
      !pricePerDay ||
      isNaN(Number(pricePerDay)) ||
      Number(pricePerDay) <= 0
    ) {
      setFormError('Price per day must be greater than 0')
      return false
    }

    if (
      !durationDays ||
      isNaN(Number(durationDays)) ||
      Number(durationDays) < 1 ||
      Number(durationDays) > 365
    ) {
      setFormError('Duration must be between 1 and 365 days')
      return false
    }

    setFormError('')
    return true
  }

  const handleApprove = async () => {
    if (!validate()) return

    setStep('approve')

    try {
      await approve(
        nftContract as `0x${string}`,
        BigInt(tokenId)
      )
    } catch (e) {
      setStep('form')
    }
  }

  const handleList = () => {
    setStep('list')

    listAsset(
      nftContract as `0x${string}`,
      BigInt(tokenId),
      parseEther(pricePerDay),
      BigInt(durationDays)
    )
  }

  const totalCost =
    pricePerDay && durationDays
      ? (
          Number(pricePerDay) * Number(durationDays)
        ).toFixed(4)
      : '—'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">
            List Asset for Rent
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-5">
          {step === 'done' && (
            <div className="text-center py-8 space-y-3">
              <div className="text-5xl">🎉</div>

              <p className="text-xl font-bold text-white">
                Asset Listed!
              </p>

              <p className="text-gray-400 text-sm">
                Your NFT is now available to rent. Redirecting…
              </p>
            </div>
          )}

          {step !== 'done' && (
            <>
              {/* Testnet Helper */}
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-purple-300">
                    🧪 Bohr Testnet Helper
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setNftContract(addresses.MOCK_NFT)
                    }
                    className="text-xs text-purple-400 hover:text-purple-300 underline font-mono"
                  >
                    Use MockNFT Address
                  </button>
                </div>

                <p className="text-xs text-gray-400">
                  Need a test NFT to list? Mint one for free to your wallet right now.
                </p>

                <button
                  type="button"
                  onClick={() => mintNFT()}
                  disabled={isMintPending || isMintConfirming}
                  className="btn-secondary w-full text-xs py-1.5"
                >
                  {isMintPending
                    ? 'Confirm mint in wallet…'
                    : isMintConfirming
                    ? 'Minting NFT on Bohr…'
                    : isMintSuccess
                    ? '✓ Minted! (Check Token ID: 0, 1, 2...)'
                    : '🎁 Mint Free Test NFT'}
                </button>
              </div>

              {/* Info */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-3">
                <p className="text-xs text-gray-400">
                  Enter the{' '}
                  <span className="text-white font-medium">
                    real ERC-721 contract address
                  </span>{' '}
                  and token ID you own. You must be the owner and have approved Own2Rent.
                </p>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="label">
                    NFT Contract Address
                  </label>

                  <input
                    type="text"
                    className="input-field font-mono text-sm"
                    placeholder="0x..."
                    value={nftContract}
                    onChange={(e) =>
                      setNftContract(e.target.value)
                    }
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="label mb-0">
                      Token ID
                    </label>

                    {nftContract.toLowerCase() ===
                      addresses.MOCK_NFT.toLowerCase() && (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">
                          Quick select:
                        </span>

                        {['0', '1', '2', '3', '4', '5'].map(
                          (id) => (
                            <button
                              key={id}
                              type="button"
                              onClick={() => setTokenId(id)}
                              className={`px-1.5 py-0.5 text-xs rounded font-mono transition-colors ${
                                tokenId === id
                                  ? 'bg-purple-600 text-white font-bold'
                                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                              }`}
                            >
                              #{id}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  <input
                    type="number"
                    className="input-field"
                    placeholder="0"
                    min="0"
                    value={tokenId}
                    onChange={(e) =>
                      setTokenId(e.target.value)
                    }
                  />

                  {/* Real-time token ownership validation */}
                  {isValidTokenId && (
                    <div className="mt-1.5 text-xs">
                      {isCheckingOwner ? (
                        <span className="text-gray-400">
                          Verifying token on-chain...
                        </span>
                      ) : isUserOwner ? (
                        <span className="text-green-400 font-medium">
                          ✓ Verified: Your wallet owns Token #{tokenId}
                        </span>
                      ) : isOwnerError ? (
                        <span className="text-red-400 font-medium">
                          ✗ Token #{tokenId} has not been minted yet!
                        </span>
                      ) : tokenOwner ? (
                        <span className="text-yellow-400 font-medium">
                          ⚠ Token #{tokenId} is owned by another wallet
                        </span>
                      ) : null}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">
                      Price / Day (BOT)
                    </label>

                    <input
                      type="number"
                      className="input-field"
                      placeholder="0.1"
                      min="0"
                      step="0.01"
                      value={pricePerDay}
                      onChange={(e) =>
                        setPricePerDay(e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="label">
                      Duration (days)
                    </label>

                    <input
                      type="number"
                      className="input-field"
                      placeholder="7"
                      min="1"
                      max="365"
                      value={durationDays}
                      onChange={(e) =>
                        setDurationDays(e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Summary */}
                {pricePerDay && durationDays && (
                  <div className="bg-gray-800/50 rounded-xl p-3 text-sm space-y-1">
                    <div className="flex justify-between text-gray-400">
                      <span>Renter will pay</span>
                      <span className="font-bold text-purple-400">
                        {totalCost} BOT total
                      </span>
                    </div>

                    <div className="flex justify-between text-gray-400">
                      <span>You receive instantly</span>
                      <span className="text-green-400 font-semibold">
                        {totalCost} BOT
                      </span>
                    </div>
                  </div>
                )}

                {/* Errors */}
                {(formError || approveError || listError) && (
                  <p className="text-xs text-red-400 bg-red-500/10 rounded-lg px-3 py-2">
                    {formError ||
                      (approveError as Error)?.message?.split('(')[0] ||
                      (listError as Error)?.message?.split('(')[0]}
                  </p>
                )}

                {/* Step indicator */}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border ${
                      step === 'form'
                        ? 'border-purple-500 text-purple-400'
                        : 'border-green-500 text-green-400'
                    }`}
                  >
                    1
                  </span>

                  <span className="text-gray-600">
                    Approve NFT
                  </span>

                  <span className="text-gray-700">→</span>

                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border ${
                      step === 'list'
                        ? 'border-purple-500 text-purple-400'
                        : 'border-gray-700 text-gray-600'
                    }`}
                  >
                    2
                  </span>

                  <span className="text-gray-600">
                    List Asset
                  </span>
                </div>

                {/* Action buttons */}
                {!isApproved ? (
                  <button
                    className="btn-primary w-full"
                    onClick={handleApprove}
                    disabled={
                      isApprovePending || step === 'approve'
                    }
                  >
                    {isApprovePending || step === 'approve'
                      ? 'Approving in wallet…'
                      : 'Step 1: Approve NFT Transfer'}
                  </button>
                ) : (
                  <button
                    className="btn-primary w-full"
                    onClick={handleList}
                    disabled={isListPending || isConfirming}
                  >
                    {isListPending
                      ? 'Confirm in wallet…'
                      : isConfirming
                      ? 'Listing on-chain…'
                      : 'Step 2: List Asset'}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}