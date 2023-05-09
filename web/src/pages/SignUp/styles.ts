import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 30vh;
        margin-bottom: 10vh;
    }
    
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    max-width: 700px;

    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;
    }

    h1 {
        margin-bottom: 24px;
    }

    input{
        background: #232129;
        border-radius: 10px;
        border: 2px solid #232129;
        padding: 16px;
        width: 100%;
        color: #fff;

        & + input {
            margin-top: 8px;
        }
    } 

    button {
        margin-top: 10px;
        background: #bb2121;
        height: 56px;
        border-radius: 10px;
        border: 0;
        padding: 0 16px;
        width: 100%;
        color: #fff;
        font-weight: 500;
        transition: background-color 0.2s;

    }

    button:hover {
        background: ${shade(0.2, '#bb2121')};
    }

    a {
        color: #fff;
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition: background-color 0.2s;
    }

    a:hover {
        color: ${shade(0.2, '#fff')};
    }

    > a {
        color: #bb2121;
        display: flex;
        margin-top: 24px;
        text-decoration: none;
        transition: background-color 0.2s;

        svg {
            margin-right: 16px;
        }

        a:hover {
        color: ${shade(0.2, '#bb2121')};
    }
    }
`