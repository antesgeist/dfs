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
