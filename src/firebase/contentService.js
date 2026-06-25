import {
  collection, doc, getDocs, addDoc, updateDoc, deleteDoc, serverTimestamp, query, orderBy
} from 'firebase/firestore';
import { db } from './config';

const RESULTS_COLLECTION = 'results';
const ADMITCARDS_COLLECTION = 'admitCards';
const STUDY_RESOURCES_COLLECTION = 'blogPosts';
const ANSWERKEYS_COLLECTION = 'answerKeys';

// ===== RESULTS =====
export const getResults = async () => {
  try {
    const q = query(collection(db, RESULTS_COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching results:', error);
    return [];
  }
};

export const addResult = async (data) => {
  try {
    const docRef = await addDoc(collection(db, RESULTS_COLLECTION), {
      ...data, createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding result:', error);
    throw error;
  }
};

export const updateResult = async (id, data) => {
  try {
    await updateDoc(doc(db, RESULTS_COLLECTION, id), data);
    return true;
  } catch (error) {
    console.error('Error updating result:', error);
    throw error;
  }
};

export const deleteResult = async (id) => {
  try {
    await deleteDoc(doc(db, RESULTS_COLLECTION, id));
    return true;
  } catch (error) {
    console.error('Error deleting result:', error);
    throw error;
  }
};

// ===== ADMIT CARDS =====
export const getAdmitCards = async () => {
  try {
    const q = query(collection(db, ADMITCARDS_COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching admit cards:', error);
    return [];
  }
};

export const addAdmitCard = async (data) => {
  try {
    const docRef = await addDoc(collection(db, ADMITCARDS_COLLECTION), {
      ...data, createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding admit card:', error);
    throw error;
  }
};

export const updateAdmitCard = async (id, data) => {
  try {
    await updateDoc(doc(db, ADMITCARDS_COLLECTION, id), data);
    return true;
  } catch (error) {
    console.error('Error updating admit card:', error);
    throw error;
  }
};

export const deleteAdmitCard = async (id) => {
  try {
    await deleteDoc(doc(db, ADMITCARDS_COLLECTION, id));
    return true;
  } catch (error) {
    console.error('Error deleting admit card:', error);
    throw error;
  }
};

// ===== STUDY RESOURCES =====
export const getStudyResources = async () => {
  try {
    const q = query(collection(db, STUDY_RESOURCES_COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching study resources:', error);
    return [];
  }
};

export const addStudyResource = async (data) => {
  try {
    const docRef = await addDoc(collection(db, STUDY_RESOURCES_COLLECTION), {
      ...data, createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding study resource:', error);
    throw error;
  }
};

export const updateStudyResource = async (id, data) => {
  try {
    await updateDoc(doc(db, STUDY_RESOURCES_COLLECTION, id), data);
    return true;
  } catch (error) {
    console.error('Error updating study resource:', error);
    throw error;
  }
};

export const deleteStudyResource = async (id) => {
  try {
    await deleteDoc(doc(db, STUDY_RESOURCES_COLLECTION, id));
    return true;
  } catch (error) {
    console.error('Error deleting study resource:', error);
    throw error;
  }
};

// ===== ANSWER KEYS =====
export const getAnswerKeys = async () => {
  try {
    const q = query(collection(db, ANSWERKEYS_COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching answer keys:', error);
    return [];
  }
};

export const addAnswerKey = async (data) => {
  try {
    const docRef = await addDoc(collection(db, ANSWERKEYS_COLLECTION), {
      ...data, createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding answer key:', error);
    throw error;
  }
};

export const updateAnswerKey = async (id, data) => {
  try {
    await updateDoc(doc(db, ANSWERKEYS_COLLECTION, id), data);
    return true;
  } catch (error) {
    console.error('Error updating answer key:', error);
    throw error;
  }
};

export const deleteAnswerKey = async (id) => {
  try {
    await deleteDoc(doc(db, ANSWERKEYS_COLLECTION, id));
    return true;
  } catch (error) {
    console.error('Error deleting answer key:', error);
    throw error;
  }
};
