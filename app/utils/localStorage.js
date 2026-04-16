import { getParcoursContents } from "./queries";
import NetInfo from "@react-native-community/netinfo";
import * as SQLite from 'expo-sqlite';

/**
 * Service de base de données locale (expo-sqlite v15 / Expo SDK 52)
 * 
 * Migration depuis expo-sqlite v13 (SDK 50) :
 * - openDatabase() → openDatabaseSync()
 * - db.transaction(tx => tx.executeSql()) → db.runSync() / db.getAllSync()
 * - Toutes les opérations DB sont désormais synchrones sauf le téléchargement réseau
 */
class LocalDatabaseService {
    constructor() {
        this.db = SQLite.openDatabaseSync('localdb');
        this.createTables();
    }

    createTables() {
        try {
            this.db.execSync(`
                CREATE TABLE IF NOT EXISTS Parcours (
                    identifiant TEXT PRIMARY KEY,
                    commune TEXT,
                    code_postal TEXT,
                    description TEXT,
                    difficulte TEXT,
                    duree TEXT,
                    etape_max TEXT,
                    image_url TEXT,
                    titre TEXT,
                    score TEXT,
                    score_max TEXT
                );
                CREATE TABLE IF NOT EXISTS Etapes (
                    identifiant TEXT PRIMARY KEY,
                    parcours_id TEXT,
                    etape_data TEXT,
                    FOREIGN KEY(parcours_id) REFERENCES Parcours(identifiant)
                );
                CREATE TABLE IF NOT EXISTS GameHistory (
                    identifiant INTEGER PRIMARY KEY AUTOINCREMENT,
                    parcours_id TEXT,
                    score INTEGER,
                    score_max INTEGER,
                    date TEXT
                );
            `);
            console.log('Parcours table created');
            console.log('Etapes table created');
            console.log('GameHistory table created');
        } catch (error) {
            console.log('Error creating tables:', error.message);
        }
    }

    // Retourne un objet compatible avec l'ancienne API : { rows: { length, item } }
    async checkParcours(identifiant) {
        try {
            const results = this.db.getAllSync(
                'SELECT * FROM Parcours WHERE identifiant = ?',
                [identifiant]
            );
            return {
                rows: {
                    length: results.length,
                    item: (i) => results[i],
                    _array: results,
                }
            };
        } catch (error) {
            console.error('Error checking parcours:', error);
            return { rows: { length: 0, item: () => null, _array: [] } };
        }
    }

    async telechargerParcoursContents(parcours, successCallback, errorCallback, internetErrorCallback) {
        try {
            const state = await NetInfo.fetch();
            if (!state.isInternetReachable) {
                internetErrorCallback();
                return;
            }

            console.log("Internet connection established");
            const result = await getParcoursContents(parcours.identifiant);
            const etapes = result.etapes;
            console.log("Firebase data fetched");

            this.db.withTransactionSync(() => {
                this.db.runSync(
                    'INSERT OR IGNORE INTO Parcours (identifiant, commune, image_url, code_postal, description, difficulte, duree, etape_max, titre) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [parcours.identifiant, parcours.commune, parcours.image_url, result.code_postal, parcours.description, parcours.difficulte, parcours.duree, parcours.etape_max, parcours.titre]
                );
                console.log("parcours inséré");

                etapes.forEach((etape) => {
                    this.db.runSync(
                        'INSERT OR IGNORE INTO Etapes (identifiant, parcours_id, etape_data) VALUES (?, ?, ?)',
                        [etape.id_etape, parcours.identifiant, JSON.stringify(etape)]
                    );
                });
                console.log(etapes.length, "étape(s) insérée(s)");
            });

            if (successCallback) successCallback();
        } catch (error) {
            errorCallback("Error while retrieving circuit content : " + error.message);
        }
    }

    saveGameInHistory(parcoursId, score, score_max, errorCallback) {
        try {
            this.db.runSync(
                'INSERT OR IGNORE INTO GameHistory (parcours_id, score, score_max, date) VALUES (?, ?, ?, ?)',
                [parcoursId, score, score_max, new Date().toISOString()]
            );
        } catch (error) {
            if (errorCallback) errorCallback("INSERT error : " + error.message);
        }
    }

    getParcours(identifiant, successCallback, errorCallback = (msg) => { console.error(msg); }) {
        try {
            const parcoursRows = this.db.getAllSync(
                'SELECT * FROM Parcours WHERE identifiant = ?',
                [identifiant]
            );

            if (parcoursRows.length > 0) {
                const parcoursGeneral = parcoursRows[0];
                console.log("parcours chargé");

                const etapeRows = this.db.getAllSync(
                    'SELECT * FROM Etapes WHERE parcours_id = ?',
                    [parcoursGeneral.identifiant]
                );

                const parcours = { general: parcoursGeneral, etapes: [] };
                for (let j = 0; j < etapeRows.length; j++) {
                    const etapeParsed = JSON.parse(etapeRows[j].etape_data);
                    parcours.etapes.push(etapeParsed);
                }
                console.log(etapeRows.length, "étapes chargées");
                successCallback(parcours);
            } else {
                console.log('No circuit found with this id');
            }
        } catch (error) {
            errorCallback("Local database error : " + error.message);
        }
    }

    getScores(identifiant, successCallback, errorCallback) {
        try {
            const result = this.db.getFirstSync(
                'SELECT max(score) localScore, max(score_max) localScoreMax FROM GameHistory WHERE parcours_id = ?',
                [identifiant]
            );
            successCallback(result || { localScore: null, localScoreMax: null });
        } catch (error) {
            errorCallback("GameHistory SELECT error : " + error.message);
        }
    }

    getAllCommunes(successCallback, errorCallback) {
        try {
            const results = this.db.getAllSync(
                'SELECT DISTINCT commune, code_postal FROM Parcours',
                []
            );
            const communes = results.map(
                (entry) => entry.commune + " (" + entry.code_postal + ")"
            );
            successCallback(communes);
        } catch (error) {
            errorCallback("SELECT error : " + error.message);
        }
    }

    async getAllParcours() {
        try {
            return this.db.getAllSync('SELECT * FROM Parcours', []);
        } catch (error) {
            console.error("Local database error : " + error.message);
            return [];
        }
    }

    getParcoursFromCommuneLocally(commune, successCallback, errorCallback) {
        try {
            const results = this.db.getAllSync(
                'SELECT * FROM Parcours WHERE commune = ?',
                [commune]
            );
            successCallback(results);
        } catch (error) {
            errorCallback("SELECT error : " + error.message);
        }
    }

    getHistory(successCallback, errorCallback) {
        try {
            const results = this.db.getAllSync('SELECT * FROM GameHistory', []);
            successCallback(results);
        } catch (error) {
            errorCallback("SELECT error : " + error.message);
        }
    }

    deleteParcours(id, successCallback, errorCallback) {
        try {
            this.db.withTransactionSync(() => {
                const parcoursResult = this.db.runSync(
                    'DELETE FROM Parcours WHERE identifiant = ?',
                    [id]
                );
                console.log("Parcours deleted");

                if (parcoursResult.changes === 0) {
                    throw new Error('Parcours not found');
                }

                this.db.runSync(
                    'DELETE FROM Etapes WHERE parcours_id = ?',
                    [id]
                );
                console.log("Etapes deleted");
            });
            successCallback();
        } catch (error) {
            errorCallback("Delete error : " + error.message);
        }
    }
}

const localDatabaseService = new LocalDatabaseService();
export default localDatabaseService;