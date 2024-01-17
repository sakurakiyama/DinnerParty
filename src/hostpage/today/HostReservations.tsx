import { useContext } from 'react';
import { HostContext } from '../../App';

function HostReservations() {
  const { hostBookings } = useContext(HostContext)!;

  return (
    <div className='mt-8'>
      <div>
        <div className='font-semibold text-lg text-2xl'>Your bookings</div>
        <div className='mt-6'>
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
