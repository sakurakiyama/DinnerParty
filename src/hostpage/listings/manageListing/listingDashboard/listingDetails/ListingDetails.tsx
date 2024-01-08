import Photos from './Photos';
import ListingBasics from './ListingBasics';
import Amenities from './Amenities';
import Location from './Location';
import PropertyAndRooms from './PropertyAndRooms';
import Accessibility from './Accessibility';

function ListingDetails() {
  return (
    <div className='w-full'>
      <Photos />
      <ListingBasics />
      <Amenities />
      <Location />
      <PropertyAndRooms />
      <Accessibility />
    </div>
  );
}

export default ListingDetails;
