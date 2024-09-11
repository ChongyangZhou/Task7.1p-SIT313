import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';  // Import Firebase authentication
import { signInWithEmailAndPassword } from 'firebase/auth';  // Import the auth method
import './App.css';  // Import the CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Sign in the user using Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');  // Redirect to the home page upon success
    } catch (error) {
      setError('Invalid email or password');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <a href="/signup">Sign up</a>
    </div>
  );
};

export default Login;
