import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Button } from 'bootstrap';

const themes = ["light","dark","blue","purple","neon"]

const ThemeSwitcher = () => {
    const {setTheme} = useContext(ThemeContext)
  return (
    <ButtonGroup>
        {
            themes.map((t)=>(
                <Button key={t} variant={outline-primary} onclick={()=>setTheme(t)}>
                    {t}
                </Button>
            ))
        }
    </ButtonGroup>
  )
}

export default ThemeSwitcher