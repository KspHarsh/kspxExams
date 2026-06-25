import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, limit, startAfter, Timestamp, serverTimestamp
} from 'firebase/firestore';
import { db } from './config';

const EXAMS_COLLECTION = 'exams';

export const getExams = async (filters = {}) => {
  try {
    let q = collection(db, EXAMS_COLLECTION);
    const constraints = [];

    if (filters.category) {
      constraints.push(where('category', '==', filters.category));
    }
    if (filters.featured) {
      constraints.push(where('featured', '==', true));
    }
    if (filters.trending) {
      constraints.push(where('trending', '==', true));
    }
    if (filters.status) {
      constraints.push(where('status', '==', filters.status));
    }

    constraints.push(orderBy('createdAt', 'desc'));

    if (filters.limitCount) {
      constraints.push(limit(filters.limitCount));
    }

    if (filters.startAfterDoc) {
      constraints.push(startAfter(filters.startAfterDoc));
    }

    q = query(q, ...constraints);
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching exams:', error);
    return [];
  }
};

export const getExamById = async (id) => {
  try {
    const docRef = doc(db, EXAMS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching exam:', error);
    return null;
  }
};

export const addExam = async (examData) => {
  try {
    const docRef = await addDoc(collection(db, EXAMS_COLLECTION), {
      ...examData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding exam:', error);
    throw error;
  }
};

export const updateExam = async (id, examData) => {
  try {
    const docRef = doc(db, EXAMS_COLLECTION, id);
    await updateDoc(docRef, {
      ...examData,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error('Error updating exam:', error);
    throw error;
  }
};

export const deleteExam = async (id) => {
  try {
    await deleteDoc(doc(db, EXAMS_COLLECTION, id));
    return true;
  } catch (error) {
    console.error('Error deleting exam:', error);
    throw error;
  }
};

export const searchExams = async (searchTerm) => {
  try {
    const allExams = await getExams();
    const term = searchTerm.toLowerCase();
    return allExams.filter(exam =>
      exam.title?.toLowerCase().includes(term) ||
      exam.category?.toLowerCase().includes(term) ||
      exam.description?.toLowerCase().includes(term)
    );
  } catch (error) {
    console.error('Error searching exams:', error);
    return [];
  }
};
