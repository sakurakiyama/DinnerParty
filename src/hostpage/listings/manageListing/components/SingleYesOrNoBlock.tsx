import YesOrNoButtons from '../../../../components/YesOrNoButtons';
import { ManageListingContext } from '../ManageListing';
import { useContext } from 'react';
import { Listing } from '../../../../types';

interface SingleYesOrNoBlockProps {
  header: string;
  caption?: string;
  isTrue: boolean;
  onChange: (value: boolean) => Listing | undefined;
}

function SingleYesOrNoBlock({
  header,
  caption,
  isTrue,
  onChange,
}: SingleYesOrNoBlockProps) {
  const { isLoading, updateListing } = useContext(ManageListingContext)!;

  const handleUpdate = (value: boolean) => {
    const listing = onChange(value);
    updateListing(listing);
  };

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
            onYesClick={() => handleUpdate(true)}
            onNoClick={() => handleUpdate(false)}
            isTrue={isTrue}
          />
        </>
      )}
    </div>
  );
}

export default SingleYesOrNoBlock;
