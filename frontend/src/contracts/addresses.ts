/**
 * Contract addresses — updated automatically by deployment script.
 */

export const CONTRACT_ADDRESSES = {
  /** Hardhat local node (chainId 31337) */
  31337: {
    OWN2RENT: '0x5FbDB2315678afecb367f032d93F642f64180aa3' as `0x${string}`,
    MOCK_NFT:  '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512' as `0x${string}`,
  },
  /** Bohr Testnet (chainId 968) */
  968: {
    OWN2RENT: '0x5eb8f9ac22A0add48BAa15Bd5C90DCf14a09AF36' as `0x${string}`,
    MOCK_NFT:  '0x6534051D574395D79a551aB525A4435b565b7Eee' as `0x${string}`,
  },
} as const

export type SupportedChainId = keyof typeof CONTRACT_ADDRESSES

/** Returns addresses for the given chainId, falling back to local defaults. */
export function getAddresses(chainId?: number) {
  const id = chainId as SupportedChainId
  return CONTRACT_ADDRESSES[id] ?? CONTRACT_ADDRESSES[968]
}
