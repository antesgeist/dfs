export const formatSnapshotData = snapshotData => {
    const {
        created_at,
        display_name,
        email,
        id,
        last_login,
        workspaces
    } = snapshotData

    return {
        id,
        displayName: display_name,
        email,
        workspaces,
        createdAt: created_at.toDate(),
        lastLogin: last_login.toDate()
    }
}
