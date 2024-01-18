import { UserContext, HostContext } from '../../App';
import { useContext } from 'react';
import { Buffer } from 'buffer';

function UserListings() {
  const { user } = useContext(UserContext)!;
  const { hostListings } = useContext(HostContext)!;

  return (
    <div>
      <div className='font-semibold text-xl'>{user?.firstname}'s listings</div>
      <div className='pt-6'>
        {hostListings &&
          hostListings.length > 0 &&
          hostListings.map((listing) => {
            let coverPhoto;

            if (listing?.status === 'Listed' && listing?.photos) {
              const base64 = Buffer.from(listing.photos[0]).toString('base64');
              coverPhoto = `data:image/jpeg;base64,${base64}`;
              return (
                <div>
                  <div
                    className='w-[250px] h-[250px] border bg-cover rounded-md'
                    style={{
                      backgroundImage: `url(${coverPhoto as string})`,
                    }}
                  ></div>
                  <div className='text-sm pt-2'>
                    <div className='font-medium'>{listing.hometype}</div>
                    <div className='text-slate-500 '>{listing.title}</div>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}

export default UserListings;
