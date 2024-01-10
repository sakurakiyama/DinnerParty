import { useContext, useEffect, useState } from 'react';
import { HostContext } from '../../../../../App';
import ManageListingTextBlock from '../../components/ManageListingTextBlock';

function AfterBooking() {
  const { currentHostListing } = useContext(HostContext)!;
  const [wifiDetailsElement, setWifiDetailsElement] = useState<
    JSX.Element | undefined
  >(undefined);

  useEffect(() => {
    if (currentHostListing?.wifidetails) {
      console.log(currentHostListing.wifidetails);
      setWifiDetailsElement(
        <div className='flex flex-col'>
          <div>Network name: {currentHostListing.wifidetails.networkname}</div>
          <div>Network name: {currentHostListing.wifidetails.password}</div>
        </div>
      );
    }
  }, [currentHostListing]);
  return (
    <div className='border-b w-full pt-8 pb-8' id='beforeBookingBlock'>
      <div className='font-black text-lg'>After Booking</div>
      <div className='text-sm text-slate-500 pb-6'>
        Confirmed guests can see this info before they arrive.
      </div>
      <div className='space-y-8'>
        <ManageListingTextBlock
          display={'Wifi details'}
          contents={wifiDetailsElement}
          caption={
            'Enter your wifi so guests can access it during their dinner party.'
          }
        />
      </div>
    </div>
  );
}

export default AfterBooking;
