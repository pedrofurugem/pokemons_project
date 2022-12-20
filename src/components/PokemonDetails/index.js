import { useState, useEffect} from 'react'
import { getPokemon, getAbilities } from '../../services/apis'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import  React, { useContext } from 'react'
import { ThemeContext } from '../../context/themes-context'
import styled from 'styled-components'
import PokeballGif from '../../images/pokeball.gif'


const PokemonDetails = () => {
    const [pokemon, setPokemon] = useState([])
    const [moves, setMoves] = useState([])
    const [ability, setAbility] = useState([])
    const [type, setType] = useState([])
    const {name} = useParams()
    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        async function FetchData() {
            const pokeData = await getPokemon(name)
            setPokemon([pokeData])

           const pokeMoves = await pokeData.moves.map(pokemon =>  pokemon.move ) 
           setMoves(pokeMoves.slice(0, 20))
           
           const PokemonAbilites = await pokeData.abilities.map(pokemon => { 
             let abilities = pokemon.ability.name
             return  getAbilities(abilities)
            })
           
           const PokemonAbilitiesPromise = await Promise.all(PokemonAbilites)  
           setAbility(PokemonAbilitiesPromise)
           
           const pokeTypes = await pokeData.types.map(pokemon => pokemon.type)
           setType(pokeTypes)

        }
        FetchData()
    }, [name])


    return(
        <section style={{ backgroundColor: theme.background }}>
            
            <PokemonSection>
                <PokemonSectionGrid style={{backgroundColor: theme.backgroundCard}}>
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
                        <TitleDetails>Moves</TitleDetails>
                        <ul>
                        {
                            moves.map((pokemon, index) => {
                                return(
                                    <Li key={index} style={{color: theme.colorDescription}}>
                                        {pokemon.name}
                                    </Li>
                                )
                            })
                        }
                        </ul>
                    </Moves>
                    <Habilities>
                        <TitleDetails>Habilities</TitleDetails>
                        <ul>
                            {
                                ability.map((pokemon, index) => {
                                    return(
                                        <Li key={index} style={{color: theme.colorDescription}}>
                                            <HabilitiesName>{pokemon.name}:</HabilitiesName>
                                            <p>{pokemon.effect_entries[0].effect}</p>                 
                                        </Li>
                                    )
                                })
                            }
                        </ul>
                    </Habilities>
                    <Types>
                        <TitleDetails>Types</TitleDetails>
                        <ul>
                            {
                                type.map((pokemon, index) => {
                                    return (
                                        <Li key={index} style={{color: theme.colorDescription}}>
                                            {pokemon.name}
                                        </Li>
                                    )
                                })
                            }
                        </ul>
                    </Types>

                    <Shiny >
                        <TitleDetails>fun fact:</TitleDetails>
                        <ShinyDescription style={{color: theme.colorDescription}}>Shiny Pokémon are rare variants of Pokémon that have 
                        different colors than other Pokémon of the same species. 
                        If you're lucky, you may encounter Shiny Pokémon randomly in the wild, 
                        especially during special events like Community Day or Pokémon GO Fest.
                        </ShinyDescription>
                    </Shiny >
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

const PokemonSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
`

const PokemonSectionGrid = styled.section`
    display: grid;
    grid: "PokemonPerfil Habilities Moves"
          "PokemonPerfil Shiny Moves"  
          "PokemonPerfil Types Moves"  
            auto / 400px 480px 140px;
    border: none;
    border-radius: 25px;
    @media (max-width: 912px) {
        display: grid;
        grid: "PokemonPerfil"
                "Shiny"
                "Types"
                "Habilities"
                "Moves" auto 
   }
`

const PokemonPerfil = styled.div`
    grid-area: PokemonPerfil;
    
`

const Moves = styled.div`
    grid-area: Moves;
    padding: 10px;
    @media (max-width: 912px) {
        text-align: center;
        column-count: 2;
    }
`

const Habilities = styled.div`
    grid-area: Habilities;
    padding: 10px;
`

const Types = styled.div`
    grid-area: Types;
    padding: 10px;
    @media (max-width: 912px) {
        text-align: center;
    }
`

const Shiny = styled.div`
   grid-area: Shiny;
   padding: 10px;
   @media (max-width: 820px) {}
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
    border: 6px solid var(--border);
    border-radius: 50%;
    padding: 20px;
    background-color: var(--white);
    @media (max-width: 768px) {
      width: 100px;
    }
`

const PokemonColor = styled.p`
   font-weight: bold;
   color: var(--grey11);
`

const Name = styled.p`
   font-family: 'Pokemon';
   font-size: 20px;
   letter-spacing: 3px;
   color: var(--grey11);
`

const ImagesDetails = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const ImagesDetail = styled.img`
   width: 150px;
   @media (max-width: 768px) {
      width: 100px;
    }
`

const TitleDetails = styled.h1`
   font-family: 'Pokemon';
   letter-spacing: 3px;
   font-size: 18px;
   @media (max-width: 820px) {
    font-size: 18px;
    }
`

const HabilitiesName = styled.h3`
   font-weight: bold;
   color: var(--grey11);
`

const Li = styled.li`
  font-size: 18px;
  font-weight: bold;
  margin-top: 3px;
  color: #F5FFFA;
  @media (max-width: 820px) {
    font-size: 14px;
    }
`

const ShinyDescription = styled.p`
   color: var(--white);
   font-size: 18px;
   font-weight: bold;
   margin-top: 5px;
   color: #F5FFFA;
   @media (max-width: 820px) {
    font-size: 14px;
    }
`

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
`


const PokeballButton = styled.img`
   width: 80px;
   @media (max-width: 820px) {
      width: 40px;
    }
`

const Back = styled.p`
   font-family: 'Pokemon';
   font-size: 18px;
   letter-spacing: 3px;
   @media (max-width: 820px) {
      font-size: 12px;
    }
`

//possível tratamento de erros