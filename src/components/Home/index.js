import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { CardList } from '../CardList/index'
import { ThemeContext } from '../../context/themes-context'
import { getPokemonList, getPokemon } from '../../services/apis'
import styled from 'styled-components'

const PokemonList = () => {
    const [pokedex, setPokedex] = useState([])
    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        async function FetchData(){
            const pokeData = await getPokemonList()
            const pokeName = pokeData.map( name => { return getPokemon(name)})

            const pokemonPromise = await Promise.all(pokeName)
           
            setPokedex([...pokedex, ...pokemonPromise]) 

        }   
        FetchData()
    }, [pokedex])
        
        return (
            <section style={{backgroundColor: theme.background}}>
                <div>
                    {pokedex.length !== undefined ? (
                        <CardList pokedex={pokedex} />
                    ) : (
                        <Error>No pokemon found</Error>
                    )}
                </div>
            </section>
    )
}

const Error = styled.p`
   font-family: 'Pokemon';
   color: red;
   letter-spacing: 3px;
   text-align: center;
`

export { PokemonList }