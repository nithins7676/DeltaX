import { Search, Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate, useLocation } from "react-router-dom";
import { useRole } from "@/hooks/use-role";

interface CRMLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const CRMLayout = ({ children, title }: CRMLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, setRole } = useRole();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path);

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Header */}
      <header className="border-b border-border bg-card/95 backdrop-blur-xl sticky top-0 z-50 shadow-lg">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Brand & Navigation */}
            <div className="flex items-center space-x-16">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-hover rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25">
                  <span className="text-primary-foreground font-black text-lg tracking-tight">DL</span>
                </div>
                <div>
                  <h1 className="text-2xl font-black text-automotive-midnight tracking-tight bg-gradient-to-r from-automotive-charcoal to-automotive-midnight bg-clip-text">
                    DriveLead
                  </h1>
                  <p className="text-sm text-muted-foreground font-semibold tracking-wide">
                    Smart Lead CRM • HSR Motors
                  </p>
                </div>
              </div>
              
              {/* Premium Navigation */}
              <nav className="flex items-center space-x-2 bg-muted/30 rounded-2xl p-1.5">
                <Button 
                  variant={isActive('/leads') ? "default" : "ghost"} 
                  size="sm"
                  onClick={() => navigate('/leads')}
                  className={`font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 ${
                    isActive('/leads') 
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 transform scale-105' 
                      : 'hover:bg-accent/60 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  🎯 Leads
                </Button>
                <Button 
                  variant={isActive('/management') ? "default" : "ghost"} 
                  size="sm"
                  onClick={() => navigate('/management')}
                  className={`font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 ${
                    isActive('/management') 
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 transform scale-105' 
                      : 'hover:bg-accent/60 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  ⚙️ Management
                </Button>
                <Button 
                  variant={isActive('/dashboard') ? "default" : "ghost"} 
                  size="sm"
                  onClick={() => navigate('/dashboard')}
                  className={`font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 ${
                    isActive('/dashboard') 
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 transform scale-105' 
                      : 'hover:bg-accent/60 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  📊 Dashboard
                </Button>
              </nav>
            </div>

            {/* Premium Global Search */}
            <div className="flex-1 max-w-lg mx-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="🔍 Search leads, contacts, activities..."
                  className="pl-12 pr-4 py-3 bg-background/80 border-2 border-border/60 rounded-2xl text-base font-medium placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-background transition-all duration-200 shadow-sm hover:shadow-md"
                />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {/* Role Switcher */}
              <div className="flex items-center space-x-2 bg-muted/40 rounded-xl px-2 py-1">
                <Button
                  variant={role === 'sales' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setRole('sales')}
                  className={`px-3 rounded-lg ${role === 'sales' ? 'bg-primary text-primary-foreground' : ''}`}
                >
                  Sales
                </Button>
                <Button
                  variant={role === 'manager' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setRole('manager')}
                  className={`px-3 rounded-lg ${role === 'manager' ? 'bg-primary text-primary-foreground' : ''}`}
                >
                  Manager
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="relative hover:bg-accent/60 rounded-xl p-2.5">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full flex items-center justify-center">
                  <span className="text-[10px] text-destructive-foreground font-bold">3</span>
                </span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-2xl hover:bg-accent/60 transition-all duration-200">
                    <Avatar className="h-10 w-10 ring-2 ring-border hover:ring-primary transition-all duration-200">
                      <AvatarImage src="/avatars/01.png" alt="User" />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary-hover text-primary-foreground font-bold">JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        john.doe@hsrmotors.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default CRMLayout;