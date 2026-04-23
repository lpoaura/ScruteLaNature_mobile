import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    tabContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: '#0C8711',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
        marginTop: -20,
        borderWidth: 4,
        borderColor: '#ffffff',
        shadowColor: '#0C8711',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    tabText: {
        color: 'white',
        fontSize: 12,
    },
});