import React, { useCallback, useRef } from 'react'
import { FormHandles } from '@unform/core';
import * as Yup from 'yup'
import { Container, Content, Nav } from './styles'
import {Header} from '../../components/Header/index'
import { useAuth } from '../../context/AuthContext'
import { Form } from '@unform/web'
import Input from '../../components/Input'
import Button from '../../components/Button'
import {AiOutlineFieldNumber} from "react-icons/ai";
import { FiUser, FiTool, FiDollarSign, FiFileText } from 'react-icons/fi';
import { MdSettingsCell, MdOutlineDocumentScanner,MdOutlineChromeReaderMode } from "react-icons/md";
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api'



interface CreateOS {
  numberOs: number;
  name: string;
  telefone: number;
  cpf: string;
  model: string;
  repair: string;
  value: number;
  guarantee?: string;
}


const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()
  const {token} = useAuth()

  const handleSubmit = useCallback(async(data: CreateOS) => {
    try {
    
      const schema = Yup.object().shape({
        numberOS: Yup.number().required('numero da os obrigatorio'),
        name: Yup.string().required('Nome obrigatório'),
        telefone: Yup.string().required('telefone obrigatório'),
        cpf: Yup.number().required('cpf obrigatório'),
        model: Yup.string().required('modelo obrigatorio'),
        repair: Yup.string().required('defeito obrigatorio'),
        value: Yup.number().required('valor obrigatorio'),
        guarantee: Yup.string()
        
    })

    await schema.validate(data, {
        abortEarly: false
    })

    await api.post('order',  data);
    history.push('/dashboard', {
       headers: {
        'Authorization': `Bearer ${token}`
       }
    } )
    
    } catch (error) {
      console.log(error)
    }
  },[history, token])
    const {username} = useAuth()
    return (
      <>
        <Header username={username}/>
          <Container>
            <Content>
             <Form ref={formRef} onSubmit={handleSubmit}>
                <h1> Cadastrar Ordem de Serviço </h1>
                <Input name="numberOS" icon={AiOutlineFieldNumber} placeholder='Número OS'/>
                <Input name="name" icon={FiUser} placeholder='Nome'/>
                <Input name="telefone" icon={MdSettingsCell} placeholder='Telefone'/>
                <Input name="cpf" icon={MdOutlineDocumentScanner} placeholder='CPF'/>
                <Input name="model" icon={MdOutlineChromeReaderMode} placeholder='Modelo'/>
                <Input name="repair" icon={FiTool} placeholder='Defeito'/>
                <Input name="value" icon={FiDollarSign} placeholder='Valor'/>
                <Input name="guarantee" icon={FiFileText} placeholder='Garantia'/>

                <Button type='submit'>Cadastrar</Button>
              </Form>
            </Content>
            <Nav>
              <ul>
                <li >
                <Link className='link' to='signup'> Cadastrar usuário </Link>
                </li>
                <li> <Link className='link' to='/'> Editar usuário </Link> </li>
                <li> <Link className='link' to='/listOrder'> Listar todas as ordens de serviço </Link> </li>
                <li> <Link className='link' to='/' > Listar uma ordem de serviço </Link> </li>
                <li> <Link className='link' to='/'> Editar ordem de serviço </Link></li>
              </ul>
             </Nav>
            
        </Container>
          
        
      </>
    )
}

export default Dashboard