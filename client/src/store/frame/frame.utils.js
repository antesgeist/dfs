import nanoid from 'nanoid'

const newNode = () => ({
    value: `New Node: ${Math.floor(Math.random() * 100)}`,
    state: {
        checked: false,
        collapsed: false
    },
    id: nanoid(),
    descendant: []
})

const mapOverNodes = (parentId, nodeId, descendant, actionType) => {
    return descendant.map(node => {
        /* base case */
        if (node.id !== nodeId && !node.descendant.length) return node

        // append node
        if (actionType === 'APPEND' && node.id === parentId) {
            return {
                ...node,
                descendant: [...node.descendant, newNode()]
            }
        }

        // toggle node
        if (node.id === nodeId) {
            let nodeState
            let stateKey

            switch (actionType) {
                case 'COLLAPSE':
                    nodeState = !node.state.collapsed
                    stateKey = 'collapsed'
                    break
                case 'CHECK':
                    nodeState = !node.state.checked
                    stateKey = 'checked'
                    break
                default:
                    break
            }

            return {
                ...node,
                state: {
                    ...node.state,
                    [stateKey]: nodeState
                }
            }
        }

        /* recursive case */
        if (node.descendant.length > 0) {
            return {
                ...node,
                descendant: mapOverNodes(
                    parentId,
                    nodeId,
                    node.descendant,
                    actionType
                )
            }
        }
    })
}

/**
 * Map over frameGroups object state to update toggle node state
 *
 * @param {object} frameGroups All frame groups object
 * @param {string} activeFramesKey Key to lookup target frameGroups array
 * @param {string} frameId To find matching frame id from array
 * @param {string} nodeId Used for recursive node search
 * @param {string/upper} type = ('CHECK', 'COLLAPSE') To distinct event-type dispatch
 *
 * @todo normalize to improve lookup
 */
export const mapNodeStates = (
    frameGroups,
    activeFramesKey,
    { frameId, parentId, nodeId, type }
) => {
    // updated frameGroups object state
    const frameGroupsObjectState = {
        ...frameGroups,
        [activeFramesKey]: frameGroups[activeFramesKey].map(frame => {
            const { id, descendant } = frame

            if (id !== frameId) return frame

            // frameId === destructured {id} from frame
            if (frameId === parentId && nodeId !== parentId) {
                return {
                    ...frame,
                    descendant: [...descendant, newNode()]
                }
            }

            return {
                ...frame,
                descendant: mapOverNodes(parentId, nodeId, descendant, type)
            }
        })
    }

    return frameGroupsObjectState
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

    const frameGroups = await collectionRefs.reduce(
        async (collectionObj, collectionRef) => {
            const subCollectionArray = []

            // returns unsubscribe function = void
            const querySnapshot = await collectionRef.get()

            querySnapshot.docs.forEach(doc =>
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
