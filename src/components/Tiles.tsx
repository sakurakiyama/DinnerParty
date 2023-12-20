import { useState } from 'react';

type Item = {
  key: string;
  image: JSX.Element;
  display: string;
};

interface TilesProps {
  items: Item[];
  multipleSelection: boolean;
  handleTileClick: (display: string) => void;
}

function Tiles({ items, multipleSelection, handleTileClick }: TilesProps) {
  const [selected, setSelected] = useState<string[] | string>(['']);

  const handleClick = (display: string) => {
    if (multipleSelection) {
      const allSelected = [...selected, display];
      setSelected(allSelected);
    } else {
      setSelected(display);
    }
    handleTileClick(display);
  };

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 content-center place-items-center md:w-[620px]'>
      {items &&
        items.map((current, index) => {
          return (
            <div
              onClick={() => handleClick(current.display)}
              key={`${current.key}+${index}`}
              className={`flex flex-col p-4 border rounded-md text-center w-[200px] justify-center items-center h-[110px] hover:border-black ${
                selected.includes(current.display) ? 'border-black' : ''
              }`}
            >
              <div className='pb-2'>{current.image}</div>
              <div>{current.display}</div>
            </div>
          );
        })}
    </div>
  );
}

export default Tiles;
