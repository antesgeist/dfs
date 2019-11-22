const mapOverNodes = (descendant, id, toggleType) =>
    descendant.map(node => {
        if (node.id === id) {
            let toggleAction
            let stateProperty

            switch (toggleType) {
                case 'COLLAPSE':
                    toggleAction = !node.state.collapsed
                    stateProperty = 'collapsed'
                    break
                case 'CHECK':
                    toggleAction = !node.state.checked
                    stateProperty = 'checked'
                    break
                default:
                    break
            }

            return {
                ...node,
                state: {
                    ...node.state,
                    [stateProperty]: toggleAction
                }
            }
        }

        /* recursive case */
        if (node.descendant.length > 0) {
            return {
                ...node,
                descendant: mapOverNodes(node.descendant, id, toggleType)
            }
        }

        /* base case */
        return node
    })

export const mapToggleStates = (frames, { frameId, nodeId, type }) =>
    frames.map(frame => {
        const { id, descendant } = frame

        if (id !== frameId) {
            return frame
        }

        return {
            ...frame,
            descendant: mapOverNodes(descendant, nodeId, type)
        }
    })

// by parent doc id = collection.[parentDocID].subCollection.subCollDoc
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
