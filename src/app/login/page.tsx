import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrainCircuit } from "lucide-react";
import Link from "next/link";

const GoogleIcon = () => (
  <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 21.2 177.2 56.4l-64.4 64.4c-21.3-20.2-49.4-32.4-82.8-32.4-69.2 0-126 56.8-126 126s56.8 126 126 126c76.3 0 112.5-47.5 116.3-71.3H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path>
  </svg>
)

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary/50 p-4">
      <div className="mb-8 text-center">
        <Link href="/" className="flex items-center justify-center gap-2 mb-2">
            <BrainCircuit className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold font-headline text-primary">DepartNeuro</h1>
        </Link>
        <p className="text-muted-foreground">Connectez-vous pour suivre votre parcours</p>
      </div>
      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Se Connecter</TabsTrigger>
          <TabsTrigger value="register">S'inscrire</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Connexion Client</CardTitle>
              <CardDescription>
                Accédez à votre tableau de bord personnel.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-login">Email</Label>
                <Input id="email-login" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-login">Mot de passe</Label>
                <Input id="password-login" type="password" required />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" asChild>
                <Link href="/dashboard">Se connecter</Link>
              </Button>
              <p className="text-xs text-muted-foreground text-center">OU</p>
               <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard?role=admin">
                  <GoogleIcon />
                  Se connecter en tant que Staff (Google)
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Créer un compte</CardTitle>
              <CardDescription>
                Rejoignez-nous pour commencer votre programme.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" type="text" placeholder="Jean Dupont" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-register">Email</Label>
                <Input id="email-register" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-register">Mot de passe</Label>
                <Input id="password-register" type="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/dashboard">Créer le compte</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
