import YesOrNoButtons from '../../../../components/YesOrNoButtons';
import { ManageListingContext } from '../ManageListing';
import { useContext } from 'react';

interface ManageListingYesNoBlockProps {
  header: string;
  caption?: string;
  isTrue: boolean | null | undefined;
  onYesClick: () => void;
  onNoClick: () => void;
}

function ManageListingYesNoBlock({
  header,
  caption,
  isTrue,
  onYesClick,
  onNoClick,
}: ManageListingYesNoBlockProps) {
  const { isLoading } = useContext(ManageListingContext)!;

  return (
    <div className='flex flex-row items-center pb-6'>
      {isLoading ? (
        <div className='w-full h-[25px] bg-gray-100 animate-pulse rounded-md mr-4'></div>
      ) : (
        <>
          <div className='mr-auto flex-col items-center'>
            <div>{header}</div>
            {caption && <div className='text-sm text-slate-500'>{caption}</div>}
          </div>
          <YesOrNoButtons
            onYesClick={onYesClick}
            onNoClick={onNoClick}
            isTrue={isTrue}
          />
        </>
      )}
    </div>
  );
}

export default ManageListingYesNoBlock;
