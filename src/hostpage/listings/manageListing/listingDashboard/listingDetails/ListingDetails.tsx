import Photos from './Photos';
import ListingBasics from './ListingBasics';
import Amenities from './Amenities';
import Location from './Location';
import PropertyAndRooms from './PropertyAndRooms';
import Accessibility from './Accessibility';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function ListingDetails() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='w-full'>
        <Photos />
        <ListingBasics />
        <Amenities />
        <Location />
        <PropertyAndRooms />
        <Accessibility />
      </div>
    </DndProvider>
  );
}

export default ListingDetails;
