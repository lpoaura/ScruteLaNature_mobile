import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';


export default function (props) {
    const navigation = useNavigation();

    const parcoursInfo = props.parcoursInfo; // nom et informations du parcours
    const currentGame = props.parcours[0]; // étape en cours

    // Copie pour éviter la mutation des props
    const parcoursWithScore = [...props.parcours];
    if (parcoursWithScore[parcoursWithScore.length - 1].type !== "score_data") {
        parcoursWithScore.push({ type: "score_data", score: 0, score_max: 0, parcoursId: props.parcoursId });
    }
    const size = parcoursWithScore.length;
    const parcours = parcoursWithScore.slice(1); // reste du parcours
    const currentGameWithSize = { ...currentGame, sizeleft: size - 2 };

    useEffect(() => {
        switch (currentGame.type) {
            case ("jeu_info"): {
                navigation.navigate("LeSaviezVousPage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGameWithSize });
                break;
            }
            
            case ("jeu_blague"): {
                navigation.navigate("JokePage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGameWithSize });
                break;
            }

            case ("jeu_qcm"): {
                navigation.navigate("QcmPage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGameWithSize });
                break;
            }

            case ("jeu_intrus"): {
                navigation.navigate("FindIntruderPage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGameWithSize });
                break;
            }

            case ("jeu_pyramide"): {
                navigation.navigate("PyramidPage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGameWithSize });
                break;
            }

            case ("transi_gps"): {
                navigation.navigate("TransitionGPSPage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGameWithSize });
                break;
            }

            case ("jeu_code"): {
                navigation.navigate("CodeGamePage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGameWithSize });
                break;
            }

            case ("jeu_cesar"): {
                navigation.navigate("CodeCesarPage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGameWithSize });
                break;
            }

            case ("jeu_compterimage"): {
                navigation.navigate("CompterImagePage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGameWithSize });
                break;
            }

            case ("transi_info"): {
                navigation.navigate("TransitionInfoPage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGameWithSize });
                break;
            }

            case ("jeu_charade"): {
                navigation.navigate("CharadePage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGameWithSize });
                break;
            }

            case ("jeu_rebus"): {
                navigation.navigate("RebusPage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGameWithSize });
                break;
            }

            case ("jeu_silhouette"): {
                navigation.navigate("FindSilhouettePage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGameWithSize });
                break;
            }

            case ("jeu_ecogeste"): {
                navigation.navigate("EcoGestePage", { parcoursInfo: parcoursInfo, parcours: parcours, currentGame: currentGameWithSize });
                break;
            }

            default:
                navigation.navigate("FinParcoursPage", { parcours: parcours, currentGame: parcoursWithScore[size - 1] });
                break;
        }
    }, [currentGame]) // re-run quand l'étape courante change (navigate réutilise l'instance)

    return null;
}
