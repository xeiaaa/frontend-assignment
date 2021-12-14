import React, { createContext, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

// Hooks
import useConverter, { ICurrenciesState } from "../hooks/useConverter";
import useHandleMetamaskChange from "../hooks/useHandleMetamaskChange";

export interface IAppStateContext {
  modalShown: boolean
  setModalShown: Function

  // converter
  currencies: ICurrenciesState
  handleChange: Function

  // web3 related
  active: boolean
  account: string | null | undefined
  chainId: number | undefined
  library: any
  connect: Function,
  disconnect: Function
}

export const AppStateContext = createContext<IAppStateContext>(null!);

interface Props {
  children: React.ReactNode
}

export function AppStateProvider({ children }: Props) {
  // modal
  const [ modalShown, setModalShown ] = useState<boolean>(false)
  const { active, activate, deactivate, account, library, chainId, error } = useWeb3React();

  // 56 = BSC chain id
  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 56],
  });

  // Connect to Metamask
  const connect = async () => {
    try {
      await activate(injected);
    } catch (err) {
      console.log(err);
    }
  };

  // Disconnect to Metamask
  const disconnect = async () => {
    try {
      await deactivate();
    } catch (err) {
      console.log(err);
    }
  };

  // Handle Metamask network / account change
  useHandleMetamaskChange(active, error, connect)

  // currencies
  const { currencies, handleChange } = useConverter()

  return <AppStateContext.Provider value={{
    modalShown,
    setModalShown,
    currencies,
    handleChange,
    active,
    connect,
    disconnect,
    account,
    library,
    chainId
  }}>
    { children }
  </AppStateContext.Provider>

}
