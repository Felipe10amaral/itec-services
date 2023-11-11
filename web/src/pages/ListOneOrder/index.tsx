import { useRef, useState } from 'react';
import { Form } from '@unform/web';
import { Container, HeaderProps, HeaderContent, Profile, Content, UL, LI } from './styles';
import { MdOutlineDocumentScanner } from 'react-icons/md';
import { FormHandles } from '@unform/core';
import Logo from '../../assets/logo.svg'
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import api from '../../services/api';
import * as Yup from 'yup'
import { getValidationError } from '../../utils/GetValidationErrors';

interface OsProps {
  numberOs: number
  cpf: number 
}

interface Props {
  cpf: string;
  createdAt: string;
  guarantee: string;
  model: string;
  name: string;
  password:string;
  numberOS: string;
  repair: string;
  status: string;
  telefone: string;
  exitDate: string;
  value: number;
  __v?: number;
  _id?: string;

}

export function ListOneOrder() {
  const formRef = useRef<FormHandles>(null)
  const [os, setOs] = useState<Props>()

async function handle() {
  console.log(os)
}  


async function handleSubmit(data: OsProps) {
  try {
    formRef.current?.setErrors({})
    const schema = Yup.object().shape({
      numberOs: Yup.string().required('É necessário informar o número da ordem de serviço'),
      cpf: Yup.string().required('CPF é obrigatório'),
    })
      
    await schema.validate(data, {
      abortEarly: false
    })
      
    const response = await api.get(`order/${data.numberOs}`);
    const datas = response.data

    if(datas.cpf !== data.cpf) {
      window.alert("CPF não encontrado na base de dados")
      
    }
    else {
      setOs(datas)
    }  

  } catch (err: any) {
    const errors = getValidationError(err)

    formRef.current?.setErrors(errors)
  }
}

  return (
    <Container>
      <HeaderProps>
          <HeaderContent>
            <img src={Logo} alt="logo itec" />
              
            <Profile>
              <div>
               <span>Bem-vindo</span>
               
              </div>
            </Profile>
            
          </HeaderContent>
        </HeaderProps>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h3>Faça a consulta da sua OS digital</h3>
            <Input name="numberOs" icon={AiOutlineFieldNumber} placeholder='Número OS'/>
            <Input name="cpf" icon={MdOutlineDocumentScanner} placeholder='CPF'/>
            <Button type='submit' onSubmit={handle} >Acessar</Button>
          </Form>

          

          {
          <UL className='UL'>
            <LI >Número da OS: <span> {os?.numberOS} </span></LI>
            <LI >Nome: <span> {os?.name} </span></LI>
            <LI >Telefone: <span> {os?.telefone} </span> </LI>
            <LI >Modelo: <span> {os?.model} </span> </LI>
            <LI >Defeito: <span> {os?.repair} </span> </LI>
            <LI >Status do reparo: <span> {os?.status} </span> </LI>  
            <LI >Valor: <span> {os?.value} </span></LI>
            <LI >Data de saída: <span>{os?.exitDate}</span></LI>
            <LI >Garantia: <span>{os?.guarantee}</span></LI>
          </UL>
        }
        </Content>

       

        
        
        
    </Container>  
  )
}