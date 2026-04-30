import { StyleSheet } from 'react-native';
import theme from '../../../styles/theme.style';
import common from '../../../styles/common.style.js';

export default StyleSheet.create({
    outsideSafeArea: {
        ...common.outsideSafeArea,
    },
    globalContainer: {
        ...common.globalContainer,
    },
    scrollViewContainer: {
        ...common.scrollViewContainer,
        paddingHorizontal: 12,
    },
    scrollView: {
        ...common.scrollView,
    },

    statsGrid: {
        marginTop: 16,
        marginBottom: 20,
        gap: 10,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 10,
    },
    statCard: {
        flex: 1,
        backgroundColor: theme.SECONDARY_LIGHT,
        borderRadius: 16,
        paddingVertical: 14,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: '800',
        color: theme.PRIMARY_COLOR,
    },
    statLabel: {
        fontSize: 11,
        fontWeight: '500',
        color: '#777',
        marginTop: 2,
    },

    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 50,
        gap: 12,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
        textAlign: 'center',
    },
    emptySubText: {
        fontSize: 13,
        color: '#999',
        textAlign: 'center',
        paddingHorizontal: 20,
    },

    historyCard: {
        backgroundColor: theme.BACKGROUND_COLOR_WHITE,
        borderRadius: 16,
        marginBottom: 12,
        padding: 14,
        shadowColor: 'rgba(0,0,0,0.07)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 2,
    },
    historyTitleRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 6,
        marginBottom: 8,
    },
    historyTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#222',
        flex: 1,
        lineHeight: 20,
    },
    historySubRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    mentionBadge: {
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderWidth: 1,
    },
    mentionBadgeText: {
        fontSize: 12,
        fontWeight: '700',
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },
    historyDateText: {
        fontSize: 11,
        color: '#aaa',
    },
    separator: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginBottom: 12,
    },
    historyScoreSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    historyPercentage: {
        fontSize: 30,
        fontWeight: '800',
        minWidth: 64,
        textAlign: 'center',
    },
    scoreRightColumn: {
        flex: 1,
        gap: 5,
    },
    scoreBarBg: {
        height: 6,
        backgroundColor: '#eee',
        borderRadius: 3,
        overflow: 'hidden',
    },
    scoreBarFill: {
        height: 6,
        borderRadius: 3,
    },
    historyStars: {
        fontSize: 13,
        letterSpacing: 1,
    },
    historyDetailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    historyDetailText: {
        fontSize: 12,
        color: '#777',
        flexShrink: 1,
    },

    deleteContainer: {
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 16,
    },
    boutonDanger: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        borderWidth: 1.5,
        borderColor: '#D32F2F',
    },
    boutonDangerText: {
        color: '#D32F2F',
        fontSize: 14,
        fontWeight: '600',
    },
});