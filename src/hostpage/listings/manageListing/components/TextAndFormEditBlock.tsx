import { ManageListingContext } from '../ManageListing';
import { useContext, useState } from 'react';
import LabeledInput from '../../../../components/LabeledInput';
import { LabeledInputProps } from '../../../../types';

interface TextAndFormEditBlockProps {
  display: string;
  contents?: string | null | JSX.Element;
  caption?: string;
  inputConfigs: LabeledInputProps[];
}
function TextAndFormEditBlock({
  display,
  contents = '',
  caption = '',
  inputConfigs,
}: TextAndFormEditBlockProps) {
  const { isLoading } = useContext(ManageListingContext)!;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleEditor = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <div className='w-full'>
      {/* If it's being edited, show the header and edit button */}
      {!isOpen && (
        <div className='flex flex-row'>
          <div className='mr-auto text-base'>{display}</div>
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
      {/* If it's being edited, show the text area  */}
      {isOpen && (
        <div className='w-full border rounded-md'>
          <div className='p-4'>
            <div className='flex flex-col pb-4'>
              <div className='mr-auto text-base'>{display}</div>
              <div className='text-xs text-slate-500'>{caption}</div>
            </div>
            <form className='space-y-2 w-full'>
              {inputConfigs.map((config) => (
                <LabeledInput
                  key={config.id}
                  required={config.required}
                  id={config.id}
                  display={config.display}
                  setterFunc={config.setterFunc}
                  value={config.value}
                  validate={config.validate}
                />
              ))}
            </form>
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

export default TextAndFormEditBlock;
