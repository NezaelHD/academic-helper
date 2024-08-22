import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "@/lib/axios.ts";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        let userProfile = localStorage.getItem("userProfile");
        if (userProfile) {
            return JSON.parse(userProfile);
        }
        return null;
    });
    const navigate = useNavigate();
    const login = async (payload) => {

        let apiResponse = await instance.post("/auth/login", payload);
        localStorage.setItem("userProfile", JSON.stringify(apiResponse.data.data));
        setUser(apiResponse.data.data);
        navigate("/chat");
    };
    return (
        <>
            <AuthContext.Provider value={{ user, login }}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export default AuthContext;