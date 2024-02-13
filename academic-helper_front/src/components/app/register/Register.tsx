import {Link} from "react-router-dom";
import {RegisterForm} from "@/components/app/register/RegisterForm.tsx";

export default function RegisterPage() {
    return (
        <>
            <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;Entrez dans un monde de connaissance infinie à
                                l'aide de votre nouvel assistant d'apprentissage
                                pédagogique.&rdquo;
                            </p>
                            <footer className="text-sm">Sofia Davis</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Créer un compte
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Entrez votre email ci-dessous pour créer votre compte
                            </p>
                        </div>
                        <RegisterForm />
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            En cliquant sur continuer, vous accepter nos {" "}
                            <Link
                                to="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terme d'utilisation
                            </Link>{" "}
                            et notre{" "}
                            <Link
                                to="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Politique de confidentialité
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}