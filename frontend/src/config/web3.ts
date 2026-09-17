import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { defineChain } from 'viem'
import { QueryClient } from '@tanstack/react-query'

// ─── Bohr Testnet Definition ─────────────────────────────────────────────────

export const bohrTestnet = defineChain({
  id: 968,
  name: 'Bohr Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'BOT',
    symbol: 'BOT',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.bohr.life'],
    },
    public: {
      http: ['https://rpc.bohr.life'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Bohr Explorer',
      url: 'https://scan.bohr.life',
    },
  },
  fees: {
    defaultPriorityFee: 25_000_000_000n, // 25 Gwei (Bohr testnet requires >= 20 Gwei tip)
  },
  testnet: true,
})

// ─── Reown AppKit Setup ───────────────────────────────────────────────────────

// Get your Project ID from https://dashboard.reown.com (free)
const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || 'YOUR_PROJECT_ID'

export const networks = [bohrTestnet] as const

export const wagmiAdapter = new WagmiAdapter({
  networks: networks as any,
  projectId,
  ssr: false,
})

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10_000,  // 10 seconds
      retry: 2,
    },
  },
})

createAppKit({
  adapters: [wagmiAdapter],
  networks: networks as any,
  projectId,
  metadata: {
    name: 'Own2Rent',
    description: 'Rent digital NFT assets on the Bohr blockchain',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://own2rent.app',
    icons: ['https://avatars.githubusercontent.com/u/179229932'],
  },
  features: {
    analytics: false,
    email: false,
    socials: false,
    emailShowWallets: false,
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#a855f7',
    '--w3m-border-radius-master': '12px',
  },
})
