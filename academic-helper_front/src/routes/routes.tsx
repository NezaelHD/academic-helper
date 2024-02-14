import {Home} from "@/pages/Home";
import LoginPage from "@/pages/Login.tsx";
import RegisterPage from "@/pages/Register.tsx";
import ChatPage from "@/pages/Chat.tsx";

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
    },
    {
        path: "/chat",
        element: <ChatPage/>
    }
]