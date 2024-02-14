import {NavigationMenuItem, NavigationMenuList} from "@/components/ui/navigation-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {ThemeToggle} from "@/components/ui/theme-toggle.tsx";
import * as React from "react";
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar.tsx";
import AuthContext from "@/components/shared/AuthContext.tsx";
import {useContext} from "react";

export function LoggedMenu() {
    const { user } = useContext(AuthContext);
    return (
            <NavigationMenuList className="flex gap-4">
                <NavigationMenuItem>
                    <Button variant="outline" asChild className="rounded-full font-semibold text-white">
                        <Link to="/chat">
                            App
                        </Link>
                    </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <span>{user.username}</span>
                </NavigationMenuItem>
                <NavigationMenuItem>
                <Avatar>
                        <AvatarImage src={user.profileImage} alt="Avatar" />
                        <AvatarFallback>{user.username[0]}</AvatarFallback>
                    </Avatar>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <ThemeToggle></ThemeToggle>
                </NavigationMenuItem>
            </NavigationMenuList>
    )
}