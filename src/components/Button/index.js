import React, { useContext } from 'react'
import { ThemeContext } from '../../context/themes-context'
import styled from 'styled-components'
import PokeballTheme from '../../images/pokeball.gif'

export const Button = (props) => {

    const { theme } = useContext(ThemeContext)
    console.log('Button: ', theme)

    return(
        <Btn {...props}
        style={{backgroundColor: theme.background}}>
            <PokeballGif src={PokeballTheme} alt="pokemon-theme" />
        </Btn>
    )
}

const PokeballGif = styled.img`
   width: 50px;
`
const Btn = styled.button`
   border: none;
`