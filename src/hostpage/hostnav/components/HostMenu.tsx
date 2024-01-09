import { useNavigate } from 'react-router-dom';

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
      {pages.map((current, index) => (
        <div key={`${current.display}+${index}`}>
          <button
            onClick={current.navigate}
            className='hover:bg-[var(--light-grey)]  rounded-full p-2'
          >
            {current.display}
          </button>
        </div>
      ))}
    </div>
  );
}

export default HostMenu;
