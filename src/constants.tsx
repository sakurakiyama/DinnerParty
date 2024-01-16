import { FaKitchenSet, FaWifi, FaRegSnowflake } from 'react-icons/fa6';
import {
  MdTableRestaurant,
  MdOutlineCleanHands,
  MdDeck,
  MdBalcony,
  MdOutlineHouseboat,
} from 'react-icons/md';
import { GiFireplace, GiBarbecue, GiRingingAlarm } from 'react-icons/gi';
import { TbChefHat, TbBuildingBridge2 } from 'react-icons/tb';
import { RiAlarmWarningLine, RiFirstAidKitLine } from 'react-icons/ri';
import {
  PiFireExtinguisher,
  PiElevator,
  PiBuildingsBold,
} from 'react-icons/pi';
import { TbStairs } from 'react-icons/tb';
import { GrEscalator } from 'react-icons/gr';
import {
  LuParkingSquare,
  LuDoorOpen,
  LuCastle,
  LuWarehouse,
  LuHotel,
} from 'react-icons/lu';
import { BsBuilding, BsHouseUp, BsBuildingUp } from 'react-icons/bs';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { IoBedOutline } from 'react-icons/io5';

export const safetyItems = [
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

export const standoutItems = [
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

export const basicItems = [
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

export const accessibilityItems = [
  {
    key: 'guestentrance',
    image: <LuDoorOpen size={30} />,
    display: 'Guest Entrance',
  },
  {
    key: 'parking',
    image: <LuParkingSquare size={30} />,
    display: 'Parking',
  },
  {
    key: 'elevator',
    image: <PiElevator size={30} />,
    display: 'Elevator',
  },
  {
    key: 'escalator',
    image: <GrEscalator size={30} />,
    display: 'Escalator',
  },
  {
    key: 'stairlift',
    image: <TbStairs size={30} />,
    display: 'Stair Lift',
  },
];

export const allHomes = [
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
