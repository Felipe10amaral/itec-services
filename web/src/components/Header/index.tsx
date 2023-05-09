import React from 'react'
import { FiPower } from 'react-icons/fi'

import {Container, HeaderContent, HeaderProps, Profile, } from './styles'
import { useAuth } from '../../context/AuthContext'
import Logo from '../../assets/logo.svg'

interface HeaderPropsData {
    username: string
  }

export function Header({username}: HeaderPropsData) {
    const {signOut} = useAuth()
    return (
      <Container>
        <HeaderProps>
          <HeaderContent>
            <img src={Logo} alt="logo itec" />
              
            <Profile>
              <div>
               <span>Bem-vindo</span>
               <strong>{username}</strong>
              </div>
            </Profile>
            <button type="button" onClick={signOut}>
              <FiPower size={20} />
            </button>
          </HeaderContent>
        </HeaderProps>
      </Container>  
    )
}
