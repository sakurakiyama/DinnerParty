import { useState } from 'react';

type Card = {
  key: string;
  image: JSX.Element;
  header: string;
  caption: string;
};

interface CardProps {
  cards: Card[];
  multipleSelection: boolean;
  handleSelectableCardClick: (display: string) => void;
}

function SelectableCards({
  cards,
  multipleSelection,
  handleSelectableCardClick,
}: CardProps) {
  const [selected, setSelected] = useState<string[] | string>(['']);

  const handleClick = (header: string) => {
    if (multipleSelection) {
      const allSelected = [...selected, header];
      setSelected(allSelected);
    } else {
      setSelected(header);
    }
    handleSelectableCardClick(header);
  };

  return (
    <div className='flex flex-col space-y-2 mt-8'>
      {cards &&
        cards.map((current, index) => {
          return (
            <div
              onClick={() => handleClick(current.header)}
              key={`${current.key}+${index}`}
              className={`border p-4 rounded-md flex flex-row items-center hover:border-black ${
                selected.includes(current.header) ? 'border-black' : ''
              }`}
            >
              <div className='w-[80%]'>
                <div className='text-base font-black'>{current.header}</div>
                <div className='text-xs mt-2 text-gray-500'>
                  {current.caption}
                </div>
              </div>
              <div className='ml-auto'>{current.image}</div>
            </div>
          );
        })}
    </div>
  );
}

export default SelectableCards;
