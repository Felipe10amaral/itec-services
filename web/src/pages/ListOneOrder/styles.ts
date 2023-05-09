import styled from 'styled-components';
import { shade } from 'polished'

export const Container = styled.div``

export const HeaderProps = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  
  button {
    margin-left: auto;
    background: none;
    border: none;
    svg {
      color: #fff;
      transition: color 0.2s;
    }
    svg:hover{
      color: #bb2121
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;
  
  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }
  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
    
    span {
      color: #f4ede8;
    }
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

    h3 {
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