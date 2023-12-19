import { useState } from 'react';

interface LabeledInputProps {
  required: boolean;
  id: string;
  display: string;
  setterFunc: React.Dispatch<React.SetStateAction<string>>;
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

  const handleBlur = () => {
    if (!value) setIsFocused(false);
    return;
  };

  return (
    <div className='relative'>
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
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
