import { useContext, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { BsHourglassSplit } from 'react-icons/bs';

import HostNavBar from '../hostnav/HostNavBar';
import { HostContext } from '../../App';
import axios from 'axios';

function ListingsPage() {
  const {
    hostListings,
    setHostListings,
    host,
    setHost,
    newListingModalOpen,
    setNewListingModalOpen,
  } = useContext(HostContext)!;

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

  console.log('hostListings: ', hostListings);
  console.log('host: ', host);

  const headers = ['LISTING', 'STATUS', 'INSTANT BOOK', 'LOCATION'];
  return (
    <div>
      <div>
        <HostNavBar />
      </div>
      {host && hostListings.length > 0 && (
        <div>
          <div className='p-6 text-slate-700'>
            <div className='flex flex-row w-full'>
              <div className='text-xl mr-auto'>
                {hostListings.length}
                {hostListings.length === 1 ? ' Listing' : ' Listings'}
              </div>
              <div className='flex'>
                <button className='flex justify-center items-center text-sm border p-2 pr-4 pl-4 rounded-md'>
                  <FaPlus size={17} className='pr-2' /> Create listing
                </button>
              </div>
            </div>
            <table className='w-full text-sm mt-6'>
              <tr>
                {headers.map((header, index) => {
                  return (
                    <th
                      className='text-start text-xs border-b py-2'
                      key={index}
                    >
                      {header}
                    </th>
                  );
                })}
              </tr>
              {hostListings.map((listing) => {
                return (
                  <tr className='border-b hover:bg-[#F6F6F6]'>
                    <td className='py-2'>
                      {listing?.title ? listing.title : 'Untitled'}
                    </td>
                    <td className='py-2'>
                      {listing?.status === 'In progress' ? (
                        <div className='flex items-center'>
                          <BsHourglassSplit size={20} className='pr-2' /> In
                          Progress
                        </div>
                      ) : (
                        'Ready'
                      )}
                    </td>
                    <td className='py-2'>
                      {listing?.instantbook ? 'On' : 'Off'}
                    </td>
                    <td className='py-2'>
                      {listing?.city && listing?.state
                        ? `${listing.city}, ${listing.state}`
                        : 'Unknown'}
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListingsPage;
