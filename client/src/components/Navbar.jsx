import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

export function Navbar() {
  return (
    <div className="flex h-12 items-center justify-between px-4">
      <nav className="flex items-center space-x-6">
        <Link to="/" className="font-medium">
          Tasks
        </Link>
        <Link to="/" className="text-muted-foreground">
          Calendar
        </Link>
        <Link to="/" className="text-muted-foreground">
          Analytics
        </Link>
        <Link to="/" className="text-muted-foreground">
          Settings
        </Link>
      </nav>
      <ModeToggle />
    </div>
  );
}