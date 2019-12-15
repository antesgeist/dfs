export const formatWorkspaceSnapshot = snapshot =>
    snapshot.docs.reduce((cur, doc) => {
        const { id } = doc.data()
        return { [id]: doc.data() }
    }, {})
