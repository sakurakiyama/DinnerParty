import { useState } from 'react';
import FoodTile from '../assets/FoodTile.png';
import Logo from '../assets/Logo.png';
function Login() {
  const [email, setEmail] = useState<null | string>(null);
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const submitVerificationCode = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };
  const submitEmail = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    /*
   [] Check if the user exists
   [] Add the user to the database if the user doesn't exist
   [] Generate a six digit code on the server side 
   [] Add the six digit code to the users table (expire in 10 minutes)
   [] Send the email with the six digit code to the users email 
   [] on client, wait for user input. 
   [] on server, check if user input matches whats in the db 
   [] if it doesn't, send back error
   [] if it does, send user to main page
    [] create JWT
   [] delete code from db 
    [] 
   */
    setEmailSubmitted(true);
  };
  // TODO: Add functionality for deleting
  return (
    <div
      className='justify-center items-center flex flex-col h-screen bg-cover'
      style={{ backgroundImage: `url(${FoodTile})` }}
    >
      <div className='w-[75%] h-[70%] md:w-[350px] md:h-[60%] min-h-[500px] overflow-hidden rounded-md shadow-md flex flex-col'>
        <div className='h-16 bg-[var(--mango-sorbet)] text-center items-center flex flex-col'>
          <div className='bg-white shadow-md rounded-full w-16 h-16 transform translate-y-8'>
            <img
              className='w-10 transform translate-y-3 translate-x-3'
              src={Logo}
            ></img>
          </div>
        </div>
        <div className='flex flex-col bg-white p-4 text-center pt-16 h-full'>
          {!emailSubmitted && (
            <div>
              Enter your email address
              <form className='pt-8 flex flex-col' onSubmit={submitEmail}>
                <input
                  className='border rounded-lg p-1'
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className='border rounded-full mt-16 w-full bg-[var(--mango-sorbet)]	text-white p-2 pl-8 pr-8 shadow-sm m-auto'
                  type='submit'
                >
                  Submit
                </button>
              </form>
            </div>
          )}
          {emailSubmitted && (
            <div>
              Almost there! A six digit verification code was sent to {email}
              <form className='pt-8' onSubmit={submitVerificationCode}>
                {code.map((value, index) => (
                  <input
                    className='border w-[25px] h-[40px] rounded-md m-2 text-center'
                    key={index}
                    type='text'
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                  />
                ))}
                <button
                  className='border rounded-full mt-16 w-full bg-[var(--mango-sorbet)]	text-white p-2 pl-8 pr-8 shadow-sm m-auto'
                  type='submit'
                >
                  Submit
                </button>
              </form>
              <div className='pt-8 text-sm'>
                Can't find it? Check your spam/junk folder.
              </div>
            </div>
          )}
          <div className='flex items-end text-xs text-gray-400 m-auto h-full'>
            Dinner Party © 2023
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
