import { useContext } from 'react';
import { HostContext } from '../../../../../App';
import ManageListingInfoBlock from '../../components/ManageListingInfoBlock';
// import { CiCircleMinus, CiCirclePlus} from 'react-icons/ci';

function ListingBasics() {
  const { currentHostListing } = useContext(HostContext)!;

  return (
    <div className='border-b w-full pt-8 pb-8'>
      <div className='pb-6 font-black text-lg'>Listing basics</div>
      <div className='space-y-8'>
        {/* Listing title */}
        <ManageListingInfoBlock
          display={'Listing title'}
          contents={currentHostListing?.title}
        />
        {/* Listing description */}
        <ManageListingInfoBlock
          display={'Listing description'}
          contents={currentHostListing?.description}
        />
        {/* Guests */}
      </div>
    </div>
  );
}

export default ListingBasics;
