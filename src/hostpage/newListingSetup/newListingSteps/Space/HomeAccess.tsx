import { MdOutlineMeetingRoom } from 'react-icons/md';
import { BsHouseDoor } from 'react-icons/bs';
import SelectableCards from '../../../../components/SelectableCards';
import { NewListingWizardContext } from '../../NewListingWizard';
import { useContext, useState, useEffect } from 'react';
import SalmonButton from '../../../../components/SalmonButton';
import { HostContext } from '../../../../App';

function HomeAccess() {
  const { currentHostListing, setCurrentHostListing } =
    useContext(HostContext)!;

  const { currentView, setCurrentView, setSlideIn, slideIn } = useContext(
    NewListingWizardContext
  )!;
  const [notValidated, setNotValidated] = useState<boolean>(true);
  const [selected, setSelected] = useState<string>(
    currentHostListing?.accesstype || ''
  );

  useEffect(() => {
    if (currentHostListing?.accesstype) setNotValidated(false);
    else {
      setNotValidated(true);
    }
  }, [currentHostListing]);

  if (!currentHostListing) return;

  const updateHomeAccess = (accessType: string) => {
    if (selected === accessType) {
      setSelected('');
      setCurrentHostListing({ ...currentHostListing, accesstype: '' });
    } else {
      setSelected(accessType);
      setCurrentHostListing({ ...currentHostListing, accesstype: accessType });
    }
  };

  const handleView = (operation?: string) => {
    if (operation === 'Forward') {
      setSlideIn('Right');
      setCurrentView(currentView + 1);
    } else if (operation === 'Backward') {
      setSlideIn('Left');
      setCurrentView(currentView - 1);
    }
  };

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
    <div
      className={`flex flex-col h-full overflow-auto ${
        slideIn === 'Left' ? 'animate-slideInLeft' : 'animate-slideInRight'
      }`}
    >
      <div className='flex flex-col md:space-x-8 md:mt-auto justify-center items-center'>
        <div className='flex flex-col pb-10 pt-10 md:pb-0 md:p-10 md:w-[700px] '>
          <div className='font-semibold text-2xl md:text-3xl'>
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
