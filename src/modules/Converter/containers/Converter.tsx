import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import {Button, TextInput} from '@mantine/core';
import {hideNotification} from "@mantine/notifications";

import {showError, showLoading} from "../../../utils";
import {getConvert} from "../../../api";

export const Converter = () => {

    const [convRes, setConvRes] = useState("")
    const inputEl = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();

    const getRes = () => {
        setConvRes("")
        if (inputEl.current !== null) {
            const regex = /([0-9]+) ([a-z]{3}) \w{2} ([a-z]{3})/
            const inputValue = inputEl.current.value.match(regex)
            const isValidInput = inputValue !== null && inputValue.length > 0

            if (!isValidInput) {
                showError('Введено некорректное значение')
                inputEl.current.value = ''
            } else {
                const from = inputValue[2]
                const to = inputValue[3]
                const amount = inputValue[1]

                const getData = async () => {
                    try {
                        showLoading()
                        const result = await getConvert(from, to, amount)
                        hideNotification('loading')

                        if (result.data.error) {
                            showError(result.data.error.type)
                        } else {
                            setConvRes(result.data.result.toFixed(2))
                        }
                    } catch (error) {
                        hideNotification('loading')

                        if (axios.isAxiosError(error)) {
                            // 👇️ error: AxiosError<any, any>
                            showError(error.message)
                            return error.message; // ???
                        } else {
                            console.log('unexpected error: ', error);
                            return 'An unexpected error occurred';
                        }
                    }
                }
                getData()
            }
        }
    }

    return (
        <Container>
            <Label>Конвертер валют</Label>
            <InputContainer>
                <TextInput
                    label="Введите данные в текстовое поле"
                    description="Введите данные в формате: '<количество> <код исходной валюты> in <код финальной валюты>'"
                    placeholder="1 USD in RUB"
                    ref={inputEl}
                    style={{width: '280px'}}
                />
                <Button style={{width: '150px'}} variant="gradient"
                        gradient={{from: '#ed6ea0', to: '#ec8c69', deg: 35}}
                        onClick={getRes}>Конвертировать</Button>
            </InputContainer>

            <Result>Результат: {convRes} </Result>

            <ButtonNav>
                <Button variant="outline" color="violet" onClick={() => navigate('/')}>Главная
                    страница<Square/></Button>
            </ButtonNav>
        </Container>
    )
}

const Container = styled.div`
  //display: flex;
  //flex-direction: column;
  //align-items: center;
  //justify-content: space-between;
  //gap: 50px;

  display: grid;
  grid-template-rows: repeat(12, 1fr);
  grid-template-columns: repeat(12, 1fr);

  border-radius: 20px;
  width: 40vw;
  height: 90vh;
  margin: 0 auto;
  background: white;
  padding: 50px 20px;
`

const Label = styled.div`
  grid-column: 1 / 12 span;
  grid-row: 1;
  font-size: 2em;
  font-weight: bold;
  margin: 0 auto;
`

const InputContainer = styled.div`
  display: flex;
  gap: 20px;
  //width: 70%;
  align-items: flex-end;
  grid-column: 2 / 10 span;
  grid-row: 4;
`

const Result = styled.div`
  grid-column: 2 / 8 span;
  grid-row: 6;
  font-weight: 500;
  font-size: 1.2em;
`

const ButtonNav = styled.div`
  grid-column: 1 / 12 span;
  grid-row: 12;
  margin: 0 auto;
`

const Square = styled.div`
  border-top: 2px solid #7950f2;
  border-right: 2px solid #7950f2;
  width: 8px;
  height: 8px;
  margin: 0 5px 0;
  -webkit-transform: rotate(45deg);
`