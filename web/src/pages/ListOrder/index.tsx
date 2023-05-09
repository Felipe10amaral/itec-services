import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { useAuth } from '../../context/AuthContext';
import { Container } from './styles';
import api from '../../services/api';

type Props = {
    id: string;
    name: string;
}

export function ListOrder () {
    const {username} = useAuth()
    const [test, setTest] = useState<Props>()

    useEffect(() => {
        api.get('order').then(response => {
            setTest(response.data)
        })
         
        
    },[])

    console.log(test)

    return (
     <>   
      <Header username={username} />
      <Container>
        <ul>
            <li>1</li>
        </ul>

   
      </Container>
     </>
    )
}