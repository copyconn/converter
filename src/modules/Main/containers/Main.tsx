import React, {useContext} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {Button} from "@mantine/core";

import {dataContext} from "../../../App";

import {Dropdown, Row} from "../components";

export const Main = () => {

    const data = useContext(dataContext) as any;
    const navigate = useNavigate()

    const currencies = data.currencyData?.rates ? Object.keys(data.currencyData.rates) : []
    const date = new Date(Date.now()).toLocaleString().split(',')[0];

    return (
        <Container>
            <Label>Главная страница</Label>
            <Dropdown curCode={data.symbols} onBaseChange={data.onBaseChange}/>
            <LabelRows>Курсы на {date}</LabelRows>
            <Rows>
                {currencies.map((c) => {
                    return <Row fromCurr={data.currencyData.base} convertValue={data.currencyData.rates[c]} toCurr={c}
                                key={c}/>
                })}
            </Rows>
            <ButtonNav>
                <Button variant="outline" color="violet" onClick={() => navigate('/converter')}>Конвертер валют<Square/></Button>
            </ButtonNav>
        </Container>
    )
}

const Container = styled.div`
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

const LabelRows = styled.span`
  grid-row: 3;
  grid-column: 1 / 12 span;
  margin-left: 15px;
`

const Rows = styled.div`
  grid-row: 4 / 7 span;
  grid-column: 1 / 12 span;
  overflow-y: scroll;
  border: 1px solid #dbd7d7;
  margin-left: 15px;
  border-radius: 5px;
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