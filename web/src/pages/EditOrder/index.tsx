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
import { BsFillLockFill, BsTelephoneOutbound,BsPhone, BsHourglassBottom } from "react-icons/bs";
import { BiCalendarCheck } from "react-icons/bi";
import { getValidationError } from '../../utils/GetValidationErrors';


interface CreateOS {
  numberOS: string;
  name: string;
  telefone: string;
  cpf: string;
  model: string;
  password?: string;
  repair: string;
  value?: number | string;
  status?: string;
  exitDate?: string;
  guarantee?: string;
}

interface props {
  numberOS: string
}



const EditOrder: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()
  const {token} = useAuth()

  const [formData, setFormData] = useState<CreateOS>({
    numberOS: '',
    name: '',
    telefone: '',
    cpf: '',
    model: '',
    password: '',
    repair: '',
    value: '',
    status: '',
    exitDate: '',
    guarantee: '',
  });

  const handleGetOrder = useCallback(async(data: props) => {
    const osFormatted = Yup.object().shape({
      numberOS: Yup.string().required('numero da os obrigatorio'),
    })
    
    await osFormatted.validate(data, {
      abortEarly: false
  })

    try {
      const response = await api.get(`order/${data.numberOS}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
  
      setFormData(response.data)
      
    } catch (error) {

      window.alert("Ordem de Serviço não encontrada")
      console.log(error)
      
    }

  },[token])

  

  const handleSubmit = useCallback(async(data: CreateOS) => {
    
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        numberOS: Yup.string().required('numero da os obrigatorio'),
        name: Yup.string().required('Nome obrigatório'),
        telefone: Yup.string().required('telefone obrigatório'),
        cpf: Yup.string().required('cpf obrigatório'),
        model: Yup.string().required('modelo obrigatorio'),
        password: Yup.string(),
        repair: Yup.string().required('defeito obrigatorio'),
        value: Yup.number(),
        status: Yup.string(),
        exitDate: Yup.string(),
        guarantee: Yup.string()      
    })

    await schema.validate(data, {
        abortEarly: false
    })

    const params = data.numberOS
    console.log(data.model)
    
    try {
      await api.put(`order/${params}`, data ,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      window.alert("Ordem de serviço alterada com sucesso")
      
    } catch (error) {
      console.error(error)
      window.alert("Ordem de serviço não alterada")
      
    }    
  },[history, token])

    const {username} = useAuth()
    return (
      <>
        <Header username={username}/>
          <Container>

            <Form onSubmit={handleGetOrder}>
              
                <Input name="numberOS" icon={AiOutlineFieldNumber} placeholder='Número OS'/>
                <Button type='submit'> Buscar </Button>
              
            </Form>
            <Content>
             <Form ref={formRef} onSubmit={handleSubmit}>
                <h1> Editar Ordem de Serviço </h1>
                <Input name="numberOS" icon={AiOutlineFieldNumber} defaultValue={formData.numberOS} placeholder='Número OS'/>
                <Input name="name" icon={FiUser} placeholder='Nome' defaultValue={formData.name}/>
                <Input name="telefone" icon={BsTelephoneOutbound} defaultValue={formData.telefone} placeholder='Telefone'/>
                <Input name="cpf" icon={MdOutlineDocumentScanner} defaultValue={formData.cpf} placeholder='CPF'/>
                <Input name="model" icon={BsPhone} defaultValue={formData.model} placeholder='Modelo'/>
                <Input name="password" icon={BsFillLockFill} defaultValue={formData.password} placeholder='Senha do cliente'/>
                <Input name="repair" icon={FiTool} defaultValue={formData.repair} placeholder='Defeito'/>
                <Input name="value" icon={FiDollarSign} defaultValue={formData.value} placeholder='Valor'/>
                <Input name="status" icon={BsHourglassBottom} defaultValue={formData.status} placeholder='Status do reparo'/>
                <Input name="exitDate" icon={BiCalendarCheck} defaultValue={formData.exitDate} placeholder='Data de saída'/>
                <Input name="guarantee" icon={FiFileText} defaultValue={formData.guarantee} placeholder='Garantia'/>

                <Button type='submit'>Editar</Button>
              </Form>
            </Content>
            
            
        </Container>
          
        
      </>
    )
}

export default EditOrder