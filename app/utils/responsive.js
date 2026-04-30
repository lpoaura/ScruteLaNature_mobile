import { Dimensions } from 'react-native';

export const TABLET_BREAKPOINT = 768;

const { width } = Dimensions.get('window');

export const isTablet = width >= TABLET_BREAKPOINT;
export const SCREEN_WIDTH = width;

/**
 * Retourne le nombre de colonnes selon la largeur de l'écran.
 * @param {number} screenWidth - Largeur actuelle (via useWindowDimensions)
 */
export function getNumColumns(screenWidth) {
    return screenWidth >= TABLET_BREAKPOINT ? 2 : 1;
}

/**
 * Retourne la largeur max des contenus principaux (évite l'étirement excessif sur grands écrans).
 * @param {number} screenWidth
 */
export function getMaxContentWidth(screenWidth) {
    return screenWidth >= TABLET_BREAKPOINT ? Math.min(screenWidth, 960) : screenWidth;
}
