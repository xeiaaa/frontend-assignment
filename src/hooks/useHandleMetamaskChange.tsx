import { useEffect } from 'react'

/* 
  Connect to metamask again when these changes happen:
    - Network Change
    - Account Change
    - Chain Change
*/
const useHandleMetamaskChange = (active: boolean, error: Error | undefined, connect: Function) => {
  useEffect(() => {
    const { ethereum } = window as any
    if (ethereum && ethereum.on && !active && !error) {

      const handleConnect = () => {
        console.log("Handling 'connect' event")
        connect()
      }

      const handleChainChanged = (chainId: string | number) => {
        console.log("Handling 'chainChanged' event with payload", chainId)
        connect()
      }

      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts)
        if (accounts.length > 0) {
          connect()
        }
      }

      const handleNetworkChanged = (networkId: string | number) => {
        console.log("Handling 'networkChanged' event with payload", networkId)
        connect()
      }
  
      ethereum.on('connect', handleConnect)
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('networkChanged', handleNetworkChanged)
  
      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect)
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
        }
      }
    }
  }, [active, error, connect])
}

export default useHandleMetamaskChange