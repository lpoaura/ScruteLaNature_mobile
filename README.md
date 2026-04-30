
# LPO Mobile App

PING 2023 


## Changelog

### Avril 2026

#### Corrections de bugs
- **Relancement de parcours** : correction du bug empêchant de relancer un parcours après l'avoir quitté ou terminé. `ParcoursBeginPage` utilise désormais `useFocusEffect` pour recharger les données et un `key` prop sur le bouton "Commencer" pour forcer son remontage à chaque fois que la page reprend le focus — le bouton est donc toujours actif.
- **Progression du jeu** : correction du bug bloquant la progression entre les étapes. `GamePage` utilise maintenant `useEffect([currentGame])` au lieu de `useEffect([])` pour se déclencher à chaque changement d'étape lorsque `navigate` réutilise l'instance existante.

#### Améliorations
- **Page Historique** : refonte de l'interface — grille 2×2 de statistiques (Parties, Parcours, Meilleur, Moyenne), badge coloré de mention, barre de progression du score, titre du parcours affiché en entier, date visible directement dans chaque entrée.
- **Liste des parcours** : correction de l'alignement des pills d'informations (durée, difficulté, commune) — chaque pill prend désormais un espace égal (`flex: 1`) quelle que soit la longueur du nom de la commune.


## Documentation

[Documentation](https://devops.telecomste.fr/antoine.axel/lpo-mobapp/-/wikis/Documentation)


![Logos](https://auvergne-rhone-alpes.lpo.fr/wp-content/uploads/LPO_AuRA.svg)


Project developped for [LPO Auvergne-Rhône-Alpes](https//auvergne-rhone-alpes.lpo.fr/)


## Realease et déploiement mobile

Pour déployer l'application, il est nécessaire de générer un .aab avec la même clé que le projet.

Pour cela, nous utilisons un compte ExpoGo combiné avec eas.

Étapes à suivre :
- Installer le module eas.
```bash
$ npm install -g eas-cli
```
- Se connecter au compte develloper de la lpo sur expo avec eas (demander à béatrice les logins mdp de l'app mobile, sinon demander à Tibo Preher).
```bash
$ eas login
```
- Builder le projet sur Expo :
```bash
$ eas build --platform android
```

L'utilisateur obtient alors un lien pour télécharger le .aab qu'il faudra mettre en ligne sur le compte
Google PlayStore. Il est important que chaque version mise en ligne ait un numéro de build
différent:
- Connexion à la console google playstore avec le compte devlpo : https://play.google.com/console/u/1/developers/7483810268087091411/app-list
- Choisir l'application Scrute la Nature
- Production -> Realease -> Modifier la version
- Uploader le fichier .aab telecharger aver le lien a la fin du build expo.
- Pousser la realease en prod, google va l'examiner (2 jours).
- Pousser la realease sur le playstore en confirmant.



## Contributors

- [@antoine.axel](https://devops.telecomste.fr/antoine.axel)
- [@thuel-chassaigne.mathis](https://devops.telecomste.fr/thuel-chassaigne.mathis)
- [@noiton.tanguy](https://devops.telecomste.fr/noiton.tanguy)
- [@van-den-bogaert.hugo](https://devops.telecomste.fr/van-den-bogaert.hugo)
- [@celotto.raphael](https://devops.telecomste.fr/celotto.raphael)
- Sarah-Marie Jules
- Houda Sbai
- Chems Jouaiti
- Mariam Khanfri
- Mathis Thuel-Chassaigne
- Tibo Preher
- Valentin Pontiggia
- Matthieu d'Hoop
- Romuald Dubois
- Cole Stannard
- Mickael Osorio
- Niels Kristen

