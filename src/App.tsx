import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./app/contexts/ThemeContext";
import { queryClient } from "./app/lib/queryClient";
import { Header } from "./components/Header";
import { UserForm } from "./components/UserForm";
import { UsersList } from "./components/UsersLists";
import { Toaster } from "./components/ui/sonner";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="max-w-[500px] mx-auto mt-20 p-4">
          <Header />

          <main className="mt-10 space-y-3">
            <UserForm />
            <UsersList />
          </main>
        </div>
        <Toaster />
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
