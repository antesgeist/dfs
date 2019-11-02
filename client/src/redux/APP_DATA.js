export const users = {
    firebaseUUID1: {
        id: 1,
        workspaceUID: 'userworkspace1',
        email: 'atlas@mail.com',
        username: 'atlas',
        name: 'Atlas',
        sessionState: []
    },
    firebaseUUID2: {
        id: 2,
        workspaceUID: 'userworkspace2',
        email: 'maverick@mail.com',
        username: 'maverick',
        name: 'Maverick',
        sessionState: []
    },
    firebaseUUID3: {
        id: 3,
        workspaceUID: 'userworkspace3',
        email: 'postfix@mail.com',
        username: 'postfix',
        name: 'Postfix',
        sessionState: []
    }
}

export const workspacesDB = {
    userworkspace1: [
        {
            id: 1,
            framesUID: 'framesUID1',
            title: 'Frame Tree',
            isActive: true
        },
        {
            id: 2,
            framesUID: 'framesUID2',
            title: 'Canvas Features',
            isActive: false
        },
        {
            id: 3,
            framesUID: 'framesUID3',
            title: 'Frame Maximize',
            isActive: false
        }
    ],
    userworkspace2: {
        id: 999,
        workspaces: [
            {
                id: 1,
                framesUID: 'framesUID4',
                title: 'Frame Tree',
                isActive: true
            },
            {
                id: 2,
                framesUID: 'framesUID5',
                title: 'Canvas Features',
                isActive: false
            },
            {
                id: 3,
                framesUID: 'framesUID6',
                title: 'Frame Maximize',
                isActive: false
            }
        ]
    }
}

export const workspaces = [
    {
        userId: 1,
        id: 1,
        title: 'Frame Tree',
        isActive: true
    },
    {
        userId: 1,
        id: 2,
        title: 'Canvas Features',
        isActive: false
    },
    {
        userId: 1,
        id: 3,
        title: 'Frame Maximize',
        isActive: false
    }
]

export const framesDB = {
    framesUID1: [
        {
            id: 101,
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
                            descendant: []
                        }
                    ]
                }
            ]
        }
    ]
}

export const workspaceFrames = [
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
                        descendant: []
                    }
                ]
            }
        ]
    }
]
