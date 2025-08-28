import { ThemeProvider } from "./app/contexts/ThemeContext";
import { ThemeSwitcher } from "./components/ThemeSwitcher";

export function App(){
  return(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col items-center justify-center ">
        <ThemeSwitcher />
      </div>
    </ThemeProvider>
  )
}
