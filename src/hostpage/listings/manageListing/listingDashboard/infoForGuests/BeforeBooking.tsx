import { useContext } from 'react';
import { HostContext } from '../../../../../App';
import TextAndTextEditBlock from '../../components/TextAndTextEditBlock';

function BeforeBooking() {
  const { currentHostListing, setCurrentHostListing } =
    useContext(HostContext)!;
  return (
    <div className='border-b w-full pt-8 pb-8' id='beforeBookingBlock'>
      <div className='font-black text-lg'>Before Booking</div>
      <div className='text-sm text-slate-500 pb-6'>
        Anyone can see this info on your listing page.
      </div>
      <TextAndTextEditBlock
        display={'Interaction preferences'}
        contents={currentHostListing?.guestinteraction}
        caption={
          'Let guests know if you enjoy spending time with them or prefer a hands-off approach.'
        }
        setterFunc={(guestinteraction: string) => {
          if (!currentHostListing) return;
          setCurrentHostListing({
            ...currentHostListing,
            guestinteraction,
          });
        }}
      />
    </div>
  );
}

export default BeforeBooking;
