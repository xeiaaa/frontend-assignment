import React, { useState } from 'react'
import { i18n } from '@lingui/core'

interface ICurrenciesState {
  nep: string | number | readonly string[] | undefined,
  busd: string | number | readonly string[] | undefined
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
  
  const handleChange = (currency: Currency) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value

    let otherCurrency = Currency.nep
    if (currency === Currency.nep) {
      otherCurrency = Currency.busd
    }

    if (str.includes('.') && str.split('.')[1].length >= 3) {
      return
    }

    setCurrencies(currencies => ({ ...currencies, [currency]: str }))

    if (!str) {
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