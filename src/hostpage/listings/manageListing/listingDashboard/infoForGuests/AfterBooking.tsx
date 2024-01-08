import { useContext, useEffect, useState } from 'react';
import { HostContext } from '../../../../../App';
import ManageListingInfoBlock from '../../components/ManageListingInfoBlock';

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
        <ManageListingInfoBlock
          display={'Address'}
          contents={
            currentHostListing?.streetaddress
              ? `${currentHostListing.streetaddress} ${
                  currentHostListing?.apt || ''
                }, ${currentHostListing?.city} ${currentHostListing?.state} ${
                  currentHostListing?.zipcode
                }`
              : undefined
          }
          caption={
            'Enter your address so guests know where your home is. Your full address will remain hidden until a booking is confirmed. '
          }
        />
        <ManageListingInfoBlock
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
