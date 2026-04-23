import { StyleSheet } from 'react-native';
import theme from '../../../styles/theme.style';
import common from '../../../styles/common.style.js'

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: theme.CONTAINER_PADDING,
        alignItems: 'center',
        width: '100%',
    },

    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.LIGHT_GRAY_COLOR,
        borderRadius: 30,
        marginHorizontal: 15,
        marginVertical: 10,
        paddingRight: 10,
        paddingLeft: 20,
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 1,
    },

    textInputStyle: {
        flex: 1,
        fontSize: 18,
        marginLeft: 15,
        marginVertical: 15,
    },

    parcoursSeparator: {
        flex: 1
    },

    touchableItem: {
        backgroundColor: theme.BACKGROUND_COLOR_WHITE,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        marginHorizontal: 15,
        marginVertical: 4,
        shadowColor: 'rgba(0, 0, 0, 0.04)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 1,
    },

    textAreaStyle: {
        fontSize: theme.FONT_SIZE_LARGE,
        padding: 10,
        textAlign: 'left',
    },

    outsideSafeArea: {
        ...common.outsideSafeArea,
    },

    title: {
        ...common.title
    }
});
