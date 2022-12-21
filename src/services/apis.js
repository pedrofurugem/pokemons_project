async function getPokemonList(limit, offSet){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offSet}`)
    const json = await response.json()
    const names = await json.results.map(pokemon => { return pokemon.name}) 
    return names
}

async function getPokemon(name){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    return await response.json();
}

async function getAbilities(abilities){
    const response = await fetch(`https://pokeapi.co/api/v2/ability/${abilities}`)
    return await response.json();
}

export { getPokemonList, getPokemon, getAbilities }