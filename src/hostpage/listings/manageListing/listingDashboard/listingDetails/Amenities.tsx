import { useContext } from 'react';
import { HostContext } from '../../../../../App';
import ColumnsAndMultipleYesOrNoBlock from '../../components/ColumnsAndMultipleYesOrNoBlock';
import {
  basicItems,
  safetyItems,
  standoutItems,
} from '../../../../../constants';

function Amenities() {
  const { currentHostListing } = useContext(HostContext)!;

  return (
    <div className='border-b w-full pt-8 pb-8' id='amenitiesBlock'>
      {/* <div className='font-black text-lg'>Amenities</div> */}
      <ColumnsAndMultipleYesOrNoBlock
        contents={
          currentHostListing?.amenities &&
          currentHostListing?.amenities.length > 0
            ? currentHostListing?.amenities
            : undefined
        }
        caption={'Add some amenities to show guests what your place offers'}
        selectableOptions={{
          'Basic Items': basicItems,
          'Safety Items': safetyItems,
          'Standout Items': standoutItems,
        }}
        handleSelection={() => {}}
        display='Amenities'
      />
    </div>
  );
}

export default Amenities;
