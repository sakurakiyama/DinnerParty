function LoadingThreeDots() {
  return (
    <div className='flex flex-row space-x-2'>
      <div
        className='bg-gray-700 w-[10px] h-[10px] rounded-[50%] animate-pulse delay-0 '
        style={{ animationDelay: '0s' }}
      ></div>
      <div
        className='bg-gray-700 w-[10px] h-[10px] rounded-[50%] animate-pulse delay-1000'
        style={{ animationDelay: '.25s' }}
      ></div>
      <div
        className='bg-gray-700 w-[10px] h-[10px] rounded-[50%] animate-pulse delay-3000'
        style={{ animationDelay: '.5s' }}
      ></div>
    </div>
  );
}

export default LoadingThreeDots;
