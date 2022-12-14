import React, { useContext } from 'react'
import { ThemeContext, themes } from '../../context/themes-context'
import { Button } from '../Button/index'

export const ThemeTogglerButton = () => {

    const { theme, setTheme } = useContext(ThemeContext)
    
    console.log('ThemeTogglerButton: ', theme)

    return(
        <div style={{backgroundColor: theme.background}}>
            <Button onClick={() => setTheme(theme === themes.light ? themes.dark : themes.light)}/>
        </div>
    )

}