import './App.css'
import {useRoutes} from "react-router-dom";
import {appRoutes} from "@/routes/routes";
import {BaseLayout} from "@/layouts/BaseLayout";
import {ThemeProvider} from "@/components/theme-provider.tsx";

function App() {
    const routes = useRoutes(appRoutes)

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <BaseLayout>
              {routes}
            </BaseLayout>
        </ThemeProvider>
  )
}

export default App
