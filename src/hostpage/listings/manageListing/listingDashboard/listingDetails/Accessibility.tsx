import { useContext } from 'react';
import { HostContext } from '../../../../../App';
import ManageListingListBlock from '../../components/ManageListingListBlock';

function Accessibility() {
  const { currentHostListing } = useContext(HostContext)!;
  return (
    <div className='border-b w-full pt-8 pb-8'>
      <div className='pb-6 font-black text-lg'>Accessibility</div>
      <ManageListingListBlock
        contents={
          currentHostListing?.accessibility &&
          currentHostListing?.accessibility.length > 0
            ? currentHostListing?.accessibility
            : undefined
        }
        caption={
          'Select features to help guests with mobility needs feel more confident booking your space.'
        }
      />
    </div>
  );
}

export default Accessibility;
