import { useContext, useEffect } from 'react';
import { UserContext, HostContext } from '../App';
import HostNavBar from './hostnav/HostNavBar';
import NewListingWizard from './newListingSetup/NewListingWizard';
import HostReservations from './today/HostReservations';
import ToDo from './today/ToDo';
import axios from 'axios';

function HostPage() {
  const { user } = useContext(UserContext)!;
  const {
    setHostListings,
    host,
    setHost,
    newListingModalOpen,
    setNewListingModalOpen,
    setHostBookings,
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

  useEffect(() => {
    const getHostBookings = async () => {
      const { data: bookingList } = await axios.get(
        '/api/host/getHostBookings'
      );
      setHostBookings(bookingList);
    };
    if (host) {
      getHostBookings();
    }
  }, [host]);

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
      <div className='p-16'>
        {/* Greeting */}
        {user && user.ishost && (
          <div className='text-xl md:text-3xl font-semibold'>
            Welcome back, {user.firstname}
          </div>
        )}
        <div>
          <HostReservations />
        </div>
        <div>
          <ToDo />
        </div>
      </div>
    </div>
  );
}

export default HostPage;
