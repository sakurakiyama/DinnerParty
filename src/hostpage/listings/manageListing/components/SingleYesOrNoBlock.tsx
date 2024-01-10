import YesOrNoButtons from '../../../../components/YesOrNoButtons';
import { ManageListingContext } from '../ManageListing';
import { useContext } from 'react';

interface SingleYesOrNoBlockProps {
  header: string;
  caption?: string;
  isTrue: boolean;
  onYesClick: () => void;
  onNoClick: () => void;
}

function SingleYesOrNoBlock({
  header,
  caption,
  isTrue,
  onYesClick,
  onNoClick,
}: SingleYesOrNoBlockProps) {
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

export default SingleYesOrNoBlock;
