"use server";

import { revalidatePath } from "next/cache";

// This file simulates backend logic. In a real application, these functions
// would interact with a database like Firestore.

// DUMMY DATA MODIFICATION - In a real app, this would be a database call
import { clients, protocols } from "@/lib/data";
import type { Step } from "@/lib/types";

const REFERRAL_BONUS_POINTS = 100; // Points awarded to the referrer

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
  
  if (!client || !client.protocolId) {
    return { success: false, message: "Client ou protocole du client introuvable." };
  }
  
  const protocol = protocols.find(p => p.id === client.protocolId);
  if (!protocol) {
     return { success: false, message: "Protocole non trouvé pour ce client." };
  }

  const step = protocol.steps.find((s) => s.id === stepId);

  if (!step) {
    return { success: false, message: "Étape introuvable dans le protocole du client." };
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

  // 3. Handle referral bonus
  if (client.referrerId) {
    const referrer = clients.find(c => c.id === client.referrerId);
    if (referrer) {
      referrer.neuroPoints += REFERRAL_BONUS_POINTS;
      console.log(`Awarded ${REFERRAL_BONUS_POINTS} referral bonus points to ${referrer.name}.`);
      // In a real app, you might want to revalidate the referrer's page too.
      // revalidatePath(`/admin/client/${referrer.id}`);
    }
  }
  
  // 4. Check for discount
  if (client.neuroPoints >= 8000) {
    console.log("Discount threshold reached. Applying discount.");
    client.neuroPoints -= 8000;
    client.currentDiscountLevel += 1;
    // In a real app, you'd log this event to a 'discounts' collection.
  }

  // 5. Check for badge unlocks (simplified logic)
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
  const client = clients.find(c => c.id === clientId);
  if (!client) {
    return { success: false, message: "Client non trouvé." };
  }

  if (client.referrerId) {
     return { success: false, message: "Ce client a déjà un parrain." };
  }

  const referrer = clients.find(c => c.referralCode.toUpperCase() === referrerCode.toUpperCase());
  if (!referrer) {
    return { success: false, message: "Code de parrainage invalide." };
  }

  if (referrer.id === client.id) {
    return { success: false, message: "Vous ne pouvez pas vous parrainer vous-même." };
  }
  
  client.referrerId = referrer.id;
  console.log(`Client ${client.name} is now referred by ${referrer.name}`);
  revalidatePath(`/admin/client/${clientId}`);

  return { success: true, message: `Parrain ${referrer.name} assigné avec succès.` };
}

/**
 * Updates the name of a protocol.
 */
export async function updateProtocolName(formData: FormData) {
  const protocolId = formData.get("protocolId") as string;
  const newName = formData.get("name") as string;
  
  const protocol = protocols.find(p => p.id === protocolId);

  if (protocol) {
    protocol.name = newName;
    revalidatePath(`/admin/protocols/${protocolId}`);
    revalidatePath(`/admin/protocols`);
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

  const protocol = protocols.find(p => p.id === protocolId);
  if (!protocol) {
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
       revalidatePath(`/admin/protocols/${protocolId}`);
      return { success: true, message: "L'étape a été mise à jour." };
    }
    return { success: false, message: "Étape non trouvée." };
  } else {
    // Add new step
    const newStep: Step = {
      id: protocol.steps.length > 0 ? Math.max(...protocol.steps.map(s => s.id)) + 1 : 1,
      ...stepData,
    } as Step;
    protocol.steps.push(newStep);
    revalidatePath(`/admin/protocols/${protocolId}`);
    return { success: true, message: "Une nouvelle étape a été ajoutée." };
  }
}

/**
 * Creates a new protocol.
 */
export async function createProtocol(formData: FormData) {
  const name = formData.get("name") as string;
  if (!name) {
    return { success: false, message: "Le nom du protocole est requis." };
  }

  const newProtocol = {
    id: name.toLowerCase().replace(/\s+/g, '-'), // simple slug generation
    name: name,
    steps: [],
  };

  // Check for duplicate ID
  if (protocols.some(p => p.id === newProtocol.id)) {
     return { success: false, message: "Un protocole avec un ID similaire existe déjà." };
  }

  protocols.push(newProtocol);
  revalidatePath("/admin/protocols");
  return { success: true, message: "Nouveau protocole créé avec succès." };
}
