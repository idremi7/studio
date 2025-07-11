"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { saveProtocolStep } from "@/app/actions";
import type { Protocol, Step } from "@/lib/types";
import { useState } from "react";

interface EditStepDialogProps {
  protocol: Protocol;
  step?: Step;
  children: React.ReactNode;
}

export default function EditStepDialog({ protocol, step, children }: EditStepDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const isEditing = !!step;

  async function handleSaveStep(formData: FormData) {
    const result = await saveProtocolStep(formData);
    if (result.success) {
      toast({
        title: "Succès",
        description: result.message,
      });
      setOpen(false);
    } else {
      toast({
        title: "Erreur",
        description: result.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <form action={handleSaveStep}>
          <input type="hidden" name="protocolId" value={protocol.id} />
          {isEditing && <input type="hidden" name="stepId" value={step.id} />}
          <DialogHeader>
            <DialogTitle className="font-headline">
              {isEditing ? "Modifier une étape" : "Ajouter une nouvelle étape"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Modifiez les détails de cette étape."
                : "Configurez les détails pour la nouvelle étape du protocole."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom de l'étape</Label>
              <Input id="name" name="name" defaultValue={step?.name} required />
            </div>
             <div className="space-y-2">
                <Label htmlFor="points">Points attribués</Label>
                <Input
                    id="points"
                    name="points"
                    type="number"
                    defaultValue={step?.points}
                    required
                />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={step?.description}
                className="min-h-[80px]"
                required
              />
            </div>
           
            <div className="space-y-2">
              <Label htmlFor="bonusPoints">Points Bonus (Optionnel)</Label>
              <Input
                id="bonusPoints"
                name="bonusPoints"
                type="number"
                defaultValue={step?.bonusPoints || ""}
                placeholder="Ex: 250"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit">Sauvegarder</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
