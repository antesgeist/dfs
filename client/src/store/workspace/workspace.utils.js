export const formatWorkspaceSnapshot = snapshot =>
    snapshot.docs.reduce((cur, doc) => {
        const { panel_groups } = doc.data()

        return [...panel_groups]
    }, [])
