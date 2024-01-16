import { ManageListingContext } from '../ManageListing';
import { useContext, useState } from 'react';

interface TextAndTextEditBlockProps {
  display: string;
  contents?: string;
  caption?: string;
  onChange: (key: string) => void;
  onCancel: () => void;
  onSave: () => void;
  required: boolean;
  validateInput: (value: string) => boolean;
  maxLength?: number;
}
function TextAndTextEditBlock({
  display,
  contents = '',
  caption = '',
  onChange,
  onCancel,
  onSave,
  required,
  validateInput,
  maxLength,
}: TextAndTextEditBlockProps) {
  const { isLoading, updateListing } = useContext(ManageListingContext)!;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isNotValid, setIsNotValid] = useState<boolean>(true);

  const handleEditor = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  const handleSave = () => {
    onSave();
    updateListing(undefined);
    handleEditor();
  };

  const handleValidation = (value: string) => {
    const isValid = validateInput(value);
    !isValid ? setIsNotValid(true) : setIsNotValid(false);
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
            {/* Block description */}
            <div className='flex flex-col'>
              <div>{display}</div>
              <div className='text-xs text-slate-500'>{caption}</div>
            </div>
            {/* Block content */}
            <div className='mt-6'>
              <textarea
                className={`text-sm border rounded-md p-2 whitespace-normal h-20 w-full`}
                id='title'
                value={contents}
                onChange={(event) => {
                  const value = event.target.value;
                  onChange(value);
                  handleValidation(value);
                }}
                required={required}
              ></textarea>
              {maxLength && (
                <div
                  className={`font-semibold mt-3 ${
                    contents.length > maxLength
                      ? 'text-rose-800'
                      : 'text-gray-500'
                  }`}
                >
                  {contents.length}/{maxLength}
                </div>
              )}
            </div>
          </div>
          {/* Cancel or save */}
          <div className='mt-4 border-t'>
            <div className='text-sm space-x-2 flex flex-row p-4'>
              <button
                className='underline mr-auto font-semibold'
                onClick={() => {
                  onCancel();
                  setIsNotValid(true);
                  handleEditor();
                }}
              >
                Cancel
              </button>
              <button
                className={`${
                  isNotValid ? 'bg-gray-300	' : 'bg-black'
                } border rounded-md p-2 pr-4 pl-4 font-semibold text-white`}
                disabled={isNotValid}
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TextAndTextEditBlock;
