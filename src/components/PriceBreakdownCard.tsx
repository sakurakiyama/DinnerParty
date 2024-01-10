import {
  Card,
  CardItem,
  TotalItem,
} from '../hostpage/newListingSetup/newListingSteps/publish/SetPrice';

type PriceBreakDownCardProps = {
  card: Card;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
};

function PriceBreakDownCard({
  card,
  isOpen,
  onToggle,
  index,
}: PriceBreakDownCardProps) {
  return (
    <div
      key={`current+${index}`}
      className={`border rounded-md ${
        isOpen ? 'border-black' : 'border-gray-300'
      }`}
      onClick={onToggle}
    >
      <div className={`border-b m-4 ${isOpen ? 'block' : 'hidden'}`}>
        {card
          .filter((item): item is CardItem => 'item' in item && 'price' in item)
          .map((current: CardItem) => (
            <div
              key={`${current.item}+${index}`}
              className='pb-2 flex flex-row w-full'
            >
              <div className='mr-auto'>{current.item}</div>
              <div>${current.price}</div>
            </div>
          ))}
      </div>
      <div className='pl-4 pr-4 mb-4 font-semibold flex flex-row w-full'>
        {card
          .filter((item): item is TotalItem => 'totalDescription' in item)
          .map((current) => (
            <div
              className='flex flex-row w-full pt-4'
              key={`${current.totalDescription}+${index}`}
            >
              <div className='mr-auto'>{current.totalDescription}</div>
              <div>${current.totalPrice}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PriceBreakDownCard;
