import { Home, PlusCircle, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation()
  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: <Home className="h-4 w-4 mr-2" />,
    },
    {
      name: "New Restaurant",
      href: "/new-restaurant",
      icon: <PlusCircle className="h-4 w-4 mr-2" />,
    },
    {
      name: "Search Restaurant",
      href: "/search-restaurant",
      icon: <Search className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <nav className="border-b bg-purple-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Directorio de Restaurantes</h1>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href

                return (
                  <Link
                    to={item.href}
                    key={item.href}
                    className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors 
                      ${isActive 
                        ? 'bg-white text-purple-900' 
                        : 'hover:bg-purple-800 text-white'
                      }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
