import { StyleSheet } from 'react-native';
import theme from '../../styles/theme.style.js'
import common from '../../styles/common.style.js'

export default StyleSheet.create({
	title: {
		...common.title
	},

	card: {
		...common.card,
	},

	texte: {
		color: theme.DARK_GRAY_COLOR,
		marginBottom: 10,
	},

	texte_imp: {
		color: theme.DARK_GRAY_COLOR,
		fontWeight: theme.FONT_WEIGHT_BOLD,
	},

	imagecontainer: {
		width: 200,
		height: 200,
		marginBottom: 15,
		resizeMode: 'contain',
		alignSelf: 'center',
	},

	bouton: {
		...common.bouton,
		paddingHorizontal: 0,
		flex: 1,
		marginHorizontal: 5,
	},

	bouton2: {
		...common.bouton,
		paddingHorizontal: 0,
		flex: 1,
		marginHorizontal: 5,
		alignSelf: 'center',
	},

	boutonText: {
		...common.boutonText,
		flexGrow: 1,
		textAlignVertical: 'center',
	},

	rowFlex: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		textAlign: 'center',
		alignSelf: 'center',
	},

	infoRowFlex: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		alignSelf: 'center',
		marginBottom: 10, 
	},

    activityIndicator: {
        ...common.activityIndicator,
		marginVertical: 20,
    },

    activityIndicatorContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },

    downloadProgressContainer: {
        width: '100%',
        paddingVertical: 14,
        alignItems: 'center',
    },

    downloadProgressLabel: {
        fontSize: 13,
        color: '#555555',
        fontWeight: '500',
        marginBottom: 10,
    },

    progressBarTrack: {
        width: '100%',
        height: 12,
        backgroundColor: '#E8F5E9',
        borderRadius: 6,
        overflow: 'hidden',
        shadowColor: 'rgba(0,0,0,0.06)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 1,
    },

    progressBarFill: {
        height: '100%',
        backgroundColor: theme.PRIMARY_COLOR,
        borderRadius: 6,
    },

    progressPercentText: {
        fontSize: 15,
        color: theme.PRIMARY_COLOR,
        fontWeight: '700',
        marginTop: 8,
    },
})
