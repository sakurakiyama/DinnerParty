import { ManageListingContext } from '../ManageListing';
import { useContext, useState } from 'react';
import YesOrNoButtons from '../../../../components/YesOrNoButtons';
import { HostContext } from '../../../../App';

type Item = {
  key: string;
  image: JSX.Element;
  display: string;
};

interface ManageListingListBlockProps {
  contents: string[] | undefined | null;
  caption?: string;
  selectableOptions: { [key: string]: Item[] };
}

function ManageListingListBlock({
  contents,
  caption,
  selectableOptions,
}: ManageListingListBlockProps) {
  const { isLoading } = useContext(ManageListingContext)!;
  const { currentHostListing } = useContext(HostContext)!;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleEditor = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <div className='flex'>
      {!isOpen && isLoading && (
        <div className='w-full h-[25px] bg-gray-100 animate-pulse rounded-md mr-4'></div>
      )}
      {!isOpen && !isLoading && (
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
      {!isOpen && (
        <div>
          <button
            className={`text-sm underline font-black ${
              contents ? 'pt-6' : 'pt-0'
            }`}
            onClick={handleEditor}
          >
            Edit
          </button>
        </div>
      )}
      {/* If it's being edited, show the selection area  */}
      {isOpen && (
        <div className='w-full border rounded-md mt-6 '>
          <div className='p-4'>
            {Object.keys(selectableOptions).map((currentCategory, index) => {
              return (
                <div className='p-4'>
                  <div>{currentCategory}</div>
                  <div
                    className={`space-y-1 pt-4 ${
                      index === Object.keys(selectableOptions).length - 1
                        ? ''
                        : 'border-b pb-4'
                    }`}
                  >
                    {selectableOptions[currentCategory].map((item) => (
                      <div
                        key={item.key}
                        className='flex flex-row items-center text-sm'
                      >
                        <div className='mr-auto'>{item.display}</div>
                        <YesOrNoButtons
                          // TODO: Add actually onclick handlers
                          onYesClick={() => {}}
                          onNoClick={() => {}}
                          isTrue={currentHostListing?.amenities.includes(
                            item.display
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Cancel or save */}
          <div className='mt-4 border-t'>
            <div className='p-4 text-sm space-x-2 flex flex-row '>
              <button className='underline mr-auto' onClick={handleEditor}>
                Cancel
              </button>
              <button className='border rounded-md p-2'>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageListingListBlock;
