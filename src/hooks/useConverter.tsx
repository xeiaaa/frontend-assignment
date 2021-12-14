import React, { useState } from 'react'
import { i18n } from '@lingui/core'

export interface ICurrenciesState {
  nep: string | number | string[] | undefined,
  busd: string | number | string[] | undefined
}

export enum Currency {
  nep = 'nep',
  busd = 'busd',
}

const useConverter = () => {
  const [currencies, setCurrencies] = useState<ICurrenciesState>({
    nep: '',
    busd: ''
  })

  const formatNumber = (num: any) => {
    const result = i18n.number(num, {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).replaceAll(',', '')
    return result
  }
  
  // on change handler for number input
  const handleChange = (currency: Currency) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value

    let otherCurrency = Currency.nep
    if (currency === Currency.nep) {
      otherCurrency = Currency.busd
    }

    // return when typing more than 3 decimal places
    if (str.includes('.') && str.split('.')[1].length >= 3) {
      return
    }

    setCurrencies(currencies => ({ ...currencies, [currency]: str }))

    if (!str) {
      // null the value of the other currency input instead of displaying 0.00
      setCurrencies(currencies => ({
        ...currencies,
        [otherCurrency]: ''
      }))
      return
    }

    const result = currency === Currency.nep ? Number(str) * 3 : Number(str) / 3

    setCurrencies(currencies => ({
      ...currencies,
      [otherCurrency]: formatNumber(result)
    }))
  }
  
  return { currencies, handleChange }
}

export default useConverter