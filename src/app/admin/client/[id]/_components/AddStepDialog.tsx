'use client'

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { completeStep } from "@/app/actions";
import { Label } from "@/components/ui/label";
import type { User, Protocol } from "@/lib/types";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

interface AddStepDialogProps {
    client: User;
    protocol: Protocol;
}

export default function AddStepDialog({ client, protocol }: AddStepDialogProps) {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    const uncompletedSteps = protocol.steps.filter(step => !client.completedStepIds.includes(step.id));

    async function handleCompleteStep(formData: FormData) {
        const result = await completeStep(formData);
        if (result.success) {
            toast({
                title: "Succès",
                description: result.message,
                variant: 'default',
            });
            setOpen(false);
        } else {
             toast({
                title: "Erreur",
                description: result.message,
                variant: 'destructive',
            });
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Ajouter une étape
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form action={handleCompleteStep}>
                    <input type="hidden" name="clientId" value={client.id} />
                    <DialogHeader>
                        <DialogTitle className="font-headline">Marquer une étape comme complétée</DialogTitle>
                        <DialogDescription>
                           Sélectionnez une étape à ajouter à la progression de {client.name}. Les points seront attribués automatiquement.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="stepId" className="text-right">
                                Étape
                            </Label>
                            <Select name="stepId" required>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Sélectionner une étape" />
                                </SelectTrigger>
                                <SelectContent>
                                    {uncompletedSteps.length > 0 ? (
                                        uncompletedSteps.map(step => (
                                            <SelectItem key={step.id} value={String(step.id)}>
                                                {step.name} (+{step.points} pts)
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem value="none" disabled>Toutes les étapes sont complétées</SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Annuler</Button>
                        <Button type="submit" disabled={uncompletedSteps.length === 0}>Confirmer</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
