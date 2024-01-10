import { ImCross, ImCheckmark } from 'react-icons/im';

type PlusMinusButtonsProps = {
  onYesClick: () => void;
  onNoClick: () => void;
  isTrue: boolean;
};

function YesOrNoButtons({
  onYesClick,
  onNoClick,
  isTrue = false,
}: PlusMinusButtonsProps) {
  return (
    <div className='flex justify-center items-center space-x-2'>
      <div
        className={`flex justify-center items-center rounded-[50%] p-2 border border-black shadow-sm ${
          !isTrue ? 'bg-black' : 'bg-white'
        }`}
      >
        <button onClick={onNoClick}>
          <ImCross size={10} color={!isTrue ? 'white' : 'black'} />
        </button>
      </div>
      <div
        className={`flex justify-center items-center rounded-[50%] p-2 border border-black shadow-sm ${
          isTrue ? 'bg-black' : 'bg-white'
        }`}
      >
        <button onClick={onYesClick}>
          <ImCheckmark size={10} color={isTrue ? 'white' : 'black'} />
        </button>
      </div>
    </div>
  );
}

export default YesOrNoButtons;
