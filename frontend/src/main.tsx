import * as React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider } from '@tanstack/react-query'
import { wagmiAdapter, queryClient } from './config/web3'
import { App } from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
    <WagmiProvider config={wagmiAdapter.wagmiConfig as any}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
