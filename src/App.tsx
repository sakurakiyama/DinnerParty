import { Route, Routes } from 'react-router-dom';
import { createContext, useState, useEffect } from 'react';
import HomePage from './homepage/Homepage';
import Login from './login/Login';
import BrowsePage from './browse/BrowsePage';
import HostPage from './hostpage/HostPage';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import './App.css';

interface UserContextProps {
  user: {
    bio: string | null;
    city: string | null;
    email: string | null;
    firstname: string | null;
    ishost: boolean;
    lastname: string | null;
    phonenumber: string | null;
    profilepicture: ArrayBuffer | null;
    tempcode: string | null;
    tempcodedate: string | null;
    userid: number;
  } | null;
  setUser: React.Dispatch<
    React.SetStateAction<{
      bio: string | null;
      city: string | null;
      email: string | null;
      firstname: string | null;
      ishost: boolean;
      lastname: string | null;
      phonenumber: string | null;
      profilepicture: ArrayBuffer | null;
      tempcode: string | null;
      tempcodedate: string | null;
      userid: number;
    } | null>
  >;
}

export const UserContext = createContext<UserContextProps | null>(null);

function App() {
  const [user, setUser] = useState<UserContextProps['user']>(null);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const { data } = await axios.get('/api/auth/status');
        setUser(data);
      } catch (error: AxiosError | unknown) {
        if (error instanceof AxiosError) {
          navigate('/');
          if (error.response) {
            const status = error.response.status;

            if (status === 401) console.error('User is unauthorized.');
            else console.error('Error response status:', status);
          } else console.error('Error request:', error.request);
        } else console.error('Error while checking auth status:', error);
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {!isLoading && (
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/browse' element={<BrowsePage />}></Route>
          <Route path='/hosting' element={<HostPage />}></Route>
        </Routes>
      )}
    </UserContext.Provider>
  );
}

export default App;
