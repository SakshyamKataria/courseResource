import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';

const ListContainer = styled.div`
  background-color: ${({ theme }) => theme.contentBackground};
  padding: 32px;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  border: 1px solid ${({ theme }) => (theme.body === '#f8f9fa' ? '#e0e0e0' : '#555')};
  margin-top: 32px;
  transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out, color 0.3s ease-in-out;
  color: ${({ theme }) => theme.text};
`;

const ListHeading = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.text};
`;

const SemesterButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
`;

const SemesterButton = styled.button`
  padding: 12px 24px;
  border: 2px solid ${({ theme, isSelected }) => (isSelected ? theme.primary : (theme.body === '#f8f9fa' ? '#bdc3c7' : '#888'))};
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1rem;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out, transform 0.2s ease-in-out, border-color 0.3s ease-in-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  background-color: ${({ theme, isSelected }) => (isSelected ? theme.primary : 'transparent')};
  color: ${({ theme, isSelected }) => (isSelected ? theme.text : (theme.body === '#f8f9fa' ? '#34495e' : '#eee'))};

  &:hover {
    background-color: ${({ theme }) => (theme.body === '#f8f9fa' ? '#2980b9' : '#42a5f5')};
    color: ${({ theme }) => theme.text};
    transform: translateY(-2px);
    border-color: ${({ theme }) => (theme.body === '#f8f9fa' ? '#2980b9' : '#42a5f5')};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const SubjectButtonContainer = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
`;

const SubjectHeading = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.secondary};
`;

const SubjectButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const SubjectButton = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  margin-right: 12px;
  margin-bottom: 12px;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out, transform 0.2s ease-in-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  background-color: ${({ theme, isSelected }) => (isSelected ? theme.primary : (theme.body === '#f8f9fa' ? '#e0eee0' : '#444'))};
  color: ${({ theme, isSelected }) => (isSelected ? theme.text : (theme.body === '#f8f9fa' ? '#2e8b57' : '#eee'))};

  &:hover {
    background-color: ${({ theme }) => (theme.body === '#f8f9fa' ? '#3cb371' : '#4caf50')};
    color: ${({ theme }) => theme.text};
    transform: translateY(-2px);
  }
`;

const NoNotes = styled.p`
  color: ${({ theme }) => theme.secondary};
  font-style: italic;
`;

const NotesUl = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NoteLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border: 1px solid ${({ theme }) => (theme.body === '#f8f9fa' ? '#dcdde1' : '#666')};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.contentBackground};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  color: ${({ theme }) => theme.text};
`;

const NoteName = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ViewDownloadLink = styled.a`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 6px;
  background-color: ${({ theme }) => (theme.body === '#f8f9fa' ? '#ecf0f1' : '#555')};
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out, transform 0.2s ease-in-out;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: ${({ theme }) => (theme.body === '#f8f9fa' ? '#2980b9' : '#42a5f5')};
    color: ${({ theme }) => theme.text};
    transform: translateY(-1px);
  }
`;

function NotesList() {
  const [allNotes, setAllNotes] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [semesterSubjects, setSemesterSubjects] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/notes")
      .then((res) => {
        setAllNotes(res.data.notes || []);
      })
      .catch(() => alert("Error fetching notes"));
  }, []);

  useEffect(() => {
    if (selectedSemester) {
        const semesterNotes = allNotes.filter(note => note.semester === selectedSemester);
        const subjects = [...new Set(semesterNotes.map(note => note.subject))];
        setSemesterSubjects(subjects);
        setSelectedSubject(null);
        setFilteredNotes(semesterNotes); //show notes of selected semester
    } else {
        setSemesterSubjects([]);
        setSelectedSubject(null);
        setFilteredNotes([]);
    }
}, [selectedSemester, allNotes]);


  useEffect(() => {
    if (selectedSubject && selectedSemester) {
      const subjectNotes = allNotes.filter(
        note => note.semester === selectedSemester && note.subject === selectedSubject
      );
      setFilteredNotes(subjectNotes);
    } else if (selectedSemester) {
         setFilteredNotes(allNotes.filter(note => note.semester === selectedSemester));
    }
     else {
      setFilteredNotes([]);
    }
  }, [selectedSemester, selectedSubject, allNotes]);

  const handleSemesterClick = (semester) => {
    setSelectedSemester(semester);
    setSelectedSubject(null);
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
  };

  return (
    <ListContainer>
      <ListHeading>📚 Available Notes</ListHeading>

      <SemesterButtonContainer>
        <SemesterButton
          isSelected={selectedSemester === '3'}
          onClick={() => handleSemesterClick('3')}
        >
          3rd Sem
        </SemesterButton>
        <SemesterButton
          isSelected={selectedSemester === '4'}
          onClick={() => handleSemesterClick('4')}
        >
          4th Sem
        </SemesterButton>
      </SemesterButtonContainer>

      {selectedSemester && semesterSubjects.length > 0 && (
        <SubjectButtonContainer>
          <SubjectHeading>Subjects for {selectedSemester}rd/th Sem:</SubjectHeading>
          <SubjectButtonWrapper>
            {semesterSubjects.map((subject) => (
              <SubjectButton
                key={subject}
                isSelected={selectedSubject === subject}
                onClick={() => handleSubjectClick(subject)}
              >
                {subject}
              </SubjectButton>
            ))}
          </SubjectButtonWrapper>
        </SubjectButtonContainer>
      )}

      {filteredNotes.length === 0 && selectedSemester && (
        <NoNotes>No notes available for the selected semester.  Select a subject to view notes.</NoNotes>
      )}
      {filteredNotes.length === 0 && !selectedSemester && (
        <NoNotes>Click on a semester button to view notes.</NoNotes>
      )}

      {filteredNotes.length > 0 && (
        <NotesUl>
          {filteredNotes.map((note, idx) => (
            <NoteLi key={idx}>
              <NoteName>{note.name || `Note ${idx + 1}`}</NoteName>
              <ViewDownloadLink href={note.fileUrl} target="_blank" rel="noreferrer">
                Download
              </ViewDownloadLink>
            </NoteLi>
          ))}
        </NotesUl>
      )}
    </ListContainer>
  );
}

export default NotesList;