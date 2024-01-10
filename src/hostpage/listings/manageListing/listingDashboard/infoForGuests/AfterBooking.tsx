import { useContext, useEffect, useState } from 'react';
import { HostContext } from '../../../../../App';
import TextAndFormEditBlock from '../../components/TextAndFormEditBlock';
import { LabeledInputProps } from '../../../../../types';

function AfterBooking() {
  const { currentHostListing, setCurrentHostListing } =
    useContext(HostContext)!;
  const [wifiDetailsElement, setWifiDetailsElement] = useState<
    JSX.Element | undefined
  >(undefined);

  useEffect(() => {
    if (currentHostListing?.wifidetails) {
      setWifiDetailsElement(
        <div className='flex flex-col'>
          <div>Network name: {currentHostListing.wifidetails.networkname}</div>
          <div>Password: {currentHostListing.wifidetails.password}</div>
        </div>
      );
    }
  }, [currentHostListing]);

  const inputConfigs: LabeledInputProps[] = [
    {
      id: 'networkname',
      display: 'Network name',
      required: false,
      setterFunc: (networkname: string) => {
        if (!currentHostListing) return;
        setCurrentHostListing({
          ...currentHostListing,
          wifidetails: {
            ...currentHostListing.wifidetails,
            networkname: networkname || '',
          },
        });
      },
      value: currentHostListing?.wifidetails?.networkname || '',
    },
    {
      id: 'password',
      display: 'Password',
      required: true,
      setterFunc: (password: string) => {
        if (!currentHostListing) return;
        setCurrentHostListing({
          ...currentHostListing,
          wifidetails: {
            ...currentHostListing.wifidetails,
            password: password || '',
          },
        });
      },
      value: currentHostListing?.wifidetails?.password || '',
      validate: () => {
        return '';
      },
    },
  ];

  return (
    <div className='border-b w-full pt-8 pb-8' id='beforeBookingBlock'>
      <div className='font-semibold text-lg'>After Booking</div>
      <div className='text-sm text-slate-500 pb-6'>
        Confirmed guests can see this info before they arrive.
      </div>
      <div className='space-y-8'>
        <TextAndFormEditBlock
          display={'Wifi details'}
          contents={wifiDetailsElement}
          caption={
            'Enter your wifi details so guests can access it in your space. '
          }
          inputConfigs={inputConfigs}
        />
      </div>
    </div>
  );
}

export default AfterBooking;
