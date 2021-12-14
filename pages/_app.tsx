import '../styles/globals.css'
import type { AppProps } from 'next/app'

// Web3
import Web3 from 'web3'
import { Web3ReactProvider } from '@web3-react/core'
import { AppStateProvider } from '../src/components/AppStateProvider'

const getLibrary = (provider: any) => {
  return new Web3(provider)
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Web3ReactProvider getLibrary={getLibrary}>
    <AppStateProvider>
      <Component {...pageProps} />
    </AppStateProvider>
  </Web3ReactProvider>
}

export default MyApp
