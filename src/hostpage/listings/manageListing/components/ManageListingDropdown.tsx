import { useContext } from 'react';
import { ManageListingContext, Subsection } from '../ManageListing';
import { v4 as uuid } from 'uuid';

interface ManageListingDropdownProps {
  subsections: Subsection[];
  index: number;
  header: string;
  handleChangeSection: (sectionIndex: number) => void;
  handleChangeSubSection: (subSectionIndex: number) => void;
}
function ManageListingDropdown({
  subsections,
  index,
  header,
  handleChangeSection,
  handleChangeSubSection,
}: ManageListingDropdownProps) {
  const { currentOpenSection, currentSubSection } =
    useContext(ManageListingContext)!;

  return (
    <div className='flex flex-col w-full'>
      {/* Header */}
      <div
        className={`${
          currentOpenSection === index ? 'bg-[var(--light-grey)] w-full' : ''
        } cursor-pointer p-2 rounded font-black`}
        onClick={() => handleChangeSection(index)}
      >
        {header}
      </div>
      {/* Subsections */}
      {currentOpenSection === index && (
        <div className='pt-2 pb-2 pl-4'>
          <div className='space-y-2 border-l'>
            {subsections.map((subsection, index) => {
              return (
                <ul
                  key={uuid()}
                  className={`${
                    currentSubSection === index
                      ? 'border-l-2 border-l-black'
                      : 'border-l-2 border-l-transparent'
                  } flex flex-col cursor-pointer `}
                  onClick={() => handleChangeSubSection(index)}
                >
                  <span className='pl-4'>{subsection.header}</span>
                </ul>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageListingDropdown;
