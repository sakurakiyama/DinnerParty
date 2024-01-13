import { useContext, useState, useEffect } from 'react';
import { HostContext } from '../../../../../App';
import ColumnsAndMultipleYesOrNoBlock from '../../components/ColumnsAndMultipleYesOrNoBlock';
import {
  basicItems,
  safetyItems,
  standoutItems,
} from '../../../../../constants';

type OriginalAmenities = {
  amenities: string[];
};

function Amenities() {
  const { currentHostListing, setCurrentHostListing } =
    useContext(HostContext)!;

  const [initialSetupDone, setInitialSetupDone] = useState(false);
  const [originalAmenities, setOriginalAmenities] = useState<OriginalAmenities>(
    {
      amenities: [],
    }
  );

  useEffect(() => {
    if (currentHostListing && !initialSetupDone) {
      setOriginalAmenities({
        amenities: currentHostListing.amenities,
      });
      setInitialSetupDone(true);
    }
  }, [currentHostListing]);

  const handleAmenitiesSelection = (item: string) => {
    if (!currentHostListing) return [];

    if (currentHostListing.amenities.includes(item)) {
      const currentSelected = currentHostListing.amenities;
      const afterUnselect = currentSelected.filter((current) => {
        return current !== item;
      });
      setCurrentHostListing({
        ...currentHostListing,
        amenities: afterUnselect,
      });
      return afterUnselect;
    } else {
      setCurrentHostListing({
        ...currentHostListing,
        amenities: [...currentHostListing.amenities, item],
      });
      return [...currentHostListing.amenities, item];
    }
  };

  return (
    <div className='border-b w-full pt-8 pb-8' id='amenitiesBlock'>
      <ColumnsAndMultipleYesOrNoBlock
        contents={
          currentHostListing?.amenities &&
          currentHostListing?.amenities.length > 0
            ? currentHostListing?.amenities
            : undefined
        }
        caption={'Add some amenities to show guests what your place offers'}
        selectableOptions={{
          'Basic Items': basicItems,
          'Safety Items': safetyItems,
          'Standout Items': standoutItems,
        }}
        handleSelection={handleAmenitiesSelection}
        display='Amenities'
        currentSelection={currentHostListing?.amenities || []}
        onCancel={() => {
          if (!currentHostListing) return;
          setCurrentHostListing({
            ...currentHostListing,
            amenities: originalAmenities.amenities,
          });
        }}
        onSave={() => {
          if (!currentHostListing) return;
          setOriginalAmenities({
            ...originalAmenities,
            amenities: currentHostListing.amenities,
          });
        }}
        validateSelection={(selection: string[]) => {
          if (originalAmenities.amenities.length !== selection.length)
            return false;
          const sortedOriginal = originalAmenities.amenities.sort();
          const sortedSelection = selection.sort();

          for (let i = 0; i < sortedOriginal.length; i++) {
            if (sortedOriginal[i] !== sortedSelection[i]) {
              return false;
            }
          }
          return true;
        }}
      />
    </div>
  );
}

export default Amenities;
