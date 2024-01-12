import { useContext, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { BsHourglassSplit } from 'react-icons/bs';
import { FaCircle } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';
import { MdNoPhotography } from 'react-icons/md';
import HostNavBar from '../hostnav/HostNavBar';
import { HostContext } from '../../App';
import axios from 'axios';
import { MdPendingActions } from 'react-icons/md';
import { Listing } from '../../types';
import NewListingWizard from '../newListingSetup/NewListingWizard';
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';
import LoadingThreeDots from '../../components/LoadingThreeDots';
import { convertToBase64 } from '../../utils';

function ListingsPage() {
  const {
    hostListings,
    setHostListings,
    host,
    setHost,
    newListingModalOpen,
    setNewListingModalOpen,
    setCurrentHostListing,
  } = useContext(HostContext)!;

  const navigate = useNavigate();

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

  const headers = ['LISTING', 'STATUS', 'INSTANT BOOK', 'LOCATION'];

  const openListing = (listing: Listing) => {
    if (listing) {
      const base64Photos = convertToBase64(listing?.photos);
      setCurrentHostListing({ ...listing, photos: base64Photos });
      if (listing?.status === 'In progress') {
        setNewListingModalOpen(true);
      } else {
        navigate(`/hosting/listings/manage-your-space/${listing?.listingid}`);
      }
    }
  };

  const createNewListing = () => {
    setCurrentHostListing(null);
    setNewListingModalOpen(true);
  };

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
      {hostListings.length === 0 && (
        <div className='w-full h-screen flex justify-center items-center pb-[300px]'>
          <LoadingThreeDots />
        </div>
      )}
      {host && hostListings.length > 0 && (
        <div>
          <div className='p-6 text-slate-700'>
            <div className='flex flex-row w-full'>
              <div className='text-xl mr-auto font-semibold'>
                {hostListings.length}
                {hostListings.length === 1 ? ' Listing' : ' Listings'}
              </div>
              <div className='flex'>
                <button
                  className='flex justify-center items-center text-sm border border-black font-semibold p-2 pr-4 pl-4 rounded-md'
                  onClick={createNewListing}
                >
                  <FaPlus size={17} className='pr-2' /> Create listing
                </button>
              </div>
            </div>
            <table className='w-full text-xs md:text-sm mt-6'>
              <tbody>
                <tr>
                  {headers.map((header, index) => {
                    return (
                      <th
                        key={`${header}+${index}`}
                        className='text-slate-600 text-start text-xs border-b py-2'
                      >
                        {header}
                      </th>
                    );
                  })}
                </tr>
                {hostListings.map((listing, index) => {
                  let coverPhoto;

                  if (listing?.photos && listing?.photos.length > 0) {
                    const base64 = Buffer.from(listing.photos[0]).toString(
                      'base64'
                    );
                    coverPhoto = `data:image/jpeg;base64,${base64}`;
                  }

                  let listingStatus;

                  switch (listing?.status) {
                    case 'In progress':
                      listingStatus = (
                        <div className='flex items-center'>
                          <BsHourglassSplit size={20} className='pr-2' />
                          <div className='hidden md:block'>In Progress</div>
                        </div>
                      );
                      break;

                    case 'Listed':
                      listingStatus = (
                        <div className='flex items-center'>
                          <FaCircle
                            size={20}
                            color={'green'}
                            className='pr-2'
                          />
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

                  return (
                    <tr
                      className='border-b hover:bg-[var(--light-grey)] cursor-pointer'
                      onClick={() => {
                        openListing(listing);
                      }}
                      key={`${listing?.title}+${index}`}
                    >
                      <td className='py-2'>
                        <div className='flex flex-row items-center md:space-x-6'>
                          {!coverPhoto ? (
                            <div className='hidden md:flex w-[125px] h-[75px] border rounded-md justify-center items-center'>
                              <MdNoPhotography size={30} />
                            </div>
                          ) : (
                            <div
                              className='hidden md:block w-[125px] h-[75px] border bg-cover rounded-md'
                              style={{
                                backgroundImage: `url(${coverPhoto as string})`,
                              }}
                            ></div>
                          )}
                          <div className='max-w-[160px] md:max-w-full font-semibold'>
                            {listing?.title ? listing?.title : 'Unknown'}
                          </div>
                        </div>
                      </td>
                      <td className='py-2'>{listingStatus}</td>
                      <td className='py-2'>
                        {listing?.instantbook ? (
                          <div className='flex flex-row items-center space-x-2'>
                            <FaCheckCircle color={'green'} />
                            <div>On</div>
                          </div>
                        ) : (
                          <div className='flex flex-row items-center space-x-2'>
                            <FaCheckCircle color={'#D3D3D3'} />
                            <div>Off</div>
                          </div>
                        )}
                      </td>
                      <td className='py-2'>
                        {listing?.city && listing?.state
                          ? `${listing.city}, ${listing.state}`
                          : 'Unknown'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListingsPage;
