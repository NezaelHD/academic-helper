import * as React from "react";
import {Button} from "@/components/ui/button.tsx";
import hero from "@/assets/hero.png";
import openai from "@/assets/openai_logo.png";
import demoPhone from "@/assets/demo-phone.png";
import {Card} from "@/components/ui/card.tsx";

export const Home = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row items-center">
                <div className="flex-1 space-y-10">
                    <h1 className="text-8xl leading-snug">
                        Votre Partenaire de Connaissance <span className="text-green-300">ULTIME</span>
                    </h1>
                    <Button variant="outline" className="rounded-full px-12 py-6 outline outline-1">Essayer</Button>
                </div>
                <img
                    src={hero}
                    alt="Mockup of the application"
                    className="w-[200px] flex-1"
                />
            </div>
            <Card className="p-6">
                <p className="text-center text-3xl">
                    Notre application est <span className="text-green-300 font-semibold">propulsé </span> par des
                    services proposés <br/>  par des équipes partageant notre passion
                </p>
                <div className="flex flex-row justify-center mt-10">
                    <img className="w-[150px]" src={openai} alt="Logo of Open AI Company"/>
                </div>
                <div className="flex flex-row direction-start items-center">
                    <div className="basis-1/3">
                        <h2 className="font-semibold text-5xl mb-5">Professeurs / Élèves</h2>
                        <p>
                            Grâce à Learnie, performez dans votre apprentissage et soyez guider dans les matières qui
                            vous posent soucis.
                            Plus besoin de vous inquiéter de la véracité de l'information car le professeur relié
                            pourra vérifier les informations par la suite et revenir vers vous pour vous aiguiller plus.
                        </p>
                    </div>
                    <div className="basis-1/3">
                        <img  src={demoPhone} alt="Présentation de l'application sur un téléphone"/>
                    </div>
                </div>
            </Card>
        </>

    )
}