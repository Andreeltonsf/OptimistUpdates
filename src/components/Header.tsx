import { ThemeSwitcher } from "./ThemeSwitcher";

export function Header(){
  return(
    <header className="flex items-center justify-between mb-10">
      <div>
        <h1 className="text-3xl font-bold -tracking-wider">JSTACK</h1>
        <small className="text-muted-foreground">Gerencie seus projetos com JavaScript</small>
      </div>

      <ThemeSwitcher/>
    </header>
  )
}
