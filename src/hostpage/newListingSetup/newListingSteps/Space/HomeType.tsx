import { allHomes } from '../../../../constants';
import Tiles from '../../../../components/Tiles';
import { NewListingWizardContext } from '../../NewListingWizard';
import { useContext, useState, useEffect } from 'react';
import SalmonButton from '../../../../components/SalmonButton';
import { HostContext } from '../../../../App';

function HomeType() {
  const { currentHostListing, setCurrentHostListing } =
    useContext(HostContext)!;

  const { currentView, setCurrentView, setSlideIn, slideIn } = useContext(
    NewListingWizardContext
  )!;

  const [notValidated, setNotValidated] = useState<boolean>(true);
  const [selected, setSelected] = useState<string>(
    currentHostListing?.hometype || ''
  );

  useEffect(() => {
    if (currentHostListing?.hometype) setNotValidated(false);
    else {
      setNotValidated(true);
    }
  }, [currentHostListing]);

  if (!currentHostListing) return;

  const updateHomeType = (homeType: string) => {
    if (selected === homeType) {
      setSelected('');
      setCurrentHostListing({ ...currentHostListing, hometype: '' });
    } else {
      setSelected(homeType);
      setCurrentHostListing({ ...currentHostListing, hometype: homeType });
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

  return (
    <div
      className={`flex flex-col h-full overflow-auto ${
        slideIn === 'Left' ? 'animate-slideInLeft' : 'animate-slideInRight'
      }`}
    >
      <div className='flex flex-col md:space-x-8 items-center justify-center md:mt-auto'>
        <div className='flex flex-col pb-10 pt-10 md:pb-0 md:p-10 items-center'>
          <div className='font-semibold text-2xl md:text-3xl text-center'>
            Which of these best describes your place?
          </div>
          <Tiles
            items={allHomes}
            handleTileClick={updateHomeType}
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

export default HomeType;
