import { useContext, useEffect, useState } from 'react';
import { HostContext } from '../../../../../App';
import { LabeledInputProps } from '../../../../../types';
import { isBlankString } from '../../../../../utils';
import { WifiDetails } from '../../../../../types';
import GeneralTextAndFormEditBlock from '../../../../../components/GeneralTextAndFormEditBlock';
import { ManageListingContext } from '../../ManageListing';

type AfterBooking = {
  wifidetails: WifiDetails;
};
function AfterBooking() {
  const { currentHostListing, setCurrentHostListing } =
    useContext(HostContext)!;
  const { isLoading, updateListing } = useContext(ManageListingContext)!;

  const [wifiDetailsElement, setWifiDetailsElement] = useState<
    JSX.Element | undefined
  >(undefined);
  const [initialSetupDone, setInitialSetupDone] = useState(false);
  const [originalAfterBooking, setOriginalAfterBooking] = useState<WifiDetails>(
    {
      networkname: '',
      password: '',
    }
  );

  useEffect(() => {
    if (currentHostListing) {
      if (
        currentHostListing.wifidetails.password &&
        currentHostListing.wifidetails.networkname
      ) {
        setWifiDetailsElement(
          <div className='flex flex-col'>
            <div>
              Network name: {currentHostListing.wifidetails.networkname}
            </div>
            <div>Password: {currentHostListing.wifidetails.password}</div>
          </div>
        );
      } else {
        setWifiDetailsElement(
          <div className='text-sm text-slate-500 italic'>
            <div>
              Enter your wifi details so guests can access it in your space.
            </div>
          </div>
        );
      }
      if (!initialSetupDone) {
        setOriginalAfterBooking({
          networkname: currentHostListing.wifidetails.networkname,
          password: currentHostListing.wifidetails.password,
        });
        setInitialSetupDone(true);
      }
    }
  }, [currentHostListing]);

  const inputConfigs: LabeledInputProps[] = [
    {
      id: 'networkname',
      display: 'Network name',
      required: true,
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
      validate: (networkName: string) => {
        const blankField = isBlankString(networkName);
        if (blankField) return 'Network name is a required field';
        return null;
      },
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
      validate: (password: string) => {
        const blankField = isBlankString(password);
        if (blankField) return 'Password is a required field';
        return null;
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
        <GeneralTextAndFormEditBlock
          display={'Wifi details'}
          contents={wifiDetailsElement}
          caption={
            'Enter your wifi details so guests can access it in your space. '
          }
          inputConfigs={inputConfigs}
          onCancel={() => {
            if (!currentHostListing) return;
            setCurrentHostListing({
              ...currentHostListing,
              wifidetails: {
                networkname: originalAfterBooking.networkname,
                password: originalAfterBooking.password,
              },
            });
          }}
          onSave={() => {
            if (!currentHostListing) return;
            setOriginalAfterBooking({
              networkname: currentHostListing.wifidetails.networkname,
              password: currentHostListing.wifidetails.password,
            });
            updateListing(undefined);
          }}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default AfterBooking;
