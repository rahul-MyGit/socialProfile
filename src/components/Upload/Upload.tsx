import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, storage } from "../../firebase/firebase";
import { useAuth } from '../../contexts/authContext';

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const handleUpload = async () => {
    if (!file || !currentUser) return;

    const storageRef = ref(storage, `images/${currentUser.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        console.log(snapshot);
      }, 
      (error) => {
        console.error(error);
      }, 
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, 'photos'), {
          url: downloadURL,
          uid: currentUser.uid,
          createdAt: serverTimestamp(),
          views: 0
        });
        setLoading(false);
        setFile(null);
      }
    );
    setLoading(true);
  };  

  return (
    <>
    <div className='text-red-400 mt-14'>
      <input 
        type="file" 
        onChange={(e) => setFile(e.target.files?.[0] || null)} 
      />
      <button  onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
    </>
  );
};

export default Upload;
