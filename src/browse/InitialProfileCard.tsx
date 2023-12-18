import OrangeHeaderCard from '../components/OrangeHeaderCard';
import { useContext, useState } from 'react';
import { UserContext } from '../App';
import axios from 'axios';

/* 
TODO: Add form error handling

 */
interface InitialProfileCardProps {
  setProfileSetupModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function InitialProfileCard({
  setProfileSetupModalOpen,
}: InitialProfileCardProps) {
  const [step, setStep] = useState<number>(0);
  const [communityCommitmentAgreed, setCommunityCommitmentAgreed] =
    useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const { user, setUser } = useContext(UserContext)!;

  const handleCommitmentSubmit = () => {
    setCommunityCommitmentAgreed(true);
    setStep(step + 1);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const { data } = await axios.patch('/user/requiredProfile', {
        communityCommitmentAgreed,
        firstName,
        lastName,
        email: user?.email,
      });
      setUser(data);
      setProfileSetupModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='justify-center items-center flex flex-col h-screen '>
      {step === 0 && (
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
                their race, religion, national origin, ethnicity, disability,
                sex, gender identity, sexual orientation, or age—with respect,
                and without judgment or bias
              </div>
              <button
                onClick={handleCommitmentSubmit}
                className='border rounded-full mt-16 w-full bg-[var(--mango-sorbet)]	text-white p-2 pl-8 pr-8 shadow-sm m-auto'
                type='submit'
              >
                Agree
              </button>
            </>
          }
        />
      )}
      {step === 1 && (
        <OrangeHeaderCard
          cardContent={
            <div className='text-center text-sm'>
              <form className='pt-8 flex flex-col' onSubmit={handleSubmit}>
                Enter your first name
                <input
                  className='border rounded-lg p-1 outline-[var(--light-pink)] mt-4 mb-4'
                  type='text'
                  onChange={(e) => setFirstName(e.target.value)}
                />
                & your last name
                <input
                  className='border rounded-lg p-1 outline-[var(--light-pink)] mt-4'
                  type='text'
                  onChange={(e) => setLastName(e.target.value)}
                />
                <button
                  className='border rounded-full mt-16 w-full bg-[var(--mango-sorbet)]	text-white p-2 pl-8 pr-8 shadow-sm m-auto'
                  type='submit'
                >
                  Submit
                </button>
              </form>
            </div>
          }
        />
      )}
    </div>
  );
}

export default InitialProfileCard;
