import { Route, Routes } from 'react-router-dom';
import { createContext, useState } from 'react';
import HomePage from './homepage/Homepage';
import Login from './login/Login';
import './App.css';

interface UserContextProps {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

export const UserContext = createContext<UserContextProps | null>(null);

function App() {
  const [user, setUser] = useState<string | null>(null);
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
