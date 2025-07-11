'use client';

import Link from 'next/link';
import { BrainCircuit, LayoutDashboard, LogOut, Settings, UserCircle, Shield } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { User, UserRole } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import { admins, clients } from '@/lib/data';

function getUser(role: UserRole | null): User | undefined {
    if (role === 'admin') return admins[0];
    if (role === 'client') return clients[0];
    return undefined;
}

export function AppHeader() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') as UserRole | null;
  const user = getUser(role);

  if (!user) {
    return (
       <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
         <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg">NeuroProgress</span>
        </Link>
        <Button asChild>
            <Link href="/login">Se Connecter</Link>
        </Button>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg">NeuroProgress</span>
        </Link>
        <Link
          href={user.role === 'admin' ? '/admin' : '/dashboard'}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Tableau de bord
        </Link>
      </nav>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial"></div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src={`https://placehold.co/40x40.png`} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
                <div className="font-bold">{user.name}</div>
                <div className="text-xs text-muted-foreground">{user.email}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {user.role === 'client' && (
                <DropdownMenuItem asChild>
                    <Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Tableau de bord</Link>
                </DropdownMenuItem>
            )}
             {user.role === 'admin' && (
                <DropdownMenuItem asChild>
                    <Link href="/admin"><Shield className="mr-2 h-4 w-4" />Portail Admin</Link>
                </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Paramètres</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/login"><LogOut className="mr-2 h-4 w-4" />Se déconnecter</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
