import { BrainCircuit, Award, Star, Zap, ShieldCheck, Gem } from 'lucide-react';
import type { Badge, Protocol, User } from './types';

export const badges: Badge[] = [
  { id: 'starter', name: 'Débutant', description: 'Terminer la première étape', icon: Star },
  { id: 'session-master', name: 'Habitué', description: 'Compléter 5 sessions', icon: Zap },
  { id: 'finisher', name: 'Finisseur', description: 'Terminer tout le protocole', icon: Award },
  { id: 'point-master', name: 'Maître des Points', description: 'Atteindre 10,000 points', icon: BrainCircuit },
  { id: 'discount-achiever', name: 'Économe', description: 'Obtenir votre premier rabais', icon: ShieldCheck },
  { id: 'top-referrer', name: 'Parrain d\'Or', description: 'Parrainer 3 personnes', icon: Gem },
];

export const protocol: Protocol = {
  id: 'adhd-standard',
  name: 'Protocole standard TDAH',
  steps: [
    { id: 1, name: 'Rencontre initiale', description: 'Première consultation et évaluation', points: 500 },
    { id: 2, name: 'Évaluation EEG', description: 'Enregistrement de l\'activité cérébrale', points: 1000, bonusPoints: 250 },
    { id: 3, name: 'Session d\'entraînement 1', description: 'Première session de neurofeedback', points: 625 },
    { id: 4, name: 'Session d\'entraînement 2', description: 'Deuxième session de neurofeedback', points: 625 },
    { id: 5, name: 'Session d\'entraînement 3', description: 'Troisième session de neurofeedback', points: 625 },
    { id: 6, name: 'Session d\'entraînement 4', description: 'Quatrième session de neurofeedback', points: 625 },
    { id: 7, name: 'Session d\'entraînement 5', description: 'Cinquième session de neurofeedback', points: 625, bonusPoints: 200 },
    { id: 8, name: 'Évaluation intermédiaire', description: 'Bilan de mi-parcours', points: 800 },
    { id: 9, name: 'Session d\'entraînement 6', description: 'Sixième session de neurofeedback', points: 625 },
    { id: 10, name: 'Session d\'entraînement 7', description: 'Septième session de neurofeedback', points: 625 },
    { id: 11, name: 'Session d\'entraînement 8', description: 'Huitième session de neurofeedback', points: 625 },
    { id: 12, name: 'Session d\'entraînement 9', description: 'Neuvième session de neurofeedback', points: 625 },
    { id: 13, name: 'Session d\'entraînement 10', description: 'Dixième session de neurofeedback', points: 625, bonusPoints: 500 },
    { id: 14, name: 'Évaluation finale', description: 'Bilan de fin de parcours', points: 1500 },
  ],
};

export const clients: User[] = [
  {
    id: 'client1',
    name: 'Alice Martin',
    email: 'alice.martin@example.com',
    role: 'client',
    neuroPoints: 7500,
    currentDiscountLevel: 0,
    unlockedBadgeIds: ['starter', 'session-master'],
    completedStepIds: [1, 2, 3, 4, 5, 6, 7],
    protocolId: 'adhd-standard',
    referralCode: 'ALICE123',
  },
  {
    id: 'client2',
    name: 'Bob Dupont',
    email: 'bob.dupont@example.com',
    role: 'client',
    neuroPoints: 2125,
    currentDiscountLevel: 0,
    unlockedBadgeIds: ['starter'],
    completedStepIds: [1, 2, 3],
    protocolId: 'adhd-standard',
    referralCode: 'BOB456',
    referrerId: 'client1',
  },
  {
    id: 'client3',
    name: 'Carla Dubois',
    email: 'carla.dubois@example.com',
    role: 'client',
    neuroPoints: 9500,
    currentDiscountLevel: 1, // Already got one discount
    unlockedBadgeIds: ['starter', 'session-master', 'discount-achiever'],
    completedStepIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    protocolId: 'adhd-standard',
    referralCode: 'CARLA789'
  }
];

export const admins: User[] = [
    {
        id: 'admin1',
        name: 'Dr. Eve Adam',
        email: 'eve.adam@departneuro.com',
        role: 'admin',
        neuroPoints: 0,
        currentDiscountLevel: 0,
        unlockedBadgeIds: [],
        completedStepIds: [],
        protocolId: null,
        referralCode: 'ADMIN',
    }
]

export const allUsers = [...clients, ...admins];

export const discountTiers = [15, 18, 21, 25, 30];
export const DISCOUNT_THRESHOLD = 8000;
