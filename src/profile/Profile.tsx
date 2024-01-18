import ProfileCard from './components/ProfileCard';
import GeneralNav from '../components/GeneralNav';
import AboutUser from './components/AboutUser';
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
  const { user } = useContext(UserContext)!;
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
    console.log(data);
  };

  return (
    <ProfileContext.Provider value={{ isLoading, updateUser }}>
      <div>
        <GeneralNav />
        <div className='flex flex-row p-8 space-x-20 w-full'>
          <ProfileCard />
          {/* Right */}
          <div className='w-full'>
            <AboutUser />
          </div>
        </div>
      </div>
    </ProfileContext.Provider>
  );
}

export default Profile;
