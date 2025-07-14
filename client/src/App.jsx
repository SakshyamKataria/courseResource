import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Upload from "./components/Upload";
import NotesList from "./components/NotesList";
import RequestForm from "./components/RequestForm";
import styled, { ThemeProvider } from 'styled-components';
import logo from '../public/logo.png'; // Import the logo image

// Define light and dark themes
const lightTheme = {
  body: '#f8f9fa',
  text: '#212529',
  primary: '#007bff',
  secondary: '#6c757d',
  backgroundGradient: 'linear-gradient(135deg, #e0f7fa, #b2ebf2)',
  contentBackground: 'rgba(255, 255, 255, 0.9)',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
};

const darkTheme = {
  body: '#121212', // Near black background
  text: '#ffffff', // White text
  primary: '#64b5f6',
  secondary: '#808080', // A neutral gray for secondary elements
  backgroundGradient: 'linear-gradient(135deg, #1e1e1e, #000000)', // Darker gradient
  contentBackground: 'rgba(30, 30, 30, 0.85)', // Darker content background
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)', // More pronounced shadow
};

const GlobalStyle = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.backgroundGradient};
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  transition: background 0.3s ease-in-out;
`;

const ContentWrapper = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.contentBackground};
  backdrop-filter: blur(8px);
  position: relative;
  transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out, color 0.3s ease-in-out;
  color: ${({ theme }) => theme.text}; /* Inherit text color */
`;

const AppHeading = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 32px;
  text-align: center;
  color: ${({ theme }) => theme.text};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Darker text shadow for contrast */
  transition: color 0.3s ease-in-out;
`;

const AdminButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

const ThemeToggleButton = styled.button`
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  align-self: flex-end;

  &:hover {
    background-color: ${({ theme }) => (theme.body === '#f8f9fa' ? '#5a6268' : '#666')};
  }
`;

const ShowLoginButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out, color 0.3s ease-in-out;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ theme }) => (theme.body === '#f8f9fa' ? '#0056b3' : '#3b82f6')};
    transform: translateY(-2px);
  }
`;

const LogoutButton = styled.button`
  background-color: #e53e3e;
  color: ${({ theme }) => theme.text};
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out, color 0.3s ease-in-out;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-left: 16px;

  &:hover {
    background-color: #c82333;
    transform: translateY(-2px);
  }
`;

const Description = styled.p`
  font-size: 1.15rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 24px;
  text-align: center;
  transition: color 0.3s ease-in-out;
`;

const Logo = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  height: 80px;
`;

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showLogin, setShowLogin] = useState(false);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle>
        <ContentWrapper>
          <ThemeToggleButton onClick={toggleTheme}>
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </ThemeToggleButton>
          <Logo src={logo} alt="App Logo" />
          <AppHeading>📚 Course Notes Portal</AppHeading>

          {!token ? (
            <>
              {!showLogin ? (
                <AdminButtonWrapper>
                  <ShowLoginButton onClick={handleShowLogin}>Login as Admin</ShowLoginButton>
                </AdminButtonWrapper>
              ) : (
                <Login onLogin={handleLogin} />
              )}
              <Description>
                Crafted with care by Sakshyam and Sachin, this web application is born from a shared vision of simplifying access to crucial course materials. We aim to empower fellow students by providing a centralized and easily navigable platform to find and share notes, fostering a collaborative learning environment for academic success.
              </Description>
            </>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </div>
          )}

          {token && <Upload token={token} />}
          <NotesList />
          <RequestForm />
        </ContentWrapper>
      </GlobalStyle>
    </ThemeProvider>
  );
}

export default App;