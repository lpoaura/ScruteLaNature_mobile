import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, BackHandler, TextInput, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av'; // Import Audio from expo-av for sound handling
import styles from './CodeGame.component.style';
import TopBarre from '../../../components/TopBarre/TopBarre.component';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainTitle from './../../../components/MainTitle/MainTitle.component';
import NormalizeStrings from './../../../utils/normalizeStrings';
import * as FileSystem from 'expo-file-system';

class CodeGame extends Component {
    constructor(props) {
      super(props);
      // par défaut on utilise blockConfirm pour empêcher de passer à la page suivante
      this.state = {
          code: this.props.currentGame.code,
          blockConfirm: true,
          input: '',
          audio: null
      };
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      this.loadAudio();
    }
    
    componentWillUnmount() {
      if (this.backHandler) this.backHandler.remove();
      const { audio } = this.state;
      if (audio) {
          audio.unloadAsync();
          const fileUri = FileSystem.documentDirectory + 'temp_audio.mp3';
          FileSystem.deleteAsync(fileUri).catch(error => console.warn('Error deleting temporary audio file :', error.message));
      }
    }

    async loadAudio() {
      const audioURL = this.props.currentGame.audio_url;
      if (audioURL && audioURL !== '') {
          const { audio } = this.state;
          if (audio) {
              await audio.unloadAsync();
          }

          // Write the base64 string to a temporary file
          const fileUri = FileSystem.documentDirectory + 'temp_audio.mp3';
          await FileSystem.writeAsStringAsync(fileUri, audioURL, {
              encoding: FileSystem.EncodingType.Base64,
          });

        // Load the audio
          const newAudio = await Audio.Sound.createAsync(
              { uri: fileUri },
              { shouldPlay: false }
          );
          this.setState({ audio: newAudio.sound });
      }
    }

    async playSound() {
      const { audio } = this.state;
      if (audio) {
          console.log("playing audio");
          await audio.playAsync();
      }
    }

    /**
     * Permet de bloquer le retour arrière
     * @returns 
     */
    handleBackButtonClick() {
        return true;
    }

    /**
     * Permet d'éviter le spam click
     */
    handleConfirmClicked = () => {
      if (!this.state.confirmClicked) {
          this.setState({ confirmClicked: true });
      }
    }

    handleChange = (input) => {
      this.setState({ input: input });
    }

    render() {
      const paragraph = this.props.currentGame.texte;
      const etapeMax = this.props.parcoursInfo.etape_max;
      if (etapeMax === undefined) {
          var topBarreName = "";
      } else {
          var topBarreName = "Étape : " + this.props.currentGame.n_etape + "/" + etapeMax;
      }
      const title = this.props.currentGame.nom;
      const icone = require('./../../../assets/code_paysage_icone.png');
      const illustration = this.props.currentGame.image_url;
      return (
        <SafeAreaView style={styles.outsideSafeArea}>
          <TopBarre name={topBarreName} />
          <View style={styles.globalContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
              <View style={styles.card}>
                <MainTitle title={title} icone={icone} />
                {(illustration != '') && (<Image source={{ uri: illustration }} style={styles.areaImage} />)}
                <Text style={styles.description}>{paragraph}</Text>
                {this.props.currentGame.audio_url && (
                   <TouchableOpacity style={styles.audioButton} onPress={() => this.playSound()}>
                     <Text style={styles.audioButtonText}>🔊</Text>
                   </TouchableOpacity>)}
                <TextInput style={styles.inputTextField} onChangeText={this.handleChange} editable={true} placeholder="CODE" />
              </View>
              <View style={styles.rightAlign}>
                <TouchableOpacity
		              style={styles.bouton}
                  disabled={this.state.confirmClicked}
                  onPress={() => {
                    if (NormalizeStrings(this.state.code) == NormalizeStrings(this.state.input)) {
                      this.handleConfirmClicked();
                      this.props.navigation.navigate("GamePage", { parcoursInfo: this.props.parcoursInfo, parcours: this.props.parcours });
                    }
                    else {
                      Alert.alert("Mauvais code !");
                    }
                  }}>
                  <Text style={styles.boutonText}> {"Valider"} </Text>
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
    return <CodeGame {...props} navigation={navigation} />;
}
