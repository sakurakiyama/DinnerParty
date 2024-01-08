import { ManageListingContext } from '../ManageListing';
import { useContext } from 'react';

interface ManageListingInfoBlockProps {
  display: string;
  contents?: string | null | JSX.Element;
  caption?: string;
}
function ManageListingInfoBlock({
  display,
  contents = '',
  caption = '',
}: ManageListingInfoBlockProps) {
  const { isLoading } = useContext(ManageListingContext)!;

  return (
    <div>
      <div className='flex flex-row'>
        <div className='mr-auto'>{display}</div>
        <div className='text-sm underline font-black'>Edit</div>
      </div>
      {isLoading ? (
        <div className='w-full h-[25px] bg-gray-100 animate-pulse rounded-md'></div>
      ) : (
        <>
          {contents && (
            <div className='text-sm text-slate-500 w-[95%]'>{contents}</div>
          )}
          {!contents && (
            <div className='text-sm text-slate-500 italic w-[95%]'>
              {caption}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ManageListingInfoBlock;
