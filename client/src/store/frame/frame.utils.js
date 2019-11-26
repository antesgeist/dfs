import nanoid from 'nanoid'

const createNewNode = prevSize => ({
    value: `New Node: ${Math.floor(Math.random() * 100)}`,
    state: {
        checked: false,
        collapsed: false
    },
    order: prevSize + 1,
    id: nanoid(),
    descendant: []
})

/**
 * Re order nodes
 *
 * @param {array} nodeDescendant Array list to re-order
 * @param {obj} nodeIndexMap dragEnd event results
 */
const reOrderNodes = (nodeDescendant, nodeIndexMap) =>
    nodeDescendant.map(node => {
        const { source, dest, draggableId } = nodeIndexMap

        // offset source/dest array indices to match order index
        const sourceOrder = source + 1
        const destOrder = dest + 1

        // set boundaries for to-be sorted nodes
        const lowerBound = Math.min(sourceOrder, destOrder)
        const upperBound = Math.max(sourceOrder, destOrder)

        // CASE 1: Out of bounds / base case
        if (node.order < lowerBound || node.order > upperBound) {
            return node
        }

        // CASE 2: Node === dragged item
        if (node.id === draggableId) {
            return {
                ...node,
                order: destOrder
            }
        }

        // CASE 3: Node in-between AND source is LESS THAN dest
        if (node.order > sourceOrder && node.order < destOrder) {
            return {
                ...node,
                order: node.order - 1
            }
        }

        // CASE 4: Node in-between AND source is GREATER THAN dest
        if (node.order < sourceOrder && node.order > destOrder) {
            return {
                ...node,
                order: node.order + 1
            }
        }

        // CASE 5: sourceOrder + 1 === destOrder
        if (node.order === destOrder && node.order > sourceOrder) {
            return {
                ...node,
                order: node.order - 1
            }
        }

        // CASE 6: sourceOrder - 1 === destOrder
        if (node.order === destOrder && node.order < sourceOrder) {
            return {
                ...node,
                order: node.order + 1
            }
        }
    })

/**
 * Traverse all nodes
 *
 * @param {str} parentId Parent ID reference
 * @param {str} nodeId Node ID reference
 * @param {array} descendant Node tree to traverse
 * @param {obj} nodeIndexMap dragEnd event results
 * @param {str/upper} actionType Dispatched custom actionType
 *
 * todo: create nodeMap/hashTable to optimize node searching
 * todo: explore tree object diffing
 */
const mapOverNodes = (parentId, nodeId, descendant, nodeIndexMap, actionType) =>
    descendant
        .sort((a, b) => a.order - b.order)
        .map(node => {
            /* base case */
            if (node.id !== nodeId && node.descendant.length === 0) return node

            switch (actionType) {
                case 'COLLAPSE':
                    return {
                        ...node,
                        state: {
                            ...node.state,
                            collapsed: !node.state.collapsed
                        }
                    }

                case 'CHECK':
                    return {
                        ...node,
                        state: {
                            ...node.state,
                            checked: !node.state.checked
                        }
                    }

                case 'APPEND':
                    if (node.id === nodeId) {
                        return {
                            ...node,
                            descendant: [
                                ...node.descendant,
                                createNewNode(node.descendant.length)
                            ]
                        }
                    }
                    break

                case 'DRAG':
                    if (node.id === parentId) {
                        return {
                            ...node,
                            descendant: reOrderNodes(
                                node.descendant,
                                nodeIndexMap
                            )
                        }
                    }
                    break

                default:
                    break
            }

            /* recursive case */
            if (node.descendant.length > 0) {
                return {
                    ...node,
                    descendant: mapOverNodes(
                        parentId,
                        nodeId,
                        node.descendant,
                        nodeIndexMap,
                        actionType
                    )
                }
            }
        })

/**
 * Map over frameGroups object state to update toggle node state
 *
 * @param {object} frameGroups All frame groups
 * @param {string} activeFramesKey Key to lookup target frameGroups array
 * @param {string} frameId To find matching frame id from array
 * @param {string} nodeId Used for recursive node search
 * @param {string/upper} type = ('CHECK', 'COLLAPSE') To distinct event-type dispatch
 */
export const mapNodeStates = (frameGroups, activeFramesKey, payload) => {
    const { frameId, parentId, nodeId, nodeIndexMap, type } = payload

    // updated frameGroups object state
    const frameGroupsObjectState = {
        ...frameGroups,
        [activeFramesKey]: frameGroups[activeFramesKey].map(frame => {
            const { id, descendant } = frame

            if (id !== frameId) return frame

            // frameId === destructured {id} from frame
            if (type === 'APPEND' && nodeId === undefined) {
                return {
                    ...frame,
                    descendant: [
                        ...descendant,
                        createNewNode(descendant.length)
                    ]
                }
            }

            if (type === 'DRAG' && frameId === parentId) {
                console.log(frameId, parentId, nodeId)
                return {
                    ...frame,
                    descendant: reOrderNodes(descendant, nodeIndexMap)
                }
            }

            return {
                ...frame,
                descendant: mapOverNodes(
                    parentId,
                    nodeId,
                    descendant,
                    nodeIndexMap,
                    type
                )
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
