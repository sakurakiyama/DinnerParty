import HostNavBar from '../../hostnav/HostNavBar';
import { useContext, useEffect } from 'react';
import { HostContext } from '../../../App';
import axios from 'axios';
import { FaCircle } from 'react-icons/fa';
import { MdPendingActions } from 'react-icons/md';
import { FaBoltLightning } from 'react-icons/fa6';
import Sidebar from './sidebar/Sidebar';

function ManageListing() {
  const { setHostListings, host, setHost, currentHostListing } =
    useContext(HostContext)!;

  let listingStatus;

  switch (currentHostListing?.status) {
    case 'Listed':
      listingStatus = (
        <div className='flex items-center'>
          <FaCircle size={20} color={'green'} className='pr-2' />
          <div className='hidden md:block'>Listed</div>
        </div>
      );
      break;

    case 'Ready':
      listingStatus = (
        <div className='flex items-center'>
          <MdPendingActions size={22} className='pr-2' />
          <div className='hidden md:block'>Ready</div>
        </div>
      );
      break;
  }

  useEffect(() => {
    if (!host) {
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
      <div>
        <HostNavBar />
      </div>
      <div className='p-6 text-slate-700'>
        <div className='flex flex-row w-full'>
          <div className='text-xl mr-auto'>{currentHostListing?.title}</div>
          <div className='flex flex-row space-x-6 items-center text-sm'>
            <div>
              {currentHostListing?.instantbook ? (
                <div className='flex flex-row items-center space-x-2'>
                  <FaBoltLightning color={'green'} />
                  <div>Instant Book on</div>
                </div>
              ) : (
                <div className='flex flex-row items-center space-x-2'>
                  <FaBoltLightning color={'#D3D3D3'} />
                  <div>Instant Book off</div>
                </div>
              )}
            </div>
            <div>{listingStatus}</div>
            <button className='flex justify-center items-center border p-2 pr-4 pl-4 rounded-md'>
              Preview Listing
            </button>
          </div>
        </div>
        <div className='w-[300px] bg-red-200'>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default ManageListing;
