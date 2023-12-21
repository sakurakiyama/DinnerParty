import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { useState, useContext, useEffect } from 'react';
import { MdOutlinePhotoLibrary } from 'react-icons/md';
import SalmonButton from '../../../../components/SalmonButton';
import { NewListingWizardContext } from '../../NewListingWizard';

/*
TODO: Add logic to delete photos
TODO: Add logic to make sure there's at least 5 images
TODO: Add logic to make sure only certain size are accepted (30MB max and 50KB min)
TODO: Currently not saving photos in local storage due to size. Figure out a good solution. 
*/

function AddPhotos() {
  const [notValidated, setNotValidated] = useState<boolean>(true);
  const { marketingContext, newListingButtonsContext } = useContext(
    NewListingWizardContext
  );
  const { marketingDetails, setMarketingDetails } = marketingContext;
  const { currentView, setCurrentView } = newListingButtonsContext;

  const handleView = (operation?: string) => {
    if (operation === 'Forward') {
      setCurrentView(currentView + 1);
    } else if (operation === 'Backward') setCurrentView(currentView - 1);
  };

  const readAsDataURL = async (
    file: File
  ): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      } catch (error) {
        reject(error);
      }
    });
  };

  useEffect(() => {
    if (marketingDetails.photos.length >= 5) setNotValidated(false);
  }, [marketingDetails]);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop: async (item: { files: File[] }) => {
        if (item) {
          const type = item.files[0].type;
          if (type === 'image/png' || type === 'image/jpeg') {
            const newFiles = await Promise.all(
              item.files.map(async (file) => await readAsDataURL(file))
            );
            setMarketingDetails((prevState) => {
              const currentState = { ...prevState };
              currentState.photos = [...currentState.photos, ...newFiles];
              return currentState;
            });
          }
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  return (
    <div className='flex flex-col h-full overflow-auto'>
      <div>
        <div className='flex flex-col md:space-x-8 items-center justify-center '>
          <div className='flex flex-col pb-10 pt-10 md:pb-0 md:p-10'>
            <div className='font-black text-2xl md:text-3xl'>
              Add some photos of your space
            </div>
            <div className='mt-4 md:text-base text-gray-500 mb-8'>
              You'll need 5 photos to get started. You can add more or make
              changes later.
            </div>
            <div
              ref={drop}
              className={`rounded-md md:w-[650px] h-[400px] p-6 overflow-auto ${
                marketingDetails.photos.length
                  ? 'grid grid-cols-2 gap-4'
                  : 'flex flex-col'
              } ${
                isOver
                  ? 'animate-pulse border-dotted border-2 border-[var(--light-pink)] items-center'
                  : 'border border-2'
              }`}
            >
              {!marketingDetails.photos.length && (
                <div className='flex flex-col justify-center items-center m-auto'>
                  <div className='mb-2'>
                    <MdOutlinePhotoLibrary size={60} />
                  </div>
                  <div className='text-base font-black'>
                    Drag your photos here
                  </div>
                  <div className=''>Choose at least 5 photos</div>
                </div>
              )}
              {marketingDetails.photos &&
                marketingDetails.photos.map((dataUrl, index) => {
                  return (
                    <div
                      className='border h-[150px] md:h-[200px] md:w-[300px] bg-white rounded-md shadow-sm'
                      key={index}
                    >
                      {dataUrl ? (
                        <img
                          className='object-cover w-full h-full rounded-md'
                          src={dataUrl as string}
                          alt={`Preview ${index}`}
                        />
                      ) : (
                        <span>Unable to preview</span>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center mb-8 mt-auto pt-6'>
        <div className='flex w-full justify-between ml-4 mr-4'>
          <SalmonButton
            display={'Back'}
            handleClick={handleView}
            operation={'Backward'}
            disabled={false}
          />
          <SalmonButton
            display={'Next'}
            handleClick={handleView}
            operation={'Forward'}
            disabled={notValidated}
          />
        </div>
      </div>
    </div>
  );
}

export default AddPhotos;
