import { LuCastle } from 'react-icons/lu';
import { LuWarehouse } from 'react-icons/lu';
import { MdOutlineHouseboat } from 'react-icons/md';
import { PiBuildingsBold } from 'react-icons/pi';
import { BsBuilding } from 'react-icons/bs';
import { BsHouseUp } from 'react-icons/bs';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { TbBuildingBridge2 } from 'react-icons/tb';
import { BsBuildingUp } from 'react-icons/bs';
import { IoBedOutline } from 'react-icons/io5';
import { LuHotel } from 'react-icons/lu';
import Tiles from '../../../../components/Tiles';
import { NewListingWizardContext } from '../../NewListingWizard';
import { useContext, useState } from 'react';
import SalmonButton from '../../../../components/SalmonButton';
function HomeType() {
  const { spaceContext, newListingButtonsContext } = useContext(
    NewListingWizardContext
  );
  const { spaceDetails, setSpaceDetails } = spaceContext;
  const { currentView, setCurrentView } = newListingButtonsContext;
  const [notValidated, setNotValidated] = useState<boolean>(true);

  const updateHomeType = (homeType: string) => {
    setSpaceDetails({ ...spaceDetails, homeType });
    setNotValidated(false);
  };

  const handleView = (operation?: string) => {
    localStorage.setItem('spaceDetails', JSON.stringify(spaceDetails));
    if (operation === 'Forward') {
      setCurrentView(currentView + 1);
    } else if (operation === 'Backward') setCurrentView(currentView - 1);
  };

  const allHomes = [
    {
      key: 'townhouse',
      image: <HiOutlineOfficeBuilding size={30} />,
      display: 'Townhouse',
    },
    {
      key: 'loft',
      image: <TbBuildingBridge2 size={35} />,
      display: 'Loft',
    },
    {
      key: 'highrise',
      image: <PiBuildingsBold size={30} />,
      display: 'High-Rise Apartment',
    },
    {
      key: 'prewar',
      image: <BsBuilding size={30} />,
      display: 'Pre-war Apartment',
    },
    {
      key: 'penthouse',
      image: <BsBuildingUp size={30} />,
      display: 'Penthouse',
    },
    {
      key: 'houseboat',
      image: <MdOutlineHouseboat size={35} />,
      display: 'House Boat',
    },
    {
      key: 'duplex',
      image: <BsHouseUp size={30} />,
      display: 'Duplex',
    },
    {
      key: 'warehouse',
      image: <LuWarehouse size={30} />,
      display: 'Warehouse',
    },
    {
      key: 'mansion',
      image: <LuCastle size={30} />,
      display: 'Mansion',
    },
    {
      key: 'bednbreakfast',
      image: <IoBedOutline size={30} />,
      display: 'Bed & Breakfast',
    },
    {
      key: 'hotel',
      image: <LuHotel size={30} />,
      display: 'Hotel',
    },
  ];

  return (
    <div className='flex flex-col h-full overflow-auto'>
      <div className='flex flex-col md:space-x-8 items-center justify-center md:mt-auto'>
        <div className='flex flex-col pb-10 pt-10 md:pb-0 md:p-10 items-center'>
          <div className='font-black text-2xl md:text-3xl text-center'>
            Which of these best describes your place?
          </div>
          <Tiles
            items={allHomes}
            multipleSelection={false}
            handleTileClick={updateHomeType}
          />
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
            disabled={notValidated}
          />
        </div>
      </div>
    </div>
  );
}

export default HomeType;
