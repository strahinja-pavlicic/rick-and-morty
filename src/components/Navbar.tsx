import { Link, useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex items-center space-x-4">
          <Link
            to="/characters"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Characters
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};
