import { useContext, useState, useEffect } from 'react';
import { HostContext } from '../../../../../App';
import TextAndTextEditBlock from '../../components/TextAndTextEditBlock';
import TextAndFormEditBlock from '../../components/TextAndFormEditBlock';
import {
  isAlphaWithSpacesAccentsAndNumbers,
  isAlphaWithSpacesAndAccents,
  isBlankString,
} from '../../../../../utils';
import { LabeledInputProps } from '../../../../../types';

type OriginalLocation = {
  streetaddress: string;
  apt: string;
  city: string;
  state: string;
  zipcode: string;
  gettingarounddescription: string;
  neighborhooddescription: string;
};

function Location() {
  const { currentHostListing, setCurrentHostListing } =
    useContext(HostContext)!;
  const [initialSetupDone, setInitialSetupDone] = useState(false);
  const [originalLocation, setOriginalLocation] = useState<OriginalLocation>({
    streetaddress: '',
    apt: '',
    city: '',
    state: '',
    zipcode: '',
    gettingarounddescription: '',
    neighborhooddescription: '',
  });

  useEffect(() => {
    if (currentHostListing && !initialSetupDone) {
      setOriginalLocation({
        streetaddress: currentHostListing.streetaddress,
        apt: currentHostListing.apt,
        city: currentHostListing.city,
        state: currentHostListing.state,
        zipcode: currentHostListing.zipcode,
        gettingarounddescription: currentHostListing.gettingarounddescription,
        neighborhooddescription: currentHostListing.neighborhooddescription,
      });
      setInitialSetupDone(true);
    }
  }, [currentHostListing]);

  const inputConfigs: LabeledInputProps[] = [
    {
      id: 'streetaddress',
      display: 'Street address',
      required: true,
      setterFunc: (streetAddress: string) => {
        if (!currentHostListing) return;
        setCurrentHostListing({
          ...currentHostListing,
          streetaddress: streetAddress,
        });
      },
      value: currentHostListing?.streetaddress || '',
      validate: () => {
        if (!currentHostListing) return 'Cannot yet validate';
        const blankField = isBlankString(currentHostListing.streetaddress);
        if (blankField) return 'Street address is a required field';
        const noSpecialChars = isAlphaWithSpacesAccentsAndNumbers(
          currentHostListing.streetaddress
        );
        if (!noSpecialChars)
          return 'Street address can only contain characters and numbers';
        return null;
      },
    },
    {
      id: 'apt',
      display: 'Apt, suit, unit (if applicable)',
      required: false,
      setterFunc: (apt: string) => {
        if (!currentHostListing) return;
        setCurrentHostListing({ ...currentHostListing, apt });
      },
      value: currentHostListing?.apt || '',
    },
    {
      id: 'city',
      display: 'City',
      required: true,
      setterFunc: (city: string) => {
        if (!currentHostListing) return;
        setCurrentHostListing({ ...currentHostListing, city });
      },
      value: currentHostListing?.city || '',
      validate: () => {
        if (!currentHostListing) return 'Cannot yet validate';
        const blankField = isBlankString(currentHostListing.city);
        if (blankField) return 'City is a required field';
        const noSpecialCharsAndNumbers = isAlphaWithSpacesAndAccents(
          currentHostListing.city
        );
        if (!noSpecialCharsAndNumbers)
          return 'City can only contain characters';
        return null;
      },
    },
    {
      id: 'state',
      display: 'State',
      required: true,
      setterFunc: (state: string) => {
        if (!currentHostListing) return;
        setCurrentHostListing({ ...currentHostListing, state });
      },
      value: currentHostListing?.state || '',
      validate: () => {
        if (!currentHostListing) return 'Cannot yet validate';
        const blankField = isBlankString(currentHostListing.state);
        if (blankField) return 'State is a required field';
        const noSpecialCharsAndNumbers = isAlphaWithSpacesAndAccents(
          currentHostListing.state
        );
        if (!noSpecialCharsAndNumbers)
          return 'State can only contain characters';
        return null;
      },
    },
    {
      id: 'zipcode',
      display: 'Zip code',
      required: true,
      setterFunc: (zipCode: string) => {
        if (!currentHostListing) return;
        setCurrentHostListing({ ...currentHostListing, zipcode: zipCode });
      },
      value: currentHostListing?.zipcode || '',
      validate: () => {
        if (!currentHostListing) return 'Cannot yet validate';
        const blankField = isBlankString(currentHostListing.zipcode);
        if (blankField) return 'Zip code is a required field';
        return null;
      },
    },
  ];

  return (
    <div className='border-b w-full pt-8 pb-8' id='locationBlock'>
      <div className='pb-6 font-semibold text-lg'>Location</div>
      <div className='space-y-8'>
        <div className='text-sm'>
          {/* Address */}
          <TextAndFormEditBlock
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
            inputConfigs={inputConfigs}
            onCancel={() => {
              if (!currentHostListing) return;
              setCurrentHostListing({
                ...currentHostListing,
                streetaddress: originalLocation.streetaddress,
                apt: originalLocation.apt,
                city: originalLocation.city,
                state: originalLocation.state,
                zipcode: originalLocation.zipcode,
              });
            }}
            onSave={() => {
              if (!currentHostListing) return;
              setOriginalLocation({
                ...originalLocation,
                neighborhooddescription:
                  currentHostListing.neighborhooddescription,
              });
            }}
          />
        </div>
        {/* Getting Around */}
        <TextAndTextEditBlock
          display={'Getting around'}
          contents={currentHostListing?.gettingarounddescription}
          caption={
            'Let guests know how they can get to the neighborhood and what parking is like.'
          }
          onChange={(gettingarounddescription: string) => {
            if (!currentHostListing) return;
            setCurrentHostListing({
              ...currentHostListing,
              gettingarounddescription,
            });
          }}
          onCancel={() => {
            if (!currentHostListing) return;
            setCurrentHostListing({
              ...currentHostListing,
              gettingarounddescription:
                originalLocation.gettingarounddescription,
            });
          }}
          onSave={() => {
            if (!currentHostListing) return;
            setOriginalLocation({
              ...originalLocation,
              gettingarounddescription:
                currentHostListing.gettingarounddescription,
            });
          }}
        />
        {/* Neighborhood Description */}
        <TextAndTextEditBlock
          display={'Neighborhood description'}
          contents={currentHostListing?.neighborhooddescription}
          caption={'Share some highlights about the neighborhood. '}
          onChange={(neighborhooddescription: string) => {
            if (!currentHostListing) return;
            setCurrentHostListing({
              ...currentHostListing,
              neighborhooddescription,
            });
          }}
          onCancel={() => {
            if (!currentHostListing) return;
            setCurrentHostListing({
              ...currentHostListing,
              neighborhooddescription: originalLocation.neighborhooddescription,
            });
          }}
          onSave={() => {
            if (!currentHostListing) return;
            setOriginalLocation({
              ...originalLocation,
              neighborhooddescription:
                currentHostListing.neighborhooddescription,
            });
          }}
        />
      </div>
    </div>
  );
}

export default Location;
