
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  href: string;
  label: string;
  current: boolean;
}

const NavItem = ({ href, label, current }: NavItemProps) => (
  <Link
    to={href}
    className={cn(
      "px-3 py-2 rounded-md text-sm font-medium transition-colors",
      current ? "bg-primary/10 text-primary" : "hover:bg-accent text-muted-foreground hover:text-foreground"
    )}
  >
    {label}
  </Link>
);

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const tools = [
    { path: "/", label: "Home" },
    { path: "/base64", label: "Base64 Encoder/Decoder" },
    { path: "/json", label: "JSON Formatter" },
    { path: "/color", label: "Color Converter" },
    { path: "/regex", label: "Regex Tester" },
    { path: "/hash", label: "Hash Generator" },
    { path: "/token", label: "Token Generator" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xl font-bold">
              TechToolKit
            </Link>
            <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
              v1.0
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/yourusername/techtoolkit" target="_blank" rel="noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
          </div>
        </div>
      </header>
      
      <div className="container mt-4">
        <nav className="flex flex-wrap gap-1">
          {tools.map((tool) => (
            <NavItem 
              key={tool.path}
              href={tool.path}
              label={tool.label}
              current={currentPath === tool.path}
            />
          ))}
        </nav>
      </div>

      <main className="flex-1 container py-6">{children}</main>

      <footer className="border-t py-6 bg-muted/50">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 TechToolKit. All tools process data client-side for your privacy.</p>
          <p className="mt-1">
            Made with <span className="text-red-500">♥</span> for developers.
          </p>
        </div>
      </footer>
    </div>
  );
}
