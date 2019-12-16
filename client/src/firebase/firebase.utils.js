import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import nanoid from 'nanoid'

const config = {
    apiKey: 'AIzaSyDhEAXVt5yqUrszRRu1qBQmZ8BWz_WtisM',
    authDomain: 'dfst-8311f.firebaseapp.com',
    databaseURL: 'https://dfst-8311f.firebaseio.com',
    projectId: 'dfst-8311f',
    storageBucket: 'dfst-8311f.appspot.com',
    messagingSenderId: '431067575070',
    appId: '1:431067575070:web:cdcf9734e59d3faa444f0f'
}

export const createUserProfileDocument = async (
    userAuth,
    additionalData
) => {
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()

    if (!snapShot.exists) {
        const { email } = userAuth
        const { display_name } = additionalData
        const created_at = new Date()
        const last_login = new Date()
        const last_modified = new Date()

        try {
            /* 
                todo: extract these to document function creators
                todo: decouple automatic doc generation when data model is working
            */

            const workspaceGroupId = nanoid()
            const workspaceId = nanoid()
            const panelGroupId = nanoid()
            const panelId = nanoid()
            const frameGroupId = nanoid()
            const frameId = nanoid()
            const frameNodesId = nanoid()
            const nodeId = nanoid()

            const workspaceGroupRef = firestore
                .collection('workspaces')
                .doc(workspaceGroupId)
            const workspaceRef = workspaceGroupRef
                .collection('group')
                .doc(workspaceId)

            const panelGroupRef = firestore
                .collection('panels')
                .doc(panelGroupId)
            const panelRef = panelGroupRef
                .collection('group')
                .doc(panelId)

            const frameGroupRef = firestore
                .collection('frames')
                .doc(frameGroupId)
            const frameRef = frameGroupRef
                .collection('group')
                .doc(frameId)

            const frameNodesRef = firestore
                .collection('frame_nodes')
                .doc(frameNodesId)

            const nodesRef = firestore.collection('nodes').doc(nodeId)

            /* USER DOCS */

            await userRef.set({
                id: userRef.id,
                display_name,
                email,
                workspaces: workspaceGroupId,
                created_at,
                last_login
            })

            /* WORKSPACE DOCS */

            // workspace group for this user
            // many workspaces
            await workspaceGroupRef.set({
                active: workspaceId, // active workspace item
                order: [workspaceId] // workspace items
            })

            // single default workspace
            await workspaceRef.set({
                id: workspaceId,
                title: 'Workspace 1',
                panels: panelGroupId,
                last_modified
            })

            /* PANEL DOCS */

            // panel group for this workspace
            await panelGroupRef.set({
                active: panelId,
                order: [panelId]
            })

            // single default panel
            await panelRef.set({
                id: panelId,
                title: 'Panel 1',
                frames: frameGroupId,
                last_modified
            })

            /* FRAME DOCS */

            // frame group for this panel
            await frameGroupRef.set({
                active: frameId,
                order: [frameId]
            })

            await frameRef.set({
                id: frameId,
                title: 'Frame 1 Panel 1',
                frame_nodes: frameNodesId,
                last_modified
            })

            /* FRAME NODES DOCS */

            await frameNodesRef.set({
                roots: [nodeId],
                all: [nodeId]
            })

            /* NODES DOCS */

            await nodesRef.set({
                id: nodeId,
                title: 'Node 1',
                state: {
                    collapsed: false,
                    checked: false
                },
                descendant: [],
                last_modified
            })

            console.log('sign up success!')
        } catch (error) {
            console.log(`error creating user: ${error.message}`)
        }
    }

    return userRef
}

firebase.initializeApp(config)

/**
 * Create Firestore Collections and Documents
 */
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

/**
 * Import dummy data
 */
export const addCollectionNodes = async (
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
