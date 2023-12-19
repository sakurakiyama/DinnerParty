import { RxLightningBolt } from 'react-icons/rx';
import { PiChats } from 'react-icons/pi';
import SelectableCards from '../../../../components/SelectableCards';
function InstantBookAccess() {
  const accessTypes = [
    {
      key: 'instantbook',
      image: <RxLightningBolt size={30} />,
      header: 'Use instant book',
      caption: 'Guests can book automatically',
    },
    {
      key: 'approve',
      image: <PiChats size={30} />,
      header: 'Approve or decline requests',
      caption: 'Guests must ask if they can book',
    },
  ];
  return (
    <div className='flex flex-col md:space-x-8'>
      <div className='flex flex-col pb-10 pt-10 md:pb-0 md:p-10'>
        <div className='font-black text-2xl md:text-3xl'>
          Decide how you’ll confirm reservations
        </div>
        <SelectableCards cards={accessTypes} />
      </div>
    </div>
  );
}

export default InstantBookAccess;
