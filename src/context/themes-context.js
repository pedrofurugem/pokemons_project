import { createContext, useState } from 'react'

export const themes = {
        light: {
            background: '#DCDCDC', 
            backgroundCard: '#6495ED',
            color: '#000000',
            colorDescription: '#FFF'
        },
        dark: {
            background: '#4F4F4F', 
            backgroundCard: '#ADD8E6',
            color: '#FFF',
            colorDescription: '#000000'
        }
    }

export const ThemeContext = createContext({})

export const ThemeProvider = (props) => {

    const [ theme, setTheme ] = useState(themes.light)

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}