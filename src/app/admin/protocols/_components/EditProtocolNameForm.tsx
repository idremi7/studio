"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Protocol } from "@/lib/types";
import { updateProtocolName } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface EditProtocolNameFormProps {
  protocol: Protocol;
}

export default function EditProtocolNameForm({ protocol }: EditProtocolNameFormProps) {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(protocol.name);

  async function handleSubmit(formData: FormData) {
    const result = await updateProtocolName(formData);
    if (result.success) {
      toast({ title: "Succès", description: result.message });
      setIsEditing(false);
    } else {
      toast({ title: "Erreur", description: result.message, variant: "destructive" });
    }
  }

  return (
    <Card className="bg-secondary/50">
        <CardHeader>
            <CardTitle className="font-headline text-lg">Détails du Protocole</CardTitle>
        </CardHeader>
      <CardContent>
        {isEditing ? (
          <form action={handleSubmit} className="flex items-end gap-4">
            <input type="hidden" name="protocolId" value={protocol.id} />
            <div className="flex-grow space-y-2">
                <Label htmlFor="name">Nom du protocole</Label>
                <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-background"
                    required
                />
            </div>
            <div className="flex gap-2">
                <Button type="button" variant="ghost" onClick={() => { setIsEditing(false); setName(protocol.name); }}>
                    Annuler
                </Button>
                <Button type="submit">Sauvegarder</Button>
            </div>
          </form>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Nom du protocole</p>
              <p className="text-xl font-semibold">{protocol.name}</p>
            </div>
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Modifier
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
