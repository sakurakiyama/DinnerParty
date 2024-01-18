import { useState } from 'react';
import LabeledInput from './LabeledInput';
import { LabeledInputProps } from '../types';
import { isBlankString } from '../utils';

interface TextAndFormEditBlockProps {
  display: string;
  contents?: string | null | JSX.Element;
  caption?: string;
  inputConfigs: LabeledInputProps[];
  onCancel: () => void;
  onSave: () => void;
  isLoading: boolean;
}

function GeneralTextAndFormEditBlock({
  display,
  contents = '',
  caption = '',
  inputConfigs,
  onCancel,
  onSave,
  isLoading,
}: TextAndFormEditBlockProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isNotValid, setIsNotValid] = useState<boolean>(true);

  const handleEditor = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  const handleSave = () => {
    onSave();
    handleEditor();
  };

  const checkOtherInputs = () => {
    let checkedOthers = false;
    for (const input of inputConfigs) {
      if (input.required) {
        if (isBlankString(input.value)) {
          checkedOthers = true;
          break;
        }
      }
    }
    setIsNotValid(checkedOthers);
  };

  return (
    <div className='w-full'>
      {/* If it's being edited, show the header and edit button */}
      {!isOpen && (
        <div className='flex flex-row'>
          <div className='mr-auto text-sm md:text-base'>{display}</div>
          {!isLoading && (
            <button
              className='text-xs md:text-sm underline font-semibold'
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
            <div className='text-xs md:text-sm text-slate-500 w-[95%]'>
              {contents}
            </div>
          )}
          {!contents && (
            <div className='text-xs md:text-sm   text-slate-500 italic w-[95%]'>
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
              <div className='mr-auto text-sm md:text-base'>{display}</div>
              <div className='text-xs md:text-sm text-slate-500'>{caption}</div>
            </div>
            <form className='space-y-2 w-full text-xs md:text-sm'>
              {inputConfigs.map((config) => (
                <LabeledInput
                  key={config.id}
                  required={config.required}
                  id={config.id}
                  display={config.display}
                  setterFunc={config.setterFunc}
                  value={config.value}
                  validate={(value) => {
                    let result;
                    if (config.validate) {
                      result = config.validate(value);
                      if (result) setIsNotValid(true);
                      else {
                        checkOtherInputs();
                      }
                    } else {
                      checkOtherInputs();
                    }
                    return result || null;
                  }}
                />
              ))}
            </form>
          </div>
          {/* Cancel or save */}
          <div className='mt-4 border-t'>
            <div className='text-xs md:text-sm space-x-2 flex flex-row p-4'>
              <button
                className='underline mr-auto font-semibold text-xs md:text-sm'
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
                } border rounded-md p-2 pr-4 pl-4 font-semibold text-white text-xs md:text-sm`}
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

export default GeneralTextAndFormEditBlock;
