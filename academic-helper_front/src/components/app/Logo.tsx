import {Link} from "react-router-dom";
import logo from "@/assets/logo.png";
import lightLogo from "@/assets/logo-black.png";
import * as React from "react";
import {useEffect, useState} from "react";
import {CONSTANTS} from "@/constant/Global.tsx";

export const Logo = () => {
    const initialTheme = localStorage.getItem(CONSTANTS.THEME_KEY);
    const initialLogo = initialTheme === "dark" ? logo : lightLogo;
    const [currentLogo, setCurrentLogo] = useState(initialLogo);

    useEffect(() => {
        console.log("useEffect");
        function updateTheme() {
            const theme = localStorage.getItem(CONSTANTS.THEME_KEY);
            setCurrentLogo(theme === "dark" ? logo : lightLogo);
        }

        window.addEventListener('storage', updateTheme);

        return () => {
            window.removeEventListener('storage', updateTheme);
        }
    }, []);

    return (
        <Link to="/">
            <img
                src={currentLogo}
                alt="Application logo"
                className="w-[200px] h-auto"
            />
        </Link>
    )
}