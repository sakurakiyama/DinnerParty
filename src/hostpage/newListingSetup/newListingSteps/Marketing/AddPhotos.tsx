import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { useState, useContext, useEffect } from 'react';
import { HiOutlinePhoto } from 'react-icons/hi2';
import SalmonButton from '../../../../components/SalmonButton';
import FileInput from '../../../../components/FileInput';
import { NewListingWizardContext } from '../../NewListingWizard';
import { MdDeleteOutline } from 'react-icons/md';
import { convertToKB, convertToMB } from '../../../../utils';
import { MdErrorOutline } from 'react-icons/md';
import { v4 as uuid } from 'uuid';

/*
TODO: Add functionality to drag photos once dropped
*/

function AddPhotos() {
  const [notValidated, setNotValidated] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const {
    marketingDetails,
    setMarketingDetails,
    currentView,
    setCurrentView,
    setSlideIn,
    slideIn,
  } = useContext(NewListingWizardContext)!;

  useEffect(() => {
    if (marketingDetails.photos.length >= 5) setNotValidated(false);
    else {
      setNotValidated(true);
    }
  }, [marketingDetails]);

  const handleView = (operation?: string) => {
    if (operation === 'Forward') {
      setSlideIn('Right');
      setCurrentView(currentView + 1);
    } else if (operation === 'Backward') {
      setSlideIn('Left');
      setCurrentView(currentView - 1);
    }
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

  const handleDeletePhoto = (deletionIndex: number) => {
    setMarketingDetails((prevState) => {
      const currentState = { ...prevState };
      currentState.photos = currentState.photos.filter(
        (_, index) => index !== deletionIndex
      );
      return currentState;
    });
  };

  const processValid = async (files: File[]) => {
    const newFiles = await Promise.all(
      files.map(async (file) => readAsDataURL(file))
    );

    setMarketingDetails((prevState) => {
      const currentState = { ...prevState };
      currentState.photos = [...currentState.photos, ...newFiles];
      return currentState;
    });
  };

  const handlePhotosFromDevice = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      for (const file of files) {
        const { valid } = await validateDrop(file);
        if (!valid) return;
      }
      processValid(files);
    }
  };

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop: async (item: { files: File[] }) => {
        if (item) {
          for (const file of item.files) {
            const { valid } = await validateDrop(file);
            if (!valid) return;
          }
          processValid(item.files);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  const validateDrop = async (file: File) => {
    const type = file.type;
    const KBSize = convertToKB(file.size);
    const MBSize = convertToMB(file.size);

    if (type !== 'image/png' && type !== 'image/jpeg') {
      setErrorMessage(
        'Invalid file format. Please upload a photo in PNG or JPEG format.'
      );
      return { valid: false };
    } else if (KBSize < 50) {
      setErrorMessage(
        'Photo size is too small. Please upload a photo larger than 50KB.'
      );
      return { valid: false };
    } else if (MBSize > 10) {
      setErrorMessage(
        'Photo size exceeds the maximum limit. Please upload a photo less than 10MB.'
      );
      return { valid: false };
    } else {
      setErrorMessage('');
      return { valid: true };
    }
  };

  return (
    <div
      className={`flex flex-col h-full overflow-auto ${
        slideIn === 'Left' ? 'animate-slideInLeft' : 'animate-slideInRight'
      }`}
    >
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
                  ? 'animate-pulse border-dotted border-2 border-slate-500  items-center'
                  : 'border border-2'
              }`}
            >
              {!marketingDetails.photos.length && (
                <div className='flex flex-col justify-center items-center m-auto space-y-2'>
                  <div>
                    <HiOutlinePhoto size={60} />
                  </div>
                  <div className='text-xl font-black'>
                    Drag your photos here
                  </div>
                  <div>Choose at least 5 photos</div>
                  <div className='pt-6'>
                    <FileInput
                      handleChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => handlePhotosFromDevice(event)}
                      display={'Click here to upload photos'}
                      accept={'image/png, image/jpeg'}
                      multiple={true}
                    />
                  </div>
                </div>
              )}
              {marketingDetails.photos.length > 0 &&
                marketingDetails.photos.map((dataUrl, index) => {
                  return (
                    <div
                      className='border h-[150px] md:h-[200px] md:w-[300px] bg-white rounded-md shadow-sm'
                      key={uuid()}
                    >
                      {dataUrl && (
                        <div
                          className='p-2 relative bg-cover w-full h-full'
                          style={{
                            backgroundImage: `url(${dataUrl as string})`,
                          }}
                        >
                          <button
                            onClick={() => handleDeletePhoto(index)}
                            className='absolute bottom-0 right-0 m-2 bg-white rounded-full w-[30px] h-[30px] flex justify-center items-center shadow-md'
                          >
                            <MdDeleteOutline size={20} />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              {marketingDetails.photos.length > 0 && (
                <div className='flex border h-[150px] md:h-[200px] md:w-[300px] bg-white rounded-md shadow-sm justify-center items-center'>
                  <FileInput
                    handleChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ) => handlePhotosFromDevice(event)}
                    display={'Add more'}
                    accept={'image/png, image/jpeg'}
                    multiple={true}
                  />
                </div>
              )}
            </div>
            {errorMessage && (
              <div className='text-center text-rose-800 flex justify-center items-center pt-2'>
                <MdErrorOutline size={20} className='pr-1' /> {errorMessage}
              </div>
            )}
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
