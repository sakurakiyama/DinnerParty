import { MdOutlineMeetingRoom } from 'react-icons/md';
import { BsHouseDoor } from 'react-icons/bs';
import SelectableCards from '../../../../components/SelectableCards';
import { NewListingWizardContext } from '../../NewListingWizard';
import { useContext, useState, useEffect } from 'react';
import SalmonButton from '../../../../components/SalmonButton';

function HomeAccess() {
  const { spaceDetails, setSpaceDetails, currentView, setCurrentView } =
    useContext(NewListingWizardContext)!;
  const [notValidated, setNotValidated] = useState<boolean>(true);
  const [selected, setSelected] = useState<string>(spaceDetails.accessType);

  const updateHomeAccess = (accessType: string) => {
    if (selected === accessType) {
      setSelected('');
      setSpaceDetails({ ...spaceDetails, accessType: '' });
    } else {
      setSelected(accessType);
      setSpaceDetails({ ...spaceDetails, accessType });
    }
  };

  const handleView = (operation?: string) => {
    if (operation === 'Forward') {
      setCurrentView(currentView + 1);
    } else if (operation === 'Backward') setCurrentView(currentView - 1);
  };

  useEffect(() => {
    if (spaceDetails.accessType) setNotValidated(false);
    else setNotValidated(true);
  }, [spaceDetails]);

  const accessTypes = [
    {
      key: 'entireplace',
      image: <BsHouseDoor size={30} />,
      header: 'An entire place',
      caption: 'Guests will have the whole space to themselves',
    },
    {
      key: 'room',
      image: <MdOutlineMeetingRoom size={30} />,
      header: 'A room',
      caption:
        'Guests will have access to select rooms (for example: backyard, kitchen, dining room etc)',
    },
  ];
  return (
    <div className='flex flex-col h-full overflow-auto'>
      <div className='flex flex-col md:space-x-8 md:mt-auto justify-center items-center'>
        <div className='flex flex-col pb-10 pt-10 md:pb-0 md:p-10 md:w-[700px] '>
          <div className='font-black text-2xl md:text-3xl'>
            What space will guests have access to?
          </div>
          <SelectableCards
            cards={accessTypes}
            handleSelectableCardClick={updateHomeAccess}
            currentSelection={selected}
          />
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

export default HomeAccess;
