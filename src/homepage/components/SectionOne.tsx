import DinnerSpread from '../../assets/DinnerSpread.jpg';

function SectionOne() {
  return (
    <section className='flex md:flex-row flex-col md:h-screen text-white text-center'>
      {/* Left */}
      <div className='bg-[#ffa857] md:w-[50%]'>
        <img
          className='object-cover w-full h-full p-8'
          src={DinnerSpread}
          alt='Dinner Spread'
        />
      </div>
      {/* Right */}
      <article className='bg-[#ff6b57] md:w-[50%] justify-center items-center flex flex-col p-6'>
        <header
          className='text-7xl'
          style={{ fontFamily: 'var(--font-libre)' }}
        >
          <h1>Browse</h1>
          <h2>easily</h2>
        </header>
        <div
          className='pt-8 text-xl'
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          <p>Book, dine, celebrate. Your dinner party awaits.</p>
        </div>
        <div className='pt-8' style={{ fontFamily: 'var(--font-poppins)' }}>
          <button className='text-black rounded-full p-2 bg-[#ff99ff] w-[200px]'>
            Book now
          </button>
        </div>
      </article>
    </section>
  );
}

export default SectionOne;
