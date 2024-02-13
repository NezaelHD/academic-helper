"use client"
import * as React from "react"
import {ReactNode} from "react";
import {NavigationBar} from "@/components/app/NavigationBar.tsx";
import {Logo} from "@/components/app/Logo.tsx";
import Footer from "@/components/app/Footer.tsx";
interface Props {
    children?: ReactNode
}

export function BaseLayout({ children }: Props) {
    return (
        <>
            <div className="container mx-auto py-4 ">
                <div className="flex justify-between items-center mb-5">
                    <Logo/>
                    <NavigationBar/>
                </div>

                <main>
                    {children}
                </main>
            </div>
            <Footer/>
        </>
    )
}
