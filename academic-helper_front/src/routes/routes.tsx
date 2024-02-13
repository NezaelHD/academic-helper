import {Home} from "@/pages/Home";
import LoginPage from "@/components/app/login/Login.tsx";
import RegisterPage from "@/components/app/register/Register.tsx";

export const appRoutes = [
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/sign-in",
        element: <LoginPage/>
    },
    {
        path: "/sign-up",
        element: <RegisterPage/>
    }
]