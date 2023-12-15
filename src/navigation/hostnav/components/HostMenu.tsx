function HostMenu() {
  const titles = ['Today', 'Calendar', 'Listings', 'Inbox', 'More'];

  return (
    <div className='flex flex-row space-x-6'>
      {titles.map((current, index) => {
        return (
          <div key={`${current}+${index}`}>
            <button className='hover:bg-[#F6F6F6] rounded-full p-2'>
              {current}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default HostMenu;
