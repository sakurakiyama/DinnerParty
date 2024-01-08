// import { IoIosRemoveCircle, IoIosCheckmarkCircle } from 'react-icons/io';
import { CiCircleCheck, CiCircleRemove } from 'react-icons/ci';

type PlusMinusButtonsProps = {
  onYesClick: () => void;
  onNoClick: () => void;
  isTrue: boolean | null | undefined;
};

function YesOrNoButtons({
  onYesClick,
  onNoClick,
  isTrue,
}: PlusMinusButtonsProps) {
  return (
    <div className='flex justify-center items-center'>
      <button onClick={onNoClick}>
        <CiCircleRemove
          color={`${
            typeof isTrue === 'boolean' && isTrue === false ? 'black' : 'grey'
          }`}
          className='pl-1 w-[35px] h-[35px]'
        />
      </button>
      <button onClick={onYesClick}>
        <CiCircleCheck
          color={`${
            typeof isTrue === 'boolean' && isTrue === true ? 'black' : 'grey'
          }`}
          className='pl-1 w-[35px] h-[35px]'
        />
      </button>
    </div>
  );
}

export default YesOrNoButtons;
