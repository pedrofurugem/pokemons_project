import { useState, useEffect } from 'react'
import { getPokemonList, getPokemon } from '../../services/apis'

const SearchPokemon = () => {
    const [pokemon, setPokemon] = useState([])
    //define a consulta de pesquisa como uma string vazia
    const [search, setSearch] = useState("")
    //define os parâmetros de pesquisa
    const [searchType] = useState(["types"])

    useEffect(() => {
        async function FetchTypes(){
            const pokeData = await getPokemonList()
            const pokeName = pokeData.map( name => { return getPokemon(name)})

            const pokemonPromise = await Promise.all(pokeName)
            console.log('pokemonPromise: ', pokemonPromise)

            setPokemon([...pokemon, ...pokemonPromise]) 

            const results = pokemon.filter((item) => {
                return searchType.some((types) => {
                    return item[types]?.toString()?.toLowerCase()?.indexOf(search.toLowerCase()) > -1
                })
            })
            console.log('results', results)
        }
        FetchTypes()
    }, [])

    function onChange(ev){
        setSearch(ev.target.value)
    }

    return(
        <>
          <label htmlFor="searchType">
            <input 
               type="search"
               name="searchType"
               id="searchType"
               className="search-type"
               placeholder="Search pokemo's type"
               value={search}
               onChange={onChange}
            />
          </label>
        </>
    )
}

export { SearchPokemon }