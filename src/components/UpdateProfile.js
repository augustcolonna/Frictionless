//hooks
import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
//styles
import '../styles/profile.css';
//firestore imports
import { updateDoc, doc } from 'firebase/firestore';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { db, storage } from '../firebase/firebaseconfig';

function UpdateProfile({ profile }) {
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [streetAndNumber, setStreetAndNumber] = useState('');
  const [cityAndCountry, setCityAndCountry] = useState('');
  const [postal, setPostal] = useState('');

  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createAddress = [streetAndNumber, cityAndCountry, postal];
    const updateRef = doc(db, 'users', user.uid);
    await updateDoc(updateRef, { displayName, address: createAddress });
    if (thumbnail == null) {
      return;
    }
    const imageRef = ref(storage, `thumbnails/${user.uid}/${thumbnail.name}`);
    await uploadBytes(imageRef, thumbnail).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        updateProfile(user, {
          displayName: displayName,
          photoURL: url,
        });
      });
    });
  };

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];

    if (!selected) {
      setThumbnailError('please select a file');
      return;
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('selected file must be an image');
      return;
    }
    if (selected.size > 250000) {
      setThumbnailError('file size must be less than 100kb');
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
    console.log('thumbnail updated');
  };

  return (
    <div>
      <div>
        <form className="auth-form-signup" onSubmit={handleSubmit}>
          <h2>Update Profile</h2>
          <label>
            <span>Display Name</span>
            <input
              type="text"
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
            />
          </label>
          <label>
            <span>Address</span>
            <input
              type="text"
              onChange={(e) => setStreetAndNumber(e.target.value)}
              value={streetAndNumber}
              placeholder="street and housenumber"
            />
            <input
              type="text"
              onChange={(e) => setCityAndCountry(e.target.value)}
              value={cityAndCountry}
              placeholder="city and country"
            />
            <input
              type="text"
              onChange={(e) => setPostal(e.target.value)}
              value={postal}
              placeholder="postal"
            />
          </label>

          <label>
            <span>Profile Picture</span>
            <input type="file" onChange={handleFileChange} />
            {thumbnailError && <div className="error">{thumbnailError}</div>}
          </label>
          <button className="btn">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
