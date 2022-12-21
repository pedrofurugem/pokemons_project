import styled from 'styled-components'
import Title from '../../images/pokemon_title.png'
import Pokeball from '../../images/pokeball.png'
import { ThemeTogglerButton } from '../Theme-toggler-button/index'
import { ThemeContext } from '../../context/themes-context'
import React, { useContext } from 'react'

export const Navbar = () => {
   const { theme } = useContext(ThemeContext)
    return(
      <>
      <ThemeTogglerButton/>
        <Header style={{backgroundColor: theme.background}}>
               <PokemonLogoTitle src={Title} alt="title"/>
               <PokeballImg src={Pokeball} alt="Pokemon" />
        </Header>
      </>
   )
}

const Header = styled.header`
   display: flex;
   align-items: center;
   justify-content: center;
`

const PokemonLogoTitle = styled.img`
   width: 400px;
   margin: 25px 0px;
   @media (max-width: 768px) {
      width: 200px;
   }
`

const PokeballImg = styled.img`
   width: 80px;
   margin-top: 40px;
   @media (max-width: 768px) {
      width: 40px;
   }
`