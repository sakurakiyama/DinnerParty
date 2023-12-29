import { Route, Routes } from 'react-router-dom';
import { createContext, useState, useEffect } from 'react';
import HomePage from './homepage/Homepage';
import Login from './login/Login';
import BrowsePage from './browse/BrowsePage';
import HostPage from './hostpage/HostPage';
import ListingsPage from './hostpage/listings/ListingsPage';
import CalendarPage from './hostpage/hostnav/calendar/CalendarPage';
import InboxPage from './hostpage/hostnav/inbox/InboxPage';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Listing, Host, User } from './types';
import './App.css';

interface HostContextProps {
  hostListings: Listing[];
  setHostListings: React.Dispatch<React.SetStateAction<Listing[]>>;
  host: Host | null;
  setHost: React.Dispatch<React.SetStateAction<Host | null>>;
  newListingModalOpen: boolean;
  setNewListingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentHostListing: Listing | null;
  setCurrentHostListing: React.Dispatch<React.SetStateAction<Listing | null>>;
}

interface UserContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const UserContext = createContext<UserContextProps | null>(null);
export const HostContext = createContext<HostContextProps | null>(null);

function App() {
  const [user, setUser] = useState<User>(null);
  const [newListingModalOpen, setNewListingModalOpen] =
    useState<HostContextProps['newListingModalOpen']>(false);
  const [hostListings, setHostListings] = useState<Listing[]>([]);
  const [host, setHost] = useState<Host>(null);
  const [currentHostListing, setCurrentHostListing] = useState<Listing | null>(
    null
  );

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
      <HostContext.Provider
        value={{
          hostListings,
          setHostListings,
          host,
          setHost,
          newListingModalOpen,
          setNewListingModalOpen,
          currentHostListing,
          setCurrentHostListing,
        }}
      >
        {!isLoading && (
          <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/browse' element={<BrowsePage />}></Route>
            <Route path='/hosting' element={<HostPage />}></Route>
            <Route path='/hosting/listings' element={<ListingsPage />}></Route>
            <Route path='/hosting/inbox' element={<InboxPage />}></Route>
            <Route path='/hosting/calendar' element={<CalendarPage />}></Route>
          </Routes>
        )}
      </HostContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
