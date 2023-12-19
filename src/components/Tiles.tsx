type Item = {
  key: string;
  image: JSX.Element;
  display: string;
};

interface TilesProps {
  items: Item[];
}
function Tiles({ items }: TilesProps) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 content-center place-items-center md:w-[620px]'>
      {items &&
        items.map((current, index) => {
          return (
            <div
              key={`${current.key}+${index}`}
              className='flex flex-col p-4 border rounded-md text-center w-[200px] justify-center items-center h-[110px] hover:border-black'
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
