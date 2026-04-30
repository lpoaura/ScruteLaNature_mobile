import { StyleSheet } from 'react-native';
import theme from '../../styles/theme.style.js'

export default StyleSheet.create({
    container: {
		backgroundColor: theme.SECONDARY_COLOR,
        flexDirection: 'row',
        borderRadius: 30,
        paddingVertical: 7.5,
        paddingRight: 15,
        paddingLeft: 10,
        marginHorizontal: 4,
        flex: 1,
        alignItems: 'center',
    },

    text: {
        fontWeight: theme.FONT_WEIGHT_BOLD,
        color: theme.PRIMARY_COLOR,
		textAlign: 'center',
        marginLeft: 7.5,
        flexShrink: 1,
    },

    extraSpaceText: {
        fontWeight: theme.FONT_WEIGHT_BOLD,
        color: theme.PRIMARY_COLOR,
		textAlign: 'center',
        marginLeft: 10,
        flexShrink: 1,
    }
});