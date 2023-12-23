import { useContext } from 'react';
import HostNavBar from '../hostnav/HostNavBar';
import { HostContext } from '../../App';

function ListingsPage() {
  const {
    hostListings,
    setHostListings,
    host,
    setHost,
    newListingModalOpen,
    setNewListingModalOpen,
  } = useContext(HostContext)!;

  console.log(hostListings);

  return (
    <div>
      <div>
        <HostNavBar />
      </div>
      <div>Listings</div>
    </div>
  );
}

export default ListingsPage;
