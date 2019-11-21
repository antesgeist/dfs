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

export const formatWorkspaceSnapshot = snapshot =>
    snapshot.docs.reduce((cur, doc) => {
        const { panel_groups } = doc.data()

        return [...panel_groups]
    }, [])

export const convertPanelGroupSnapshotToMap = (snapshot, arrayFilter) => {
    const transformedSnapshotObject = snapshot.docs
        .filter(doc => arrayFilter.includes(doc.id))
        .reduce((cur, doc) => {
            const { size, frames_uid, title, order, is_active } = doc.data()

            return {
                ...cur,
                [doc.id]: {
                    title,
                    size,
                    order,
                    is_active,
                    frames_uid
                }
            }
        }, {})

    const transformedSnapshotArray = snapshot.docs
        .filter(doc => arrayFilter.includes(doc.id))
        .map(doc => {
            const { size, frames_uid, title, order, is_active } = doc.data()

            return {
                id: doc.id,
                title,
                size,
                order,
                is_active,
                frames_uid
            }
        })

    return { transformedSnapshotObject, transformedSnapshotArray }
}

export const convertFrameGroupSnapshotToMap = snapshot => {
    const transformSnapshotToArray = snapshot.docs.map(doc => {
        const { title, order, descendant } = doc.data()

        return {
            id: doc.id,
            title,
            order,
            descendant
        }
    })

    const transformSnapshotToObject = snapshot.docs.reduce((cur, doc) => {
        const { title, order, descendant } = doc.data()

        return {
            ...cur,
            [doc.id]: {
                id: doc.id,
                title,
                order,
                descendant
            }
        }
    }, {})

    return transformSnapshotToArray
}

firebase.initializeApp(config)

export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
    // root collection
    // const collectionsRef = firestore.collection(collectionKey)

    // sub collection - workspaceGroup
    // const subCollectionsRef = firestore
    //     .collection(collectionKey)
    //     .doc('GOQSge82qDQtUX3Brv6B')
    //     .collection('workspaceItems')

    // sub collection - frameGroup
    const subCollectionsRef = firestore
        .collection(collectionKey)
        .doc('POdx5llTr66TimqHhv0V')
        .collection('frameGroup')

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
