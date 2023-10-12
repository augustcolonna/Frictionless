import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseconfig";
//firebase imports
import { onSnapshot, collection } from "firebase/firestore";

function useCollection(anyCollection) {
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    //using "anyCollection" as a placeholder for the collection name
    let ref = collection(db, anyCollection);

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setDocuments(results);
    });

    return () => unsubscribe();
  }, [anyCollection]);

  return { documents };
}

export default useCollection;
