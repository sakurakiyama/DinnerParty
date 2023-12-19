import { useState, useRef, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { MdModeEdit } from 'react-icons/md';
import { addGuestServiceFee } from '../../../../utils';

type EditableDivRef = HTMLDivElement & { firstChild: Element };

function SetPrice() {
  const editableRef = useRef<EditableDivRef>(null);

  const [price, setPrice] = useState<number>(100);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [totalBeforeTaxes, setTotalBeforeTaxes] = useState(114);

  const handleEditLogoClick = () => {
    if (editableRef.current) {
      const selection = window.getSelection();
      const range = document.createRange();
      const length = price.toString().length;
      if (length > 1) {
        range.setStart(editableRef.current.firstChild, length);
        range.collapse(true);

        selection?.removeAllRanges();
        selection?.addRange(range);
      }

      editableRef.current.focus();
    }
  };

  const handlePriceChange = (e: React.FormEvent<HTMLDivElement>) => {
    const value = Number((e.currentTarget as HTMLDivElement).innerText) || 0;
    setPrice(value);
    setTotalBeforeTaxes(addGuestServiceFee(value));
  };

  const handleBlur = () => {
    if (editableRef.current) {
      if (!editableRef.current.innerText) editableRef.current.innerText = '0';
    }
    setIsEditing(false);
  };

  // Instantiate content editable's ref to be a default value.
  useEffect(() => {
    if (editableRef.current) editableRef.current.innerText = '100';
  }, []);

  return (
    <div className='flex flex-col w-[600px] h-[300px]'>
      <div className='font-black text-2xl md:text-3xl'>Now, set your price</div>
      <div className='mt-4 md:text-base text-gray-500'>
        You can change it anytime.
      </div>
      <div className='flex flex-col justify-center items-center h-full'>
        <div className='leading-[100px] text-[100px] font-black flex flex-row'>
          $
          <div
            ref={editableRef}
            className='outline-0'
            contentEditable={true}
            onFocus={() => setIsEditing(true)}
            onBlur={handleBlur}
            onInput={handlePriceChange}
          ></div>
          <div
            onClick={handleEditLogoClick}
            className={`rounded-full border border-gray-300 h-[28px] w-[28px] flex justify-center items-center mt-[55px] ml-2 ${
              isEditing ? 'hidden' : 'block'
            }`}
          >
            <MdModeEdit size={18} />
          </div>
        </div>
        <div className='flex flex-row items-center mt-6'>
          <div>Guest price before taxes ${totalBeforeTaxes}</div>
          <IoIosArrowDown />
        </div>
      </div>
    </div>
  );
}

export default SetPrice;
