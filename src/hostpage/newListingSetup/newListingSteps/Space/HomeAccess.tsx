import { MdOutlineMeetingRoom } from 'react-icons/md';
import { BsHouseDoor } from 'react-icons/bs';

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
        <div className='flex flex-col space-y-2 mt-8'>
          {accessTypes &&
            accessTypes.map((current, index) => {
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
      </div>
    </div>
  );
}

export default HomeAccess;
