import { useState, useEffect } from 'react'
import { getPokemonList, getPokemon } from '../../services/apis'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../context/themes-context'
import React, { useContext } from 'react'
import styled from 'styled-components'
import PokeballIcon from '../../images/pokeball-icon.png'
import PokeballGif from '../../images/pokeball.gif'


const PokemonList = () => {
    const [pokedex, setPokedex] = useState([])
    const [load, setLoad] = useState(0)
    const pokeLoads = 10;
    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        async function FetchData(){
            const pokeData = await getPokemonList(pokeLoads, load)
            const pokeName = pokeData.map( name => { return getPokemon(name)})

            const pokemonPromise = await Promise.all(pokeName)
            setPokedex([...pokedex, ...pokemonPromise]) 

        }   
        FetchData()
    }, [load])

    function handleClickMore(){
        setLoad(load + pokeLoads)
    }

    if(pokedex.length > 0){
        return (
            <section style={{backgroundColor: theme.background}}>    
                <PokemonCards>
                    {pokedex.map((pokemon, index) => {
                        return (
                                <Link to={`/PokemonDetails/${pokemon.name}`} key={index}>
                                    <PokemonCard style={{backgroundColor: theme.backgroundCard}}>
                                        <ImgPokemon src={pokemon.sprites.other['official-artwork'].front_default} alt="pokemon-artwork"/>
                                        <Name style={{color: theme.colorDescription}}
                                        ><Icon src={PokeballIcon} alt="pokeball-icon" /> {pokemon.name}</Name>
                                    </PokemonCard>
                                </Link>
                            )
                        })
                    }
                </PokemonCards>
                <Footer>
                    <Button onClick={handleClickMore}>
                        <PokeballButton src={PokeballGif} alt="pokeball-gif" />
                        <ShowMore style={{color: theme.color}}>Show More</ShowMore>
                    </Button>
                </Footer>
            </section>
        )
    }else{
        return <Error>No pokemon found</Error>
    }
}

const PokemonCards = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 70vw;
    margin: auto;
    @media (max-width: 768px) {
      width: 50vw;
   }
`

const PokemonCard = styled.div`
   border: 1px solid black;
   display: flex;
   align-items: center;
   justify-content: space-around;
   flex-direction: column;
   border-radius: 25px;
   width: 250px;
   height: 350px;
   margin: 15px;
   @media (max-width: 768px) {
      width: 150px;
      height: 220px;
   }
`

const ImgPokemon = styled.img`
   background-color: var(--white);
   width: 200px;
   padding: 10px;
   border: 6px solid var(--border);
   border-radius: 50%;
   @media (max-width: 768px) {
      width: 100px;
    }
`
const Name = styled.p`
   display: flex;
   align-items: center;
   font-family: 'Pokemon';
   letter-spacing: 3px;
   font-size: 22px;
   color: var(--white);
   @media (max-width: 768px) {
    font-size: 15px;
    }
`

const Icon = styled.img`
   width: 40px;
   @media (max-width: 768px) {
    width: 20px;
    }
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
   @media (max-width: 768px) {
      width: 40px;
    }
`

const ShowMore = styled.p`
   font-family: 'Pokemon';
   font-size: 18px;
   letter-spacing: 3px;
   @media (max-width: 768px) {
      font-size: 16px;
    }
`

const Error = styled.p`
   font-family: 'Pokemon';
   color: red;
   letter-spacing: 3px;
   text-align: center;
`

export { PokemonList }