import { useState, useRef, useEffect, useContext } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { MdModeEdit } from 'react-icons/md';
import { getGuestServiceFee, getHostServiceFee } from '../../../../utils';
import PriceBreakDownCard from '../../../../components/PriceBreakdownCard';
import SalmonButton from '../../../../components/SalmonButton';
import { NewListingWizardContext } from '../../NewListingWizard';
import { HostContext } from '../../../../App';

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
  const { currentHostListing, setCurrentHostListing } =
    useContext(HostContext)!;

  const { currentView, setCurrentView, setSlideIn, slideIn } = useContext(
    NewListingWizardContext
  )!;

  const editableRef = useRef<EditableDivRef>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [guestServiceFee, setGuestServiceFee] = useState<number>(
    getGuestServiceFee(currentHostListing?.baseprice || 100)
  );
  const [showPriceBreakdown, setShowPriceBreakdown] = useState<boolean>(false);
  const [hostServiceFee, setHostServiceFee] = useState<number>(
    getHostServiceFee(currentHostListing?.baseprice || 100)
  );
  const [allCards, setAllCards] = useState<CardsArray>([]);
  const [openCardIndex, setOpenCardIndex] = useState<number>(0);
  const [notValidated, setNotValidated] = useState<boolean>(false);

  useEffect(() => {
    if (editableRef.current) {
      editableRef.current.innerText = `${currentHostListing?.baseprice}`;
    }
    const defaultCards = [
      [
        { item: 'Base price', price: currentHostListing?.baseprice || 100 },
        { item: 'Guest service fee', price: guestServiceFee },
        {
          totalDescription: 'Guest price before taxes',
          totalPrice: guestServiceFee + (currentHostListing?.baseprice || 100),
        },
      ],
      [
        { item: 'Base price', price: currentHostListing?.baseprice || 100 },
        { item: 'Host service fee', price: hostServiceFee },
        {
          totalDescription: 'You earn',
          totalPrice: (currentHostListing?.baseprice || 100) - hostServiceFee,
        },
      ],
    ];

    setAllCards(defaultCards);
  }, []);

  if (!currentHostListing) return;

  const handleEditLogoClick = () => {
    if (editableRef.current) {
      const selection = window.getSelection();
      const range = document.createRange();
      const length = currentHostListing?.baseprice.toString().length;
      if (length && length > 0) {
        range.setStart(editableRef.current.firstChild, length);
        range.collapse(true);

        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      editableRef.current.focus();
    }
  };

  const handleView = (operation?: string) => {
    if (operation === 'Forward') {
      setSlideIn('Right');
      setCurrentView(currentView + 1);
    } else if (operation === 'Backward') {
      setSlideIn('Left');
      setCurrentView(currentView - 1);
    }
  };

  const handlePriceChange = (e: React.FormEvent<HTMLDivElement>) => {
    const value = Number((e.currentTarget as HTMLDivElement).innerText) || 0;
    setCurrentHostListing({ ...currentHostListing, baseprice: value });
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
          totalPrice: totalGuestServiceFee + value,
        },
      ],
      [
        { item: 'Base price', price: value },
        { item: 'Host service fee', price: totalHostServiceFee },
        {
          totalDescription: 'You earn',
          totalPrice: value - totalHostServiceFee,
        },
      ],
    ];

    setAllCards(cards);
    value > 0 ? setNotValidated(false) : setNotValidated(true);
  };

  const handleBlur = () => {
    if (editableRef.current) {
      if (!editableRef.current.innerText) editableRef.current.innerText = '0';
    }
    setIsEditing(false);
  };

  const handleArrowToggle = () => {
    showPriceBreakdown
      ? setShowPriceBreakdown(false)
      : setShowPriceBreakdown(true);
  };

  const handleCardToggle = (index: number) => {
    setOpenCardIndex((prevIndex) => (prevIndex === index ? prevIndex : index));
  };

  return (
    <div
      className={`flex flex-col h-full overflow-auto ${
        slideIn === 'Left' ? 'animate-slideInLeft' : 'animate-slideInRight'
      }`}
    >
      {' '}
      <div className='flex flex-col pt-10 mx-auto w-full md:w-[700px]'>
        <div className='font-black text-2xl md:text-3xl'>
          Now, set your price
        </div>
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
            <div>
              Guest price before taxes $
              {guestServiceFee + currentHostListing?.baseprice}
            </div>
            <div onClick={handleArrowToggle}>
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
                      isOpen={index === openCardIndex}
                      onToggle={() => handleCardToggle(index)}
                      index={index}
                    />
                  );
                })}
            </div>
            <div className='flex flex-row items-center mt-6 space-x-2 justify-center'>
              <div>Show less</div>
              <div onClick={handleArrowToggle}>
                <IoIosArrowUp />
              </div>
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

export default SetPrice;
