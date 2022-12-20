import { createContext, useState } from 'react'

export const themes = {
        light: {
            background: '#DCDCDC', //#DCDCDC //#E0FFFF
            backgroundCard: '#6495ED',
            color: '#000000'
        },
        dark: {
            background: '#4F4F4F', //#DCDCDC //#808080  //#696969
            backgroundCard: '#ADD8E6',
            color: '#FFF'
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