import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAdmin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Members", path: "/members" },
    { name: "Gallery", path: "/gallery" },
    { name: "Sponsors", path: "/sponsors" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-warm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-saffron rounded-full flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform">
              <span className="text-white text-xl font-bold">🕉</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-foreground">
                Baghat Sing Geleyar Balaga
              </h1>
              <p className="text-xs text-muted-foreground">
                Ganesh Festival Community
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Admin Login/Logout or Join Us Button */}
          <div className="hidden lg:flex items-center gap-2">
            {isAdmin ? (
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            ) : (
              <>
                <Button
                  className="bg-gradient-gold hover:opacity-90 text-foreground font-semibold shadow-gold"
                  asChild
                >
                  <Link to="/members">Join Us</Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <Link to="/admin">
                    <LogIn className="w-4 h-4 mr-2" />
                    Admin
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {isAdmin ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    className="bg-gradient-gold hover:opacity-90 text-foreground font-semibold shadow-gold"
                    asChild
                  >
                    <Link to="/members" onClick={() => setIsMobileMenuOpen(false)}>
                      Join Us
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                      <LogIn className="w-4 h-4 mr-2" />
                      Admin Login
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
