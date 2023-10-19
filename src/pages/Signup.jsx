import React from 'react';
import { useState } from 'react';
import { useSignUp } from '../hooks/useSignUp';
import { useNavigate } from 'react-router-dom';
import '../styles/signup.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { error, signUp, isPending } = useSignUp();

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(email, password, displayName, thumbnail);
    navigate('/signin');
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
    if (selected.size > 100000) {
      setThumbnailError('file size must be less than 100kb');
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
    console.log('thumbnail updated');
  };

  return (
    <div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label>
          <span>Email</span>
          <input
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>Password</span>
          <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <label>
          <span>Display Name</span>
          <input
            required
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>
        <label>
          <span>Profile Picture</span>
          <input required type="file" onChange={handleFileChange} />
          {thumbnailError && <div className="error">{thumbnailError}</div>}
        </label>
        {!isPending && <button className="btn">Sign Up</button>}
        {isPending && (
          <button className="btn" disabled>
            Creating Profile
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
//put error at bottom of form
export default Signup;
