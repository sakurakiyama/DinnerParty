/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useContext } from 'react';
import SectionOne from './components/SectionOne';
import { UserContext } from '../App';
import axios, { AxiosError } from 'axios';

function HomePage() {
  const { setUser } = useContext(UserContext)!;

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const { data } = await axios.get('/auth/status');
        // TODO: if the request was successful, update setUser with the user object
      } catch (error: AxiosError | unknown) {
        if (error instanceof AxiosError) {
          if (error.response) {
            const status = error.response.status;

            if (status === 401) console.error('User is unauthorized.');
            else console.error('Error response status:', status);
          } else console.error('Error request:', error.request);
        } else console.error('Error while checking auth status:', error);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <div>
      <SectionOne />
    </div>
  );
}

export default HomePage;
