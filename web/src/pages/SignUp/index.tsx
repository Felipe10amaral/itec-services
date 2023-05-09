import React, { useCallback, useRef } from 'react';
import {FiArrowLeft, FiMail, FiLock, FiUser, FiUserCheck} from 'react-icons/fi'
import {Container, Content} from './styles'
import * as Yup from 'yup'

import Logo from '../../assets/logo.svg'
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';


interface SignUpProps {
    name: string;
    email: string;
    username: string;
    password: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null)
    
    
    const history = useHistory()

    
    const handleSubmit = useCallback(async (data: SignUpProps) => {
        try {
            
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email(),
                username: Yup.string().required('username obrigatório'),
                password: Yup.string().min(6, 'No mínimo 6 dígitos')
            })

            await schema.validate(data, {
                abortEarly: false
            })

            await api.post('users', data, );
            history.push('/dashboard')
            
        } catch (error) {
            
           
        }
    }, [history])
    return (
        <Container>
        <Content>
            <img src={Logo} alt="itec" />

            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu cadastro</h1>
                <Input name="name" icon={FiUser} placeholder='Nome'/>
                <Input name="email" icon={FiMail} placeholder='E-mail'/>
                <Input name="username" icon={FiUserCheck} placeholder='username'/>
                <Input name="password" icon={FiLock} type='password' placeholder='Senha'/>

                <Button type='submit'>Cadastrar</Button>

                
            </Form>

            <Link to="/" >
                <FiArrowLeft />
                Voltar para Login
            </Link>
        </Content>
    </Container>
    )
}

export default SignUp