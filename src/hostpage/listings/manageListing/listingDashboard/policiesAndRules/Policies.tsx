import { useContext, useEffect, useState } from 'react';
import { HostContext } from '../../../../../App';
import ManageListingTextBlock from '../../components/ManageListingTextBlock';

function Policies() {
  const { currentHostListing } = useContext(HostContext)!;

  const [instantBookMessage, setInstantBookMessage] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    switch (currentHostListing?.instantbook) {
      case true:
        setInstantBookMessage('Instant Book on - Guests can book instantly.');
        break;

      case false:
        setInstantBookMessage(
          'Instant Book off - You’ll need to manually accept or decline booking requests.'
        );
        break;
    }
  }, [currentHostListing]);

  return (
    <div className='border-b w-full pt-8 pb-8' id='policiesBlock'>
      <div className='pb-6 font-black text-lg'>Policies</div>
      <div className='space-y-8'>
        {/* Cancellation Policy */}
        <ManageListingTextBlock
          display={'Cancellation Policy'}
          contents={currentHostListing?.cancellationpolicy}
          caption={'Choose the policy that will apply to all bookings.'}
        />
        {/* Instant Book */}
        <ManageListingTextBlock
          display={'Instant Book Policy'}
          contents={instantBookMessage}
          caption={'Choose the policy that will apply to all bookings.'}
        />
      </div>
    </div>
  );
}

export default Policies;
