import React, {InputHTMLAttributes, useCallback, useEffect, useRef, useState} from 'react';

import {Container} from './styles'
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    icon?: React.ComponentType<IconBaseProps>
}

const Input: React.FC<InputProps> = ({icon: Icon, name ,...rest}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const { defaultValue, fieldName, registerField} = useField(name)
    const [isFocus, setIsFocus] = useState(false)
    const [isField, setIsField] = useState(false)

    const handleInputBlur = useCallback(() => {
        setIsFocus(false)

        setIsField(!!inputRef.current?.value)
    }, [])

    const handleInputFocus = useCallback(() => {
        setIsFocus(true)

        
    }, [])

    useEffect(()=> {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        })
    },[fieldName, registerField])
    return(
      <Container isField={isField} isFocus={isFocus}>
        {Icon && <Icon size={20} />}
        <input 
            defaultValue={defaultValue} 
            ref={inputRef} {...rest} 
            onFocus={handleInputFocus} 
            onBlur={handleInputBlur} 
        />

      </Container>

    )
}

export default Input