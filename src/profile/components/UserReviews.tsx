import { UserContext } from '../../App';
import { useContext } from 'react';

/*
TODO: Implement functionality for populating reviews after user booking logic is completed. 
*/
function UserReviews() {
  const { user } = useContext(UserContext)!;

  return (
    <div>
      <div className='font-semibold text-xl'>{user?.firstname}'s reviews</div>
      <div className='text-sm md:text-base '>Reviews will go here</div>
    </div>
  );
}

export default UserReviews;
