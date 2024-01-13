import { useContext, useState, useEffect } from 'react';
import { HostContext } from '../../../../../App';
import TextAndTextEditBlock from '../../components/TextAndTextEditBlock';
import { isBlankString } from '../../../../../utils';

type OriginalBeforeBooking = {
  guestinteraction: string;
};
function BeforeBooking() {
  const { currentHostListing, setCurrentHostListing } =
    useContext(HostContext)!;
  const [initialSetupDone, setInitialSetupDone] = useState(false);
  const [originalBeforeBooking, setOriginalBeforeBoking] =
    useState<OriginalBeforeBooking>({
      guestinteraction: '',
    });

  useEffect(() => {
    if (currentHostListing && !initialSetupDone) {
      setOriginalBeforeBoking({
        guestinteraction: currentHostListing.guestinteraction || '',
      });
      setInitialSetupDone(true);
    }
  }, [currentHostListing]);

  return (
    <div className='border-b w-full pt-8 pb-8' id='beforeBookingBlock'>
      <div className='font-semibold text-lg'>Before Booking</div>
      <div className='text-sm text-slate-500 pb-6'>
        Anyone can see this info on your listing page.
      </div>
      <TextAndTextEditBlock
        display={'Interaction preferences'}
        contents={currentHostListing?.guestinteraction || ''}
        caption={
          'Let guests know if you enjoy spending time with them or prefer a hands-off approach.'
        }
        onChange={(guestinteraction: string) => {
          if (!currentHostListing) return;
          setCurrentHostListing({
            ...currentHostListing,
            guestinteraction,
          });
        }}
        onCancel={() => {
          if (!currentHostListing) return;
          setCurrentHostListing({
            ...currentHostListing,
            guestinteraction: originalBeforeBooking.guestinteraction,
          });
        }}
        onSave={() => {
          if (!currentHostListing) return;
          setOriginalBeforeBoking({
            ...originalBeforeBooking,
            guestinteraction: currentHostListing.guestinteraction || '',
          });
        }}
        required={true}
        validateInput={(value: string) => {
          if (isBlankString(value)) return false;
          else if (value === originalBeforeBooking.guestinteraction)
            return false;
          else return true;
        }}
      />
    </div>
  );
}

export default BeforeBooking;
