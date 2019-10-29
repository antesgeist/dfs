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
        nodes: [
            {
                id: 1,
                value: 'Node Tree Mechanism',
                state: {
                    expanded: true,
                    checked: false
                },
                descendant: [
                    {
                        id: 1,
                        value: 'node view toggles',
                        state: {
                            expanded: true,
                            checked: false
                        },
                        descendant: [
                            {
                                id: 1,
                                value: 'svg switch',
                                state: {
                                    expanded: true,
                                    checked: false
                                },
                                descendant: null
                            }
                        ]
                    },
                    {
                        id: 2,
                        value: 'add new node',
                        state: {
                            expanded: true,
                            checked: false
                        },
                        descendant: null
                    }
                ]
            },
            {
                id: 2,
                value: 'Edit Mode',
                state: {
                    expanded: true,
                    checked: false
                },
                descendant: [
                    {
                        id: 1,
                        value: 'toggle edit mode',
                        state: {
                            expanded: true,
                            checked: false
                        },
                        descendant: null
                    },
                    {
                        id: 2,
                        value: 'hover buttons',
                        state: {
                            expanded: true,
                            checked: false
                        },
                        descendant: null
                    }
                ]
            }
        ]
    }
]

export { users, workspaces, frames }
