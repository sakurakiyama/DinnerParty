interface NewListingWizardSummaryProps {
  header: string;
  description: string;
  image: string;
}
function NewListingWizardSummary({
  header,
  description,
  image,
}: NewListingWizardSummaryProps) {
  return (
    <div className='flex flex-col-reverse md:flex-row md:space-x-8 items-center justify-center'>
      <div className='md:w-[50%] flex flex-col pb-10 pt-10 md:pb-0 md:p-10 space-y-6'>
        <div className='text-black text-base'>Step 1</div>
        <div className='font-black text-2xl md:text-3xl'>{header} </div>
        <div>{description}</div>
      </div>
      <div className='max-w-[300px] md:max-w-[400px]'>
        <img src={image}></img>
      </div>
    </div>
  );
}

export default NewListingWizardSummary;
