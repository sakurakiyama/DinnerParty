import { useState, useRef, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { MdModeEdit } from 'react-icons/md';
import { getGuestServiceFee, getHostServiceFee } from '../../../../utils';
import PriceBreakDownCard from '../../../../components/PriceBreakdownCard';

type EditableDivRef = HTMLDivElement & { firstChild: Element };

export type CardItem = {
  item: string;
  price: number;
};

export type TotalItem = {
  totalDescription: string;
  totalPrice: number;
};

export type Card = (CardItem | TotalItem)[];

type CardsArray = Card[];

function SetPrice() {
  const editableRef = useRef<EditableDivRef>(null);
  const [price, setPrice] = useState<number>(100);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [guestServiceFee, setGuestServiceFee] = useState<number>(14);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState<boolean>(false);
  const [hostServiceFee, setHostServiceFee] = useState<number>(3);
  const [allCards, setAllCards] = useState<CardsArray>([]);
  const [openCardIndex, setOpenCardIndex] = useState<number>(0);

  const handleEditLogoClick = () => {
    if (editableRef.current) {
      const selection = window.getSelection();
      const range = document.createRange();
      const length = price.toString().length;
      if (length > 0) {
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
    const totalGuestServiceFee = getGuestServiceFee(value);
    const totalHostServiceFee = getHostServiceFee(value);
    setGuestServiceFee(totalGuestServiceFee);
    setHostServiceFee(totalHostServiceFee);

    const cards = [
      [
        { item: 'Base price', price: value },
        { item: 'Guest service fee', price: totalGuestServiceFee },
        {
          totalDescription: 'Guest price before taxes',
          totalPrice: totalGuestServiceFee + price,
        },
      ],
      [
        { item: 'Base price', price: price },
        { item: 'Host service fee', price: totalHostServiceFee },
        {
          totalDescription: 'You earn',
          totalPrice: price - totalHostServiceFee,
        },
      ],
    ];

    setAllCards(cards);
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

    const defaultCards = [
      [
        { item: 'Base price', price: price },
        { item: 'Guest service fee', price: guestServiceFee },
        {
          totalDescription: 'Guest price before taxes',
          totalPrice: guestServiceFee + price,
        },
      ],
      [
        { item: 'Base price', price: price },
        { item: 'Host service fee', price: hostServiceFee },
        {
          totalDescription: 'You earn',
          totalPrice: price - hostServiceFee,
        },
      ],
    ];

    setAllCards(defaultCards);
  }, []);

  const handleToggle = () => {
    showPriceBreakdown
      ? setShowPriceBreakdown(false)
      : setShowPriceBreakdown(true);
  };

  const handleCardToggle = (index: number) => {
    setOpenCardIndex((prevIndex) => (prevIndex === index ? prevIndex : index));
  };

  return (
    <div className='flex flex-col w-[600px]'>
      <div className='font-black text-2xl md:text-3xl'>Now, set your price</div>
      <div className='mt-4 md:text-base text-gray-500'>
        You can change it anytime.
      </div>
      <div
        className={`flex flex-col items-center pt-20 h-full md:text-base h-[500px]`}
      >
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
        <div
          className={`flex flex-row items-center mt-6 space-x-2 ${
            !showPriceBreakdown ? 'block' : 'hidden'
          } `}
        >
          <div>Guest price before taxes ${guestServiceFee + price}</div>
          <div onClick={handleToggle}>
            <IoIosArrowDown />
          </div>
        </div>
        {/* Price breakdown */}
        <div
          className={`${
            showPriceBreakdown ? 'block' : 'hidden'
          } mt-6 w-[360px] md:w-[600px]`}
        >
          <div className='space-y-4'>
            {allCards &&
              allCards.map((current, index) => {
                return (
                  <PriceBreakDownCard
                    card={current}
                    index={index}
                    isOpen={index === openCardIndex}
                    onToggle={() => handleCardToggle(index)}
                  />
                );
              })}
          </div>
          <div className='flex flex-row items-center mt-6 space-x-2 justify-center'>
            <div>Show less</div>
            <div onClick={handleToggle}>
              <IoIosArrowUp />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetPrice;
