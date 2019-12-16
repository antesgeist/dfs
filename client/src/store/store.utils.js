import { firestore } from '../firebase/firebase.utils'

/* FORMAT WORKSPACE */

export const formatGroupSnapshots = snapshot =>
    snapshot.docs.reduce((cur, doc) => {
        const { id } = doc.data()
        return { ...cur, [id]: doc.data() }
    }, {})

export const formatSnapshotsForDispatch = async (
    groupId,
    collectionKey,
    nextKey
) => {
    const groupRef = firestore.collection(collectionKey).doc(groupId)

    const groupSnapshot = await groupRef.get()
    const { active, order } = groupSnapshot.data()

    const snapshots = await groupRef.collection('group').get()
    const data = formatGroupSnapshots(snapshots)

    const nextGroupId = data[active][nextKey]

    return {
        group: data,
        activeItem: active,
        order,
        nextGroupId
    }
}

/* FORMAT PANELS */

export const formatPanelSnapshots = snapshot =>
    snapshot.docs.reduce((cur, doc) => {
        const { id } = doc.data()
        return { ...cur, [id]: doc.data() }
    }, {})

export const formatPanelsForDispatch = async (
    groupId,
    collectionKey,
    nextKey
) => {
    const groupRef = firestore.collection(collectionKey).doc(groupId)

    const groupSnapshot = await groupRef.get()
    const { active, order } = groupSnapshot.data()

    const snapshots = await groupRef.collection('group').get()
    const data = formatPanelSnapshots(snapshots)

    // frame ids
    const frameGroupIds = order.map(panelId => data[panelId][nextKey])

    return {
        group: data,
        activeItem: active,
        order,
        frameGroupIds
    }
}

/* FORMAT FRAMES */

export const formatFramesSnapshots = snapshot =>
    snapshot.docs.reduce((cur, doc) => {
        const { id } = doc.data()
        return { ...cur, [id]: doc.data() }
    }, {})

export const formatFramesForDispatch = async (
    frameIds,
    collectionKey,
    nextKey
) => {
    // get doc where id in groupIds
    const frameGroups = await frameIds.reduce(async (cur, id) => {
        const groupRef = firestore.collection(collectionKey).doc(id)

        const groupSnapshot = await groupRef.get()
        const { active, order } = groupSnapshot.data()

        const snapshots = await groupRef.collection('group').get()
        const data = formatFramesSnapshots(snapshots)

        const nextGroupId = data[active][nextKey]

        return {
            ...(await cur),
            [id]: {
                group: data,
                activeItem: active,
                order,
                nextGroupId
            }
        }
    }, {})

    return frameGroups
}

export const formatFrameNodesForDispatch = async (
    frameNodesIds,
    collectionKey
) => {
    const frameNodes = await frameNodesIds.reduce(async (cur, id) => {
        const groupRef = firestore.collection(collectionKey).doc(id)

        const groupSnapshot = await groupRef.get()

        const data = groupSnapshot.data()

        return { ...(await cur), [id]: data }
    }, {})

    return frameNodes
}

/**
 * Firebase document query using parent document ID
 *
 * @query firestore.collection(key).doc(parentDocID).collection(subKey)
 *
 * @param {package} firestore Firestore package module
 * @param {array} idFiltersArray ID of each active panel on current workspace
 * @param {strings} collectionKey Key for collection query
 * @param {strings} subCollectionKey Key for sub-collection query
 */
export const fetchSubCollectionsByDocIds = async (
    firestore,
    idFiltersArray,
    collectionKey,
    subCollectionKey
) => {
    // fetch documents by id
    const queries = idFiltersArray.map(id =>
        firestore
            .collection(collectionKey)
            .doc(id)
            .collection(subCollectionKey)
    )

    const collectionRefs = await Promise.all(queries)

    // reduce and resolve promises
    const frameGroups = await collectionRefs.reduce(
        async (collectionObj, collectionRef) => {
            // returns querySnapshot object
            const querySnapshot = await collectionRef.get()

            const subCollectionArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

            return {
                ...(await collectionObj),
                [collectionRef.parent.id]: subCollectionArray
            }
        },
        {}
    )

    return frameGroups
}
