import { useContext, useState, useEffect } from 'react';
import { HostContext } from '../../../../../App';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { MdDeleteOutline, MdErrorOutline } from 'react-icons/md';
import { useDrop } from 'react-dnd';
import { validateDrop, processValid } from '../../../../../utils';
import { Listing } from '../../../../../types';
import { NativeTypes } from 'react-dnd-html5-backend';
import FileInput from '../../../../../components/FileInput';
import { ManageListingContext } from '../../ManageListing';

/*
TODO: Add a blur and edit functionality
*/

function Photos() {
  const { currentHostListing, setCurrentHostListing } =
    useContext(HostContext)!;
  const { updateListing } = useContext(ManageListingContext)!;
  const [initialSetupDone, setInitialSetupDone] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [notValidated, setNotValidated] = useState<boolean>(true);
  const [originalPhotos, setOriginalPhotos] = useState<string[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (currentHostListing?.photos) {
      if (!initialSetupDone) {
        setOriginalPhotos(currentHostListing.photos);
        setInitialSetupDone(true);
      }
      if (currentHostListing.photos.length >= 5) setNotValidated(false);
      else {
        setNotValidated(true);
      }
    }
  }, [currentHostListing]);

  const handleValid = async (files: File[]) => {
    const compressedFiles = await processValid(files);

    setCurrentHostListing((prevState) => {
      if (!prevState) return prevState;
      const currentState: Listing = { ...prevState };
      currentState.photos = [...currentState.photos, ...compressedFiles];
      return currentState;
    });
  };

  const handleDeletePhoto = (deletionIndex: number) => {
    setCurrentHostListing((prevState) => {
      if (!prevState) return prevState;

      const currentState: Listing = { ...prevState };
      currentState.photos = currentState.photos.filter(
        (_, index) => index !== deletionIndex
      );
      return currentState;
    });
  };

  const handlePhotosFromDevice = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      for (const file of files) {
        const { valid } = await validateDrop(file, setErrorMessage);
        if (!valid) return;
      }
      handleValid(files);
    }
  };

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop: async (item: { files: File[] }) => {
        if (item) {
          for (const file of item.files) {
            const { valid } = await validateDrop(file, setErrorMessage);
            if (!valid) return;
          }
          handleValid(item.files);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  if (!currentHostListing) return;

  const handleEditor = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  const handleCancel = () => {
    if (!originalPhotos) return;

    setCurrentHostListing({
      ...currentHostListing,
      photos: originalPhotos,
    });
    setNotValidated(true);
    handleEditor();
  };

  const handleSave = () => {
    setOriginalPhotos(currentHostListing.photos);
    updateListing(undefined);
    handleEditor();
  };

  return (
    <div className='border-b w-full pb-8 pt-6 md:pt-0' id='photoBlock'>
      {!isOpen && (
        <>
          <div className='flex flex-row'>
            <div className='pb-6 font-semibold mr-auto text-base md:text-lg'>
              Photos
            </div>
            {currentHostListing?.photos && (
              <button
                className='text-xs md:text-sm underline font-semibold'
                onClick={handleEditor}
              >
                Edit
              </button>
            )}
          </div>
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
        </>
      )}
      {isOpen && currentHostListing?.photos && (
        <div className='w-full border rounded-md'>
          <div className='p-4'>
            <div className='flex flex-col'>
              <div className='text-sm md:text-base font-semibold'>Photos</div>
              <div className='text-xs text-slate-500'>
                Edit the photos of your space. Remember, you must have at least
                five photos.
              </div>
            </div>

            <div className='flex flex-col mt-6 justify-center items-center'>
              <div
                ref={drop}
                className={`rounded-md p-6 overflow-auto w-full md:max-w-[650px] h-[400px] ${
                  currentHostListing.photos.length
                    ? 'grid grid-cols-2 gap-4'
                    : 'flex flex-col'
                } ${
                  isOver
                    ? 'animate-pulse border-dotted border-slate-500 items-center'
                    : 'border'
                }`}
              >
                {!currentHostListing.photos.length && (
                  <div className='flex flex-col justify-center items-center m-auto space-y-2'>
                    <div>
                      <HiOutlinePhoto size={60} />
                    </div>
                    <div className='text-sm md:text-base font-semibold'>
                      Drag your photos here
                    </div>
                    <div className='text-xs md:text-sm'>
                      Choose at least 5 photos
                    </div>
                    <div className='pt-6 text-xs md:text-sm'>
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
                {currentHostListing.photos.length > 0 &&
                  currentHostListing.photos.map((dataUrl, index) => {
                    return (
                      <div
                        className='border h-[150px] md:h-[200px] md:max-w-[300px] bg-white rounded-md shadow-sm'
                        key={`${dataUrl.slice(0, 10)}+${index}`}
                      >
                        {dataUrl && (
                          <div
                            className='p-2 relative bg-cover w-full h-full'
                            style={{
                              backgroundImage: `url(${dataUrl})`,
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
                {currentHostListing.photos.length > 0 && (
                  <div className='flex border h-[150px] md:h-[200px] md:max-w-[300px] bg-white rounded-md shadow-sm justify-center items-center text-sm md:text-base'>
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
          <div className='mt-4 border-t'>
            <div className='text-xs md:text-sm space-x-2 flex flex-row p-4'>
              <button
                className='underline mr-auto font-semibold'
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className={`${
                  notValidated ? 'bg-gray-300	' : 'bg-black'
                } border rounded-md p-2 pr-4 pl-4 font-semibold text-white`}
                disabled={notValidated}
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Photos;
