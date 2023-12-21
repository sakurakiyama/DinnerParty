import Tiles from '../../../../components/Tiles';
import { FaKitchenSet } from 'react-icons/fa6';
import { FaWifi } from 'react-icons/fa6';
import { FaRegSnowflake } from 'react-icons/fa';
import { MdTableRestaurant } from 'react-icons/md';
import { MdOutlineCleanHands } from 'react-icons/md';
import { MdDeck } from 'react-icons/md';
import { MdBalcony } from 'react-icons/md';
import { GiFireplace } from 'react-icons/gi';
import { GiBarbecue } from 'react-icons/gi';
import { TbChefHat } from 'react-icons/tb';
import { RiAlarmWarningLine } from 'react-icons/ri';
import { RiFirstAidKitLine } from 'react-icons/ri';
import { PiFireExtinguisher } from 'react-icons/pi';
import { GiRingingAlarm } from 'react-icons/gi';
import SalmonButton from '../../../../components/SalmonButton';
import { NewListingWizardContext } from '../../NewListingWizard';
import { useContext } from 'react';

function BasicAmenities() {
  const { marketingContext, newListingButtonsContext } = useContext(
    NewListingWizardContext
  );
  const { marketingDetails, setMarketingDetails } = marketingContext;
  const { currentView, setCurrentView } = newListingButtonsContext;

  const updateAmenenities = (amenity: string) => {
    setMarketingDetails({
      ...marketingDetails,
      amenities: [...marketingDetails.amenities, amenity],
    });
  };

  const handleView = (operation?: string) => {
    localStorage.setItem('marketingDetails', JSON.stringify(marketingDetails));
    if (operation === 'Forward') {
      setCurrentView(currentView + 1);
    } else if (operation === 'Backward') setCurrentView(currentView - 1);
  };

  const safetyItems = [
    {
      key: 'smokealarm',
      image: <RiAlarmWarningLine size={30} />,
      display: 'Smoke alarm',
    },
    {
      key: 'firstaid',
      image: <RiFirstAidKitLine size={30} />,
      display: 'First aid kit',
    },
    {
      key: 'fireextinguisher',
      image: <PiFireExtinguisher size={30} />,
      display: 'Fire extinguisher',
    },
    {
      key: 'carbonmonoxide',
      image: <GiRingingAlarm size={30} />,
      display: 'Carbon monoxide alarm',
    },
  ];

  const standoutItems = [
    {
      key: 'dishwasher',
      image: <MdOutlineCleanHands size={30} />,
      display: 'Dishwasher',
    },
    {
      key: 'patio',
      image: <MdBalcony size={30} />,
      display: 'Patio',
    },
    {
      key: 'indoorfireplace',
      image: <GiFireplace size={30} />,
      display: 'Indoor fireplace',
    },
    {
      key: 'bbqgrill',
      image: <GiBarbecue size={30} />,
      display: 'BBQ grill',
    },
    {
      key: 'chefskitchen',
      image: <TbChefHat size={30} />,
      display: "Chef's kitchen",
    },
    {
      key: 'outdoordining',
      image: <MdDeck size={30} />,
      display: 'Outdoor dining area',
    },
  ];

  const basicItems = [
    {
      key: 'kitchen',
      image: <FaKitchenSet size={30} />,
      display: 'Kitchen',
    },
    {
      key: 'Wifi',
      image: <FaWifi size={30} />,
      display: 'Wifi',
    },
    {
      key: 'airconditioning',
      image: <FaRegSnowflake size={30} />,
      display: 'Air conditioning',
    },
    {
      key: 'diningroom',
      image: <MdTableRestaurant size={30} />,
      display: 'Dining room',
    },
  ];
  return (
    <div className='flex flex-col h-full overflow-auto'>
      <div className='flex flex-col md:space-x-8 items-center justify-center '>
        <div className='flex flex-col pb-10 pt-10 md:pb-0 md:p-10'>
          <div className='font-black text-2xl md:text-3xl'>
            Tell guests what your place has to offer
          </div>
          <div className='mt-4 md:text-base text-gray-500'>
            You can add more amenities after you publish your listing.
          </div>
          <Tiles
            items={basicItems}
            multipleSelection={true}
            handleTileClick={updateAmenenities}
          />
          <div className='font-black md:text-base pt-8'>
            Do you have any standout amenities?
          </div>
          <Tiles
            items={standoutItems}
            multipleSelection={true}
            handleTileClick={updateAmenenities}
          />
          <div className='font-black md:text-base pt-8'>
            Do you have any of these safety items?
          </div>
          <Tiles
            items={safetyItems}
            multipleSelection={true}
            handleTileClick={updateAmenenities}
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
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
}

export default BasicAmenities;
