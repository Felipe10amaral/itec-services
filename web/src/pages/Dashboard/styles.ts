import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
    
  display: flex;
   justify-content: space-around;
   align-items: center;
   flex-direction: row;
   
   
    
`

export const Content = styled.div`
  
    flex-direction: row;
    justify-content: center;
    
    margin-left: 30px;

    
    max-width: 500px;

    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;
    }

    h1 {
        font-size: 1.6rem;
        margin-bottom: 10px;
        font-family: Georgia, 'Times New Roman', Times, serif;
    }

    input{
        background: #232129;
        border-radius: 10px;
        border: 2px solid #232129;
        padding: 16px;
        width: 50%;
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

    
    
`

export const Nav = styled.div`
  display: flex;
  
  
  margin-bottom: 200px;

  ul {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    justify-content: center;
    align-items: center;
    flex: 1;
   
  }
  li {
    list-style: none;
    margin-bottom: 60px;
    
    
  }

  .link {
    color: white;
    list-style: none;
    text-decoration: none;
    width: 100%;
    font-family: 'Times New Roman', Times, serif;
    font-size: 1.3rem;
    padding:3px 20px;
   
    transition: all .45s ease;
    
  }

  .link:hover {
    color: #bb2121;
  }
`