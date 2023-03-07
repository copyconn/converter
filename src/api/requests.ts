import axios, {AxiosResponse} from 'axios'

import {ConvertResponse, RatesResponse} from "./types";

const URL = 'https://api.apilayer.com/fixer/'

const axiosInstance = axios.create({
    baseURL: URL,
    headers: {apikey: 'ucvkZ1p1fyzjGD0zBZldo2cQxYBg328R'}
})

export const getCurrencies = (base: string, symbols: string[]):  Promise<AxiosResponse<RatesResponse>> =>
    axiosInstance.get(`/latest?base=${base}&symbols=${symbols.join()}`)

export const getConvert = (from: string, to: string, amount: string): Promise<AxiosResponse<ConvertResponse>> =>
    axiosInstance.get(`/convert?to=${to}&from=${from}&amount=${amount}`)