import React, { useCallback, useRef } from 'react';
import {FiLogIn, FiMail, FiLock} from 'react-icons/fi'
import {Container, Content} from './styles'
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Logo from '../../assets/logo.svg'
import Input from '../../components/Input';
import Button from '../../components/Button';
import {useAuth} from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup'
import { getValidationError } from '../../utils/GetValidationErrors';


interface SignInFormData {
    email: string;
    password: string;
  }
  

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null)
    const history = useHistory()
    const {signIn} = useAuth()

    const handleSubmit = useCallback(async(data: SignInFormData) => {
        try {
            formRef.current?.setErrors({})

            const schema = Yup.object().shape({
                
                email: Yup.string().required('E-mail obrigatório').email(),
                password: Yup.string().required('Senha obrigatória')
            })

            await schema.validate(data, {
                abortEarly: false
            })

            await signIn({
                email: data.email,
                password: data.password
            })

            history.push('/dashboard')
        } catch (err: any) {
            const errors = getValidationError(err)

            formRef.current?.setErrors(errors)
        }

    },[signIn, history]
    
    )

    return (

        <Container>
            <Content>
                <img src={Logo} alt="itec" />

                <Form onSubmit={handleSubmit} ref={formRef}>
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