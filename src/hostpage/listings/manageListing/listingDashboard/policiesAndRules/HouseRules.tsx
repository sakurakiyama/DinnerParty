import { useContext, useState, useEffect } from 'react';
import { HostContext } from '../../../../../App';
import SingleYesOrNoBlock from '../../components/SingleYesOrNoBlock';
import TextAndTextEditBlock from '../../components/TextAndTextEditBlock';
import { isBlankString } from '../../../../../utils';

type OriginalHouseRules = {
  petsallowed: boolean;
  smokingallowed: boolean;
  filmingallowed: boolean;
  additionalrules: string;
};
function HouseRules() {
  const { currentHostListing, setCurrentHostListing } =
    useContext(HostContext)!;
  const [initialSetupDone, setInitialSetupDone] = useState(false);
  const [originalHouseRules, setOriginalHouseRules] =
    useState<OriginalHouseRules>({
      petsallowed: false,
      smokingallowed: false,
      filmingallowed: false,
      additionalrules: '',
    });

  useEffect(() => {
    if (currentHostListing && !initialSetupDone) {
      setOriginalHouseRules({
        petsallowed: currentHostListing.petsallowed,
        smokingallowed: currentHostListing.smokingallowed,
        filmingallowed: currentHostListing.filmingallowed,
        additionalrules: currentHostListing.additionalrules,
      });
      setInitialSetupDone(true);
    }
  }, [currentHostListing]);

  return (
    <div className='border-b w-full pt-8 pb-8' id='policiesBlock'>
      <div className='font-semibold text-lg'>House rules</div>
      <div className='text-xs md:text-sm text-slate-500 pb-6'>
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
        onChange={(value: boolean) => {
          if (!currentHostListing) return;
          const listing = { ...currentHostListing };
          listing.petsallowed = value;
          setCurrentHostListing(listing);
          return listing;
        }}
      />
      {/* Smoking */}
      <SingleYesOrNoBlock
        header={'Smoking, vaping, e‑cigarettes allowed'}
        isTrue={currentHostListing?.smokingallowed || false}
        onChange={(value: boolean) => {
          if (!currentHostListing) return;
          const listing = { ...currentHostListing };
          listing.smokingallowed = value;
          setCurrentHostListing(listing);
          return listing;
        }}
      />
      {/* Filming */}
      <SingleYesOrNoBlock
        header={'Commercial photography and filming allowed'}
        isTrue={currentHostListing?.filmingallowed || false}
        onChange={(value: boolean) => {
          if (!currentHostListing) return;

          const listing = { ...currentHostListing };
          listing.filmingallowed = value;
          setCurrentHostListing(listing);
          return listing;
        }}
      />
      {/* Additional rules */}
      <TextAndTextEditBlock
        display={'Additional rules'}
        contents={currentHostListing?.additionalrules}
        caption={
          'Stick to the essentials—too many details can overwhelm guests. You can always share extra details in a message or your dining manual'
        }
        onChange={(additionalrules: string) => {
          if (!currentHostListing) return;
          setCurrentHostListing({
            ...currentHostListing,
            additionalrules,
          });
        }}
        onCancel={() => {
          if (!currentHostListing) return;
          setCurrentHostListing({
            ...currentHostListing,
            additionalrules: originalHouseRules.additionalrules,
          });
        }}
        onSave={() => {
          if (!currentHostListing) return;
          setOriginalHouseRules({
            ...originalHouseRules,
            additionalrules: currentHostListing.additionalrules,
          });
        }}
        required={true}
        validateInput={(value: string) => {
          if (isBlankString(value)) return false;
          else if (value === originalHouseRules.additionalrules) return false;
          else return true;
        }}
      />
    </div>
  );
}

export default HouseRules;
