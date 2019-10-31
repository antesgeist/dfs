const users = [
    {
        id: 1,
        username: 'atlas',
        name: 'Atlas'
    },
    {
        id: 2,
        username: 'maverick',
        name: 'Maverick'
    },
    {
        id: 3,
        username: 'postfix',
        name: 'Postfix'
    }
]

const workspaces = [
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
    },
    {
        userId: 1,
        id: 4,
        title: 'New Frame',
        isActive: false
    }
]

const frames = [
    {
        userId: 1,
        workspaceId: 1,
        id: 1,
        order: 0,
        title: 'Initial Frame',
        descendant: [
            {
                id: 123123,
                value: 'Node Tree Mechanism',
                state: {
                    collapsed: false,
                    checked: false
                },
                descendant: [
                    {
                        id: 12345,
                        value: 'node view toggles',
                        state: {
                            collapsed: true,
                            checked: false
                        },
                        descendant: [
                            {
                                id: 1,
                                value: 'svg switch',
                                state: {
                                    collapsed: false,
                                    checked: false
                                },
                                descendant: []
                            },
                            {
                                id: 2,
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
                        id: 2,
                        value: 'add new node',
                        state: {
                            collapsed: true,
                            checked: false
                        },
                        descendant: []
                    },
                    {
                        id: 3,
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
                id: 2,
                value: 'Edit Mode',
                state: {
                    collapsed: false,
                    checked: false
                },
                descendant: [
                    {
                        id: 1,
                        value: 'toggle edit mode',
                        state: {
                            collapsed: true,
                            checked: false
                        },
                        descendant: []
                    },
                    {
                        id: 2,
                        value: 'hover buttons',
                        state: {
                            collapsed: true,
                            checked: false
                        },
                        descendant: []
                    }
                ]
            }
        ]
    }
]

export { users, workspaces, frames }
