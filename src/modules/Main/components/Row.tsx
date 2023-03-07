import React from "react";
import styled from "styled-components";

interface IRowProps {
    fromCurr: string;
    convertValue: number;
    toCurr: string;
}

export const Row = ({fromCurr, convertValue, toCurr}: IRowProps) => {
    return (
        <Container>
                1 {fromCurr} = {convertValue.toFixed(2)} {toCurr}
        </Container>
    )
}

const Container = styled.div`
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
  border-bottom: 1px solid #dbd7d7;
  //border: 1px solid #dbd7d7;
`