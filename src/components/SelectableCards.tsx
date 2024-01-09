type Card = {
  key: string;
  image: JSX.Element;
  header: string;
  caption: string;
};

interface CardProps {
  cards: Card[];
  handleSelectableCardClick: (display: string) => void;
  currentSelection: string[] | string;
}

function SelectableCards({
  cards,
  handleSelectableCardClick,
  currentSelection,
}: CardProps) {
  return (
    <div className='flex flex-col space-y-2 mt-8'>
      {cards &&
        cards.map((current, index) => {
          const isSelected = Array.isArray(currentSelection)
            ? currentSelection.includes(current.header)
            : currentSelection === current.header;
          return (
            <div
              onClick={() => handleSelectableCardClick(current.header)}
              key={`${current.header}+${index}`}
              className={`border p-4 rounded-md flex flex-row items-center hover:border-black ${
                isSelected ? 'border-black' : ''
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
