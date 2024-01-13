import { ManageListingContext } from '../ManageListing';
import { useContext, useState } from 'react';
import YesOrNoButtons from '../../../../components/YesOrNoButtons';

type Item = {
  key: string;
  image: JSX.Element;
  display: string;
};

interface ColumnsAndMultipleYesOrNoBlockProps {
  contents: string[] | undefined | null;
  caption?: string;
  selectableOptions: { [key: string]: Item[] };
  handleSelection: (selection: string) => void;
  display: string;
  currentSelection: string[];
  onCancel: () => void;
  onSave: () => void;
}

function ColumnsAndMultipleYesOrNoBlock({
  contents,
  caption,
  selectableOptions,
  handleSelection,
  display,
  currentSelection,
  onCancel,
  onSave,
}: ColumnsAndMultipleYesOrNoBlockProps) {
  const { isLoading, updateListing } = useContext(ManageListingContext)!;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleEditor = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  const handleSave = () => {
    onSave();
    updateListing(undefined);
    handleEditor();
  };

  return (
    <div>
      {/* If it's not being edited, show the header and edit button */}
      {!isOpen && (
        <div className='flex flex-row'>
          <div className='mr-auto'>{display}</div>
          {!isLoading && (
            <button
              className='text-sm underline font-semibold'
              onClick={handleEditor}
            >
              Edit
            </button>
          )}
        </div>
      )}
      {/* If it's not being edited but it's still loading content, show skeleton loader */}
      {isLoading && (
        <div className='w-full h-[25px] bg-gray-100 animate-pulse rounded-md'></div>
      )}
      {/* If it's not being edited and it's finished loading, show contents. */}
      {!isOpen && !isLoading && (
        <div className='w-full'>
          {contents && (
            <div className='flex mr-auto w-full pr-2 pt-6'>
              <div className='text-sm text-slate-500 w-[50%]'>
                {contents &&
                  contents
                    .slice(0, Math.ceil(contents.length / 2))
                    .map((amenity, index) => (
                      <ul key={`${amenity}+${index}`}>{amenity}</ul>
                    ))}
              </div>
              <div className='text-sm text-slate-500 w-[50%]'>
                {contents &&
                  contents
                    .slice(Math.ceil(contents.length / 2))
                    .map((amenity, index) => (
                      <ul key={`${amenity}+${index}`}>{amenity}</ul>
                    ))}
              </div>
            </div>
          )}
        </div>
      )}
      {/* If it's being edited, show the selection area  */}
      {isOpen && (
        <div className='w-full border rounded-md'>
          <div className='p-4'>
            <div className='flex flex-col'>
              <div>{display}</div>
              <div className='text-xs text-slate-500'>{caption}</div>
            </div>
            <div className='mt-6'>
              {Object.keys(selectableOptions).map((currentCategory, index) => {
                return (
                  <div key={`${currentCategory}+${index}`}>
                    <div className={`${!currentCategory ? 'hidden' : 'block'}`}>
                      {currentCategory}
                    </div>
                    <div
                      className={`space-y-1 pt-4 ${
                        index === Object.keys(selectableOptions).length - 1
                          ? ''
                          : 'border-b pb-4'
                      }`}
                    >
                      {selectableOptions[currentCategory].map(
                        (item: Item, index) => (
                          <div
                            key={`${item}+${index}`}
                            className='flex flex-row items-center text-sm'
                          >
                            <div className='mr-auto'>{item.display}</div>
                            <YesOrNoButtons
                              onYesClick={() => handleSelection(item.display)}
                              onNoClick={() => handleSelection(item.display)}
                              isTrue={currentSelection.includes(item.display)}
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Cancel or save */}
          <div className='mt-4 border-t'>
            <div className='p-4 text-sm space-x-2 flex flex-row '>
              <button
                className='underline mr-auto'
                onClick={() => {
                  onCancel();
                  handleEditor();
                }}
              >
                Cancel
              </button>
              <button className='border rounded-md p-2' onClick={handleSave}>
                Save
              </button>{' '}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ColumnsAndMultipleYesOrNoBlock;
