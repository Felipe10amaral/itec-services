import React, { useCallback, useRef } from 'react'
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
  numberOS: number;
  name: string;
  telefone: number;
  cpf: string;
  model: string;
  password?: string;
  repair: string;
  value?: number;
  status?: string;
  exitDate?: string;
  guarantee?: string;
}


const EditOrder: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()
  const {token} = useAuth()

  const handleSubmit = useCallback(async(data: CreateOS) => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        numberOS: Yup.string().required('numero da os obrigatorio'),
        name: Yup.string().required('Nome obrigatório'),
        telefone: Yup.string().required('telefone obrigatório'),
        cpf: Yup.string().required('cpf obrigatório'),
        model: Yup.string().required('modelo obrigatorio'),
        password: Yup.string(),
        repair: Yup.string().required('defeito obrigatorio'),
        value: Yup.string(),
        status: Yup.string(),
        exitDate: Yup.string(),
        guarantee: Yup.string()
        
    })

    await schema.validate(data, {
        abortEarly: false
    })
    
    const os = await api.get(`order/${data.numberOS}`)
    console.log(os.data)

    // await api.post('order',  data, {
    //   headers: {
    //     'Authorization': `Bearer ${token}`
    //   }
    // });
   // history.push('/dashboard')
    
    } catch (err: any) {
      const errors = getValidationError(err)

      formRef.current?.setErrors(errors)
    }
  },[history, token])
    const {username} = useAuth()
    return (
      <>
        <Header username={username}/>
          <Container>
            <Content>
             <Form ref={formRef} onSubmit={handleSubmit}>
                <h1> Editar Ordem de Serviço </h1>
                <Input name="numberOS" icon={AiOutlineFieldNumber} placeholder='Número OS'/>
                <Input name="name" icon={FiUser} placeholder='Nome'/>
                <Input name="telefone" icon={BsTelephoneOutbound} placeholder='Telefone'/>
                <Input name="cpf" icon={MdOutlineDocumentScanner} placeholder='CPF'/>
                <Input name="model" icon={BsPhone} placeholder='Modelo'/>
                <Input name="password" icon={BsFillLockFill} placeholder='Senha do cliente'/>
                <Input name="repair" icon={FiTool} placeholder='Defeito'/>
                <Input name="value" icon={FiDollarSign} placeholder='Valor'/>
                <Input name="status" icon={BsHourglassBottom} placeholder='Status do reparo'/>
                <Input name="exitDate" icon={BiCalendarCheck} placeholder='Data de saída'/>
                <Input name="guarantee" icon={FiFileText} placeholder='Garantia'/>

                <Button type='submit'>Editar</Button>
              </Form>
            </Content>
            
            
        </Container>
          
        
      </>
    )
}

export default EditOrder