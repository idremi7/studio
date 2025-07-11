"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { createProtocol } from "@/app/actions";
import { PlusCircle } from "lucide-react";

export default function AddProtocolDialog() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    const result = await createProtocol(formData);
    if (result.success) {
      toast({ title: "Succès", description: result.message });
      setOpen(false);
    } else {
      toast({ title: "Erreur", description: result.message, variant: "destructive" });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nouveau Protocole
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form action={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-headline">Créer un nouveau protocole</DialogTitle>
            <DialogDescription>
              Entrez un nom pour le nouveau protocole. Vous pourrez ajouter des étapes plus tard.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du protocole</Label>
              <Input
                id="name"
                name="name"
                placeholder="Ex: Protocole de performance cognitive"
                required
              />
            </div>
          </div>
          <DialogFooter>
             <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit">Créer le protocole</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
