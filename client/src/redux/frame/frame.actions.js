import frameActionTypes from './frame.types'

import {
    firestore,
    convertFrameGroupSnapshotToMap
} from '../../firebase/firebase.utils'

/* Fetch Frames */

export const fetchFramesStart = () => ({
    type: frameActionTypes.FETCH_START
})

export const fetchFramesSuccess = frameGroups => ({
    type: frameActionTypes.FETCH_SUCCESS,
    payload: frameGroups
})

export const fetchFramesFailure = errorMessage => ({
    type: frameActionTypes.FETCH_SUCCESS,
    payload: errorMessage
})

export const setActiveFrameGroup = frameGroupId => ({
    type: frameActionTypes.SET_ACTIVE_GROUP,
    payload: frameGroupId
})

/* 
    # data model

    frameGroups: {
        panelId1: [
            { ...frame1 },
            { ...frame2 },
            { ...frame3 },
        ],
        panelId2: [
            { ...frame1 },
            { ...frame2 },
            { ...frame3 },
        ],
        panelId3: [
            { ...frame1 },
            { ...frame2 },
            { ...frame3 },
        ],
    }
*/

export const fetchFramesAsync = framesFilter => dispatch => {
    dispatch(fetchFramesStart())

    // by parent doc id = collection.[parentDocID].subCollection.subCollDoc
    const fetchSubCollectionsByDocIds = async (
        collectionKey,
        idFilters,
        subCollectionKey
    ) => {
        // fetch documents by id
        const queries = idFilters.map(id =>
            firestore
                .collection(collectionKey)
                .doc(id)
                .collection(subCollectionKey)
        )

        const collectionRefs = await Promise.all(queries)

        // returns a promise
        const frameGroups = await collectionRefs.reduce(
            async (collectionObj, collectionRef) => {
                const subCollectionArray = []

                // returns unsubscribe function = void
                const collectionSnapshot = await collectionRef.get()

                // push each document(frame) into parent object
                collectionSnapshot.docs.forEach(doc =>
                    subCollectionArray.push({
                        id: doc.id,
                        ...doc.data()
                    })
                )

                return {
                    ...(await collectionObj),
                    [collectionRef.parent.id]: subCollectionArray
                }
            },

            // resolve promise on each iteration
            Promise.resolve()
        )

        return frameGroups
    }

    fetchSubCollectionsByDocIds('frames', framesFilter, 'frame_group')
        .then(frameGroups => {
            dispatch(fetchFramesSuccess(frameGroups))
        })
        .catch(error => dispatch(fetchFramesFailure(error.message)))
}

/* TOGGLES */

export const toggleNodeCollapse = ({ frameId, nodeId, type }) => ({
    type: frameActionTypes.TOGGLE_NODE_COLLAPSE,
    payload: { frameId, nodeId, type }
})

export const toggleNodeCheck = ({ frameId, nodeId, type }) => ({
    type: frameActionTypes.TOGGLE_NODE_CHECK_ONE,
    payload: { frameId, nodeId, type }
})
