import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { protocol } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Edit, PlusCircle } from "lucide-react";
import EditProtocolNameForm from "./_components/EditProtocolNameForm";
import EditStepDialog from "./_components/EditStepDialog";

export default function ProtocolsPage() {
  const currentProtocol = protocol;

  return (
    <div className="grid gap-4 md:gap-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-headline text-2xl">
                Gestion du Protocole
              </CardTitle>
              <CardDescription>
                Modifiez les détails et les étapes du protocole d'entraînement.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <EditProtocolNameForm protocol={currentProtocol} />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold font-headline">Étapes du Protocole</h3>
               <EditStepDialog protocol={currentProtocol}>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Ajouter une étape
                  </Button>
                </EditStepDialog>
            </div>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-center">Points</TableHead>
                        <TableHead className="text-center">Bonus</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentProtocol.steps.map((step) => (
                        <TableRow key={step.id}>
                            <TableCell className="font-medium">{step.name}</TableCell>
                            <TableCell className="text-muted-foreground">{step.description}</TableCell>
                            <TableCell className="text-center">{step.points}</TableCell>
                            <TableCell className="text-center">{step.bonusPoints || "—"}</TableCell>
                            <TableCell className="text-right">
                               <EditStepDialog protocol={currentProtocol} step={step}>
                                    <Button variant="ghost" size="icon">
                                        <Edit className="h-4 w-4" />
                                        <span className="sr-only">Modifier</span>
                                    </Button>
                                </EditStepDialog>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
