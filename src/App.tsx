import React, {createContext, useState, useEffect} from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import axios from "axios";
import {MantineProvider} from '@mantine/core';
import {NotificationsProvider, hideNotification} from '@mantine/notifications';

import {Converter, Main} from "./modules";

import './App.css';
import {symbols} from "./data";
import {getCurrencies, RatesResponse} from "./api";
import {showLoading, showError} from "./utils";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
    },
    {
        path: "/converter",
        element: <Converter/>,
    },
]);

export const dataContext = createContext({})

function App() {

    const [curData, setCurData] = useState<RatesResponse | null>(null);
    const [baseCur, setBaseCur] = useState('USD')

    useEffect(() => {
        const getCurData = async () => {
            try {
                showLoading()
                const latest = await getCurrencies(baseCur, symKeys)
                hideNotification('loading')

                if (latest.data.error) {
                    showError(latest.data.error.type)
                } else {
                    setCurData(latest.data)
                }
            } catch (error) {
                hideNotification('loading')

                if (axios.isAxiosError(error)) {
                    showError(error.message)
                } else {
                    console.log('unexpected error: ', error);
                    showError('Unexpected error occured')
                }
            }
        }
        getCurData()
    }, [baseCur])

    const onBaseChange = (value: string) => {
        setBaseCur(value)
    }

    const currencyData = curData;

    const symKeys = Object.keys(symbols)

    const data = {currencyData, symbols, onBaseChange}

    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <NotificationsProvider position="top-right" zIndex={2077}>
                <div className="App">
                    <dataContext.Provider value={data}>
                        <RouterProvider router={router}/>
                    </dataContext.Provider>
                </div>
            </NotificationsProvider>
        </MantineProvider>
    );
}

export default App;