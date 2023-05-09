import { Form } from '@unform/web';
import { Container, HeaderProps, HeaderContent, Profile, Content } from './styles';
import { MdOutlineDocumentScanner } from 'react-icons/md';
import { FormHandles } from '@unform/core';
import Logo from '../../assets/logo.svg'
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { useRef } from 'react';
import api from '../../services/api';
import * as Yup from 'yup'

interface OsProps {
  numberOs: number
  cpf: number 
}

interface ResponseOsProps {
  numberOs: string;
  name: string;
  model: string;
  value: number;
  guarantee: string;
}

export function ListOneOrder() {
  const formRef = useRef<FormHandles>(null)

//   const handleSubmit = useCallback(async (data: OsProps) => {
//     try {
        
//         const schema = Yup.object().shape({
//             numberOs: Yup.number().required('Nome obrigatório'),
//             cpf: Yup.number().required('E-mail obrigatório'),
//         })

//         await schema.validate(data, {
//             abortEarly: false
//         })

//         console.log(data.numberOs)

//         const response = await api.get(`order/${data.numberOs}`);
//         //console.log(response.data)
//         const datas = response.data
//         setOs(datas)
//         console.log(os)
//         //history.push('/dashboard')
        
//     } catch (error) {
        
       
//     }
// }, [os])

async function handleSubmit(data: OsProps) {
  const schema = Yup.object().shape({
                numberOs: Yup.number().required('Nome obrigatório'),
                cpf: Yup.number().required('E-mail obrigatório'),
            })
    
            await schema.validate(data, {
                abortEarly: false
            })
    
            const response = await api.get(`order/${data.numberOs}`);
            const datas = response.data
           
            alter(datas)
}

  function alter(data: OsProps) {
    console.log(data)
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
            <Button type='submit' >Acessar</Button>
          </Form>
        </Content>
        
        
    </Container>  
  )
}