import { ManageListingContext } from '../ManageListing';
import { useContext, useState } from 'react';
// import { HostContext } from '../../../../App';

type SelectableOption = {
  key: string;
  selected: boolean;
  description: JSX.Element | string;
};

interface TextAndMultipleSelectionBlockProps {
  display: string;
  contents?: string | null | JSX.Element;
  caption?: string;
  selectableOptions: SelectableOption[];
  handleSelect: (key: string) => void;
}

function TextAndMultipleSelectionBlock({
  display,
  contents = '',
  caption = '',
  selectableOptions,
  handleSelect,
}: TextAndMultipleSelectionBlockProps) {
  const { isLoading } = useContext(ManageListingContext)!;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleEditor = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <div>
      {!isOpen && (
        <div className='flex flex-row'>
          <div className='mr-auto'>{display}</div>
          {!isLoading && (
            <button
              className='text-sm underline font-black'
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
      {/* If it's being edited, show the selection area  */}
      {isOpen && (
        <div className='w-full border rounded-md'>
          <div className='p-4'>
            {/* Description Block */}
            <div className='flex flex-col'>
              <div>{display}</div>
              <div className='text-xs text-slate-500'>{caption}</div>
            </div>
            {/* Content Block */}
            <div className='pt-8 text-sm'>
              {selectableOptions &&
                selectableOptions.map((current, index) => {
                  return (
                    <div
                      className='flex flex-row w-full pb-4 checked:bg-black'
                      key={`${current.key}+${index}`}
                    >
                      <div className='mr-auto w-[95%]'>
                        {current.description}
                      </div>
                      <input
                        onChange={() => {
                          handleSelect(current.key);
                        }}
                        className='w-[20px] h-[20px] accent-[#000000]'
                        type='checkbox'
                        id={current.key}
                        name={current.key}
                        //   value={current.title}
                        checked={current.selected}
                      ></input>
                    </div>
                  );
                })}
            </div>
          </div>
          {/* Cancel or save */}
          <div className='mt-4 border-t'>
            <div className='text-sm space-x-2 flex flex-row p-4'>
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

export default TextAndMultipleSelectionBlock;
