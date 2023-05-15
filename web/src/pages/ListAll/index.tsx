import { useRef, useState } from 'react';
import { Form } from '@unform/web';
import { Container, HeaderProps, HeaderContent, Profile, Content, UL, LI } from './styles';
import { MdOutlineDocumentScanner } from 'react-icons/md';
import { FormHandles } from '@unform/core';
import Logo from '../../assets/logo.svg'
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';
import * as Yup from 'yup'
import { getValidationError } from '../../utils/GetValidationErrors';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../../components/Header';

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
  telefone: string;
  exitDate: string;
  value: number;
  __v?: number;
  _id?: string;

}

export function ListAll() {
  const formRef = useRef<FormHandles>(null)
  const [os, setOs] = useState<Props[]>([])
  const {token, username} = useAuth()

async function handleSubmit(data: OsProps) {
  try {
    formRef.current?.setErrors({})
    const schema = Yup.object().shape({
      cpf: Yup.string().required('CPF é obrigatório'),
    })
      
    await schema.validate(data, {
      abortEarly: false
    })
      
    const response = await api.get(`order/cpf/${data.cpf}`);
    const datas = response.data
    console.log(datas)
    // if(datas.cpf !== data.cpf) {
    //   window.alert("CPF não encontrado na base de dados")
      
    // }
    // else {
    //   setOs(datas)
    // }  

    setOs(datas)

  } catch (err: any) {
    const errors = getValidationError(err)

    formRef.current?.setErrors(errors)
  }
}

  return (
    <Container>
      <Header username={username} />
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h3>Faça a consulta da sua OS digital com o cpf do cliente</h3>
           
            <Input name="cpf" icon={MdOutlineDocumentScanner} placeholder='CPF'/>
            <Button type='submit' >Acessar</Button>
          </Form>

          {
         
          <UL className='UL'>
            {os.map((item) => (
                <LI key={item._id}> Nome: {item.name} <span> OS: { item.numberOS} </span>  </LI>
            ))}
          </UL>
        }
        </Content> 
        
    </Container>  
  )
}