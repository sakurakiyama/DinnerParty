interface NewListingWizardSummaryProps {
  header: string;
  description: string;
  image: string;
  step: number;
}
function NewListingWizardSummary({
  header,
  description,
  image,
  step,
}: NewListingWizardSummaryProps) {
  return (
    <div className='flex flex-col-reverse md:flex-row md:space-x-8 items-center justify-center'>
      <div className='md:w-[50%] flex flex-col pb-10 pt-10 md:pb-0 md:p-10 space-y-6'>
        <div className='font-semibold text-base md:text-lg'>Step {step}</div>
        <div className='font-semibold text-2xl md:text-3xl'>{header} </div>
        <div className='text-sm md:text-base'>{description}</div>
      </div>
      <div className='max-w-[300px] md:max-w-[400px]'>
        <img src={image}></img>
      </div>
    </div>
  );
}

export default NewListingWizardSummary;
