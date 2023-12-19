import { HiOutlineInformationCircle } from 'react-icons/hi2';
import { useState } from 'react';
import OrangeHeaderCard from '../../../../components/OrangeHeaderCard';

function SecurityCheck() {
  const [securityModalOpen, setSecurityModalOpen] = useState<boolean>(false);

  const items = [
    { key: 'cameras', title: 'Security camera(s)' },
    { key: 'weapons', title: 'Weapons' },
    { key: 'dangerousanimals', title: 'Dangerous Animals' },
  ];

  const handleSecurityModal = () => {
    securityModalOpen
      ? setSecurityModalOpen(false)
      : setSecurityModalOpen(true);
  };
  return (
    <div className='w-[500px]'>
      {securityModalOpen && (
        <div className='top-0 bottom-0 left-0 right-0 fixed flex items-center justify-center bg-[#00000044]'>
          <OrangeHeaderCard
            cardContent={
              <div className='space-y-4'>
                <div>
                  <div className='font-black'> Security camera(s) </div>
                  Hosts are required to disclose all security cameras and any
                  recording devices in their listings. Intentionally concealed
                  recording devices is prohibited. Learn more
                </div>
                <div>
                  <div className='font-black'> Weapons</div>
                  All weapons at a listing must be properly disclosed, stored
                  and secured. Learn more
                </div>
                <div>
                  <div className='font-black'> Dangerous animals</div>
                  Hosts should not keep a potentially dangerous animal in a
                  listing without properly disclosing its presence and securing
                  it in a safe and secure accommodation. Learn more
                </div>
                <div className='flex justify-center'>
                  <button
                    onClick={handleSecurityModal}
                    className='border hover:bg-[#F6F6F6] rounded-full p-2 pl-8 pr-8'
                  >
                    Done
                  </button>
                </div>
              </div>
            }
          />
        </div>
      )}
      <div className='flex flex-col pt-10 md:pt-0 '>
        <div className='font-black text-2xl md:text-3xl'>
          Just one last step!
        </div>
        <div className='mt-4 md:text-base text-gray-500 flex flex-row items-center'>
          <div>Does your space have any of these?</div>
          <div className='pl-2' onClick={handleSecurityModal}>
            <HiOutlineInformationCircle />
          </div>
        </div>
        <div className='pt-8'>
          {items &&
            items.map((current) => {
              return (
                <div
                  className='flex flex-row w-full pb-4  checked:bg-green-500'
                  key={current.key}
                >
                  <div className='mr-auto'>{current.title}</div>
                  <input
                    className='w-[30px] accent-[#F0415F]'
                    type='checkbox'
                    id={current.key}
                    name={current.key}
                    value={current.title}
                  ></input>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default SecurityCheck;
