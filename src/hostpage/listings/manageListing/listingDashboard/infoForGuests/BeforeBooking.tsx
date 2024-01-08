import { useContext } from 'react';
import { HostContext } from '../../../../../App';
import ManageListingInfoBlock from '../../components/ManageListingInfoBlock';

function BeforeBooking() {
  const { currentHostListing } = useContext(HostContext)!;
  return (
    <div className='border-b w-full pt-8 pb-8' id='beforeBookingBlock'>
      <div className='font-black text-lg'>Before Booking</div>
      <div className='text-sm text-slate-500 pb-6'>
        Anyone can see this info on your listing page.
      </div>
      <ManageListingInfoBlock
        display={'Interaction preferences'}
        contents={currentHostListing?.guestinteraction}
        caption={
          'Let guests know if you enjoy spending time with them or prefer a hands-off approach.'
        }
      />
    </div>
  );
}

export default BeforeBooking;
