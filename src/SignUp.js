import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from './firebase';  // Import Firebase authentication and Firestore
import { createUserWithEmailAndPassword } from 'firebase/auth';  // Import the auth method
import { setDoc, doc } from 'firebase/firestore';  // Firestore functions
import './App.css';  // Import the CSS file for styling

const SignUp = () => {
  const [name, setName] = useState('');  // Store the user's name
  const [email, setEmail] = useState('');  // Store the user's email
  const [password, setPassword] = useState('');  // Store the user's password
  const [confirmPassword, setConfirmPassword] = useState('');  // Confirm the password
  const [error, setError] = useState('');  // Store any errors
  const [loading, setLoading] = useState(false);  // Manage the loading state
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');  // Clear any previous error messages
    setLoading(true);  // Disable form submission while processing

    if (password !== confirmPassword) {
      setError("Passwords don't match");  // Validate password match
      setLoading(false);
      return;
    }

    try {
      // Create a new user with email and password in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;  // Get the newly created user

      // Store additional user information in Firestore (name and email)
      await setDoc(doc(firestore, 'users', user.uid), {
        name: name,
        email: email
      });

      // Redirect to the login page after successful sign-up
      navigate('/login');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('The email address is already in use');
      } else if (error.code === 'auth/weak-password') {
        setError('The password is too weak');
      } else if (error.code === 'auth/invalid-email') {
        setError('The email address is invalid');
      } else {
        setError('Failed to sign up');
      }
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);  // Re-enable the form after processing
    }
  };

  return (
    <div className="signup-container">
      <h2>Create a DEV@Deakin Account</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
