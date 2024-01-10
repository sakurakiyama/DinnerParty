import { useContext } from 'react';
import { HostContext } from '../../../../../App';
import ManageListingListBlock from '../../components/ManageListingListBlock';
import { accessibilityItems } from '../../../../../constants';
function Accessibility() {
  const { currentHostListing } = useContext(HostContext)!;
  return (
    <div className='border-b w-full pt-8 pb-8' id='accessibilityBlock'>
      <div className='font-black text-lg'>Accessibility</div>
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
        selectableOptions={{ 'Accessibility Options': accessibilityItems }}
      />
    </div>
  );
}

export default Accessibility;
