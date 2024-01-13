import { useContext, useEffect, useState } from 'react';
import { HostContext } from '../../../../../App';
import TextAndMultipleSelectionBlock from '../../components/TextAndMultipleSelectionBlock';

type OriginalPolicies = {
  instantbook: boolean;
  cancellationpolicy: string;
};

function Policies() {
  const { currentHostListing, setCurrentHostListing } =
    useContext(HostContext)!;
  const [instantBookMessage, setInstantBookMessage] = useState<
    string | undefined
  >(undefined);
  const [cancellationPolicyMessage, setCancellationPolicyMessage] = useState<
    string | undefined
  >(undefined);
  const [initialSetupDone, setInitialSetupDone] = useState(false);
  const [originalPolicies, setOriginalPolicies] = useState<OriginalPolicies>({
    instantbook: false,
    cancellationpolicy: '',
  });

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
    if (currentHostListing) {
      switch (currentHostListing.instantbook) {
        case true:
          setInstantBookMessage('Instant Book on - Guests can book instantly.');
          break;

        case false:
          setInstantBookMessage(
            'Instant Book off - You’ll need to manually accept or decline booking requests.'
          );
          break;
      }

      switch (currentHostListing.cancellationpolicy) {
        case 'Flexible':
          setCancellationPolicyMessage(
            'Flexible - Guests will recieve a full refund 1 day prior to arrival'
          );
          break;
        case 'Moderate':
          setCancellationPolicyMessage(
            'Moderate - Guests will recieve a full refund 5 days prior to arrival'
          );
          break;
        case 'Firm':
          setCancellationPolicyMessage(
            'Firm - Guests will recieve a full refund for cancellations up to 30 days before the event. If booked fewer than 30 days before event, full refund for cancellations made within 48 hours of booking and at least 14 days before the event. After that, 50% refund up to 7 days before the event. No refund after that.'
          );
          break;
      }

      if (!initialSetupDone) {
        setOriginalPolicies({
          instantbook: currentHostListing.instantbook,
          cancellationpolicy: currentHostListing.cancellationpolicy || '',
        });
        setInitialSetupDone(true);
      }
    }
  }, [currentHostListing]);

  return (
    <div className='border-b w-full pt-8 pb-8' id='policiesBlock'>
      <div className='pb-6 font-semibold text-lg'>Policies</div>
      <div className='space-y-8'>
        {/* Cancellation Policy */}
        <TextAndMultipleSelectionBlock
          display={'Cancellation Policy'}
          contents={cancellationPolicyMessage}
          caption={'Choose the policy that will apply to all bookings.'}
          selectableOptions={cancellationPolicyOptions}
          onSelect={handleCancellationPolicySelection}
          onCancel={() => {
            if (!currentHostListing) return;
            setCurrentHostListing({
              ...currentHostListing,
              cancellationpolicy: originalPolicies.cancellationpolicy,
            });
          }}
          onSave={() => {
            if (!currentHostListing) return;

            setOriginalPolicies({
              ...originalPolicies,
              cancellationpolicy: currentHostListing.cancellationpolicy || '',
            });
          }}
          validateSelection={(value: string) => {
            if (!currentHostListing) return false;
            if (originalPolicies.cancellationpolicy === value) {
              return true;
            }
            return false;
          }}
        />
        {/* Instant Book */}
        <TextAndMultipleSelectionBlock
          display={'Instant Book Policy'}
          contents={instantBookMessage}
          caption={'Choose the policy that will apply to all bookings.'}
          selectableOptions={bookingTypeOptions}
          onSelect={handleInstantBookSelection}
          onCancel={() => {
            if (!currentHostListing) return;
            setCurrentHostListing({
              ...currentHostListing,
              instantbook: originalPolicies.instantbook,
            });
          }}
          onSave={() => {
            if (!currentHostListing) return;

            setOriginalPolicies({
              ...originalPolicies,
              instantbook: currentHostListing.instantbook,
            });
          }}
          validateSelection={(value: string) => {
            if (!currentHostListing) return false;

            let prev;
            if (value === 'Approve or decline requests') prev = false;
            else if (value === 'Instant Book ') prev = true;

            if (originalPolicies.instantbook === prev) return true;
            return false;
          }}
        />
      </div>
    </div>
  );
}

export default Policies;
