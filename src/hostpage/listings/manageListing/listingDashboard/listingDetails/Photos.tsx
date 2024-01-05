import { useContext, useEffect, useState } from 'react';
import { HostContext } from '../../../../../App';
import { v4 as uuid } from 'uuid';
import { convertToBase64 } from '../../../../../utils';

function Photos() {
  const { currentHostListing } = useContext(HostContext)!;
  const [photos, setPhotos] = useState<string[]>([]);
  console.log(currentHostListing);

  useEffect(() => {
    if (currentHostListing?.photos) {
      const base64Photos = convertToBase64(currentHostListing.photos);
      setPhotos(base64Photos);
    }
  }, []);

  return (
    <div className='border-b w-full'>
      <div className='flex flex-row space-x-4 overflow-x-hidden'>
        {photos &&
          photos.map((dataUrl) => {
            return (
              <div className='w-[250px] h-[150px]' key={uuid()}>
                {dataUrl && (
                  <div
                    className='p-2 bg-cover w-full h-full rounded-md'
                    style={{
                      backgroundImage: `url(${dataUrl as string})`,
                    }}
                  ></div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Photos;
