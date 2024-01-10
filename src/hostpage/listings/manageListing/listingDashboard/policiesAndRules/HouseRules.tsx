import { useContext } from 'react';
import { HostContext } from '../../../../../App';
import SingleYesOrNoBlock from '../../components/SingleYesOrNoBlock';
import TextAndTextEditBlock from '../../components/TextAndTextEditBlock';

function HouseRules() {
  const { currentHostListing, setCurrentHostListing } =
    useContext(HostContext)!;

  return (
    <div className='border-b w-full pt-8 pb-8' id='policiesBlock'>
      <div className='font-black text-lg'>House rules</div>
      <div className='text-sm text-slate-500 pb-6'>
        Guests are expected to follow your rules, and can be removed from Dinner
        Party if they cause issues.
      </div>
      {/* Pets */}
      <SingleYesOrNoBlock
        header={'Pets Allowed'}
        isTrue={currentHostListing?.petsallowed || false}
        caption={
          'You can refuse pets, but must reasonably accommodate service animals.'
        }
        onYesClick={() => {
          if (!currentHostListing) return;

          setCurrentHostListing({ ...currentHostListing, petsallowed: true });
        }}
        onNoClick={() => {
          if (!currentHostListing) return;

          setCurrentHostListing({ ...currentHostListing, petsallowed: false });
        }}
      />
      {/* Smoking */}
      <SingleYesOrNoBlock
        header={'Smoking, vaping, e‑cigarettes allowed'}
        isTrue={currentHostListing?.smokingallowed || false}
        onYesClick={() => {
          if (!currentHostListing) return;
          setCurrentHostListing({
            ...currentHostListing,
            smokingallowed: true,
          });
        }}
        onNoClick={() => {
          if (!currentHostListing) return;
          setCurrentHostListing({
            ...currentHostListing,
            smokingallowed: false,
          });
        }}
      />
      {/* Filming */}
      <SingleYesOrNoBlock
        header={'Commercial photography and filming allowed'}
        isTrue={currentHostListing?.filmingallowed || false}
        onYesClick={() => {
          if (!currentHostListing) return;
          setCurrentHostListing({
            ...currentHostListing,
            filmingallowed: true,
          });
        }}
        onNoClick={() => {
          if (!currentHostListing) return;
          setCurrentHostListing({
            ...currentHostListing,
            filmingallowed: false,
          });
        }}
      />
      {/* Additional rules */}
      <TextAndTextEditBlock
        display={'Additional rules'}
        contents={currentHostListing?.additionalrules}
        caption={
          'Stick to the essentials—too many details can overwhelm guests. You can always share extra details in a message or your dining manual'
        }
        setterFunc={(additionalrules: string) => {
          if (!currentHostListing) return;
          setCurrentHostListing({
            ...currentHostListing,
            additionalrules,
          });
        }}
      />
    </div>
  );
}

export default HouseRules;
