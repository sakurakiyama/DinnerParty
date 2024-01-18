import { useContext } from 'react';
import { HostContext } from '../../App';

/*
[] TODO: Add logic for displaying upcoming bookings once user side is completed. 
*/
function HostReservations() {
  const { hostBookings } = useContext(HostContext)!;

  return (
    <div className='mt-8'>
      <div>
        <div className='font-semibold text-lg text-2xl'>Your bookings</div>
        <div className='mt-6 text-xs md:text-sm'>
          {hostBookings && hostBookings.length === 0 && (
            <>You don't have any upcoming bookings.</>
          )}
          {hostBookings && hostBookings.length > 0 && (
            <>Display upcoming bookings.</>
          )}
        </div>
      </div>
    </div>
  );
}

export default HostReservations;
