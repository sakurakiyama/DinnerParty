import YesOrNoButtons from '../../../../components/YesOrNoButtons';

interface ManageListingYesNoBlockProps {
  header: string;
  caption?: string;
  isTrue: boolean | null | undefined;
  onYesClick: () => void;
  onNoClick: () => void;
}

function ManageListingYesNoBlock({
  header,
  caption,
  isTrue,
  onYesClick,
  onNoClick,
}: ManageListingYesNoBlockProps) {
  return (
    <div className='flex flex-row items-center pb-6'>
      <div className='mr-auto flex-col items-center'>
        <div>{header}</div>
        {caption && <div className='text-sm text-slate-500'>{caption}</div>}
      </div>
      <YesOrNoButtons
        onYesClick={onYesClick}
        onNoClick={onNoClick}
        isTrue={isTrue}
      />
    </div>
  );
}

export default ManageListingYesNoBlock;
