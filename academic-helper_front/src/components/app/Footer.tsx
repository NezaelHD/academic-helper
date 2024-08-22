import {Link} from "react-router-dom";
import {Logo} from "@/components/app/Logo.tsx";

export default function Footer() {
    return (
        <footer>
            <div
                className="
                    container
                    flex flex-col flex-wrap
                    px-4
                    py-16
                    mx-auto
                    md:items-center
                    lg:items-start
                    md:flex-row md:flex-nowrap
                "
            >
                <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
                    <Logo/>
                    <p className="mt-2 text-xs text-justify">
                        Développer vos connaissances plus rapidement tout en étant sûr des informations reccueillies.
                        Obtenez de l'aide à tout moment et n'importe où.
                        Osez vous exprimez et poser vos questions.
                    </p>
                </div>
                <div className="justify-between w-full mt-4 text-center lg:flex">
                    <div className="w-full px-4 lg:w-1/3 md:w-1/2">
                        <h2 className="mb-2 font-bold tracking-widest text-gray-100">
                            Liens utiles
                        </h2>
                        <ul className="mb-8 space-y-2 text-sm list-none">
                            <li>
                                <Link to="/" >
                                    Politique de confidentialité
                                </Link>
                            </li>
                            <li>
                                <Link to="/" >
                                    Mentions légales
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full px-4 lg:w-1/3 md:w-1/2">
                        <h2 className="mb-2 font-bold tracking-widest text-gray-100">
                            Compte
                        </h2>
                        <ul className="mb-8 space-y-2 text-sm list-none">
                            <li>
                                <Link to="/" >
                                    Se connecter
                                </Link>
                            </li>
                            <li>
                                <Link to="/" >
                                    S'inscrire
                                </Link>
                            </li>
                            <li>
                                <Link to="/" >
                                    Supprimer mon compte
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full px-4 lg:w-1/3 md:w-1/2">
                        <h2 className="mb-2 font-bold tracking-widest text-gray-100">
                            Questions
                        </h2>
                        <ul className="mb-8 space-y-2 text-sm list-none">
                            <li>
                                <Link to="/" >
                                    F.A.Q
                                </Link>
                            </li>
                            <li>
                                <Link to="/" >
                                    À propos
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex justify-center -mt-12">
                <p className="text-center text-white pb-2">
                    @2024 Learnie Tous droits réservés.
                </p>
            </div>
        </footer>
    )
}