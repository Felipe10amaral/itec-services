import styled from 'styled-components';

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

    strong {
      color: #bb2121
    }
  }  
`