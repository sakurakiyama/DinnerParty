import { MdOutlineMeetingRoom } from 'react-icons/md';
import { BsHouseDoor } from 'react-icons/bs';

function NewListingStepFour() {
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
    <div className='flex flex-col md:space-x-8 items-center justify-center '>
      <div className='flex flex-col pb-10 pt-10 md:pb-0 md:p-10 items-center'>
        <div className='font-black text-2xl md:text-3xl text-center'>
          What space will guests have access to?
        </div>
        <div className='flex flex-col space-y-2 mt-12 md:w-[500px]'>
          {accessTypes &&
            accessTypes.map((current, index) => {
              return (
                <div
                  key={`${current.key}+${index}`}
                  className='border p-4 rounded-md flex flex-row items-center hover:border-black'
                >
                  <div className=''>
                    <div className='text-base font-black'>{current.header}</div>
                    <div className='text-xs mt-2 text-gray-500'>
                      {current.caption}
                    </div>
                  </div>
                  <div className='ml-auto pl-4'>{current.image}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default NewListingStepFour;
