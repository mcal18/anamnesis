import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    doc,
    updateDoc,
    getDoc,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export async function createMemory(userId, memoryData) {
    const memoryRef = collection(db, 'memories')

    const docRef = await addDoc(memoryRef, {
        userId,
        ...memoryData,
        createdAt: new Date(),
    })

    return docRef.id
}

export async function getUserMemories(userId) {
    const memoriesRef = collection(db, 'memories')

    const memoriesQuery = query(
        memoriesRef,
        where('userId', '==', userId)
    )

    const snapshot = await getDocs(memoriesQuery)

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))
}

export async function getUnlockedMemories(userId) {
    const memoriesRef = collection(db, 'memories')

    const memoriesQuery = query(
        memoriesRef,
        where('userId', '==', userId),
        where('sealed', '==', true),
        where('opened', '==', false),
        where('unlockDate', '<=', new Date().toISOString().split('T')[0]),
        orderBy('unlockDate', 'asc')
    )

    const snapshot = await getDocs(memoriesQuery)

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))
}

export async function markMemoryAsOpened(memoryId) {
    const memoryRef = doc(db, 'memories', memoryId)

    await updateDoc(memoryRef, {
        opened: true,
    })
} 


export async function getMemory(memoryId) {
    const memoryRef = doc(db, 'memories', memoryId)

    const memorySnapshot = await getDoc(memoryRef)

    if (!memorySnapshot.exists()) {
        return null
    }

    return {
        id: memorySnapshot.id,
        ...memorySnapshot.data(),
    }
}

export async function createReflection(memoryId, userId, content) {
    const reflectionsRef = collection(db, 'reflections')

    const docRef = await addDoc(reflectionsRef, {
        memoryId,
        userId,
        content,
        createdAt: serverTimestamp(),
    })

    return docRef.id
}