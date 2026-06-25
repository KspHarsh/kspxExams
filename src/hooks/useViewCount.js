import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc, increment, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useViewCount = () => {
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const docRef = doc(db, 'stats', 'views');

    const incrementViewCount = async () => {
      try {
        const hasVisited = localStorage.getItem('kspx_has_visited');
        
        // If not visited, increment the count in Firestore
        if (!hasVisited) {
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            await updateDoc(docRef, {
              count: increment(1)
            });
          } else {
            // Document doesn't exist, create it with count 1
            await setDoc(docRef, {
              count: 1
            });
          }
          
          // Mark as visited in LocalStorage
          localStorage.setItem('kspx_has_visited', 'true');
        }
      } catch (error) {
        console.error("Error updating view count:", error);
      }
    };

    incrementViewCount();

    // Listen to real-time updates for the view count
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setViewCount(docSnap.data().count);
      }
    }, (error) => {
      console.error("Error listening to view count:", error);
    });

    return () => unsubscribe();
  }, []);

  return viewCount;
};
