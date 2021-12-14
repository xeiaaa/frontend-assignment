import React, { createContext, useState } from "react";
import useConverter from "../hooks/useConverter";

interface ICurrenciesState {
  nep: string | number | readonly string[] | undefined,
  busd: string | number | readonly string[] | undefined,
}

export interface IAppStateContext {
  modalShown: boolean;
  setModalShown: Function;
  currencies: ICurrenciesState;
  handleChange: Function;
}

export const AppStateContext = createContext<IAppStateContext>(null!);

interface Props {
  children: React.ReactNode
}

export function AppStateProvider({ children }: Props) {
  // modal
  const [ modalShown, setModalShown ] = useState<boolean>(false)

  // currencies
  const { currencies, handleChange } = useConverter()

  return <AppStateContext.Provider value={{
    modalShown,
    setModalShown,
    currencies,
    handleChange,
  }}>
    { children }
  </AppStateContext.Provider>

}
