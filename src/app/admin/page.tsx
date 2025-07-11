import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { clients, discountTiers } from "@/lib/data";

export default function AdminDashboardPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Gestion des Clients</CardTitle>
        <CardDescription>
          Visualisez et gérez la progression de tous les clients.
        </CardDescription>
        <div className="pt-2">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Rechercher un client..." className="pl-8 sm:w-[300px]" />
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead className="text-center">Points</TableHead>
              <TableHead className="text-center">Niveau de Rabais</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>
                  <div className="font-medium">{client.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {client.email}
                  </div>
                </TableCell>
                <TableCell className="text-center font-mono">{client.neuroPoints.toLocaleString()}</TableCell>
                <TableCell className="text-center">
                    {client.currentDiscountLevel > 0 ? (
                        <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                            {discountTiers[client.currentDiscountLevel -1]}%
                        </Badge>
                    ) : (
                        <Badge variant="outline">Aucun</Badge>
                    )}
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/client/${client.id}`}>Gérer</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
