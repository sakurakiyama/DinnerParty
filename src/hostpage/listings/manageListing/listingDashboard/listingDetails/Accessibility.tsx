import { useContext } from 'react';
import { HostContext } from '../../../../../App';
import ColumnsAndMultipleYesOrNoBlock from '../../components/ColumnsAndMultipleYesOrNoBlock';
import { accessibilityItems } from '../../../../../constants';
function Accessibility() {
  const { currentHostListing, setCurrentHostListing } =
    useContext(HostContext)!;

  const handleAccessibilitySelection = (selection: string) => {
    console.log('selection is: ', selection);
    if (!currentHostListing) return;
    if (currentHostListing?.accessibility.includes(selection)) {
      const currentSelected = currentHostListing?.accessibility;
      const afterUnselect = currentSelected.filter((item) => {
        return item !== selection;
      });
      setCurrentHostListing({
        ...currentHostListing,
        accessibility: afterUnselect,
      });
    } else {
      setCurrentHostListing({
        ...currentHostListing,
        accessibility: [...currentHostListing.accessibility, selection],
      });
    }
  };

  return (
    <div className='border-b w-full pt-8 pb-8' id='accessibilityBlock'>
      <ColumnsAndMultipleYesOrNoBlock
        contents={
          currentHostListing?.accessibility &&
          currentHostListing?.accessibility.length > 0
            ? currentHostListing?.accessibility
            : undefined
        }
        caption={
          'Select features to help guests with mobility needs feel more confident booking your space.'
        }
        selectableOptions={{ '': accessibilityItems }}
        handleSelection={handleAccessibilitySelection}
        display={'Accessibility'}
      />
    </div>
  );
}

export default Accessibility;
