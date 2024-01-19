import { useContext, useState, useEffect } from 'react';
import { UserContext, HostContext } from '../../App';

function ProfileCard() {
  const [logo, setLogo] = useState<string>('');
  const [yearJoined, setYearJoined] = useState<number>();
  const { user } = useContext(UserContext)!;
  const { hostListings } = useContext(HostContext)!;

  useEffect(() => {
    if (user) {
      if (user.firstname && user.lastname) {
        const initials = user.firstname[0] + user.lastname[0];
        setLogo(initials);
      }

      const userDateCreated = new Date(user.datecreated);
      const userYear = userDateCreated.getUTCFullYear();
      const currentDate = new Date();
      const currentYear = currentDate.getUTCFullYear();
      const yearsLapsed = currentYear - userYear;

      setYearJoined(yearsLapsed);
    }
  }, []);

  return (
    <div className='w-full'>
      <div className='flex flex-row gap-16 rounded-xl shadow-xl w-[350px] h-[250px] p-4 justify-center'>
        <div className='flex flex-col justify-center items-center space-y-4'>
          <div className='flex justify-center items-center rounded-full bg-[var(--salmon)] w-[100px] h-[100px] p-2 text-white text-2xl font-semibold'>
            {logo}
          </div>
          <div className='font-semibold text-3xl'>{user?.firstname}</div>
        </div>
        <div className='flex flex-col justify-center space-y-4'>
          {/* TODO: Remove hard coded data */}
          <div className='border-b pb-4'>
            <div className='font-semibold text-lg'>0</div>
            <div className='text-xs'>Reviews</div>
          </div>
          <div className='border-b pb-4'>
            <div className='font-semibold text-lg'>{yearJoined}</div>
            <div className='text-xs'>
              {yearJoined === 1 ? 'Year as member' : 'Years as member'}
            </div>
          </div>
          <div className='pb-4'>
            <div className='font-semibold text-lg'>
              {hostListings && hostListings.length ? hostListings.length : 0}
            </div>
            <div className='text-xs'>
              {hostListings.length === 1 ? 'Listing' : 'Listings'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
