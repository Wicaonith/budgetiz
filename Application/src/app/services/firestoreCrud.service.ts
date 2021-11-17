import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// We need a function that will turn our JS Objects into an Object
// that Firestore can work with
function firebaseSerialize<T>(object: T) {
    return JSON.parse(JSON.stringify(object));
}

// We need a base Entity interface that our models will extend
export interface Entity {
    id?: string; // Optional for new entities
}

export class FirestoreCrudService<T extends Entity> {
    // Reference to the Collection in Firestore
    private collection: AngularFirestoreCollection<T>;

    /* We need to ask for the AngularFirestore Injectable
     * and a Collection Name to use in Firestore
     */
    constructor(private afs: AngularFirestore, collectionName: string) {
        // We then create the reference to this Collection
        this.collection = this.afs.collection(collectionName);
    }

    /**
     * We look for the Entity we want to add as well
     * as an Optional Id, which will allow us to set
     * the Entity into a specific Document in the Collection
     */
    add(entity: T, id?: string): Promise<T> {
        // We want to create a Typed Return of the added Entity
        return new Promise<T>((resolve) => {
            if (id) {
                console.log("add: " + id);
                // If there is an ID Provided, lets specifically set the Document
                this.collection
                    .doc(id)
                    .set({ ...entity })
                    .then(() => {
                        resolve(entity);
                    });
            } else {
                // If no ID is set, allow Firestore to Auto-Generate one
                this.collection.add(firebaseSerialize(entity)).then(ref => {
                    // Let's make sure we return the newly added ID with Model
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
     * Our get method will fetch a single Entity by it's ID
     */
    get(id: string): any {
        return this.collection.doc<T>(id).snapshotChanges().pipe(
            // We want to map the document into a Typed JS Object
            map(doc => {
                // Only if the entity exists should we build an object out of it
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

    /*
     * Our list method will get all the Entities in the Collection
     */
    list(): Observable<T[]> {
        return this.collection.snapshotChanges().pipe(
            // Again we want to build a Typed JS Object from the Document
            map(changes => {
                return changes.map(a => {
                    const data = a.payload.doc.data() as T;
                    data.id = a.payload.doc.id;
                    return data;
                });
            })
        );
    }

    /* Our Update method takes the full updated Entity
     * Including it's ID property which it will use to find the
     * Entity. This is a Hard Update.
     */
    update(entity: T): Promise<T> {
        return new Promise<T>((resolve) => {
            this.collection
                .doc<T>(entity.id as string)
                .set(firebaseSerialize(entity))
                .then(() => {
                    resolve({
                        ...entity,
                    });
                });
        });
    }

    delete(id: string): Promise<void> {
        return new Promise<void>((resolve) => {
            this.collection
                .doc<T>(id)
                .delete()
                .then(() => {
                    resolve();
                });
        });
    }
}