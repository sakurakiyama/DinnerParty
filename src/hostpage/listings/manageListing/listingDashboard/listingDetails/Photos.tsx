import { useContext } from 'react';
import { HostContext } from '../../../../../App';

/*
TODO: Add a blur and edit functionality
*/

function Photos() {
  const { currentHostListing } = useContext(HostContext)!;

  return (
    <div className='border-b w-full pb-8' id='photoBlock'>
      <div className='pb-6 font-semibold text-lg'>Photos</div>
      <div className='flex flex-row space-x-4 w-full'>
        {!currentHostListing || !currentHostListing.photos
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className='min-w-[200px] min-h-[125px] bg-gray-100 animate-pulse rounded-md'
              ></div>
            ))
          : currentHostListing?.photos.map((dataUrl, index) => {
              return (
                <div
                  className='min-w-[200px] min-h-[125px] blurred-right'
                  key={`${dataUrl.slice(0, 10)}+${index}`}
                >
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
