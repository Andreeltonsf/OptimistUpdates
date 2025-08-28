import { Button } from "./components/ui/button";

export function App(){
  return(
    <div className="flex items-center justify-center h-screen">
      <Button onSelect={() => alert("Hello!")}>Click me</Button>
    </div>
  )
}
