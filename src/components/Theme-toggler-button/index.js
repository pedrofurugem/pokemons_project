import React, { useContext } from 'react'
import { ThemeContext, themes } from '../../context/themes-context'
//import { Button } from '../Button/index'
import styled from 'styled-components'
import PokeballTheme from '../../images/pokeball.gif'

export const ThemeTogglerButton = () => {

    const { theme, setTheme } = useContext(ThemeContext)

    function handleChangeTheme(){
        setTheme(theme === themes.light ? themes.dark : themes.light)
    } 

    return(
        <div style={{backgroundColor: theme.background}}>
            <Button onClick={handleChangeTheme}>
              <PokeballGif src={PokeballTheme} alt="pokemon-theme" />
              <P style={{color: theme.color}}>Change Theme</P>
            </Button>
        </div>
    )
}

const PokeballGif = styled.img`
   width: 50px;
`
const Button = styled.button`
   border: none;
   background: none;
   display: flex;
   align-items: center;
`
const P = styled.p`
   font-family: 'Pokemon';
   font-size: 16px;
   letter-spacing: 3px;
`