import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TopBarre from '../../../components/TopBarre/TopBarre.component';
import styles from './Profil.component.style.js';
import databaseService from '../../../utils/localStorage';

const getMention = (percentage) => {
    if (percentage >= 90) return { text: 'Excellent !', color: '#0C8711' };
    if (percentage >= 75) return { text: 'Très bien !', color: '#4CAF50' };
    if (percentage >= 50) return { text: 'Bien !', color: '#FF9800' };
    if (percentage >= 25) return { text: 'À améliorer', color: '#F44336' };
    return { text: "Continue d'explorer !", color: '#9E9E9E' };
};

const getStars = (score, scoreMax) => {
    if (!scoreMax || scoreMax === 0) return '☆☆☆☆☆';
    const count = Math.round((score / scoreMax) * 5);
    return '⭐'.repeat(count) + '☆'.repeat(5 - count);
};

const formatDate = (isoDate) => {
    try {
        return new Date(isoDate).toLocaleDateString('fr-FR', {
            day: 'numeric', month: 'long', year: 'numeric'
        });
    } catch {
        return isoDate;
    }
};

function Profil() {
    const [history, setHistory] = useState([]);

    const loadHistory = useCallback(() => {
        databaseService.getFullHistory(
            (results) => setHistory(results),
            (err) => console.error(err)
        );
    }, []);

    useFocusEffect(loadHistory);

    const handleDeleteHistory = () => {
        Alert.alert(
            "Supprimer l'historique",
            "Êtes-vous sûr de vouloir supprimer tout l'historique des parties ?",
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Supprimer', style: 'destructive',
                    onPress: () => databaseService.deleteHistory(
                        () => setHistory([]),
                        (err) => console.error(err)
                    ),
                },
            ]
        );
    };

    const totalParties = history.length;
    const parcoursUniques = new Set(history.map(h => h.parcours_id)).size;
    const bestPercentage = history.length > 0
        ? Math.max(...history.map(h => h.score_max > 0 ? Math.round((h.score / h.score_max) * 100) : 0))
        : 0;
    const avgPercentage = history.length > 0
        ? Math.round(history.reduce((acc, h) => acc + (h.score_max > 0 ? (h.score / h.score_max) * 100 : 0), 0) / history.length)
        : 0;

    return (
        <SafeAreaView style={styles.outsideSafeArea}>
            <TopBarre name="Historique" />
            <View style={styles.globalContainer}>
                <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>

                    <View style={styles.statsGrid}>
                        <View style={styles.statsRow}>
                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>{totalParties}</Text>
                                <Text style={styles.statLabel}>Parties</Text>
                            </View>
                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>{parcoursUniques}</Text>
                                <Text style={styles.statLabel}>Parcours</Text>
                            </View>
                        </View>
                        <View style={styles.statsRow}>
                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>{bestPercentage}%</Text>
                                <Text style={styles.statLabel}>Meilleur</Text>
                            </View>
                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>{avgPercentage}%</Text>
                                <Text style={styles.statLabel}>Moyenne</Text>
                            </View>
                        </View>
                    </View>

                    {history.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Icon name="history" size={64} color="#C9E0AD" />
                            <Text style={styles.emptyText}>Aucune partie jouée pour l'instant.</Text>
                            <Text style={styles.emptySubText}>Lancez un parcours pour voir votre historique ici !</Text>
                        </View>
                    ) : (
                        history.map((game) => {
                            const pct = game.score_max > 0
                                ? Math.round((game.score / game.score_max) * 100)
                                : 0;
                            const mention = getMention(pct);
                            const stars = getStars(game.score, game.score_max);
                            return (
                                <View key={game.identifiant} style={styles.historyCard}>
                                    <View style={styles.historyTitleRow}>
                                        <Icon name="pine-tree" size={15} color="#0C8711" />
                                        <Text style={styles.historyTitle}>
                                            {game.titre || game.parcours_id}
                                        </Text>
                                    </View>

                                    <View style={styles.historySubRow}>
                                        <View style={[styles.mentionBadge, { backgroundColor: mention.color + '22', borderColor: mention.color + '66' }]}>
                                            <Text style={[styles.mentionBadgeText, { color: mention.color }]}>{mention.text}</Text>
                                        </View>
                                        <View style={styles.dateRow}>
                                            <Icon name="calendar-outline" size={11} color="#aaa" />
                                            <Text style={styles.historyDateText}>{formatDate(game.date)}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.separator} />

                                    <View style={styles.historyScoreSection}>
                                        <Text style={[styles.historyPercentage, { color: mention.color }]}>{pct}%</Text>
                                        <View style={styles.scoreRightColumn}>
                                            <View style={styles.scoreBarBg}>
                                                <View style={[styles.scoreBarFill, { width: `${pct}%`, backgroundColor: mention.color }]} />
                                            </View>
                                            <Text style={styles.historyStars}>{stars}</Text>
                                            <View style={styles.historyDetailRow}>
                                                <Icon name="check-circle-outline" size={12} color="#888" />
                                                <Text style={styles.historyDetailText}>
                                                    {game.score} / {game.score_max} bonne{game.score > 1 ? 's' : ''} rép.
                                                </Text>
                                            </View>
                                            {game.commune ? (
                                                <View style={styles.historyDetailRow}>
                                                    <Icon name="map-marker-outline" size={12} color="#888" />
                                                    <Text style={styles.historyDetailText}>{game.commune}</Text>
                                                </View>
                                            ) : null}
                                        </View>
                                    </View>
                                </View>
                            );
                        })
                    )}

                    {history.length > 0 && (
                        <View style={styles.deleteContainer}>
                            <TouchableOpacity onPress={handleDeleteHistory} style={styles.boutonDanger}>
                                <Icon name="trash-can-outline" size={16} color="#D32F2F" />
                                <Text style={styles.boutonDangerText}>Supprimer l'historique</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

export default Profil;

