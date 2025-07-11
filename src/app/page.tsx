import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Award, GitBranchPlus, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold font-headline text-primary">DepartNeuro</h1>
        </div>
        <nav>
          <Button asChild variant="ghost">
            <Link href="/login">Se Connecter</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Commencer</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-grow">
        <section className="py-20 md:py-32 bg-secondary/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-6xl font-bold font-headline text-primary mb-4 animate-fade-in-down">
              Votre Parcours Neurofeedback, Simplifié.
            </h2>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
              Suivez votre progression, gagnez des points, débloquez des récompenses et atteignez vos objectifs avec DepartNeuro.
            </p>
            <Button asChild size="lg">
              <Link href="/login">Rejoindre le programme</Link>
            </Button>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold font-headline">Conçu pour votre succès</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
                Une plateforme intuitive pour les clients et les administrateurs, qui rend le suivi des progrès transparent et motivant.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline mt-4">Suivi des Progrès</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Visualisez chaque étape de votre protocole d'entraînement et célébrez vos accomplissements.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline mt-4">Points & Récompenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Accumulez des NeuroPoints pour chaque étape franchie et débloquez des rabais automatiques.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                    <GitBranchPlus className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline mt-4">Système de Parrainage</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Invitez d'autres personnes et gagnez des points bonus lorsque vos filleuls progressent dans leur parcours.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 border-t bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DepartNeuro. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
