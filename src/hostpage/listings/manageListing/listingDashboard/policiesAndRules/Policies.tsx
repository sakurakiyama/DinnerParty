import { useContext, useEffect, useState } from 'react';
import { HostContext } from '../../../../../App';
import TextAndMultipleSelectionBlock from '../../components/TextAndMultipleSelectionBlock';

function Policies() {
  const { currentHostListing, setCurrentHostListing } =
    useContext(HostContext)!;
  const [instantBookMessage, setInstantBookMessage] = useState<
    string | undefined
  >(undefined);

  const cancellationPolicyOptions = [
    {
      key: 'Flexible',
      selected: currentHostListing?.cancellationpolicy === 'Flexible',
      description: 'Flexible - Full refund 1 day prior to arrival',
    },
    {
      key: 'Moderate',
      selected: currentHostListing?.cancellationpolicy === 'Moderate',
      description: 'Moderate - Full refund 5 days prior to arrival',
    },
    {
      key: 'Firm',
      selected: currentHostListing?.cancellationpolicy === 'Firm',
      description:
        'Firm - Full refund for cancellations up to 30 days before the event. If booked fewer than 30 days before event, full refund for cancellations made within 48 hours of booking and at least 14 days before the event. After that, 50% refund up to 7 days before the event. No refund after that.',
    },
  ];

  const bookingTypeOptions = [
    {
      key: 'Instant Book',
      selected: currentHostListing?.instantbook === true,
      description: 'Instant Book on - Guests can book instantly.',
    },
    {
      key: 'Approve or decline requests',
      selected: currentHostListing?.instantbook === false,
      description:
        'Instant Book off - You’ll need to manually accept or decline booking requests.',
    },
  ];

  const handleCancellationPolicySelection = (selection: string) => {
    if (!currentHostListing) return;

    setCurrentHostListing({
      ...currentHostListing,
      cancellationpolicy: selection,
    });
  };

  const handleInstantBookSelection = (selection: string) => {
    if (!currentHostListing) return;

    switch (selection) {
      case 'Instant Book':
        setCurrentHostListing({ ...currentHostListing, instantbook: true });
        break;
      case 'Approve or decline requests':
        setCurrentHostListing({ ...currentHostListing, instantbook: false });
    }
  };

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
        <TextAndMultipleSelectionBlock
          display={'Cancellation Policy'}
          contents={currentHostListing?.cancellationpolicy}
          caption={'Choose the policy that will apply to all bookings.'}
          selectableOptions={cancellationPolicyOptions}
          handleSelect={handleCancellationPolicySelection}
        />
        {/* Instant Book */}
        <TextAndMultipleSelectionBlock
          display={'Instant Book Policy'}
          contents={instantBookMessage}
          caption={'Choose the policy that will apply to all bookings.'}
          selectableOptions={bookingTypeOptions}
          handleSelect={handleInstantBookSelection}
        />
      </div>
    </div>
  );
}

export default Policies;
