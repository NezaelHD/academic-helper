import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";


interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: AuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isEmailLogin, setIsEmailLogin] = React.useState<boolean>(false)
    const [email, setEmail] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")

    const handleEmailChange =  function(e) {
        setEmail(e.target.value);
    };
    const handlePasswordChange = function(e) {
        setPassword(e.target.value);
    };
    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    const onEmailLogin = function() {
        if(email !== "") {
            setIsEmailLogin(true)
        }
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    {isEmailLogin && (
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="email">
                                Mot de passe
                            </Label>
                            <Input
                                id="password"
                                placeholder="************"
                                type="password"
                                autoCapitalize="none"
                                autoCorrect="off"
                                disabled={isLoading}
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                    )}
                    {!isEmailLogin && (
                        <Button type="button" onClick={onEmailLogin}>
                            Se connecter avec son e-mail
                        </Button>
                    )}
                    {isEmailLogin && (
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Connexion
                        </Button>
                    )}
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"/>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continuer avec
          </span>
                </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading}>
                {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                )}{" "}
                GitHub
            </Button>
        </div>
    )
}