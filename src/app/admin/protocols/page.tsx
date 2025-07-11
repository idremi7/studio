import Link from 'next/link';
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
import { protocols } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { PlusCircle, ChevronRight, FileText } from "lucide-react";
import AddProtocolDialog from './_components/AddProtocolDialog';

export default function ProtocolsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline text-2xl">
              Gestion des Protocoles
            </CardTitle>
            <CardDescription>
              Affichez, créez ou modifiez les protocoles d'entraînement.
            </CardDescription>
          </div>
          <AddProtocolDialog />
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom du Protocole</TableHead>
                <TableHead className="text-center">Nombre d'étapes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {protocols.length > 0 ? (
                protocols.map((protocol) => (
                  <TableRow key={protocol.id}>
                    <TableCell className="font-medium">{protocol.name}</TableCell>
                    <TableCell className="text-center">{protocol.steps.length}</TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/protocols/${protocol.id}`}>
                          Gérer <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                 <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      <FileText className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="font-medium">Aucun protocole trouvé.</p>
                      <p className="text-muted-foreground text-sm">Commencez par en créer un nouveau.</p>
                    </TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
