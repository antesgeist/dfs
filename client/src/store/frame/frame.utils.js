import nanoid from 'nanoid'
import produce from 'immer'

const createNewNode = (prevSize = 0) => ({
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
 *
 * // todo: search for large array list re-ordering performance vs
 * // todo: ... splicing/re-ordering array by index
 * // todo: create custom mapping function within the array bounds only
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

const mutateDraftNode = (node, target, sourceOrder, destOrder) => {
    if (node.id === target) {
        // CASE 1: Node === dragged item
        node.order = destOrder
    } else if (node.order > sourceOrder && node.order < destOrder) {
        // CASE 2: Node in-between AND source is LESS THAN dest
        node.order -= 1
    } else if (node.order < sourceOrder && node.order > destOrder) {
        // CASE 3: Node in-between AND source is GREATER THAN dest
        node.order += 1
    } else if (node.order === destOrder && node.order > sourceOrder) {
        // CASE 4: sourceOrder + 1 === destOrder
        node.order -= 1
    } else if (node.order === destOrder && node.order < sourceOrder) {
        // CASE 5: sourceOrder - 1 === destOrder
        node.order += 1
    }
}

/**
 * Optimized Re-ordering Routine
 * Only accepts object as state argument
 *
 * @param {Object} draft - Mutable draft state
 * @param {Object} nodeIndexMap - DragEnd event result
 * @param {string} arrayActionType - Ordering action type
 */
const orderNodes = produce((draft, nodeIndexMap, actionType) => {
    // get dragEnd results
    const { source, dest, draggableId } = nodeIndexMap

    // set boundaries for to-be sorted nodes
    let lowerBound = Math.min(source, dest)
    const upperBound = Math.max(source, dest)

    // offset source/dest array indices to match order index
    const sourceOrder = source + 1
    const destOrder = dest + 1

    // modify array at indices within lower and upper bounds
    while (lowerBound <= upperBound) {
        const node = draft.array[lowerBound]

        mutateDraftNode(node, draggableId, sourceOrder, destOrder)

        lowerBound++
    }
})

/**
 *
 * @param {string} position NodeID reference
 */
// const appendChildNode = produce((draft, position) => {})

/**
 * Traverse all nodes
 *
 * @param {string} parentId Parent ID reference
 * @param {string} nodeId Node ID reference
 * @param {array} descendant Node tree to traverse
 * @param {Object} nodeIndexMap dragEnd event results
 * @param {string/upper} actionType Dispatched custom actionType
 *
 * todo: create nodeMap/hashTable to optimize node searching
 * todo: explore tree object diffing
 * todo: integrate immer
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
                        const { array } = orderNodes(
                            { array: node.descendant },
                            nodeIndexMap,
                            null
                        )

                        return {
                            ...node,
                            descendant: array
                        }
                    }
                    break

                case 'APPEND_AS_CHILD':
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

const mapOverNodesOptimized = produce(
    (descendant, parentId, nodeId, nodeIndexMap, actionType) => {
        descendant.map(node => {
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
                        const { array } = orderNodes(
                            { array: node.descendant },
                            nodeIndexMap,
                            null
                        )

                        return {
                            ...node,
                            descendant: array
                        }
                    }
                    break

                case 'APPEND_AS_CHILD':
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
    }
)
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
                const { array } = orderNodes(
                    { array: descendant },
                    nodeIndexMap,
                    null
                )

                return {
                    ...frame,
                    descendant: array
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

    /* 
        new state shape

        {
            users: { ... },
            workspace: { ... },
            panels: { ... },
            frames: { ... },
            nodes: { ... },
            comments: { ... },
        }
    */

    const collectionRefs = await Promise.all(queries)

    // reduce and resolve promises
    const frameGroups = await collectionRefs.reduce(
        async (collectionObj, collectionRef) => {
            const subCollectionArray = []

            // returns querySnapshot object
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
