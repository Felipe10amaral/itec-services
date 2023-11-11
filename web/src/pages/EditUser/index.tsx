import React, { useCallback, useRef, useState } from 'react'
import { FormHandles } from '@unform/core';
import * as Yup from 'yup'
import { Container, Content } from './styles'
import {Header} from '../../components/Header/index'
import { useAuth } from '../../context/AuthContext'
import { Form } from '@unform/web'
import Input from '../../components/Input'
import Button from '../../components/Button'
import {AiOutlineFieldNumber} from "react-icons/ai";
import { FiUser, FiTool, FiDollarSign, FiFileText } from 'react-icons/fi';
import {  MdOutlineDocumentScanner } from "react-icons/md";
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api'
import {  BsTelephoneOutbound } from "react-icons/bs";

import { getValidationError } from '../../utils/GetValidationErrors';


interface CreateUser {
  name: string;
  username: string;
  email: string;
  password: string;
 
}

interface props {
  username: string
}



const EditUser: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()
  const {token} = useAuth()

  const [formData, setFormData] = useState<CreateUser>({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const handleGetUser = useCallback(async(data: props) => {
    const osFormatted = Yup.object().shape({
      username: Yup.string().required('numero do usuario obrigatorio'),
    })
    
    await osFormatted.validate(data, {
      abortEarly: false
  })

    const response = await api.get(`order/${data.username}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    setFormData(response.data)

  },[token])

  

  const handleSubmit = useCallback(async(data: CreateUser) => {
    
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        username: Yup.string().required('usuario do usuario obrigatorio'),
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('email obrigatório'),
        password: Yup.string().required('senha obrigatório'),
   
    })

    await schema.validate(data, {
        abortEarly: false
    })

    const params = data.username
   
    
    try {
      await api.put(`order/${params}`, data ,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      window.alert("Usuário alterado com sucesso")
      
    } catch (error) {
      console.error(error)
      window.alert("Usuário não alterado")
      
    }    
  },[history, token])

    const {username} = useAuth()
    return (
      <>
        <Header username={username}/>
          <Container>

            <Form onSubmit={handleGetUser}>
              
                <Input name="username" icon={AiOutlineFieldNumber} placeholder='usuario'/>
                <Button type='submit'> Buscar </Button>
              
            </Form>
            <Content>
             <Form ref={formRef} onSubmit={handleSubmit}>
                <h1> Editar Usuário </h1>
                <Input name="name" icon={AiOutlineFieldNumber} defaultValue={formData.username} placeholder='Nome'/>
                <Input name="username" icon={FiUser} placeholder='usuario' defaultValue={formData.name}/>
                <Input name="email" icon={BsTelephoneOutbound} defaultValue={formData.email} placeholder='E-mail'/>
                <Input name="password" icon={MdOutlineDocumentScanner} defaultValue={formData.password} placeholder='senha'/>
                
                <Button type='submit'>Editar</Button>
              </Form>
            </Content>
            
            
        </Container>
          
        
      </>
    )
}

export default EditUser