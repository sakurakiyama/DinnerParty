import Tiles from '../../../../components/Tiles';
import SalmonButton from '../../../../components/SalmonButton';
import { NewListingWizardContext } from '../../NewListingWizard';
import { useContext, useState } from 'react';
import { HostContext } from '../../../../App';
import { basicItems, safetyItems, standoutItems } from '../../../../constants';

function BasicAmenities() {
  const { currentHostListing, setCurrentHostListing } =
    useContext(HostContext)!;

  const { currentView, setCurrentView, setSlideIn, slideIn } = useContext(
    NewListingWizardContext
  )!;

  const [selected, setSelected] = useState<string[]>(
    currentHostListing?.amenities || []
  );

  if (!currentHostListing) return;

  const updateAmenenities = (amenity: string) => {
    if (selected?.includes(amenity)) {
      const currentSelected = selected;
      const afterUnselect = currentSelected.filter((item) => {
        return item !== amenity;
      });
      setSelected(afterUnselect);
      setCurrentHostListing({
        ...currentHostListing,
        amenities: afterUnselect,
      });
    } else {
      setSelected([...selected, amenity]);
      setCurrentHostListing({
        ...currentHostListing,
        amenities: [...currentHostListing.amenities, amenity],
      });
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
      <div className='flex flex-col md:space-x-8 items-center justify-center '>
        <div className='flex flex-col pb-10 pt-10 md:pb-0 md:p-10'>
          <div className='font-semibold text-2xl md:text-3xl'>
            Tell guests what your place has to offer
          </div>
          <div className='mt-4 text-sm md:text-base text-gray-500'>
            You can add more amenities after you publish your listing.
          </div>
          <Tiles
            items={basicItems}
            handleTileClick={updateAmenenities}
            currentSelection={selected}
          />
          <div className='font-semibold md:text-base pt-8'>
            Do you have any standout amenities?
          </div>
          <Tiles
            items={standoutItems}
            handleTileClick={updateAmenenities}
            currentSelection={selected}
          />
          <div className='font-semibold md:text-base pt-8'>
            Do you have any of these safety items?
          </div>
          <Tiles
            items={safetyItems}
            handleTileClick={updateAmenenities}
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
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
}

export default BasicAmenities;
