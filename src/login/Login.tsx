import { useState, useContext, useRef, useEffect } from 'react';
import { UserContext } from '../App';
import DinnerSetting from '../assets/DinnerSetting.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OrangeHeaderCard from '../components/OrangeHeaderCard';

/* 
Currently race condition issue being handled by settimeout. Refactor to a better solution.
*/

type InputRef = React.RefObject<HTMLInputElement> | null;

function Login() {
  const { user, setUser } = useContext(UserContext)!;
  const navigate = useNavigate();

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

  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const inputRowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (user) {
      navigate('/browse');
    } else if (emailInputRef.current) emailInputRef.current.focus();
  }, []);

  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    const next = index + 1;

    if (index !== inputRefs.length - 1) {
      setTimeout(() => {
        inputRefs[next]?.current?.focus();
      }, 50);
    }
  };

  const handleDelete = async (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const keyPressed = event.code;
    if (keyPressed === 'Backspace') {
      event.preventDefault();
      const newCode = [...code];

      if (index > 0 && code[index]) {
        newCode[index] = '';
        await setCode(newCode);
        inputRefs[index]?.current?.focus();
      } else if (index > 0 && !code[index]) {
        newCode[index - 1] = '';
        await setCode(newCode);
        inputRefs[index - 1]?.current?.focus();
      } else if (index === 0 && code[index]) {
        newCode[index] = '';
        await setCode(newCode);
        inputRefs[index]?.current?.focus();
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
    inputRefs[currentIndex - 1]?.current?.focus();
    setCode(newCode);
  };

  const submitVerificationCode = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const submittedCode = code.join('');

      if (submittedCode.length !== inputRefs.length) {
        if (!inputRowRef.current) return;
        inputRowRef.current.classList.add('animate-shake');
        return;
      }
      const { data } = await axios.post('/api/auth/verifycode', {
        email,
        code: submittedCode,
      });
      setUser(data);
      navigate('/browse');
    } catch (error) {
      console.error(error);
    }
  };

  const submitEmail = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await axios.post('/api/user/sendCode', { email });
    } catch (error) {
      console.error(error);
    }
    setEmailSubmitted(true);
  };

  return (
    <div
      className='justify-center items-center flex flex-col h-screen bg-cover'
      style={{ backgroundImage: `url(${DinnerSetting})` }}
    >
      <OrangeHeaderCard
        cardContent={
          <div className='text-center text-sm'>
            {!emailSubmitted && (
              <div>
                Enter your email address
                <form className='pt-8 flex flex-col' onSubmit={submitEmail}>
                  <input
                    ref={emailInputRef}
                    className='border rounded-lg p-1 outline-slate-500'
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
                  <div ref={inputRowRef}>
                    {code.map((value, index) => (
                      <input
                        ref={inputRefs[index]}
                        className='border w-[25px] h-[40px] rounded-md m-2 text-center outline-slate-500'
                        key={`${value}+${index}`}
                        type='text'
                        maxLength={1}
                        value={value}
                        onKeyDown={(e) => handleDelete(index, e)}
                        onChange={(e) =>
                          handleCodeChange(index, e.target.value)
                        }
                        onPaste={(e) => handlePaste(index, e)}
                      />
                    ))}
                  </div>
                  <button
                    className='border rounded-full mt-16 w-full bg-[var(--mango-sorbet)]	text-white p-2 pl-8 pr-8 shadow-sm m-auto'
                    type='submit'
                  >
                    Submit
                  </button>
                </form>
                <div className='pt-8 text-sm'>
                  <p>
                    Can't find it? Check your spam/junk folder. Or
                    <button
                      className='text-blue-500 underline cursor-pointer'
                      onClick={submitEmail}
                    >
                      request a new code
                    </button>
                    .
                  </p>
                </div>
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}

export default Login;
