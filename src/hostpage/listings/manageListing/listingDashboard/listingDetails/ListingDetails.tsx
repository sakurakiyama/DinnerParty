import { useContext } from 'react';
import { HostContext } from '../../../../../App';
import Photos from './Photos';
function ListingDetails() {
  const { currentHostListing } = useContext(HostContext)!;
  return (
    <div className='w-full'>
      <Photos />
    </div>
  );
}

export default ListingDetails;
