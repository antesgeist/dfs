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

const mapOverNodes = (descendant, id) =>
    descendant.map(node => {
        if (node.id === id) {
            return {
                ...node,
                state: {
                    ...node.state,
                    collapsed: !node.state.collapsed
                }
            }
        }

        /* recursive case */
        if (node.descendant.length > 0) {
            return {
                ...node,
                descendant: mapOverNodes(node.descendant, id)
            }
        }

        /* base case */
        return node
    })

const mapOverFrames = (canvasFrames, nodeId) => {
    console.log(`nodeId: ${nodeId}`)

    const frames = canvasFrames.map(frame => ({
        ...frame,
        descendant: mapOverNodes(frame.descendant, nodeId)
    }))

    console.log(frames)

    return frames
}

const canvasReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CanvasActionTypes.FETCH_CANVAS_FRAMES:
            return {
                ...state,
                canvasFrames: action.payload
            }
        case CanvasActionTypes.TOGGLE_FRAME_NODE_VIEW:
            return {
                ...state,
                canvasFrames: mapOverFrames(state.canvasFrames, action.payload)
            }
        default:
            return state
    }
}

export default canvasReducer
