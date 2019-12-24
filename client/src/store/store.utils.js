import { firestore } from '../firebase/firebase.utils'

/* WORKSPACE */

export const formatWorkspaceSnapshots = snapshot =>
    snapshot.docs.reduce((cur, doc) => {
        const { id } = doc.data()
        return { ...cur, [id]: doc.data() }
    }, {})

export const formatWorkspaceForDispatch = async (
    groupId,
    collectionKey,
    nextKey
) => {
    const groupRef = firestore.collection(collectionKey).doc(groupId)

    // fetch workspaceGroup document (1)
    const groupSnapshot = await groupRef.get()
    const { active, order } = groupSnapshot.data()

    // fetch all workspace documents (n)
    const snapshots = await groupRef.collection('group').get()
    const data = formatWorkspaceSnapshots(snapshots)

    const nextGroupId = data[active][nextKey]

    return {
        group: data,
        activeItem: active,
        order,
        nextGroupId
    }
}

/* PANELS */

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

    // fetch panelGroup document (1)
    const groupSnapshot = await groupRef.get()
    const { active, order } = groupSnapshot.data()

    // fetch all panel documents (n)
    const snapshots = await groupRef.collection('group').get()
    const data = formatPanelSnapshots(snapshots)

    // frame ids; nextKey = 'frames'
    const frameGroupIds = order.map(panelId => data[panelId][nextKey])

    return {
        group: data,
        activeItem: active,
        order,
        frameGroupIds
    }
}

/* FRAMES */

export const formatFramesSnapshots = snapshot =>
    snapshot.docs.reduce((cur, doc) => {
        const { id } = doc.data()
        return { ...cur, [id]: doc.data() }
    }, {})

// todo: experiment on data aggregation to reduce the number of queries
export const formatFramesForDispatch = async (frameGroupIds, collectionKey) => {
    // get frameGroup document where id in frameGroupIds
    const frameGroups = await frameGroupIds.reduce(async (cur, id) => {
        const frameGroupRef = firestore.collection(collectionKey).doc(id)

        // fetch frameGroup document (1)
        const frameGroupSnapshot = await frameGroupRef.get()
        const { order } = frameGroupSnapshot.data()

        // fetch all frame documents IN THIS group (n)
        const framesSnapshot = await frameGroupRef.collection('group').get()
        const data = formatFramesSnapshots(framesSnapshot)

        return {
            ...(await cur),
            [id]: {
                group: data,
                order
            }
        }
    }, {})

    return frameGroups
}

/* FRAME-NODES */

export const formatFrameNodesForDispatch = async (
    workspaceId,
    collectionKey
) => {
    // fetch frame nodes by workspace
    const frameNodesRef = await firestore
        .collection(collectionKey)
        .where('workspace_id', '==', workspaceId)
        .get()

    // format frameNodes snapshots
    const frameNodes = frameNodesRef.docs.reduce((cur, doc) => {
        const frameNodes = doc.data()
        return { ...cur, [frameNodes.frame_id]: frameNodes }
    }, {})

    return frameNodes
}

/* NODES */

export const formatNodesForDispatch = frameNodesArr => {
    // normalized nodes to be populated
    const nodeGroup = {}

    // recursive normalizer
    const frameNodesForDispatch = nodesSnapshot =>
        nodesSnapshot.reduce((cur, frameData) => {
            const { frame_id, map } = frameData

            const allNodeIds = []
            const rootIds = []

            // track node depth to catch rootIds
            let depth = 1

            // normalize node tree
            const normalizeTree = nodeTree =>
                nodeTree.map(node => {
                    const nodeEmpty = node.descendant.length === 0

                    // only save root nodes
                    if (depth === 1) rootIds.push(node.id)

                    // save all nodeIds
                    allNodeIds.push(node.id)

                    // base case
                    if (nodeEmpty) {
                        nodeGroup[node.id] = node
                    } else {
                        depth++

                        // recursive case
                        nodeGroup[node.id] = {
                            ...node,
                            descendant: normalizeTree(node.descendant)
                        }
                    }

                    // save nodeId as reference to node.descendant
                    return node.id
                })

            // flatten map array into nodes
            normalizeTree(map)

            // return normalized frameNodes
            return {
                ...cur,
                [frame_id]: {
                    frameId: frame_id,
                    all: allNodeIds,
                    roots: rootIds
                }
            }
        }, {})

    return {
        nodeGroup,
        frameNodes: frameNodesForDispatch(frameNodesArr)
    }
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
