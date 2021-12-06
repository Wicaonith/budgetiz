import { AngularFirestore, AngularFirestoreCollection, DocumentData, Query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entity } from '../interfaces/entity.interface';

/**
 * Fonction qui permet de transformer nos objets JS en objet que Firestore peut lire
 *
 * @param {T} object - Objet a transformer en JSON
 *
 * @returns {any} Objet transformer en JSON
 */
function firebaseSerialize<T>(object: T) {
    return JSON.parse(JSON.stringify(object));
}

/**
 * Class Service d'appel aux collections dans Firestore
 */
export class FirestoreCrudService<T extends Entity> {

    /** Référence la Collection du type T dans Firestore */
    private collection: AngularFirestoreCollection<T>;

    /**
     * Constructeur de la classe service FirestoreCrudService
     *
     * @param {AngularFirestore} afs - Le service d'accès a Firestore
     * @param {string} collectionName - Nom de la "table"
     */
    constructor(private afs: AngularFirestore, collectionName: string) {
        // Création d'un accès à firestore et de la table "collectionName"
        this.collection = this.afs.collection(collectionName);
    }

    /**
     * Ajout un Objet de type T en base.
     *
     * @param {T} entity - Objet à ajouter en base
     * @param {number} id - Facultatif - Identifiant qu'on veut donner en base
     *
     * @returns {Promise<T>} - Promesse
     */
    add(entity: T, id?: number): Promise<T> {
        // On crée un Objet de retour Typé
        return new Promise<T>((resolve) => {
            if (id) {
                // Si on a un ID, on l'utilise pour ajouter le document
                this.collection
                    .doc(id.toString())
                    .set({ ...entity })
                    .then(() => {
                        resolve(entity);
                    });
            } else {
                // Si on a pas d'ID, firestore a génère un automatiquement
                this.collection.add(firebaseSerialize(entity)).then(ref => {
                    const newentity = {
                        id: ref.id,
                        ...entity,
                    };
                    resolve(newentity);
                });
            }
        });
    }

    /**
     * Retourne un Objet en fonction de son identifiant
     *
     * @param {string} id - Identifiant de l'objet
     *
     * @returns {any} - Retourne l'objet voulu
     */
    get(id: string): any {
        return this.collection.doc<T>(id).snapshotChanges().pipe(
            // On map le document retourné en en Objet<T> JSON
            map(doc => {
                // Si l'objet existe, on le map
                if (doc.payload.exists) {
                    const data = doc.payload.data();
                    const payloadId = doc.payload.id;
                    return { id: payloadId, ...data };
                } else {
                    return undefined;
                }
            })
        );
    }

    /**
     * Retourne un Observable contenant la liste des Objets de la collection (table)
     *
     * @returns {<T[]>} - Retourne un Observable contenant la liste des Objets de la collection (table)
     */
    list(): Observable<T[]> {
        return this.collection.snapshotChanges().pipe(
            // On map le document retourné en en Objet<T> JSON
            map(changes => {
                return changes.map(a => {
                    const data = a.payload.doc.data() as T;
                    data.id = a.payload.doc.id;
                    return data;
                });
            })
        );
    }

    /**
     * Retourne la liste des Objets en fonction de l'idenfiant utilisateur
     *
     * @param {string} idUser - Identifiant utilisateur
     *
     * @returns {<>} Liste des Objets
     */
    listByUser(idUser: string): Query<DocumentData> {
        return this.collection.ref.where('idUser', '==', idUser);
    }

    /**
     * Retourne la liste des Objets en fonction de l'idenfiant utilisateur et du compte bancaire
     *
     * @param {string} idUser - Identifiant utilisateur
     * @param {string} account - Nom du compte
     *
     * @returns {<>} Liste des Objets
     */
    listByUserAndAccount(idUser: string, account: string): Query<DocumentData> {
        return this.collection.ref.where('idUser', '==', idUser).where('account.name', '==', account);
    }

    /**
     * Retourne la liste des Objets en fonction de l'idenfiant utilisateur et du nom de la catégorie
     *
     * @param {string} idUser - Identifiant utilisateur
     * @param {string} nameCategory - Nom de la catégorie
     *
     * @returns {<>} - Liste des Objets
     */
    listByUserAndCategory(idUser: string, nameCategory: string): Query<DocumentData> {
        return this.collection.ref.where('idUser', '==', idUser).where('category.name', '==', nameCategory);
    }

    /**
     * Met à jour en base l'Objet passé en paramètre
     *
     * @param {T} entity - Objet à mettre à jour
     *
     * @returns {Promise<void>} - Retour
     */
    update(entity: T): Promise<void> {
        return this.collection.doc<T>(entity.id?.toString()).set(entity, { merge: true });
    }

    /**
     * Supprime dans la table l'Objet lié a l'ID
     *
     * @param {string} id - Identiifiant de l'objet en base
     *
     * @returns {Promise<void>} - Retour
     */
    delete(id: string): Promise<void> {
        return this.collection.doc<T>(id?.toString()).delete();
    }
}
