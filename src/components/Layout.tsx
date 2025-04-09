import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { currentUser } = useAuth();
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen">
      {(token || currentUser) && <Navbar />}
      <main className="container mx-auto py-6">{children}</main>
    </div>
  );
}
