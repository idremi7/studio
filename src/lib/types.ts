import type { LucideIcon } from "lucide-react";

export type UserRole = "client" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  neuroPoints: number;
  currentDiscountLevel: number; // 0 for 15%, 1 for 18%, etc.
  unlockedBadgeIds: string[];
  completedStepIds: number[];
  protocolId: string | null;
  referrerId?: string;
  referralCode: string;
}

export interface Step {
  id: number;
  name:string;
  description: string;
  points: number;
  bonusPoints?: number;
}

export interface Protocol {
  id: string;
  name: string;
  steps: Step[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface Discount {
  level: number;
  percentage: number;
  appliedAt: Date;
}
