import {
  collection, doc, getDocs, addDoc, updateDoc, deleteDoc, serverTimestamp
} from 'firebase/firestore';
import { db } from './config';

const CATEGORIES_COLLECTION = 'categories';

export const getCategories = async () => {
  try {
    const snapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const addCategory = async (categoryData) => {
  try {
    const slug = categoryData.name.toLowerCase().replace(/\s+/g, '-');
    const docRef = await addDoc(collection(db, CATEGORIES_COLLECTION), {
      ...categoryData,
      slug,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding category:', error);
    throw error;
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const slug = categoryData.name.toLowerCase().replace(/\s+/g, '-');
    const docRef = doc(db, CATEGORIES_COLLECTION, id);
    await updateDoc(docRef, { ...categoryData, slug });
    return true;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    await deleteDoc(doc(db, CATEGORIES_COLLECTION, id));
    return true;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};
