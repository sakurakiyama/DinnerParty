import { useContext } from 'react';
import { HostContext } from '../../../../../App';
import Photos from './Photos';
import ListingBasics from './ListingBasics';
function ListingDetails() {
  const { currentHostListing } = useContext(HostContext)!;
  return (
    <div className='w-full'>
      <Photos />
      <ListingBasics />
    </div>
  );
}

export default ListingDetails;
