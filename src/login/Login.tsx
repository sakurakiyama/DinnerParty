import { useState, useContext, useRef } from 'react';
import { UserContext } from '../App';
import FoodTile from '../assets/FoodTile.png';
import Logo from '../assets/Logo.png';
import axios from 'axios';

type InputRef = React.RefObject<HTMLInputElement> | null;

/*
TODO: Make the caret go to the end when pasted 
TODO: Change the highlight color of the input field 
*/
function Login() {
  const { setUser } = useContext(UserContext)!;

  const [email, setEmail] = useState<null | string>(null);
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);

  const inputRefs: InputRef[] = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    const next = index + 1;
    if (index !== inputRefs.length - 1) inputRefs[next]?.current?.focus();
  };

  const handleDelete = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const keyPressed = event.code;
    if (keyPressed === 'Backspace') {
      event.preventDefault();
      if (index > 0 && code[index]) {
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      } else if (index > 0 && !code[index]) {
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
        inputRefs[index - 1]?.current?.focus();
      } else if (index === 0 && code[index]) {
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      }
    }
  };

  const handlePaste = async (
    index: number,
    event: React.ClipboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedText = clipboardData.getData('text/plain');

    let currentIndex = index;
    let count = 0;
    const newCode = [...code];

    while (currentIndex < newCode.length && count < pastedText.length) {
      newCode[currentIndex] = pastedText[count];
      count++;
      currentIndex++;
    }
    setCode(newCode);
  };

  const submitVerificationCode = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/auth/verifycode', {
        email,
        code: code.join(''),
      });
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  const submitEmail = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await axios.post('/user/sendCode', { email });
    } catch (error) {
      console.error(error);
    }
    setEmailSubmitted(true);
  };

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
                    ref={inputRefs[index]}
                    className='border w-[25px] h-[40px] rounded-md m-2 text-center'
                    key={index}
                    type='text'
                    maxLength={1}
                    value={value}
                    onKeyDown={(e) => handleDelete(index, e)}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onPaste={(e) => handlePaste(index, e)}
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
