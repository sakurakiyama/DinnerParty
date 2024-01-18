import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../Profile';
import GeneralTextAndTextEdit from '../../components/GeneralTextAndTextEdit';
import GeneralTextAndFormEditBlock from '../../components/GeneralTextAndFormEditBlock';
import { UserContext } from '../../App';
import { isBlankString, isAlphaWithSpacesAndAccents } from '../../utils';
import { LabeledInputProps } from '../../types';
import { IoMdGlobe } from 'react-icons/io';

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
  const [locationElement, setLocationElement] = useState<
    JSX.Element | undefined
  >(undefined);

  useEffect(() => {
    if (user) {
      setOriginalAboutUser({
        bio: user.bio || '',
        city: user.city || '',
        state: user.state || '',
      });
    }
  }, []);

  useEffect(() => {
    if (user) {
      if (user.bio && user.state) {
        setLocationElement(
          <div className='flex flex-row space-x-2 items-center'>
            <IoMdGlobe />
            <div>
              Lives in {user.city}, {user.state}
            </div>
          </div>
        );
      }
    }
  }, [user]);

  const inputConfigs: LabeledInputProps[] = [
    {
      id: 'city',
      display: 'City',
      required: true,
      setterFunc: (city: string) => {
        if (!user) return;
        setUser({
          ...user,
          city,
        });
      },
      value: user?.city || '',
      validate: (city: string) => {
        if (!user) return 'Cannot yet validate';
        const blankField = isBlankString(city);
        if (blankField) return 'City is a required field';
        const noSpecialChars = isAlphaWithSpacesAndAccents(city);
        if (!noSpecialChars) return 'City can only contain characters';
        return null;
      },
    },
    {
      id: 'state',
      display: 'State',
      required: true,
      setterFunc: (state: string) => {
        if (!user) return;
        setUser({
          ...user,
          state,
        });
      },
      value: user?.state || '',
      validate: (state: string) => {
        if (!user) return 'Cannot yet validate';
        const blankField = isBlankString(state);
        if (blankField) return 'State is a required field';
        const noSpecialChars = isAlphaWithSpacesAndAccents(state);
        if (!noSpecialChars) return 'State can only contain characters';
        return null;
      },
    },
  ];

  return (
    <div className='w-full space-y-6'>
      <div className='font-semibold text-3xl'>About {user?.firstname}</div>
      <GeneralTextAndFormEditBlock
        display={'Location'}
        contents={locationElement}
        caption={'Let future hosts or guests know where you are based.'}
        inputConfigs={inputConfigs}
        onCancel={() => {
          if (!user) return;
          setUser({
            ...user,
            state: originalAboutUser.state,
            city: originalAboutUser.city,
          });
        }}
        onSave={() => {
          if (!user) return;
          setOriginalAboutUser({
            ...originalAboutUser,
            state: user.state || '',
            city: user.city || '',
          });
          updateUser();
        }}
        isLoading={isLoading}
      />
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
