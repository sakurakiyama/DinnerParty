import { UserContext } from '../../App';
import { useContext } from 'react';
import DinnerSpread from '../../assets/DinnerSpread.jpg';
import { useNavigate } from 'react-router-dom';

/*
TODO: If returning user, should display Welcome Back
*/
function SectionOne() {
  const { user } = useContext(UserContext)!;
  const navigate = useNavigate();

  const loginUser = () => {
    if (user) {
      // TODO: navigate to the main app
    } else {
      // navigate to login
      navigate('/login');
    }
  };

  return (
    <section className='flex md:flex-row flex-col md:h-screen text-white text-center'>
      {/* Left */}
      <div className='bg-[var(--mango-sorbet)] md:w-[50%]'>
        <img
          className='object-cover w-full h-full p-8'
          src={DinnerSpread}
          alt='Dinner Spread'
        />
      </div>
      {/* Right */}
      <article className='bg-[var(--salmon)] md:w-[50%] justify-center items-center flex flex-col p-6'>
        <header
          className='text-7xl'
          style={{ fontFamily: 'var(--font-libre)' }}
        >
          <h1>Browse</h1>
          <h2>easily</h2>
        </header>
        <div className='pt-8 text-xl'>
          <p>Book, dine, celebrate. Your dinner party awaits.</p>
        </div>
        <div className='pt-8'>
          <button
            className='text-black rounded-full p-2 bg-[var(--light-pink)] w-[200px] shadow'
            onClick={loginUser}
          >
            Book now
          </button>
        </div>
      </article>
    </section>
  );
}

export default SectionOne;
