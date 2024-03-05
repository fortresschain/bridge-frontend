import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createConfig, createStorage, http } from 'wagmi'
import { Chain, bsc, bscTestnet, mainnet, sepolia } from 'wagmi/chains'

export const projectId = process.env.NEXT_PUBLIC_VITE_WALLET_CONNECT_PROJECT_ID

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'WhaleChain',
  description: 'WhaleChain',
  url: 'https://bridge.whalechain.live', // origin must match your domain & subdomain
  icons: ['https://i.ibb.co/XWtRzjZ/icon-round.png']
}

export const whalechain = {
  id: 370,
  name: 'WhaleChain',
  nativeCurrency: { name: 'Whale', symbol: 'WHALE', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet.whalechain.live'] },
  },
  blockExplorers: {
    default: { name: 'WhaleChain Explorer', url: 'https://explorer.whalechain.live' },
  },
} as const satisfies Chain

export const fortressChain = {
  id: 372,
  name: 'FortressChain',
  nativeCurrency: { name: 'Fort', symbol: 'FORT', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.fortresschain.finance'] },
  },
  blockExplorers: {
    default: { name: 'FortressChain Explorer', url: 'https://explorer.fortresschain.finance' },
  },
} as const satisfies Chain

// Create wagmiConfig
export const config = defaultWagmiConfig({
  chains: [bsc, whalechain, fortressChain], // required
  projectId, // required
  metadata, // required
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
  enableWalletConnect: true, // Optional - true by default
  enableInjected: true, // Optional - true by default
  enableEIP6963: true, // Optional - true by default
  enableCoinbase: true, // Optional - true by default
})

export const configCore = createConfig({
  chains: [bsc, whalechain, fortressChain],
  transports: {
    [bsc.id]: http(),
    [whalechain.id]: http(),
    [fortressChain.id]: http(),
  },
  storage: createStorage({
    storage: cookieStorage
  }),
})