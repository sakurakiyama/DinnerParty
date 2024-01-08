import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';

type PlusMinusButtonsProps = {
  isMinusDisabled?: boolean;
  isPlusDisabled?: boolean;
  onMinusClick: () => void;
  onPlusClick: () => void;
  displayValue: string | number;
};

function PlusMinusButtons({
  isMinusDisabled = false,
  isPlusDisabled = false,
  onMinusClick,
  onPlusClick,
  displayValue,
}: PlusMinusButtonsProps) {
  return (
    <div className='flex justify-center items-center'>
      <button
        className={`${isMinusDisabled ? 'text-slate-300' : ''}`}
        disabled={isMinusDisabled}
        onClick={onMinusClick}
      >
        <CiCircleMinus className='pr-2 w-[35px] h-[35px]' />
      </button>
      <div className='w-[20px] text-center'>{displayValue}</div>
      <button
        onClick={onPlusClick}
        disabled={isPlusDisabled}
        className={`${isPlusDisabled ? 'text-slate-300' : ''}`}
      >
        <CiCirclePlus className='pl-2 w-[35px] h-[35px]' />
      </button>
    </div>
  );
}

export default PlusMinusButtons;
