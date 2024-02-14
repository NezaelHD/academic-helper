import './App.css'
import {useRoutes} from "react-router-dom";
import {appRoutes} from "@/routes/routes";
import {BaseLayout} from "@/layouts/BaseLayout";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {AuthContextProvider} from "@/components/shared/AuthContext.tsx";

function App() {
    const routes = useRoutes(appRoutes)

    return (
        <AuthContextProvider>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <BaseLayout>
                    {routes}
                </BaseLayout>
            </ThemeProvider>
        </AuthContextProvider>
  )
}

export default App
