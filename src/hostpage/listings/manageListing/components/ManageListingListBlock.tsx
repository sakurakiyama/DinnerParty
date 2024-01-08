interface ManageListingListBlockProps {
  contents: string[] | undefined | null;
  caption?: string;
}

function ManageListingListBlock({
  contents,
  caption,
}: ManageListingListBlockProps) {
  return (
    <div className='flex'>
      {contents && (
        <div className='flex mr-auto w-[95%]'>
          <div className='text-sm text-slate-500 w-[50%]'>
            {contents &&
              contents
                .slice(0, Math.ceil(contents.length / 2))
                .map((amenity, index) => <ul key={index}>{amenity}</ul>)}
          </div>
          <div className='text-sm text-slate-500 w-[50%]'>
            {contents &&
              contents
                .slice(Math.ceil(contents.length / 2))
                .map((amenity, index) => <ul key={index}>{amenity}</ul>)}
          </div>
        </div>
      )}
      {!contents && (
        <div className='text-sm text-slate-500 italic w-[95%]'>{caption}</div>
      )}

      <div className='text-sm underline font-black'>Edit</div>
    </div>
  );
}

export default ManageListingListBlock;
