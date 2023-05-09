import React, { useCallback } from 'react';
import {FiLogIn, FiMail, FiLock} from 'react-icons/fi'
import {Container, Content} from './styles'

import Logo from '../../assets/logo.svg'
import Input from '../../components/Input';
import Button from '../../components/Button';
import {useAuth} from '../../context/AuthContext';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';


interface SignInFormData {
    email: string;
    password: string;
  }
  

const SignIn: React.FC = () => {
    const history = useHistory()
    const {signIn} = useAuth()

    const handleSubmit = useCallback(async(data: SignInFormData) => {
        try {
            await signIn({
                email: data.email,
                password: data.password
            })

            history.push('/dashboard')
        } catch (error) {
            console.log("erro no login")
        }


    },[signIn, history]
    
    )

    return (

        <Container>
            <Content>
                <img src={Logo} alt="itec" />

                <Form onSubmit={handleSubmit}>
                    <h1>Faça seu login</h1>

                    <Input name="email" icon={FiMail} placeholder='E-mail'/>
                    <Input name="password" icon={FiLock} type='password' placeholder='Senha'/>

                    <Button type='submit'>Entrar</Button>

                    <a href="forgot">Esqueci minha senha</a>
                </Form>

                <Link className='link' to="/listOneOrder" >
                    <FiLogIn />
                    Acessar Ordem de serviço digital
                </Link>
            </Content>
        </Container>
    )
}

export default SignIn