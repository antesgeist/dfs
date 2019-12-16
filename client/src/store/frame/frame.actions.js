import FrameActionTypes from './frame.types'

import { formatFramesForDispatch } from '../store.utils'

import { fetchFrameNodesAsync } from '../frame-nodes/frame-nodes.actions'

export const fetchFramesStart = () => ({
    type: FrameActionTypes.FETCH_START
})

export const fetchFramesSuccess = (frameGroups, order) => ({
    type: FrameActionTypes.FETCH_SUCCESS,
    payload: { frameGroups, order }
})

export const fetchFramesFailure = errorMessage => ({
    type: FrameActionTypes.FETCH_SUCCESS,
    payload: errorMessage
})

export const setActiveFrameGroup = frameGroupId => ({
    type: FrameActionTypes.SET_ACTIVE_GROUP,
    payload: frameGroupId
})

export const fetchFramesAsync = frameGroupIds => async dispatch => {
    dispatch(fetchFramesStart())

    try {
        const fetchArgs = [frameGroupIds, 'frames', 'frame_nodes']

        const frameGroups = await formatFramesForDispatch(...fetchArgs)

        dispatch(fetchFramesSuccess(frameGroups, frameGroupIds))

        // this is awful, refactor this
        const frameNodeIds = frameGroupIds.map(id => {
            return frameGroups[id].order.reduce((cur, frameId) => {
                return frameGroups[id].group[frameId].frame_nodes
            }, '')
        })

        dispatch(fetchFrameNodesAsync(frameNodeIds))
    } catch (error) {
        dispatch(fetchFramesFailure(error.message))
    }
}

// const fnodes = {
//     frameNodes: {
//         frameNodesId: {
//             roots: [...],
//             all: [...]
//         },
//         frameNodesId: {
//             roots: [...],
//             all: [...]
//         },
//         frameNodesId: {
//             roots: [...],
//             all: [...]
//         },
//     }
// }

const frameGroups = {
    'BW2ORdrSt-LUQEHeASfZG': {
        group: {
            Td2AnwjfQVf_G56hLzMte: {
                frame_nodes: 'WEq3ZSU_4NQ77toZas6Q4' /* THIS */,
                id: 'Td2AnwjfQVf_G56hLzMte',
                last_modified: {
                    seconds: 1576341213,
                    nanoseconds: 591000000
                },
                title: 'Frame 1 Panel 1'
            },
            Td2AnwjfQVf_G56hLzMt1: {
                frame_nodes: 'WEq3ZSU_4NQ77toZas6Q4' /* THIS */,
                id: 'Td2AnwjfQVf_G56hLzMte',
                last_modified: {
                    seconds: 1576341213,
                    nanoseconds: 591000000
                },
                title: 'Frame 1 Panel 1'
            },
            Td2AnwjfQVf_G56hLzMt3: {
                frame_nodes: 'WEq3ZSU_4NQ77toZas6Q4' /* THIS */,
                id: 'Td2AnwjfQVf_G56hLzMte',
                last_modified: {
                    seconds: 1576341213,
                    nanoseconds: 591000000
                },
                title: 'Frame 1 Panel 1'
            }
        },
        activeItem: 'Td2AnwjfQVf_G56hLzMte',
        order: ['Td2AnwjfQVf_G56hLzMte'],
        nextGroupId: 'WEq3ZSU_4NQ77toZas6Q4'
    },
    ManualWC8819flGb8gikumzYvp: {
        group: {
            Lo2323EUXSwnkvRm0K23: {
                frame_nodes: 'qDx3kdXHBt3ETU4DYLqd' /* THIS */,
                id: 'Lo2323EUXSwnkvRm0K23',
                last_modified: {
                    seconds: 1576339200,
                    nanoseconds: 0
                },
                title: 'Frame 1 Panel 2'
            },
            Lo2323EUXSwnkvRm0K21: {
                frame_nodes: 'qDx3kdXHBt3ETU4DYLqd' /* THIS */,
                id: 'Lo2323EUXSwnkvRm0K23',
                last_modified: {
                    seconds: 1576339200,
                    nanoseconds: 0
                },
                title: 'Frame 1 Panel 2'
            }
        },
        activeItem: 'Lo2323EUXSwnkvRm0K23',
        order: ['Lo2323EUXSwnkvRm0K23'],
        nextGroupId: 'qDx3kdXHBt3ETU4DYLqd'
    }
}
