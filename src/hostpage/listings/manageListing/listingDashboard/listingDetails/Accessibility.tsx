import { useContext, useState, useEffect } from 'react';
import { HostContext } from '../../../../../App';
import ColumnsAndMultipleYesOrNoBlock from '../../components/ColumnsAndMultipleYesOrNoBlock';
import { accessibilityItems } from '../../../../../constants';

type OriginalAccessibility = {
  accessibility: string[];
};

function Accessibility() {
  const { currentHostListing, setCurrentHostListing } =
    useContext(HostContext)!;
  const [initialSetupDone, setInitialSetupDone] = useState(false);
  const [originalAccessibility, setOriginalAccessibility] =
    useState<OriginalAccessibility>({
      accessibility: [],
    });

  useEffect(() => {
    if (currentHostListing && !initialSetupDone) {
      setOriginalAccessibility({
        accessibility: currentHostListing.accessibility,
      });
      setInitialSetupDone(true);
    }
  }, [currentHostListing]);

  const handleAccessibilitySelection = (selection: string) => {
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
        selectableOptions={{ 'Accessibility Items': accessibilityItems }}
        handleSelection={handleAccessibilitySelection}
        display={'Accessibility'}
        currentSelection={currentHostListing?.accessibility || []}
        onCancel={() => {
          if (!currentHostListing) return;
          setCurrentHostListing({
            ...currentHostListing,
            accessibility: originalAccessibility.accessibility,
          });
        }}
        onSave={() => {
          if (!currentHostListing) return;
          setOriginalAccessibility({
            ...originalAccessibility,
            accessibility: currentHostListing.accessibility,
          });
        }}
      />
    </div>
  );
}

export default Accessibility;
