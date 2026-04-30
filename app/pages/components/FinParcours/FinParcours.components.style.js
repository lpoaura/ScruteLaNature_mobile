import { StyleSheet } from 'react-native';
import common from '../../../styles/common.style.js'
import theme from '../../../styles/theme.style.js'

export default StyleSheet.create({
    card: {
        ...common.card
    },
    title: {
        ...common.title
    },
    description: {
        ...common.description
    },
    globalContainer: {
        ...common.globalContainer
    },
    image: {
        ...common.areaImage,
    },
    outsideSafeArea: {
        ...common.outsideSafeArea,
    },
    links: {
        ...common.description,
        color: 'blue',
    },
    scrollViewContainer: {
        ...common.scrollViewContainer
    },
    scrollView: {
        ...common.scrollView
    },

    scoreContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 16,
        paddingVertical: 20,
        paddingHorizontal: 16,
        backgroundColor: theme.SECONDARY_LIGHT,
        borderRadius: 20,
    },
    scorePercentage: {
        fontSize: 52,
        fontWeight: '800',
        color: theme.PRIMARY_COLOR,
        lineHeight: 60,
    },
    scoreStars: {
        fontSize: 26,
        marginVertical: 6,
        letterSpacing: 2,
    },
    scoreMention: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.PRIMARY_DARK,
        marginBottom: 4,
    },
    scoreDetail: {
        fontSize: 13,
        color: '#888888',
        fontWeight: '400',
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginVertical: 16,
        paddingHorizontal: 8,
    },
    boutonRecommencer: {
        flex: 1,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 30,
        backgroundColor: theme.PRIMARY_COLOR,
        alignItems: 'center',
        shadowColor: 'rgba(0,0,0,0.15)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 3,
    },
    boutonAccueil: {
        flex: 1,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: theme.PRIMARY_COLOR,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    boutonDisabled: {
        opacity: 0.5,
    },
    boutonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '700',
    },
    boutonTextSecondary: {
        color: theme.PRIMARY_COLOR,
        fontSize: 15,
        fontWeight: '700',
    },
});