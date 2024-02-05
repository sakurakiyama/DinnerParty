import { useContext, useState, useEffect } from 'react';
import { UserContext, HostContext } from '../App';
import { useNavigate } from 'react-router-dom';

function NavUserIcon() {
  const navigate = useNavigate();

  const [logo, setLogo] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { user } = useContext(UserContext)!;
  const { newListingModalOpen } = useContext(HostContext)!;

  const handleMenu = () => {
    menuOpen ? setMenuOpen(false) : setMenuOpen(true);
  };

  useEffect(() => {
    if (user?.firstname && user?.lastname) {
      const initials = user.firstname[0] + user.lastname[0];
      setLogo(initials);
    }
  }, []);

  const menuOptions = [
    {
      display: 'Account',
      handleClick: () => {
        navigate('/');
      },
    },
    {
      display: 'Profile',
      handleClick: () => {
        navigate('/profile');
      },
    },
    {
      display: 'Trips',
      handleClick: () => {
        navigate('/');
      },
    },
    {
      display: 'Log out',
      handleClick: () => {
        navigate('/');
      },
    },
  ];

  return (
    <div className='relative'>
      {!newListingModalOpen && (
        <div>
          <button
            className='rounded-full bg-[var(--salmon)] p-2 text-white font-semibold'
            onClick={handleMenu}
          >
            {logo}
          </button>
          {menuOpen && (
            <div className='absolute right-0 border w-[200px] h-fit bg-white mt-2 rounded-lg shadow-md'>
              <div className='text-start m-4 space-y-4'>
                {menuOptions.map((current) => {
                  return (
                    <ul
                      className='font-medium text-sm hover:bg-[var(--light-grey)] p-2 rounded-md'
                      onClick={current.handleClick}
                    >
                      {current.display}
                    </ul>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NavUserIcon;
