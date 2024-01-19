import ProfileCard from './components/ProfileCard';
import GeneralNav from '../components/GeneralNav';
import AboutUser from './components/AboutUser';
import UserReviews from './components/UserReviews';
import UserListings from './components/UserListings';
import { useState, createContext, useEffect, useContext } from 'react';
import { UserContext, HostContext } from '../App';
import axios from 'axios';

interface ProfileProps {
  isLoading: boolean;
  updateUser: () => void;
}

export const ProfileContext = createContext<ProfileProps | null>(null);

function Profile() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user, setUser } = useContext(UserContext)!;
  const { setHost, setHostListings } = useContext(HostContext)!;

  useEffect(() => {
    if (user?.ishost) {
      const getHostData = async () => {
        const { data } = await axios.get(`/api/host/getHostData`);
        setHost(data.host);
        setHostListings(data.listings);
      };
      getHostData();
      setIsLoading(false);
    }
  }, []);

  const updateUser = async () => {
    const { data } = await axios.patch('/api/user/updateUser', user);
    setUser(data);
  };

  return (
    <ProfileContext.Provider value={{ isLoading, updateUser }}>
      <div>
        <GeneralNav />
        <div className='flex flex-col md:flex-row pt-20 pr-20 pl-20 gap-20'>
          <div className='w-full'>
            <ProfileCard />
          </div>
          <div className='w-full'>
            <div className='border-b pb-8 w-full'>
              <AboutUser />
            </div>
            <div className='pt-8 border-b pb-8 w-full'>
              <UserReviews />
            </div>
            <div className='pt-8 pb-8 w-full'>
              <UserListings />
            </div>
          </div>
        </div>
      </div>
    </ProfileContext.Provider>
  );
}

export default Profile;
