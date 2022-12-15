import { useState, useEffect} from 'react'
import { getPokemon, getAbilities } from '../../services/apis'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import  React, { useContext } from 'react'
import { ThemeContext } from '../../context/themes-context'
import styled from 'styled-components'
import PokemonTitle from '../../images/pokemon_title.png'
import Pokeball from '../../images/pokeball.png'
import PokeballGif from '../../images/pokeball.gif'

async function Pokemon(){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/11`)
    const json = await response.json();
    console.log(json)
}
Pokemon()
/*
Lista de movimentos do pokemon (moves)
Lista de habilidades do pokemon (abilities)
a lista de habilidades deve apresentar o nome e o texto
descritivo da habilidade
Tipo do pokemon (type)

*/

const PokemonDetails = () => {
    const [pokemon, setPokemon] = useState([])
    const [moves, setMoves] = useState([])
    const [ability, setAbility] = useState([])
    const [type, setType] = useState([])
    const {name} = useParams()
    const { theme } = useContext(ThemeContext)

    useEffect(() => {

        async function FetchData() {
            //nome e imagem do pokemon
            const pokeData = await getPokemon(name)
            setPokemon([pokeData])

           //movimentos
           const pokeMoves = await pokeData.moves.map(pokemon =>  pokemon.move ) 
           setMoves(pokeMoves.slice(0, 20))

           //abilidades, tenho que acessar a api da habilidade
           //const pokeName = pokeData.map( name => { return  getPokemon(name)})
           const PokemonAbilites = await pokeData.abilities.map(pokemon => { 
            let abilities = pokemon.ability.name
            return  getAbilities(abilities)
           })
           
           const PokemonAbilitiesPromise = await Promise.all(PokemonAbilites)
           console.log('PokemonAbilites', PokemonAbilitiesPromise)
           setAbility(PokemonAbilitiesPromise)

           //tipos
           const pokeTypes = await pokeData.types.map(pokemon => pokemon.type)
           setType(pokeTypes)

        }
        FetchData()
    }, [name])


    return(
        <section style={{ backgroundColor: theme.background }}>
        <Header>
            <PokemonLogoTitle src={PokemonTitle} alt="pokemon-title"/>
            <PokeballImg src={Pokeball} alt="Pokemon" />
        </Header>

        <PokemonSection>
            <PokemonSectionGrid>
                <PokemonPerfil>
                {
                    pokemon.map((poke, index) => {
                        return(
                            <PokemonImages key={index}>
                                <Perfil>
                                <PerfilImage src={poke.sprites.other['official-artwork'].front_default} 
                                alt="pokemon-artwok"/>
                                <Name>{poke.name}</Name>
                                </Perfil>
                                <ImagesDetails>
                                    <PokemonColor>Default</PokemonColor>
                                    <ImagesDetail src={poke.sprites.front_default} 
                                    alt="pokemon sprite"/>
                                    <ImagesDetail src={poke.sprites.back_default} 
                                    alt="pokemon sprite"/>
                                </ImagesDetails>
                                <ImagesDetails>
                                    <PokemonColor>Shiny</PokemonColor>
                                    <ImagesDetail src={poke.sprites.front_shiny} 
                                    alt="pokemon sprite"/>
                                    <ImagesDetail src={poke.sprites.back_shiny} 
                                    alt="pokemon sprite"/>
                                </ImagesDetails>   
                            </PokemonImages>
                        )
                    })
                }
                </PokemonPerfil>

                <Moves>
                    <h1>Moves</h1>
                    <ul>
                    {
                        moves.map((pokemon, index) => {
                            return(
                                <li key={index}>
                                    {pokemon.name}
                                </li>
                            )
                        })
                    }
                    </ul>
                </Moves>

                <Habilities>
                    <h1>Habilities</h1>
                    <ul>
                        {
                            ability.map((pokemon, index) => {
                                return(
                                    <li key={index}>
                                        <HabilitiesName>{pokemon.name}</HabilitiesName>
                                        <p>{pokemon.effect_entries[0].effect}</p>
                                        
                                    </li>
                                )
                            })
                        }
                    </ul>
                </Habilities>
                <Types>
                    <h1>Types</h1>
                    <ul>
                        {
                            type.map((pokemon, index) => {
                                return (
                                    <li key={index}>
                                        {pokemon.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </Types>
            </PokemonSectionGrid>
        </PokemonSection>

        <Footer>
          <Link to='/'>
             <PokeballButton src={PokeballGif} alt="pokeball button"/>
          </Link>
          <Back style={{color: theme.color}}>Back To Home</Back>
        </Footer>
        </section>
        
    )
}

export { PokemonDetails }

const Header = styled.header`
   display: flex;
   align-items: center;
   justify-content: center;
`
const PokemonLogoTitle = styled.img`
   width: 400px;
   margin: 25px 0px;
`
const PokeballImg = styled.img`
   width: 80px;
   margin-top: 40px;
`

const PokemonSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
`

const PokemonImages = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Perfil = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 15px;
`

const PerfilImage = styled.img`
    width: 200px;
    border: 6px solid #FFCC03;
    border-radius: 50%;
    padding: 20px;
    background-color: #FFF;
`

const PokemonColor = styled.p`
   font-weight: bold;
`

const Name = styled.p`
   font-family: 'Pokemon';
   font-size: 20px;
   letter-spacing: 3px;
   color: #FFCC03;
`

const ImagesDetails = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const ImagesDetail = styled.img`
   width: 150px;
`

const HabilitiesName = styled.p`
   font-weight: bold;
`

const PokemonSectionGrid = styled.section`
    display: grid;
    grid: "PokemonPerfil Moves Habilities"   
         "PokemonPerfil Moves Habilities"  
         "PokemonPerfil Types Types"  auto / 400px 140px 500px;
    border: 1px solid black;
    border-radius: 25px;
    background-color: #6495ED;
`

const PokemonPerfil = styled.div`
    grid-area: PokemonPerfil;
`

const Moves = styled.div`
    grid-area: Moves;
`

const Habilities = styled.div`
    grid-area: Habilities;
`

const Types = styled.div`
    grid-area: Types;
`

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
`


const PokeballButton = styled.img`
   width: 80px;
`

const Back = styled.p`
   font-family: 'Pokemon';
   font-size: 18px;
   letter-spacing: 3px;
`