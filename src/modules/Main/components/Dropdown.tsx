import React from "react";
import styled from "styled-components";
import {Select, Paper} from "@mantine/core";

interface IDropdownProps {
    curCode: { [k: string]: string };
    onBaseChange: () => {};
}

export const Dropdown = ({curCode, onBaseChange}: IDropdownProps) => {
    const curCodes = Object.keys(curCode)

    const data = curCodes.map((el) => {
        const label = `${el}: ${curCode[el]}`
        return {value: el, label: label}
    })

    return (
        <Container>
            <Paper shadow="none" p="md">
            <Select
                label="Выберите валюту"
                placeholder="Pick one"
                searchable
                nothingFound="No options"
                data={data}
                onChange={onBaseChange}
            />
            </Paper>
        </Container>
    )
}

const Container = styled.div`
  width: 300px;
  grid-row: 2;
  grid-column: 1 / 12 span;
`
