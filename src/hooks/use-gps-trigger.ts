import { useEffect, useState, useRef } from 'react';
import * as Location from 'expo-location';
import * as Haptics from 'expo-haptics';
import { haversineDistance } from '../utils/distance';
import type { Etape } from '../types/api.types';

// Distance en mètres pour considérer qu'une étape est atteinte
const TRIGGER_DISTANCE_METERS = 15;

// Ne pas valider automatiquement une étape à partir d'une position trop
// imprécise : le point estimé peut se trouver dans le rayon alors que
// l'utilisateur est encore loin de l'étape.
const MAX_AUTO_TRIGGER_ACCURACY_METERS = 25;

interface UseGpsTriggerProps {
  etapes: Etape[];
  currentEtapeOrder: number;
  onStepReached: (etape: Etape) => void;
  isActive: boolean; // Permet de désactiver le trigger (ex: si le jeu est en pause ou déjà en cours)
}

export function useGpsTrigger({
  etapes,
  currentEtapeOrder,
  onStepReached,
  isActive,
}: UseGpsTriggerProps) {
  const [distanceToNext, setDistanceToNext] = useState<number | null>(null);
  const locationSubscription = useRef<Location.LocationSubscription | null>(null);
  
  // Le reste de l'écran utilise currentEtapeOrder comme une position (1-based)
  // dans la liste triée. Utiliser le même calcul ici garantit que le GPS
  // surveille bien l'étape affichée, même si les champs `order` sont décalés
  // ou non continus dans les données téléchargées.
  const targetEtape = etapes[Math.max(0, currentEtapeOrder - 1)];

  useEffect(() => {
    // Si pas actif ou pas d'étape cible, on ne fait rien
    if (!isActive || !targetEtape) {
      if (locationSubscription.current) {
        locationSubscription.current.remove();
        locationSubscription.current = null;
      }
      setDistanceToNext(null);
      return;
    }

    async function startWatching() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permission GPS non accordée pour le trigger');
        return;
      }

      // Si on écoute déjà, on annule l'ancien
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }

      locationSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 2, // Mise à jour tous les 2 mètres
          timeInterval: 2000, // ou toutes les 2 secondes
        },
        (location) => {
          const { latitude, longitude, accuracy } = location.coords;
          
          const distance = haversineDistance(
            latitude,
            longitude,
            targetEtape!.latitude,
            targetEtape!.longitude
          );

          setDistanceToNext(distance);

          // Si on est à l'intérieur du rayon de trigger
          const hasReliableAccuracy =
            accuracy !== null && accuracy <= MAX_AUTO_TRIGGER_ACCURACY_METERS;

          if (distance <= TRIGGER_DISTANCE_METERS && hasReliableAccuracy) {
            // Haptic Feedback puissant pour prévenir l'utilisateur
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            
            // On déclenche le callback
            onStepReached(targetEtape!);
          }
        }
      );
    }

    startWatching();

    return () => {
      if (locationSubscription.current) {
        locationSubscription.current.remove();
        locationSubscription.current = null;
      }
    };
  }, [isActive, targetEtape, onStepReached]);

  return { distanceToNext, targetEtape };
}
