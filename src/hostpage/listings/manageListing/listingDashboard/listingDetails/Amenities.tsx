import { useContext } from 'react';
import { HostContext } from '../../../../../App';
import ManageListingListBlock from '../../components/ManageListingListBlock';

function Amenities() {
  const { currentHostListing } = useContext(HostContext)!;

  return (
    <div className='border-b w-full pt-8 pb-8' id='amenitiesBlock'>
      <div className='font-black text-lg'>Amenities</div>
      <ManageListingListBlock
        contents={currentHostListing?.amenities}
        caption={'Add some amenities to show guests what your place offers'}
      />
    </div>
  );
}

export default Amenities;
