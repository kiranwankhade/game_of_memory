import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) =>{
    const [theme ,setTheme] = useState("light");

    useEffect(()=>{
        document.documentElement.setAttribute("data-theme",theme);
    },[theme])

    return (
        <ThemeContext.Provider value={{theme,setTheme}} >
            {children}
        </ThemeContext.Provider>
    )
}

