import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { useState } from 'react';
import { MdOutlinePhotoLibrary } from 'react-icons/md';

/*
TODO: Add logic to delete photos
TODO: Add logic to make sure there's at least 5 images
TODO: Add logic to make sure only certain size are accepted (30MB)
*/

function AddPhotos() {
  const [droppedFiles, setDroppedFiles] = useState<
    (string | ArrayBuffer | null)[]
  >([]);

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

            setDroppedFiles((prevState) => {
              const allDroppedFiles = [...prevState, ...newFiles];
              return allDroppedFiles;
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
              droppedFiles.length ? 'grid grid-cols-2 gap-4' : 'flex flex-col'
            } ${
              isOver
                ? 'animate-pulse border-dotted border-2 border-[var(--light-pink)] items-center'
                : 'border border-2'
            }`}
          >
            {!droppedFiles.length && (
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
            {droppedFiles &&
              droppedFiles.map((dataUrl, index) => {
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
  );
}

export default AddPhotos;
