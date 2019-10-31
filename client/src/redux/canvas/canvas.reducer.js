import CanvasActionTypes from './canvas.types'

const INITIAL_STATE = {
    found: true,
    canvasFrames: [
        {
            userId: 1,
            workspaceId: 1,
            id: 1,
            order: 0,
            title: 'Initial Frame',
            descendant: [
                {
                    id: 1122,
                    value: 'Node Tree Mechanism',
                    state: {
                        collapsed: false,
                        checked: false
                    },
                    descendant: [
                        {
                            id: 1234,
                            value: 'node view toggles',
                            state: {
                                collapsed: false,
                                checked: false
                            },
                            descendant: [
                                {
                                    id: 111,
                                    value: 'svg switch',
                                    state: {
                                        collapsed: false,
                                        checked: false
                                    },
                                    descendant: []
                                },
                                {
                                    id: 222,
                                    value: 'use parent context sssss',
                                    state: {
                                        collapsed: false,
                                        checked: false
                                    },
                                    descendant: []
                                }
                            ]
                        },
                        {
                            id: 2345,
                            value: 'add new node',
                            state: {
                                collapsed: true,
                                checked: false
                            },
                            descendant: []
                        },
                        {
                            id: 3456,
                            value: 'node states',
                            state: {
                                collapsed: true,
                                checked: false
                            },
                            descendant: []
                        }
                    ]
                },
                {
                    id: 2233,
                    value: 'Edit Mode',
                    state: {
                        collapsed: false,
                        checked: false
                    },
                    descendant: [
                        {
                            id: 112233,
                            value: 'toggle edit mode 1',
                            state: {
                                collapsed: false,
                                checked: false
                            },
                            descendant: []
                        },
                        {
                            id: 223344,
                            value: 'hover buttons',
                            state: {
                                collapsed: false,
                                checked: false
                            },
                            descendant: [
                                {
                                    id: 123123,
                                    value: 'toggle edit mode under 1.1',
                                    state: {
                                        collapsed: false,
                                        checked: false
                                    },
                                    descendant: [
                                        {
                                            id: 121212,
                                            value:
                                                'toggle edit mode under 1.1.1',
                                            state: {
                                                collapsed: false,
                                                checked: false
                                            },
                                            descendant: []
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

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

// Export as separate frame reducer / selector
const mapOverFrames = (canvasFrames, nodeId, toggleType) =>
    canvasFrames.map(frame => ({
        ...frame,
        descendant: mapOverNodes(frame.descendant, nodeId, toggleType)
    }))

const canvasReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case CanvasActionTypes.FETCH_CANVAS_FRAMES:
            return {
                ...state,
                canvasFrames: payload
            }
        case CanvasActionTypes.TOGGLE_NODE_COLLAPSE:
            return {
                ...state,
                canvasFrames: mapOverFrames(
                    state.canvasFrames,
                    payload.id,
                    payload.type
                )
            }
        case CanvasActionTypes.TOGGLE_NODE_CHECK_ONE:
            return {
                ...state,
                canvasFrames: mapOverFrames(
                    state.canvasFrames,
                    payload.id,
                    payload.type
                )
            }
        default:
            return state
    }
}

export default canvasReducer
