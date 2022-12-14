import { createContext, useState } from 'react'

export const themes = {
        light: {
            background: '#ADD8E6', //#DCDCDC //#E0FFFF
        },
        dark: {
            background: '#483D8B' //#DCDCDC //#808080  //#696969
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