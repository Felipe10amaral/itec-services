import React from 'react'
import { useAuth } from '../context/AuthContext'
import { RouteProps, Route as Routes, Redirect } from 'react-router-dom'

interface RouterProps extends RouteProps  {
    isPrivate?: boolean;
    component: React.ComponentType
}


const Route: React.FC<RouterProps> = ({isPrivate=false, component: Component , ...rest}) => {
    const {username} = useAuth()
    return (
      <Routes 
        {...rest} 
        render={({ location }) => {
            return isPrivate === !!username ? (
                <Component />
                ) : (
                    <Redirect to={{ pathname: isPrivate ? '/' : '/dashboard', state: {from: location}}}  />
                )
        }} 
      />
    )
}

export default Route