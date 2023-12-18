import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../App';

function UserLogo() {
  const [logo, setLogo] = useState<string>('');
  const { user } = useContext(UserContext)!;

  useEffect(() => {
    if (user?.firstname && user?.lastname) {
      const initials = user.firstname[0] + user.lastname[0];
      setLogo(initials);
    }
  }, []);
  return (
    <div>
      <div>{logo}</div>
    </div>
  );
}

export default UserLogo;
