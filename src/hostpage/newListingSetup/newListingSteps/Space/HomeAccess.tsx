import { MdOutlineMeetingRoom } from 'react-icons/md';
import { BsHouseDoor } from 'react-icons/bs';
import SelectableCards from '../../../../components/SelectableCards';
function HomeAccess() {
  const accessTypes = [
    {
      key: 'entireplace',
      image: <BsHouseDoor size={30} />,
      header: 'An entire place',
      caption: 'Guests will have the whole space to themselves',
    },
    {
      key: 'room',
      image: <MdOutlineMeetingRoom size={30} />,
      header: 'A room',
      caption:
        'Guests will have access to select rooms (for example: backyard, kitchen, dining room etc)',
    },
  ];
  return (
    <div className='flex flex-col md:space-x-8'>
      <div className='flex flex-col pb-10 pt-10 md:pb-0 md:p-10'>
        <div className='font-black text-2xl md:text-3xl'>
          What space will guests have access to?
        </div>
        <SelectableCards cards={accessTypes} />
      </div>
    </div>
  );
}

export default HomeAccess;
