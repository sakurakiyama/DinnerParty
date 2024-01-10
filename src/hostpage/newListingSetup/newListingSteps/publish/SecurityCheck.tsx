import { HiOutlineInformationCircle } from 'react-icons/hi2';
import { useState, useContext } from 'react';
import OrangeHeaderCard from '../../../../components/OrangeHeaderCard';
import SalmonButton from '../../../../components/SalmonButton';
import { NewListingWizardContext } from '../../NewListingWizard';
import { HostContext } from '../../../../App';

function SecurityCheck() {
  const { currentHostListing, setCurrentHostListing } =
    useContext(HostContext)!;

  const { currentView, setCurrentView, setSlideIn, slideIn } = useContext(
    NewListingWizardContext
  )!;
  const [securityModalOpen, setSecurityModalOpen] = useState<boolean>(false);

  if (!currentHostListing) return;

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

  const handleView = (operation?: string) => {
    if (operation === 'Forward') {
      setSlideIn('Right');
      setCurrentView(currentView + 1);
    } else if (operation === 'Backward') {
      setSlideIn('Left');
      setCurrentView(currentView - 1);
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;

    const isSelected = currentHostListing?.security.includes(selectedValue);

    if (isSelected) {
      setCurrentHostListing({
        ...currentHostListing,
        security: currentHostListing.security.filter(
          (item) => item !== selectedValue
        ),
      });
    } else {
      setCurrentHostListing({
        ...currentHostListing,
        security: [...currentHostListing.security, selectedValue],
      });
    }
  };

  return (
    <div
      className={`flex flex-col h-full overflow-auto ${
        slideIn === 'Left' ? 'animate-slideInLeft' : 'animate-slideInRight'
      }`}
    >
      <div className=' md:mt-auto mx-auto w-full md:w-[564px]'>
        {securityModalOpen && (
          <div className='top-0 bottom-0 left-0 right-0 fixed flex items-center justify-center bg-[#00000044]'>
            <OrangeHeaderCard
              cardContent={
                <div className='space-y-4'>
                  <div>
                    <div className='font-semibold'> Security camera(s) </div>
                    Hosts are required to disclose all security cameras and any
                    recording devices in their listings. Intentionally concealed
                    recording devices is prohibited. Learn more
                  </div>
                  <div>
                    <div className='font-semibold'> Weapons</div>
                    All weapons at a listing must be properly disclosed, stored
                    and secured. Learn more
                  </div>
                  <div>
                    <div className='font-semibold'> Dangerous animals</div>
                    Hosts should not keep a potentially dangerous animal in a
                    listing without properly disclosing its presence and
                    securing it in a safe and secure accommodation. Learn more
                  </div>
                  <div className='flex justify-center'>
                    <button
                      onClick={handleSecurityModal}
                      className='border hover:bg-[var(--light-grey)] rounded-full p-2 pl-8 pr-8'
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
          <div className='font-semibold text-2xl md:text-3xl'>
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
              items.map((current, index) => {
                const isChecked = currentHostListing.security.includes(
                  current.title
                );
                return (
                  <div
                    className='flex flex-row w-full pb-4  checked:bg-green-500'
                    key={`${current.key}+${index}`}
                  >
                    <div className='mr-auto'>{current.title}</div>
                    <input
                      onChange={handleSelect}
                      className='w-[30px] accent-[#F0415F]'
                      type='checkbox'
                      id={current.key}
                      name={current.key}
                      value={current.title}
                      checked={isChecked}
                    ></input>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className='flex justify-center mb-8 mt-auto pt-6'>
        <div className='flex w-full justify-between ml-4 mr-4'>
          <SalmonButton
            display={'Back'}
            handleClick={handleView}
            operation={'Backward'}
            disabled={false}
          />
          <SalmonButton
            display={'Next'}
            handleClick={handleView}
            operation={'Forward'}
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
}

export default SecurityCheck;
