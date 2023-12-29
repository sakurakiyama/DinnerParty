import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

function HostMenu() {
  const navigate = useNavigate();

  const pages = [
    {
      display: 'Today',
      navigate: () => navigate('/hosting'),
    },
    {
      display: 'Calendar',
      navigate: () => navigate('/hosting/calendar'),
    },
    {
      display: 'Listings',
      navigate: () => navigate('/hosting/listings'),
    },
    {
      display: 'Inbox',
      navigate: () => navigate('/hosting/inbox'),
    },
  ];

  return (
    <div className='flex flex-row space-x-6'>
      {pages.map((current) => (
        <div key={uuid()}>
          <button
            onClick={current.navigate}
            className='hover:bg-[#F6F6F6] rounded-full p-2'
          >
            {current.display}
          </button>
        </div>
      ))}
    </div>
  );
}

export default HostMenu;
