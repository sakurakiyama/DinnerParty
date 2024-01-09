function LoadingThreeDots() {
  return (
    <div className='flex flex-row space-x-2'>
      <div className='bg-black w-[10px] h-[10px] rounded-[50%] animate-pulse animate-delay-1000 '></div>
      <div className='bg-gray-500 w-[10px] h-[10px] rounded-[50%] animate-pulse animate-delay-3000'></div>
      <div className='bg-gray-200 w-[10px] h-[10px] rounded-[50%] animate-pulse animate-delay-6000'></div>
    </div>
  );
}

export default LoadingThreeDots;
