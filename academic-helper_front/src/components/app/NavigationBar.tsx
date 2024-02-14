import { NavigationMenu } from "@/components/ui/navigation-menu.tsx";
import * as React from "react";
import {LoggedMenu} from "@/components/app/LoggedMenu.tsx";
import {InitialMenu} from "@/components/InitialMenu.tsx";
import {useContext} from "react";
import AuthContext from "@/components/shared/AuthContext.tsx";

export function NavigationBar() {
    const { user } = useContext(AuthContext);

    return (
        <header>
            <NavigationMenu>
                { !user && <InitialMenu/>}
                {user && <LoggedMenu/>}
            </NavigationMenu>
        </header>
    )
}