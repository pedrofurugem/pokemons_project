import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pokemonHome'
import { Pokemon } from './pokemonDetails'

const AppRoutes = () => {
    return (
        <BrowserRouter>
         <Routes>
            <Route exact path="/" element={<Home />} /> 
            <Route exact path="/pokemonDetails/:name" element={<Pokemon />} />
         </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;