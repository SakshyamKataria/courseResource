import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const LoginForm = styled.form` // Changed div to form
  background-color: ${({ theme }) => theme.contentBackground};
  padding: 32px;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 100%;
  color: ${({ theme }) => theme.text};
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out, color 0.3s ease-in-out;
`;

const LoginHeading = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid ${({ theme }) => (theme.body === '#f8f9fa' ? '#ccc' : '#555')};
  border-radius: 4px;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => (theme.body === '#f8f9fa' ? '#fff' : '#333')};
  transition: border-color 0.3s ease-in-out, background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const LoginButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => (theme.body === '#f8f9fa' ? '#0056b3' : '#3b82f6')};
  }
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  margin-top: 10px;
  text-align: center;
`;

function Login({ onLogin }) {
  const [email, setEmail] = useState(''); // Changed username to email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => { // Kept handleSubmit as the handler
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password }); // Changed route and data
      onLogin(response.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm onSubmit={handleSubmit}> {/* Changed back to LoginForm which is now a form */}
      <LoginHeading>Admin Login</LoginHeading>
      <Input
        type="email" // Changed type to email
        placeholder="Email" // Changed placeholder
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <LoginButton type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </LoginButton>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </LoginForm>
  );
}

export default Login;