import { useContext, useEffect } from 'react';
import { UserContext, HostContext } from '../App';
import HostNavBar from './hostnav/HostNavBar';
import NewListingWizard from './newListingSetup/NewListingWizard';
import axios from 'axios';

function HostPage() {
  const { user } = useContext(UserContext)!;
  const {
    hostListings,
    setHostListings,
    host,
    setHost,
    newListingModalOpen,
    setNewListingModalOpen,
  } = useContext(HostContext)!;

  useEffect(() => {
    if (!user?.ishost) {
      setNewListingModalOpen(true);
    }

    if (user?.ishost) {
      setNewListingModalOpen(false);
      const getHostData = async () => {
        const { data } = await axios.get(`/api/host/getHostData`);
        setHost(data.host);
        setHostListings(data.listings);
      };
      getHostData();
    }
  }, []);

  return (
    <div>
      {newListingModalOpen && (
        <div className='top-0 bottom-0 left-0 right-0 fixed flex bg-white h-screen'>
          <NewListingWizard />
        </div>
      )}
      <div>
        <HostNavBar />
      </div>
    </div>
  );
}

export default HostPage;
