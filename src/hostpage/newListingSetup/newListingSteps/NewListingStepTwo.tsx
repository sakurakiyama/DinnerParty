import Homes from '../../../assets/Homes.png';

function NewListingStepTwo() {
  return (
    <div className='flex flex-col-reverse md:flex-row md:space-x-8 items-center justify-center'>
      <div className='md:w-[50%] flex flex-col pb-10 pt-10 md:pb-0 md:p-10 space-y-6'>
        <div className='text-black text-base'>Step 1</div>
        <div className='font-black text-2xl md:text-3xl'>
          Tell us about your place
        </div>
        <div>
          In this step, we'll ask you which type of property you have and if
          guests will book the entire place or just a specific room. Then let us
          know the location and how many guests can join.
        </div>
      </div>
      <div className='max-w-[300px] md:max-w-[400px]'>
        <img src={Homes}></img>
      </div>
    </div>
  );
}

export default NewListingStepTwo;
