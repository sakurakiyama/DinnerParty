import { useContext } from 'react';
import { HostContext } from '../../App';

function ToDo() {
  const { hostListings } = useContext(HostContext)!;

  return (
    <div className='mt-8'>
      <div>
        <div className='font-semibold text-lg text-2xl'>To do</div>
        <div className='mt-6 flex flex-row space-x-4'>
          {hostListings &&
            hostListings.map((current) => {
              if (current && current.status === 'In progress')
                return (
                  <div className='border rounded-lg flex flex-col w-[250px] h-[175px] shadow-sm'>
                    <div className='p-6 h-full'>
                      <div className='text-xs md:text-sm font-medium'>
                        Continue working on your listing
                      </div>
                      <div className='text-xs pt-2 text-slate-500'>
                        {current.title || 'Unknown'}
                      </div>
                    </div>
                    <div className='border-t flex justify-center items-center text-xs md:text-sm font-medium h-fit pt-3 pb-3'>
                      <button className=''>Finish</button>
                    </div>
                  </div>
                );

              if (current && current.status === 'Ready')
                return (
                  <div className='border rounded-lg flex flex-col w-[250px] h-[175px] shadow-sm'>
                    <div className='p-6 h-full'>
                      <div className='text-xs md:text-sm font-medium'>
                        Your space is ready to be listed
                      </div>
                      <div className='text-xs pt-2 text-slate-500'>
                        {current.title || 'Unknown'}
                      </div>
                    </div>
                    <div className='border-t flex justify-center items-center text-xs md:text-sm font-medium h-fit pt-3 pb-3'>
                      <button className=''>List your space</button>
                    </div>
                  </div>
                );
            })}
        </div>
      </div>
    </div>
  );
}

export default ToDo;
