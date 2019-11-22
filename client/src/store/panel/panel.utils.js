export const transformPanelSnapshot = (snapshot, panelFilter) =>
    snapshot.docs
        .filter(doc => panelFilter.includes(doc.id))
        .map(doc => {
            const { size, frames_uid, title, order, is_active } = doc.data()

            return {
                id: doc.id,
                title,
                size,
                order,
                is_active,
                frames_uid
            }
        })
