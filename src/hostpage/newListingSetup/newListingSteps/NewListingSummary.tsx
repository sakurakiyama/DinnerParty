import Plate from '../../../assets/Plate.png';
import WinePour from '../../../assets/WinePour.png';
import HangingLights from '../../../assets/HangingLights.png';
import SalmonButton from '../../../components/SalmonButton';
import { NewListingWizardContext } from '../NewListingWizard';
import { useContext } from 'react';

function NewListingSummary() {
  const { currentView, setCurrentView } = useContext(NewListingWizardContext)!;

  const handleView = () => {
    setCurrentView(currentView + 1);
  };

  const sections = [
    {
      number: 1,
      heading: 'Tell us about your space',
      caption:
        'Share some basic info, like where it is and how many guests can join.',
      image: HangingLights,
    },
    {
      number: 2,
      heading: 'Make it stand out',
      caption:
        'Add 5 or more photos plus a title and description—we’ll help you out.',
      image: WinePour,
    },
    {
      number: 3,
      heading: 'Finish up and publish',
      caption:
        "Set a starting price and publish your listing when you're ready.",
      image: Plate,
    },
  ];

  return (
    <div className='flex flex-col h-full overflow-auto'>
      <div className='md:m-auto'>
        <div className='m-8 flex justify-center items-center'>
          <div className='flex flex-col md:flex-row md:space-x-8 items-center'>
            <div className='font-black text-2xl md:text-4xl md:w-[50%] flex items-center justify-center pb-10 pt-10 md:pb-0 md:p-10'>
              It's easy to start hosting a listing on Dinner Party
            </div>
            <div className='md:w-[50%] space-y-8'>
              {sections &&
                sections.map((current, index) => {
                  return (
                    <div className='flex flex-row items-center' key={index}>
                      <div>
                        <div className='text-lg font-black flex'>
                          <div>{current.number}</div>
                          <div className='pl-4 font-bold'>
                            {current.heading}
                          </div>
                        </div>
                        <div className='pl-6 text-gray-500 mt-2'>
                          {current.caption}
                        </div>
                      </div>
                      <div className='ml-auto'>
                        <img
                          className='w-[125px] h-auto'
                          src={current.image}
                        ></img>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center mb-8 mt-auto'>
        <SalmonButton
          display={'Get started'}
          handleClick={handleView}
          operation={'Forward'}
          disabled={false}
        />
      </div>
    </div>
  );
}

export default NewListingSummary;
