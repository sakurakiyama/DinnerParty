type Item = {
  key: string;
  image: JSX.Element;
  display: string;
};

interface TilesProps {
  items: Item[];
  handleTileClick: (display: string) => void;
  currentSelection: string[] | string;
}

function Tiles({ items, handleTileClick, currentSelection }: TilesProps) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 content-center place-items-center md:w-[620px]'>
      {items &&
        items.map((current, index) => {
          const isSelected = Array.isArray(currentSelection)
            ? currentSelection.includes(current.display)
            : currentSelection === current.display;

          return (
            <div
              onClick={() => handleTileClick(current.display)}
              key={`${current.display}+${index}`}
              className={`flex flex-col p-4 border rounded-md text-center w-[200px] justify-center items-center h-[110px] hover:border-black ${
                isSelected ? 'border-black' : ''
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
