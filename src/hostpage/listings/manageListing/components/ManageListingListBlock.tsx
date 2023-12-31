import { ManageListingContext } from '../ManageListing';
import { useContext } from 'react';

interface ManageListingListBlockProps {
  contents: string[] | undefined | null;
  caption?: string;
}

function ManageListingListBlock({
  contents,
  caption,
}: ManageListingListBlockProps) {
  const { isLoading } = useContext(ManageListingContext)!;

  return (
    <div className='flex'>
      {isLoading ? (
        <div className='w-full h-[25px] bg-gray-100 animate-pulse rounded-md mr-4'></div>
      ) : (
        <>
          {contents && (
            <div className='flex mr-auto w-full pr-2 pt-6'>
              <div className='text-sm text-slate-500 w-[50%]'>
                {contents &&
                  contents
                    .slice(0, Math.ceil(contents.length / 2))
                    .map((amenity, index) => <ul key={index}>{amenity}</ul>)}
              </div>
              <div className='text-sm text-slate-500 w-[50%]'>
                {contents &&
                  contents
                    .slice(Math.ceil(contents.length / 2))
                    .map((amenity, index) => <ul key={index}>{amenity}</ul>)}
              </div>
            </div>
          )}
          {!contents && (
            <div className='text-sm text-slate-500 italic w-full pr-2'>
              {caption}
            </div>
          )}
        </>
      )}
      <div
        className={`text-sm underline font-black ${contents ? 'pt-6' : 'pt-0'}`}
      >
        Edit
      </div>
    </div>
  );
}

export default ManageListingListBlock;
