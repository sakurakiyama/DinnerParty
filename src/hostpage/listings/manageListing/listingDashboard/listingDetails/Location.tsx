import { useContext } from 'react';
import { HostContext } from '../../../../../App';
import ManageListingInfoBlock from '../../components/ManageListingInfoBlock';

function Location() {
  const { currentHostListing } = useContext(HostContext)!;
  return (
    <div className='border-b w-full pt-8 pb-8' id='locationBlock'>
      <div className='pb-6 font-black text-lg'>Location</div>
      <div className='space-y-8'>
        <ManageListingInfoBlock
          display={'Address'}
          contents={
            currentHostListing?.streetaddress
              ? `${currentHostListing.streetaddress} ${
                  currentHostListing?.apt || ''
                }, ${currentHostListing?.city} ${currentHostListing?.state} ${
                  currentHostListing?.zipcode
                }`
              : undefined
          }
          caption={
            'Enter your address so guests know where your home is. Your full address will remain hidden until a booking is confirmed. '
          }
        />
        <ManageListingInfoBlock
          display={'Getting around'}
          contents={currentHostListing?.gettingarounddescription}
          caption={
            'Let guests know how they can get to the neighborhood and what parking is like.'
          }
        />
        <ManageListingInfoBlock
          display={'Neighborhood description'}
          contents={currentHostListing?.gettingarounddescription}
          caption={'Share some highlights about the neighborhood. '}
        />
      </div>
    </div>
  );
}

export default Location;
