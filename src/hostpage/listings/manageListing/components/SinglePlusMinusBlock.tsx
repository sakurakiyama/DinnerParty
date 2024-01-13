import { ManageListingContext } from '../ManageListing';
import PlusMinusButtons from '../../../../components/PlusMinusButtons';
import { useContext } from 'react';
import { Listing } from '../../../../types';

interface SinglePlusMinusBlockProps {
  display: string;
  displayValue: number;
  isMinusDisabled: boolean;
  onChange: (operation: number) => Listing | undefined;
}

function SinglePlusMinusBlock({
  display,
  displayValue,
  isMinusDisabled,
  onChange,
}: SinglePlusMinusBlockProps) {
  const { isLoading, updateListing } = useContext(ManageListingContext)!;

  const handleUpdate = (operation: number) => {
    const listing = onChange(operation);
    updateListing(listing);
  };
  return (
    <div>
      {isLoading && (
        <div>
          <div>{display}</div>
          <div className='w-full h-[25px] bg-gray-100 animate-pulse rounded-md'></div>
        </div>
      )}
      {!isLoading && (
        <div className='flex flex-row items-center'>
          <div className='w-full'>{display}</div>
          <PlusMinusButtons
            isMinusDisabled={isMinusDisabled}
            onMinusClick={() => handleUpdate(-1)}
            onPlusClick={() => handleUpdate(+1)}
            displayValue={displayValue}
          />
        </div>
      )}
    </div>
  );
}

export default SinglePlusMinusBlock;
