import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { clients, protocol, badges, discountTiers, DISCOUNT_THRESHOLD } from "@/lib/data";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlusCircle, CheckCircle2, User, BrainCircuit } from "lucide-react";
import AddStepDialog from "./_components/AddStepDialog";

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = clients.find((c) => c.id === params.id);

  if (!client) {
    notFound();
  }

  const progressPercentage = Math.min((client.neuroPoints / DISCOUNT_THRESHOLD) * 100, 100);

  return (
    <div className="grid gap-4 md:gap-8">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold font-headline">{client.name}</h1>
                <p className="text-muted-foreground">{client.email}</p>
            </div>
            <AddStepDialog client={client} protocol={protocol} />
        </div>
      
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">NeuroPoints</CardTitle>
                    <BrainCircuit className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{client.neuroPoints.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                        {progressPercentage.toFixed(0)}% vers le prochain rabais
                    </p>
                    <Progress value={progressPercentage} className="mt-2 h-2" />
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Rabais Actuel</CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                         {client.currentDiscountLevel > 0 
                            ? `${discountTiers[client.currentDiscountLevel - 1]}%` 
                            : 'Aucun'
                         }
                    </div>
                    <p className="text-xs text-muted-foreground">
                       {client.currentDiscountLevel > 0 ? `Niveau ${client.currentDiscountLevel}` : 'Niveau 0'}
                    </p>
                </CardContent>
            </Card>
        </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Progression du Protocole</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Étape</TableHead>
                        <TableHead>Points</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {protocol.steps.map(step => {
                        const isCompleted = client.completedStepIds.includes(step.id);
                        return (
                             <TableRow key={step.id} className={isCompleted ? 'bg-green-500/10' : ''}>
                                <TableCell className="font-medium">{step.name}</TableCell>
                                <TableCell>{step.points}{step.bonusPoints ? ` + ${step.bonusPoints}`: ''}</TableCell>
                                <TableCell>
                                    <Badge variant={isCompleted ? 'default' : 'outline'} className={isCompleted ? 'bg-green-600' : ''}>
                                        {isCompleted ? 'Complété' : 'À faire'}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Badges</CardTitle>
          </CardHeader>
          <CardContent>
             <ul className="space-y-3">
                {badges.map(badge => {
                    const isUnlocked = client.unlockedBadgeIds.includes(badge.id);
                    return (
                        <li key={badge.id} className="flex items-center gap-4">
                            <div className={`p-2 rounded-full ${isUnlocked ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'}`}>
                                <badge.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <p className={`font-semibold ${!isUnlocked && 'text-muted-foreground'}`}>{badge.name}</p>
                                <p className="text-sm text-muted-foreground">{badge.description}</p>
                            </div>
                            {isUnlocked && <CheckCircle2 className="h-5 w-5 text-green-500 ml-auto" />}
                        </li>
                    )
                })}
             </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
