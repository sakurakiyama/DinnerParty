import { GoChecklist } from 'react-icons/go';
import { LuCalendarHeart } from 'react-icons/lu';
import { MdOutlineModeEditOutline } from 'react-icons/md';

function ReviewSummary() {
  const nextSteps = [
    {
      image: <GoChecklist size={30} />,
      key: 'confirm',
      title: 'Confirm a few details and publish',
      description:
        "We'll let you know if you need to verify your identity or register with the local government.",
    },
    {
      image: <LuCalendarHeart size={30} />,
      key: 'calendar',
      title: 'Set up your calendar',
      description:
        'Choose which dates your listing is available. It will be visible 24 hours after you publish.',
    },
    {
      image: <MdOutlineModeEditOutline size={30} />,
      key: 'adjust',
      title: 'Adjust your settings',
      description:
        'Set listing rules, select a cancellation policy, choose how guests book, and more.',
    },
  ];

  return (
    <div className='flex flex-col pt-10 md:pt-0 w-[800px]'>
      <div className='font-black text-2xl md:text-3xl'>Review your listing</div>
      <div className='mt-4 md:text-base text-gray-500'>
        Here's what we'll show to guests. Make sure everything looks good.
      </div>
      <div className='flex flex-col md:flex-row w-full pt-8'>
        <div className='m-4 flex md:w-[50%] border p-4 justify-center items-center'>
          This is where the preview will go
        </div>
        <div className='m-4 md:w-[50%] p-4 justify-center items-center space-y-6'>
          {nextSteps &&
            nextSteps.map((current, index) => {
              return (
                <div
                  key={`${current.key}+${index}`}
                  className='flex flex-row space-x-4'
                >
                  <div>{current.image}</div>
                  <div>
                    <div className='font-black text-base pb-1'>
                      {current.title}
                    </div>
                    <div className='text-xs text-gray-500'>
                      {current.description}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ReviewSummary;
