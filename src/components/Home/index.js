import { useState, useEffect } from 'react'
import { getPokemonList, getPokemon } from '../../services/apis'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../context/themes-context'
import React, { useContext } from 'react'
import styled from 'styled-components'
import PokemonTitle from '../../images/pokemon_title.png'
import Pokeball from '../../images/pokeball.png'
import PokeballIcon from '../../images/pokeball-icon.png'
import PokeballGif from '../../images/pokeball.gif'

//Essa listagem deve mostrar a imagem e nome de cada pokemon
const PokemonList = () => {

    const [pokedex, setPokedex] = useState([])
    const [load, setLoad] = useState(0)
    const pokeLoads = 10;
    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        async function FetchData(){
            const pokeData = await getPokemonList(pokeLoads, load)//limit e contagem
            const pokeName = pokeData.map( name => { return  getPokemon(name)})
            

            const pokemonPromise = await Promise.all(pokeName)

            setPokedex([...pokedex, ...pokemonPromise]) //usando o operador spread
        }
        FetchData()

    }, [load])

    function handleClickMore(){
        setLoad(load + pokeLoads)
    }

    return (
        <section style={{backgroundColor: theme.background}}>
            <Header>
            <PokemonLogoTitle src={PokemonTitle} alt="title"/>
            <PokeballImg src={Pokeball} alt="Pokemon" />
            </Header>

            <PokemonCards>
                {pokedex.map((pokemon, index) => {
                    return (
                            <Link to={`/PokemonDetails/${pokemon.name}`} key={index}>
                            <PokemonCard>
                                <ImgPokemon src={pokemon.sprites.other['official-artwork'].front_default} alt="pokemon-artwork"/>
                                <Name><Icon src={PokeballIcon} alt="pokeball-icon" /> {pokemon.name}</Name>
                            </PokemonCard>
                            </Link>
                        )
                    })
                }
            </PokemonCards>
            <Footer>
                <Button onClick={handleClickMore}>
                    <PokeballButton src={PokeballGif} alt="pokeball-gif" />
                    <ShowMore>Show More</ShowMore>
                </Button>
            </Footer>
        </section>
    )
}

const Header = styled.header`
   display: flex;
   align-items: center;
   justify-content: center;
`

const PokemonLogoTitle = styled.img`
   width: 500px;
`

const PokeballImg = styled.img`
   width: 100px;
   margin-top: 30px;
`

const PokemonCards = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 70vw;
    margin: auto;
`

const PokemonCard = styled.div`
   background-color: #A9A9A9;
   border: 1px solid black;
   display: flex;
   align-items: center;
   justify-content: space-around;
   flex-direction: column;
   border-radius: 25px;
   width: 250px;
   height: 350px;
   margin: 10px;
`

const ImgPokemon = styled.img`
   background-color: #FFF;
   width: 200px;
   padding: 10px;
   border: 6px solid #FFCC03;
   border-radius: 50%;
`
const Name = styled.p`
   display: flex;
   align-items: center;
   font-family: 'Pokemon';
   letter-spacing: 3px;
   font-size: 22px;
   color: #FFCC03;
`

const Icon = styled.img`
   width: 40px;
`

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Button = styled.button`
   display: flex;
   align-items: center;
   background: none;
   border: none
`

const PokeballButton = styled.img`
   width: 80px;
`

const ShowMore = styled.p`
   font-family: 'Pokemon';
   font-size: 18px;
   color: #FFCC03;
   letter-spacing: 3px;
`

export { PokemonList }