import styled, {css} from 'styled-components'

interface ContainerProps {
    isFocus: boolean
    isField: boolean
}

export const Container = styled.div<ContainerProps>`

    background: #232129;
    border: 2px solid #232129;
    border-radius: 10px;
    width: 100%;
    padding: 5px;
    color: #fff;
    display: flex;
    align-items: center;

    ${props => props.isFocus && css`
        color: #bb2121;
        border-color: #bb2121;
    `}

    ${props => props.isField && css`
        color: #bb2121;
        
    `}

    & + div {
            margin-top: 8px;
        }
    
    input{
        flex: 1;
        border: 0;
        &::placeholder{
            color: #666360
        }
        

        
    } 

    svg {
        margin-right: 16px;
    }
`