/*
TODO: Add a map
TODO: Add submit logic 
*/

import LabeledInput from '../../../components/LabeledInput';
import { useState } from 'react';

function NewListingStepFive() {
  const [streetaddress, setStreetAddress] = useState<string>('');
  const [apt, setApt] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [zipcode, setZipCode] = useState<string>('');

  return (
    <div className='flex flex-col md:space-x-8'>
      <div className='flex flex-col pb-10 pt-10 md:pb-0 md:p-10'>
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
              setterFunc={setStreetAddress}
              value={streetaddress}
            />
            <LabeledInput
              required={false}
              id={'apt'}
              display={'Apt, suit, unit (if applicable)'}
              setterFunc={setApt}
              value={apt}
            />
            <LabeledInput
              required={true}
              id={'city'}
              display={'City'}
              setterFunc={setCity}
              value={city}
            />

            <LabeledInput
              required={true}
              id={'state'}
              display={'State'}
              setterFunc={setState}
              value={state}
            />
            <LabeledInput
              required={true}
              id={'zipcode'}
              display={'Zip code'}
              setterFunc={setZipCode}
              value={zipcode}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewListingStepFive;
