import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import instance from "@/lib/axios.ts";

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegisterForm({ className, ...props }: AuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [username, setUsername] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [confirm, setConfirm] = React.useState<string>("");
    const [role, setRole] = React.useState<string>("student");

    const handleUsernameChange = function(e) {
        setUsername(e.target.value);
    }
    const handleEmailChange = function(e) {
        setEmail(e.target.value);
    }
    const handlePasswordChange = function(e) {
        setPassword(e.target.value);
    }
    const handleConfirmChange = function(e) {
        setConfirm(e.target.value);
    }
    const handleRoleChange = function(e) {
        setRole(e.target.value);
    }

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        console.log(username, email, password, confirm, role)

        await instance.post("/auth/signup", {
            username: username,
            email: email,
            password: password,
            role: role
        }).then((response) => {
            console.log(response)
            setIsLoading(false);
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="username">
                            Nom d'utilisateur
                        </Label>
                        <Input
                            id="username"
                            placeholder="Nom d'utilisateur"
                            type="text"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isLoading}
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>
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
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="password">
                            Mot de passe
                        </Label>
                        <Input
                            id="password"
                            placeholder="Mot de passe"
                            type="password"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isLoading}
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="confirm">
                            Confirmer le mot de passe
                        </Label>
                        <Input
                            id="confirm"
                            placeholder="Confirmer le mot de passe"
                            type="password"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isLoading}
                            value={confirm}
                            onChange={handleConfirmChange}
                        />
                    </div>
                    <div className="grid gap-1">
                        <RadioGroup defaultValue="student" onChange={handleRoleChange} value={role}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="student" id="r1"/>
                                <Label htmlFor="r1">Étudiant</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="professor" id="r2"/>
                                <Label htmlFor="r2">Professeur</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <Button disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                        )}
                        S'inscrire avec son email
                    </Button>
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