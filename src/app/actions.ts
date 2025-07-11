"use server";

import { revalidatePath } from "next/cache";

// This file simulates backend logic. In a real application, these functions
// would interact with a database like Firestore.

// DUMMY DATA MODIFICATION - In a real app, this would be a database call
import { clients, protocol } from "@/lib/data";
import type { Step } from "@/lib/types";

/**
 * Marks a step as complete for a client, awards points, and checks for discounts.
 * This function is intended to be called by an admin.
 * @param clientId The ID of the client.
 * @param stepId The ID of the step to complete.
 * @returns A promise that resolves with a success or error message.
 */
export async function completeStep(formData: FormData) {
  const clientId = formData.get("clientId") as string;
  const stepId = Number(formData.get("stepId"));

  console.log(`Attempting to complete step ${stepId} for client ${clientId}`);

  // Find the client and the step in our mock data
  const client = clients.find((c) => c.id === clientId);
  const step = protocol.steps.find((s) => s.id === stepId);

  if (!client || !step) {
    return { success: false, message: "Client ou étape introuvable." };
  }

  if (client.completedStepIds.includes(stepId)) {
    return { success: false, message: "Cette étape a déjà été complétée." };
  }

  // --- Start of transaction-like logic ---
  // 1. Add step to completed list
  client.completedStepIds.push(stepId);

  // 2. Award points
  const pointsAwarded = step.points + (step.bonusPoints || 0);
  client.neuroPoints += pointsAwarded;
  console.log(`Awarded ${pointsAwarded} points. New total: ${client.neuroPoints}`);
  
  // 3. Check for discount
  if (client.neuroPoints >= 8000) {
    console.log("Discount threshold reached. Applying discount.");
    client.neuroPoints -= 8000;
    client.currentDiscountLevel += 1;
    // In a real app, you'd log this event to a 'discounts' collection.
  }

  // 4. Check for badge unlocks (simplified logic)
  if (!client.unlockedBadgeIds.includes('starter')) {
    client.unlockedBadgeIds.push('starter');
  }
   if (client.completedStepIds.length >= 5 && !client.unlockedBadgeIds.includes('session-master')) {
    client.unlockedBadgeIds.push('session-master');
  }
  
  // --- End of transaction-like logic ---

  console.log("Client data updated:", client);

  // Revalidate the path to update the UI
  revalidatePath(`/admin/client/${clientId}`);
  return { success: true, message: `Étape "${step.name}" complétée avec succès!` };
}

/**
 * Assigns a referrer to a client.
 * @param clientId The ID of the client.
 * @param referrerCode The referral code of the referrer.
 * @returns A promise that resolves with a success or error message.
 */
export async function assignReferral(clientId: string, referrerCode: string) {
  console.log(`Assigning referrer with code ${referrerCode} to client ${clientId}`);
  // In a real app:
  // 1. Find user with matching referralCode.
  // 2. If found, update the current client's `referrerId`.
  // 3. Handle cases where code is not found or client already has a referrer.
  return { success: true, message: "Parrain assigné." };
}


/**
 * Updates the name of a protocol.
 */
export async function updateProtocolName(formData: FormData) {
  const protocolId = formData.get("protocolId") as string;
  const newName = formData.get("name") as string;

  if (protocol.id === protocolId) {
    protocol.name = newName;
    revalidatePath("/admin/protocols");
    return { success: true, message: "Le nom du protocole a été mis à jour." };
  }
  return { success: false, message: "Protocole non trouvé." };
}

/**
 * Adds or updates a step in a protocol.
 */
export async function saveProtocolStep(formData: FormData) {
  const protocolId = formData.get("protocolId") as string;
  const stepId = formData.get("stepId") ? Number(formData.get("stepId")) : null;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const points = Number(formData.get("points"));
  const bonusPoints = formData.get("bonusPoints") ? Number(formData.get("bonusPoints")) : 0;

  if (protocol.id !== protocolId) {
    return { success: false, message: "Protocole non trouvé." };
  }

  const stepData: Partial<Step> = {
    name,
    description,
    points,
    bonusPoints: bonusPoints || undefined,
  };

  if (stepId) {
    // Update existing step
    const stepIndex = protocol.steps.findIndex((s) => s.id === stepId);
    if (stepIndex > -1) {
      protocol.steps[stepIndex] = { ...protocol.steps[stepIndex], ...stepData };
       revalidatePath("/admin/protocols");
      return { success: true, message: "L'étape a été mise à jour." };
    }
    return { success: false, message: "Étape non trouvée." };
  } else {
    // Add new step
    const newStep: Step = {
      id: Math.max(...protocol.steps.map(s => s.id)) + 1,
      ...stepData,
    } as Step;
    protocol.steps.push(newStep);
    revalidatePath("/admin/protocols");
    return { success: true, message: "Une nouvelle étape a été ajoutée." };
  }
}
