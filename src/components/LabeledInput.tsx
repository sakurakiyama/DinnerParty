import { useState, useEffect } from 'react';

interface LabeledInputProps {
  required: boolean;
  id: string;
  display: string;
  setterFunc: (value: string) => void;
  value: string;
}

function LabeledInput({
  required,
  id,
  display,
  setterFunc,
  value,
}: LabeledInputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    if (value) setIsFocused(true);
    else {
      setIsFocused(false);
    }
  }, [value]);

  return (
    <div className='relative'>
      <input
        onFocus={() => setIsFocused(true)}
        onChange={(e) => setterFunc(e.target.value)}
        value={value}
        id={id}
        type='text'
        required={required}
        className='border w-full pt-6 h-[60px] rounded-lg outline-[var(--light-pink)] p-2'
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
    </div>
  );
}

export default LabeledInput;
