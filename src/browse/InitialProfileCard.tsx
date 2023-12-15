import OrangeHeaderCard from '../components/OrangeHeaderCard';

function InitialProfileCard() {
  return (
    <div className='justify-center items-center flex flex-col h-screen '>
      <OrangeHeaderCard
        cardContent={
          <>
            <div className='text-xs pb-4'>Our community committment</div>
            <div className='pb-4'>
              Dinner Party is a community where anyone can belong
            </div>
            <div className='text-xs pb-4'>
              To ensure this, we're asking you to commit to the following:
            </div>
            <div className='text-xs'>
              I agree to treat everyone in the Airbnb community—regardless of
              their race, religion, national origin, ethnicity, disability, sex,
              gender identity, sexual orientation, or age—with respect, and
              without judgment or bias
            </div>
            <button
              className='border rounded-full mt-16 w-full bg-[var(--mango-sorbet)]	text-white p-2 pl-8 pr-8 shadow-sm m-auto'
              type='submit'
            >
              Agree
            </button>
          </>
        }
      />
    </div>
  );
}

export default InitialProfileCard;
