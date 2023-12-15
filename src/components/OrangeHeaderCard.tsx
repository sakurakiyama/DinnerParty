import Logo from '../assets/Logo.png';

interface OrangeHeaderCardProps {
  cardContent: JSX.Element;
}
function OrangeHeaderCard({ cardContent }: OrangeHeaderCardProps) {
  return (
    <div className='w-[75%] h-[70%] md:w-[350px] md:h-[60%] min-h-[550px] rounded-md shadow-md overflow-hidden flex flex-col bg-white'>
      {/* Header */}
      <div className='h-16 bg-[var(--mango-sorbet)] text-center items-center flex flex-col'>
        <div className='bg-white shadow-md rounded-full w-16 h-16 transform translate-y-8'>
          <img
            className='w-10 transform translate-y-3 translate-x-3'
            src={Logo}
          ></img>
        </div>
      </div>
      <div className='flex flex-col bg-white p-4 pt-16 h-full'>
        {cardContent}
      </div>
      <div className='flex items-end text-xs text-gray-400 m-auto h-full pb-2'>
        Dinner Party © 2023
      </div>
    </div>
  );
}

export default OrangeHeaderCard;
