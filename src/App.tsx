import { Route, Routes } from 'react-router-dom';
import { createContext, useState } from 'react';
import HomePage from './homepage/Homepage';
import Login from './login/Login';
import './App.css';

interface UserProps {
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

export const UserContext = createContext<UserProps | null>(null);

function App() {
  const [user, setUser] = useState<UserProps['user']>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
