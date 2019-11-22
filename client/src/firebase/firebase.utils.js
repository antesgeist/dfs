import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: 'AIzaSyDhEAXVt5yqUrszRRu1qBQmZ8BWz_WtisM',
    authDomain: 'dfst-8311f.firebaseapp.com',
    databaseURL: 'https://dfst-8311f.firebaseio.com',
    projectId: 'dfst-8311f',
    storageBucket: 'dfst-8311f.appspot.com',
    messagingSenderId: '431067575070',
    appId: '1:431067575070:web:cdcf9734e59d3faa444f0f'
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()

    if (!snapShot.exists) {
        const { display_name, email } = userAuth
        const created_at = new Date()

        try {
            await userRef.set({
                display_name,
                email,
                created_at,
                ...additionalData
            })

            console.log('sign up success!')
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef
}

firebase.initializeApp(config)

export const addCollectionAndDocuments = async (
    firestore,
    docId,
    collectionKey,
    subCollectionKey,
    objectsToAdd
) => {
    const subCollectionsRef = firestore
        .collection(collectionKey)
        .doc(docId)
        .collection(subCollectionKey)

    const batch = firestore.batch()

    objectsToAdd.forEach(obj => {
        const newDocRef = subCollectionsRef.doc()

        batch.set(newDocRef, obj)
    })

    batch.commit()
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider)
export default firebase
