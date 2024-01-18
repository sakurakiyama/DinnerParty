import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../Profile';
import GeneralTextAndTextEdit from '../../components/GeneralTextAndTextEdit';
import { UserContext } from '../../App';
import { isBlankString } from '../../utils';

type OriginalAboutUser = {
  bio: string;
  city: string;
  state: string;
};

function AboutUser() {
  const { isLoading, updateUser } = useContext(ProfileContext)!;
  const { user, setUser } = useContext(UserContext)!;
  const [originalAboutUser, setOriginalAboutUser] = useState<OriginalAboutUser>(
    {
      bio: '',
      city: '',
      state: '',
    }
  );

  useEffect(() => {
    if (user) {
      setOriginalAboutUser({
        bio: user.bio || '',
        city: user.city || '',
        state: user.state || '',
      });
    }
  }, []);

  return (
    <div className='w-full'>
      <GeneralTextAndTextEdit
        display={'Bio'}
        contents={user?.bio || ''}
        caption={
          'Tell us a little bit about yourself, so your future hosts or guests can get to know you.'
        }
        onChange={(updatedBio: string) => {
          if (!user) return;
          setUser({
            ...user,
            bio: updatedBio,
          });
        }}
        onCancel={() => {
          if (!user) return;
          setUser({
            ...user,
            bio: originalAboutUser.bio,
          });
        }}
        onSave={() => {
          if (!user) return;
          setOriginalAboutUser({
            ...originalAboutUser,
            bio: user.bio || '',
          });
          updateUser();
        }}
        required={true}
        validateInput={(value: string) => {
          if (isBlankString(value)) return false;
          else if (value === originalAboutUser.bio) return false;
          else if (value.length > 300) return false;
          else return true;
        }}
        maxLength={300}
        isLoading={isLoading}
      />
    </div>
  );
}

export default AboutUser;
