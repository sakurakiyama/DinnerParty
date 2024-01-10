import { useContext } from 'react';
import { HostContext } from '../../../../../App';
import ManageListingYesNoBlock from '../../components/ManageListingYesNoBlock';
import ManageListingTextBlock from '../../components/ManageListingTextBlock';

function HouseRules() {
  const { currentHostListing } = useContext(HostContext)!;

  const handleYesClick = () => {
    console.log('yes selected');
  };

  const handleNoClick = () => {
    console.log('no selected');
  };
  return (
    <div className='border-b w-full pt-8 pb-8' id='policiesBlock'>
      <div className='font-black text-lg'>House rules</div>
      <div className='text-sm text-slate-500 pb-6'>
        Guests are expected to follow your rules, and can be removed from Dinner
        Party if they cause issues.
      </div>
      {/* Pets */}
      <ManageListingYesNoBlock
        header={'Pets Allowed'}
        isTrue={currentHostListing?.petsallowed}
        caption={
          'You can refuse pets, but must reasonably accommodate service animals.'
        }
        onYesClick={handleYesClick}
        onNoClick={handleNoClick}
      />
      {/* Smoking */}
      <ManageListingYesNoBlock
        header={'Smoking, vaping, e‑cigarettes allowed'}
        isTrue={currentHostListing?.smokingallowed}
        onYesClick={handleYesClick}
        onNoClick={handleNoClick}
      />
      {/* Filming */}
      <ManageListingYesNoBlock
        header={'Commercial photography and filming allowed'}
        isTrue={currentHostListing?.filmingallowed}
        onYesClick={handleYesClick}
        onNoClick={handleNoClick}
      />
      {/* Additional rules */}
      <ManageListingTextBlock
        display={'Additional rules'}
        contents={currentHostListing?.additionalrules}
        caption={
          'Stick to the essentials—too many details can overwhelm guests. You can always share extra details in a message or your dining manual'
        }
      />
    </div>
  );
}

export default HouseRules;
