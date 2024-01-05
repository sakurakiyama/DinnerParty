interface ManageListingInfoBlockProps {
  display: string;
  contents: string | undefined | null;
}
function ManageListingInfoBlock({
  display,
  contents,
}: ManageListingInfoBlockProps) {
  return (
    <div>
      <div className='flex flex-row'>
        <div className='mr-auto'>{display}</div>
        <div className='text-sm underline font-black'>Edit</div>
      </div>
      <div className='text-sm text-slate-600'>{contents}</div>
    </div>
  );
}

export default ManageListingInfoBlock;
