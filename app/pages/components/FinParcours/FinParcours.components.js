import React, { Component } from 'react';
import { View, Text, TouchableOpacity, BackHandler, Linking, ScrollView } from 'react-native';
import styles from './FinParcours.components.style';
import TopBarre from '../../../components/TopBarre/TopBarre.component';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainTitle from '../../../components/MainTitle/MainTitle.component';
import databaseService from '../../../utils/localStorage';

class FinParcoursPage extends Component {
    constructor(props) {
        super(props);
        this.state = { buttonsDisabled: false };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    // empêche le retour en arrière de la page
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

        const score = this.props.currentGame.score;
        const scoremax = this.props.currentGame.score_max;
        const parcoursId = this.props.currentGame.parcoursId;
        databaseService.saveGameInHistory(parcoursId, score, scoremax,
            (errorMessage) => { console.error(errorMessage); }
        );
    }

    componentWillUnmount() {
        if (this.backHandler) this.backHandler.remove();
    }
    
    handleBackButtonClick() {
        return true;
    }

    render() {
        const icone = require('./../../../assets/fin_parcours_icone.png');
        const score = this.props.currentGame.score;
        const scoremax = this.props.currentGame.score_max;
        const parcoursId = this.props.currentGame.parcoursId;
        const title = "Félicitations !";

        const percentage = scoremax > 0 ? Math.round((score / scoremax) * 100) : 0;
        const starsCount = scoremax > 0 ? Math.round((score / scoremax) * 5) : 0;
        const starsDisplay = '⭐'.repeat(starsCount) + '☆'.repeat(5 - starsCount);
        let mention;
        if (percentage >= 90) mention = "Excellent !";
        else if (percentage >= 75) mention = "Très bien !";
        else if (percentage >= 50) mention = "Bien !";
        else if (percentage >= 25) mention = "À améliorer";
        else mention = "Continue d’explorer !";

        return (
            <SafeAreaView style={styles.outsideSafeArea}>
                <TopBarre name="Fin de parcours" />
                <View style={styles.globalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
                        <View style={styles.card}>
                            <MainTitle title={title} icone={icone} />

                            <View style={styles.scoreContainer}>
                                <Text style={styles.scorePercentage}>{percentage} %</Text>
                                <Text style={styles.scoreStars}>{starsDisplay}</Text>
                                <Text style={styles.scoreMention}>{mention}</Text>
                                <Text style={styles.scoreDetail}>{score} bonne{score > 1 ? 's' : ''} réponse{score > 1 ? 's' : ''} sur {scoremax}</Text>
                            </View>

                            <Text style={styles.description}>{'Partez à l’exploration des autres parcours ! Ils ont tous leurs propres trucs et astuces pour favoriser le vivant et préserver nos ressources !'}</Text>
                            <Text style={styles.description}>{'Ou'}</Text>
                            <Text style={styles.description}>{'Allez sur ces sites internet :'}</Text>
                            <TouchableOpacity onPress={() => Linking.openURL('https://auvergne-rhone-alpes.lpo.fr/s-engager/ ')}>
                                <Text style={styles.links}>LPO Auvergne-Rhône-Alpes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Linking.openURL('https://engageepourlanature.saint-etienne-metropole.fr/citoyens/ ')}>
                                <Text style={styles.links}>Saint-Étienne Métropole engagée pour la nature</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Linking.openURL('https://www.ofb.gouv.fr/grand-public-et-citoyens')}>
                                <Text style={styles.links}>Office Français de la Biodiversité</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Linking.openURL('https://www.oelie-eau.fr/eau-et-environnement/respecter-lenvironnement')}>
                                <Text style={styles.links}>Maison de l’eau</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                disabled={this.state.buttonsDisabled}
                                style={[styles.boutonRecommencer, this.state.buttonsDisabled && styles.boutonDisabled]}
                                onPress={() => {
                                    this.setState({ buttonsDisabled: true });
                                    this.props.navigation.reset({
                                        index: 1,
                                        routes: [
                                            { name: 'HomePage' },
                                            { name: 'ParcoursBeginPage', params: { identifiant: parcoursId } },
                                        ],
                                    });
                                }}
                            >
                                <Text style={styles.boutonText}>Recommencer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                disabled={this.state.buttonsDisabled}
                                style={[styles.boutonAccueil, this.state.buttonsDisabled && styles.boutonDisabled]}
                                onPress={() => {
                                    this.setState({ buttonsDisabled: true });
                                    this.props.navigation.navigate('HomePage', { parcours: this.props.parcours });
                                }}
                            >
                                <Text style={styles.boutonTextSecondary}>Retour accueil</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

export default function (props) {
    const navigation = useNavigation();
    return <FinParcoursPage {...props} navigation={navigation} />
}
