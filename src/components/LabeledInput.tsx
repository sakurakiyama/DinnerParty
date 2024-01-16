import { useState, useEffect } from 'react';
import { MdErrorOutline } from 'react-icons/md';
import { LabeledInputProps } from '../types';

function LabeledInput({
  required,
  id,
  display,
  setterFunc,
  value,
  validate,
}: LabeledInputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (value) setIsFocused(true);
    else {
      setIsFocused(false);
    }
  }, [value]);

  const validateInput = (value: string) => {
    if (validate) {
      const message = validate(value);
      if (message) setErrorMessage(message);
      else setErrorMessage(null);
    }
  };

  return (
    <div className='relative'>
      <input
        onFocus={() => setIsFocused(true)}
        onChange={(e) => {
          setterFunc(e.target.value);
          validateInput(e.target.value);
        }}
        onBlur={(e) => {
          validateInput(e.target.value);
        }}
        value={value}
        id={id}
        type='text'
        required={required}
        className={`border w-full pt-6 h-[60px] rounded-lg p-2 ${
          errorMessage ? 'outline-rose-800 bg-rose-800/20' : 'outline-slate-500'
        }`}
      />
      <label
        htmlFor={id}
        className={`text-gray-500 transition-all ${
          isFocused
            ? 'absolute top-2 text-xs left-2 pl-1'
            : 'absolute top-5 text-sm left-2 pl-1'
        }`}
      >
        {display}
      </label>
      {errorMessage && (
        <div className='text-rose-800 p-2 flex flex-row items-center gap-x-1 text-xs'>
          <MdErrorOutline /> {errorMessage}
        </div>
      )}
    </div>
  );
}

export default LabeledInput;
