import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { protocols } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Edit, PlusCircle, ArrowLeft } from "lucide-react";
import EditProtocolNameForm from "../_components/EditProtocolNameForm";
import EditStepDialog from "../_components/EditStepDialog";
import Link from "next/link";

export default function ProtocolDetailPage({ params }: { params: { id: string } }) {
  const protocol = protocols.find((p) => p.id === params.id);

  if (!protocol) {
    notFound();
  }

  return (
    <div className="grid gap-4 md:gap-8">
       <div className="flex">
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/protocols">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux protocoles
          </Link>
        </Button>
      </div>
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
          <EditProtocolNameForm protocol={protocol} />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold font-headline">Étapes du Protocole</h3>
               <EditStepDialog protocol={protocol}>
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
                        {protocol.steps.map((step) => (
                        <TableRow key={step.id}>
                            <TableCell className="font-medium">{step.name}</TableCell>
                            <TableCell className="text-muted-foreground">{step.description}</TableCell>
                            <TableCell className="text-center">{step.points}</TableCell>
                            <TableCell className="text-center">{step.bonusPoints || "—"}</TableCell>
                            <TableCell className="text-right">
                               <EditStepDialog protocol={protocol} step={step}>
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
