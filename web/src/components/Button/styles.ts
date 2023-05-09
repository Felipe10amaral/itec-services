import styled from 'styled-components'
import { shade } from 'polished'


export const Container = styled.button`
    margin-top: 10px;
    height: 56px;
    background: #bb2121;
    border: 0;
    border-radius: 10px;
    width: 100%;
    padding: 0 16px;
    font-weight: 500;
    color: #fff;
    transition: background-color 0.2s;

    &:hover {
        background: ${shade(0.2, '#bb2121')};
    }

`