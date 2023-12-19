type Card = {
  key: string;
  image: JSX.Element;
  header: string;
  caption: string;
};

interface CardProps {
  cards: Card[];
}

function SelectableCards({ cards }: CardProps) {
  return (
    <div className='flex flex-col space-y-2 mt-8'>
      {cards &&
        cards.map((current, index) => {
          return (
            <div
              key={`${current.key}+${index}`}
              className='border p-4 rounded-md flex flex-row items-center hover:border-black'
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
