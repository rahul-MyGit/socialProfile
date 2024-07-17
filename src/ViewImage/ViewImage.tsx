import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase/firebase';


const ViewImage = () => {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<any | null>(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      if (!id) return;

      const docRef = doc(db, 'photos', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPhoto(docSnap.data());
        await updateDoc(docRef, { views: increment(1) });
      }
    };

    fetchPhoto();
  }, [id]);
  console.log(photo);
  
  return (
    <div>
      {photo ? (
        <>
          <img src={photo.url} alt="Uploaded" />
          <p>Views: {photo.views}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewImage;
