import {NavigationMenuItem, NavigationMenuList} from "@/components/ui/navigation-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {ThemeToggle} from "@/components/ui/theme-toggle.tsx";
import * as React from "react";

export function InitialMenu() {
    return (
            <NavigationMenuList className="flex gap-4">
                <NavigationMenuItem>
                    <Button asChild className="rounded-full font-semibold text-white">
                        <Link to="/sign-in">
                            Sign In
                        </Link>
                    </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Button asChild className="rounded-full font-semibold text-white">
                        <Link to="/sign-up">
                            Sign Up
                        </Link>
                    </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <ThemeToggle></ThemeToggle>
                </NavigationMenuItem>
            </NavigationMenuList>
    )
}