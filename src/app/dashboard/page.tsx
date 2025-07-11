import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, Copy } from "lucide-react";
import { badges, clients, protocols, DISCOUNT_THRESHOLD } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

const client = clients[0]; // Using mock data for a single client view

export default function DashboardPage() {
  const progressPercentage = Math.min((client.neuroPoints / DISCOUNT_THRESHOLD) * 100, 100);

  const protocol = protocols.find(p => p.id === client.protocolId);

  if (!protocol) {
    // In a real app, you'd want to handle this more gracefully
    notFound();
  }


  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-3xl font-bold font-headline">
                {client.neuroPoints.toLocaleString()}
              </CardTitle>
              <CardDescription>NeuroPoints Actuels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Prochain rabais à {DISCOUNT_THRESHOLD.toLocaleString()} points
              </div>
            </CardContent>
          </Card>
          <Card>
             <CardHeader className="pb-2">
                <CardTitle className="text-3xl font-bold font-headline">
                   {DISCOUNT_THRESHOLD - client.neuroPoints > 0 ? (DISCOUNT_THRESHOLD - client.neuroPoints).toLocaleString() : 0}
                </CardTitle>
              <CardDescription>Points restants</CardDescription>
            </CardHeader>
            <CardContent>
                <Progress value={progressPercentage} aria-label={`${progressPercentage}% vers le rabais`} />
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Votre Protocole: {protocol.name}</CardTitle>
            <CardDescription>Suivez les étapes de votre parcours d'entraînement.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {protocol.steps.map((step, index) => {
                const isCompleted = client.completedStepIds.includes(step.id);
                return (
                  <li key={step.id} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      {isCompleted ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground" />
                      )}
                      {index < protocol.steps.length - 1 && (
                        <div className="w-px h-8 bg-border mt-1"></div>
                      )}
                    </div>
                    <div>
                      <h4 className={`font-semibold ${isCompleted ? '' : 'text-muted-foreground'}`}>{step.name}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                      <p className="text-sm font-medium text-primary/80">+{step.points} points {step.bonusPoints && `(+${step.bonusPoints} bonus)`}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>

      </div>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Parrainage</CardTitle>
                <CardDescription>Partagez votre code et gagnez des points bonus.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <p className="font-mono text-lg font-bold text-primary">{client.referralCode}</p>
                <Button variant="ghost" size="icon">
                    <Copy className="h-5 w-5 text-muted-foreground" />
                    <span className="sr-only">Copier le code</span>
                </Button>
            </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Badges Débloqués</CardTitle>
            <CardDescription>Vos accomplissements et récompenses.</CardDescription>
          </CardHeader>
          <CardContent>
            <TooltipProvider>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {badges.map((badge) => {
                  const isUnlocked = client.unlockedBadgeIds.includes(badge.id);
                  return (
                    <Tooltip key={badge.id}>
                      <TooltipTrigger asChild>
                        <div className={`flex flex-col items-center justify-center p-2 rounded-lg border ${isUnlocked ? 'bg-accent/10 border-accent/20' : 'bg-secondary'}`}>
                          <badge.icon
                            className={`h-10 w-10 mb-2 ${isUnlocked ? "text-accent" : "text-muted-foreground/50"
                              }`}
                          />
                          <p className={`text-xs text-center font-semibold ${isUnlocked ? "text-accent-foreground" : "text-muted-foreground"
                              }`}>
                            {badge.name}
                          </p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-bold">{badge.name}</p>
                        <p>{badge.description}</p>
                        {!isUnlocked && <p className="text-xs text-muted-foreground">(Verrouillé)</p>}
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </TooltipProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
