/*
TODO: Add a map
TODO: Add submit logic 
*/

import LabeledInput from '../../../../components/LabeledInput';
import { useContext, useState, useEffect } from 'react';
import { NewListingWizardContext } from '../../NewListingWizard';
import SalmonButton from '../../../../components/SalmonButton';

/*
TODO: Add input validation
*/
function HomeLocation() {
  const { spaceContext, newListingButtonsContext } = useContext(
    NewListingWizardContext
  );
  const { spaceDetails, setSpaceDetails } = spaceContext;
  const { currentView, setCurrentView } = newListingButtonsContext;
  const [notValidated, setNotValidated] = useState<boolean>(true);

  const handleView = (operation?: string) => {
    localStorage.setItem('spaceDetails', JSON.stringify(spaceDetails));

    if (operation === 'Forward') {
      setCurrentView(currentView + 1);
    } else if (operation === 'Backward') setCurrentView(currentView - 1);
  };

  useEffect(() => {
    if (
      spaceDetails.streetAddress &&
      spaceDetails.city &&
      spaceDetails.state &&
      spaceDetails.zipCode
    )
      setNotValidated(false);
  }, [spaceDetails]);

  return (
    <div className='flex flex-col h-full overflow-auto'>
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
              <LabeledInput
                required={true}
                id={'streetaddress'}
                display={'Street address'}
                setterFunc={(streetAddress) =>
                  setSpaceDetails({ ...spaceDetails, streetAddress })
                }
                value={spaceDetails.streetAddress}
              />
              <LabeledInput
                required={false}
                id={'apt'}
                display={'Apt, suit, unit (if applicable)'}
                setterFunc={(apt) => setSpaceDetails({ ...spaceDetails, apt })}
                value={spaceDetails.apt}
              />
              <LabeledInput
                required={true}
                id={'city'}
                display={'City'}
                setterFunc={(city) =>
                  setSpaceDetails({ ...spaceDetails, city })
                }
                value={spaceDetails.city}
              />

              <LabeledInput
                required={true}
                id={'state'}
                display={'State'}
                setterFunc={(state) =>
                  setSpaceDetails({ ...spaceDetails, state })
                }
                value={spaceDetails.state}
              />
              <LabeledInput
                required={true}
                id={'zipcode'}
                display={'Zip code'}
                setterFunc={(zipCode) =>
                  setSpaceDetails({ ...spaceDetails, zipCode })
                }
                value={spaceDetails.zipCode}
              />
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
