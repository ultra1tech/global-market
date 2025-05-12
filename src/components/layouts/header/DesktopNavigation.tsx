
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = [
  { name: "Fashion", path: "/browse?category=fashion" },
  { name: "Electronics", path: "/browse?category=electronics" },
  { name: "Home & Decor", path: "/browse?category=home-decor" },
  { name: "Beauty", path: "/browse?category=beauty" },
  { name: "Toys", path: "/browse?category=toys" },
  { name: "Food", path: "/browse?category=food" },
  { name: "Accessories", path: "/browse?category=accessories" },
];

const DesktopNavigation: React.FC = () => {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      <Link to="/" className="text-sm font-medium hover:text-marketplace-primary">
        Home
      </Link>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-0 h-auto text-sm font-medium">
            Categories
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-48">
          {categories.map((category) => (
            <DropdownMenuItem key={category.name} asChild>
              <Link to={category.path}>
                {category.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Link to="/browse" className="text-sm font-medium hover:text-marketplace-primary">
        Browse
      </Link>
      
      <Link to="/stores" className="text-sm font-medium hover:text-marketplace-primary">
        Stores
      </Link>
    </nav>
  );
};

export default DesktopNavigation;
