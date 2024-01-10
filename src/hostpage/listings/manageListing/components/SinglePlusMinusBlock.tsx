import { ManageListingContext } from '../ManageListing';
import PlusMinusButtons from '../../../../components/PlusMinusButtons';
import { useContext } from 'react';

interface SinglePlusMinusBlockProps {
  onMinusClick: () => void;
  onPlusClick: () => void;
  display: string;
  displayValue: number;
  isMinusDisabled: boolean;
}

function SinglePlusMinusBlock({
  onMinusClick,
  onPlusClick,
  display,
  displayValue,
  isMinusDisabled,
}: SinglePlusMinusBlockProps) {
  const { isLoading } = useContext(ManageListingContext)!;

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
            onMinusClick={onMinusClick}
            onPlusClick={onPlusClick}
            displayValue={displayValue}
          />
        </div>
      )}
    </div>
  );
}

export default SinglePlusMinusBlock;
