import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  background-color: ${({ theme }) => theme.contentBackground};
  padding: 32px;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin-top: 32px;
  color: ${({ theme }) => theme.text};
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out, color 0.3s ease-in-out;
`;

const FormHeading = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => (theme.body === '#f8f9fa' ? '#ccc' : '#555')};
  border-radius: 6px;
  font-size: 1rem;
  background-color: ${({ theme }) => (theme.body === '#f8f9fa' ? '#fff' : '#333')};
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const Button = styled.button`
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

const Message = styled.p`
  margin-top: 20px;
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

function RequestForm() {
  const [email, setEmail] = useState('');
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post('http://localhost:5000/notes/request', {
        email,
        semester,
        subject,
      });
      setMessage(response.data.message);
      setEmail('');
      setSemester('');
      setSubject('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to send request');
      console.error('Request failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormHeading>📝 Request New Notes</FormHeading>
      <InputGroup>
        <Label htmlFor="email">Your Email:</Label>
        <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="semester">Semester:</Label>
        <Input type="text" id="semester" value={semester} onChange={(e) => setSemester(e.target.value)} required />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="subject">Subject:</Label>
        <Input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
      </InputGroup>
      <Button type="submit" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Sending...' : 'Submit Request'}
      </Button>
      {message && <Message>{message}</Message>}
    </FormContainer>
  );
}

export default RequestForm;