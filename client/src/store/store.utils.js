import { firestore } from '../firebase/firebase.utils'

export const formatGroupSnapshots = snapshot =>
    snapshot.docs.reduce((cur, doc) => {
        const { id } = doc.data()
        return { [id]: doc.data() }
    }, {})

export const formatSnapshotsForDispatch = async (
    groupId,
    collectionKey,
    nextKey
) => {
    const groupRef = firestore.collection(collectionKey).doc(groupId)

    const groupSnapshot = await groupRef.get()
    const { active, order } = groupSnapshot.data()

    const snapshots = await groupRef.collection('group').get()
    const data = formatGroupSnapshots(snapshots)

    const nextGroupId = data[active][nextKey]

    return {
        group: data,
        activeGroupId: active,
        order,
        nextGroupId
    }
}
