import React, { useState } from "react";
import axios from "axios";
import styled from 'styled-components';

const UploadFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
`;

const UploadHeading = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 24px;
  color: #2e7d32; /* Green theme */
  text-align: center;
`;

const InputFile = styled.input`
  padding: 10px;
  border: 1px solid #9e9e9e;
  border-radius: 8px;
  font-size: 1rem;
  color: #616161;
`;

const InputText = styled.input`
  width: 100%;
  border: 1px solid #9e9e9e;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 1rem;
  color: #616161;
`;

const Select = styled.select`
  width: 100%;
  border: 1px solid #9e9e9e;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 1rem;
  color: #616161;
`;

const UploadButton = styled.button`
  background-color: #4caf50; /* Green button */
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1rem;

  &:hover {
    background-color: #388e3c; /* Darker green on hover */
    transform: translateY(-2px);
  }
`;

function Upload({ token }) {
  const [file, setFile] = useState(null);
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");

  const uploadFile = async (e) => {
    e.preventDefault();

    if (!file || !subject || !semester) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("subject", subject);
    formData.append("semester", semester);

    try {
      await axios.post("http://localhost:5000/notes/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("✅ File uploaded");
      setFile(null);
      setSubject("");
      setSemester("");
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed");
    }
  };

  return (
    <UploadFormContainer onSubmit={uploadFile}>
      <UploadHeading>📤 Upload Notes</UploadHeading>
      <InputFile type="file" onChange={(e) => setFile(e.target.files[0])} />
      <InputText
        type="text"
        placeholder="Subject (e.g., OOP)"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <Select value={semester} onChange={(e) => setSemester(e.target.value)}>
        <option value="">Select Semester</option>
        <option value="3">3rd Semester</option>
        <option value="4">4th Semester</option>
      </Select>
      <UploadButton type="submit">Upload</UploadButton>
    </UploadFormContainer>
  );
}

export default Upload;