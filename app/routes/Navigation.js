import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GamePage from './../pages/Game.page'
import SearchCommunePage from './../pages/SearchCommune.page'
import ParcoursChoicePage from './../pages/ParcoursChoice.page.js'
import CreditPage from './../pages/Credit.page'
import LeSaviezVousPage from './../pages/LeSaviezVous.page';
import JokePage from './../pages/Joke.page';
import FinParcoursPage from '../pages/FinParcours.page';
import QcmPage from './../pages/Qcm.page';
import GameOutcomePage from './../pages/GameOutcome.page';
import CodeGamePage from './../pages/CodeGame.page';
import CodeCesarPage from './../pages/CodeCesar.page';
import TransitionGPSPage from './../pages/TransitionGPS.page';
import CGUPage from './../pages/CGU.page';
import ListeParcoursLocalPage from './../pages/ListeParcoursLocal.page';
import TransitionInfoPage from '../pages/TransitionInfo.page';
import CompterImagePage from '../pages/CompterImage.page';
import CharadePage from './../pages/Charade.page';
import RebusPage from './../pages/Rebus.page';
import HomePage from './../pages/Home.page';
import EcoGestePage from './../pages/EcoGeste.page';
import ParcoursBeginPage from '../pages/ParcoursBegin.page.js';
import MapPage from '../pages/Map.page.js';
import ProfilPage from '../pages/Profil.page.js';
import PrincipesPage from '../pages/Principes.page.js';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from './../styles/theme.style';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PyramidPage from './../pages/Pyramid.page';
import FindIntruderPage from '../pages/FindIntruder.page';
import FindSilhouettePage from '../pages/FindSilhouette.page';
import HomeTab from '../pages/components/HomeTab/HomeTab.component.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/** Il s'agit du navigateur s'occupant des parcours
 *  Chaque type de page doit y être ajouté si cette dernière intervient dans un parcours
 * @returns 
 */

function HomeStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="HomePage"
				component={HomePage}
			/>
			<Stack.Screen
				name="SearchCommunePage"
				component={SearchCommunePage}
			/>
			<Stack.Screen
				name="PrincipesPage"
				component={PrincipesPage}
			/>
			<Stack.Screen
				name="CreditPage"
				component={CreditPage}

			/>
			<Stack.Screen
				name="ParcoursChoicePage"
				component={ParcoursChoicePage}
			/>
			<Stack.Screen
				name="GamePage"
				component={GamePage}
			/>
			<Stack.Screen
				name="LeSaviezVousPage"
				component={LeSaviezVousPage}
			/>
			<Stack.Screen
				name="JokePage"
				component={JokePage}
			/>
			<Stack.Screen
				name="FinParcoursPage"
				component={FinParcoursPage}
			/>

			<Stack.Screen
				name="QcmPage"
				component={QcmPage}
			/>
			<Stack.Screen
				name="GameOutcomePage"
				component={GameOutcomePage}
			/>
			<Stack.Screen
				name="FindIntruderPage"
				component={FindIntruderPage}
			/>

			<Stack.Screen
				name="PyramidPage"
				component={PyramidPage}
			/>
			<Stack.Screen
				name="CodeGamePage"
				component={CodeGamePage}
			/>
			<Stack.Screen
				name="CodeCesarPage"
				component={CodeCesarPage}
			/>
			<Stack.Screen
				name="TransitionGPSPage"
				component={TransitionGPSPage}
			/>
			<Stack.Screen
				name="CompterImagePage"
				component={CompterImagePage}
			/>
			<Stack.Screen
				name="TransitionInfoPage"
				component={TransitionInfoPage}
			/>
			<Stack.Screen
				name="CharadePage"
				component={CharadePage}
			/>
			<Stack.Screen
				name="RebusPage"
				component={RebusPage}
			/>
			<Stack.Screen
				name="FindSilhouettePage"
				component={FindSilhouettePage}
			/>
			<Stack.Screen
				name="EcoGestePage"
				component={EcoGestePage}
			/>

			<Stack.Screen
				name="ParcoursBeginPage"
				component={ParcoursBeginPage}
			/>
			<Stack.Screen
				name="MapPage"
				component={MapPage}
			/>
		</Stack.Navigator>

	)
}

/** Fonction s'occupant de la navigation de la barre en bas de l'écran.
 * Elle instancie également la navigation liée au parcours
 * 
 */
function Navigation(props) {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    height: 70,
                    paddingBottom: 10,
                    paddingTop: 10,
                    borderTopWidth: 0,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 10,
                    elevation: 10,
                },
                tabBarActiveTintColor: theme.PRIMARY_COLOR,
                tabBarInactiveTintColor: '#9AA5B1',
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                    marginTop: 2,
                },
            }}
            initialRouteName='Accueil'
        >
            <Tab.Screen
                name="Crédits"
                component={CreditPage}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Icon name={focused ? "information" : "information-outline"} color={focused ? theme.PRIMARY_COLOR : '#9AA5B1'} size={26}/>
                    ),
                }}
            />
            <Tab.Screen
                name="CGU"
                component={CGUPage}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Icon name={focused ? "file-document" : "file-document-outline"} color={focused ? theme.PRIMARY_COLOR : '#9AA5B1'} size={26}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Accueil"
                component={HomeStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <HomeTab focused={focused}/>
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? theme.PRIMARY_COLOR : '#9AA5B1', fontSize: 11, fontWeight: '600', marginTop: 2 }}>
                            Accueil
                        </Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Parcours"
                component={ListeParcoursLocalPage}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Icon name={focused ? "download" : "download-outline"} color={focused ? theme.PRIMARY_COLOR : '#9AA5B1'} size={26}/>
                    ),
                }}
            />

            <Tab.Screen
                name="Historique"
                component={ProfilPage}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Icon name={focused ? "trophy" : "trophy-outline"} color={focused ? theme.PRIMARY_COLOR : '#9AA5B1'} size={26}/>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default Navigation;
