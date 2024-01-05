import { useContext } from 'react';
import { ManageListingContext, Subsection } from '../ManageListing';

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
  const { currentOpenSection } = useContext(ManageListingContext)!;

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
        <div className={`space-y-2 pt-2 pb-2`}>
          {subsections.map((subsection, index) => {
            return (
              <ul
                className='flex flex-col pl-6 cursor-pointer'
                onClick={() => handleChangeSubSection(index)}
              >
                <span>{subsection.header}</span>
              </ul>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ManageListingDropdown;
