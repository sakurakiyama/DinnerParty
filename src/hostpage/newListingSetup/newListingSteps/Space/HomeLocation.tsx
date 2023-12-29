import LabeledInput from '../../../../components/LabeledInput';
import { useContext, useState, useEffect } from 'react';
import { NewListingWizardContext } from '../../NewListingWizard';
import SalmonButton from '../../../../components/SalmonButton';
import {
  isAlphaWithSpacesAndAccents,
  isBlankString,
  isAlphaWithSpacesAccentsAndNumbers,
} from '../../../../utils';

/*
TODO: [] Add a map
TODO: [] If someone enters a location outside of where Dinner Party is currently operating, should display message
TODO: [] Should validate if it's a real address using external API
*/

function HomeLocation() {
  const {
    spaceDetails,
    setSpaceDetails,
    currentView,
    setCurrentView,
    setSlideIn,
    slideIn,
  } = useContext(NewListingWizardContext)!;
  const [notValidated, setNotValidated] = useState<boolean>(true);

  const handleView = (operation?: string) => {
    if (operation === 'Forward') {
      setSlideIn('Right');
      setCurrentView(currentView + 1);
    } else if (operation === 'Backward') {
      setSlideIn('Left');
      setCurrentView(currentView - 1);
    }
  };

  useEffect(() => {
    for (const inputConfig of inputConfigs) {
      if (inputConfig.validate) {
        const result = inputConfig.validate();
        if (result) {
          setNotValidated(true);
          return;
        }
      }
    }
    setNotValidated(false);
  }, [spaceDetails]);

  const inputConfigs = [
    {
      id: 'streetaddress',
      display: 'Street address',
      required: true,
      setterFunc: (streetAddress: string) =>
        setSpaceDetails({ ...spaceDetails, streetAddress }),
      value: spaceDetails.streetAddress,
      validate: () => {
        const blankField = isBlankString(spaceDetails.streetAddress);
        if (blankField) return 'Street address is a required field';
        const noSpecialChars = isAlphaWithSpacesAccentsAndNumbers(
          spaceDetails.streetAddress
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
      setterFunc: (apt: string) => setSpaceDetails({ ...spaceDetails, apt }),
      value: spaceDetails.apt,
    },
    {
      id: 'city',
      display: 'City',
      required: true,
      setterFunc: (city: string) => setSpaceDetails({ ...spaceDetails, city }),
      value: spaceDetails.city,
      validate: () => {
        const blankField = isBlankString(spaceDetails.city);
        if (blankField) return 'City is a required field';
        const noSpecialCharsAndNumbers = isAlphaWithSpacesAndAccents(
          spaceDetails.city
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
      setterFunc: (state: string) =>
        setSpaceDetails({ ...spaceDetails, state }),
      value: spaceDetails.state,
      validate: () => {
        const blankField = isBlankString(spaceDetails.state);
        if (blankField) return 'State is a required field';
        const noSpecialCharsAndNumbers = isAlphaWithSpacesAndAccents(
          spaceDetails.state
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
      setterFunc: (zipCode: string) =>
        setSpaceDetails({ ...spaceDetails, zipCode }),
      value: spaceDetails.zipCode,
      validate: () => {
        const blankField = isBlankString(spaceDetails.zipCode);
        if (blankField) return 'Zip code is a required field';
        return null;
      },
    },
  ];

  return (
    <div
      className={`flex flex-col h-full overflow-auto ${
        slideIn === 'Left' ? 'animate-slideInLeft' : 'animate-slideInRight'
      }`}
    >
      <div className='flex flex-col md:space-x-8 justify-center items-center md:mt-auto'>
        <div className='flex flex-col pb-10 pt-10 md:pb-0 md:pt-0'>
          <div className='font-black text-2xl md:text-3xl '>
            Where's your place located?
          </div>
          <div className='mt-4 text-gray-500'>
            Your address is only shared with guests after they’ve made a
            reservation.
          </div>
          <div className='items-center justify-center flex flex-col md:w-[500px] mt-8'>
            <form className='space-y-2 w-full'>
              {inputConfigs.map((config) => (
                <LabeledInput
                  key={config.id}
                  required={config.required}
                  id={config.id}
                  display={config.display}
                  setterFunc={config.setterFunc}
                  value={config.value}
                  validate={config.validate}
                />
              ))}
            </form>
          </div>
        </div>
      </div>
      <div className='flex justify-center mb-8 mt-auto pt-6'>
        <div className='flex w-full justify-between ml-4 mr-4'>
          <SalmonButton
            display={'Back'}
            handleClick={handleView}
            operation={'Backward'}
            disabled={false}
          />
          <SalmonButton
            display={'Next'}
            handleClick={handleView}
            operation={'Forward'}
            disabled={notValidated}
          />
        </div>
      </div>
    </div>
  );
}

export default HomeLocation;
