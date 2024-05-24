
import { Button } from 'primereact/button';
import { MoonStar, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";



export function ThemeToggle() {

const[theme, setTheme] = useState('light')

  useEffect (() => {
    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
      setTheme('dark');
    }else{
      setTheme('light');
    }
},[]);


  useEffect (() => {
    if(theme === "dark"){
      document.documentElement.classList.add("dark");
    }else{
      document.documentElement.classList.remove("dark");
    }
},[theme]);

const handelThemeSwitcher = () => {
      setTheme( theme === "dark" ? "light" : "dark");
    };



  return (
    <Button onClick={handelThemeSwitcher }
    >
      {theme=='dark' ?  <SunIcon className="h-[1rem] w-[1rem] text-foreground sun" /> : <MoonStar className="h-[1rem] w-[1rem] text-foreground moon" />}
    </Button>

  
  );
}
