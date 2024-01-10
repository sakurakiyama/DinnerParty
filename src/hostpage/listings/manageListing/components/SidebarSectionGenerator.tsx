import { useContext } from 'react';
import { ManageListingContext, Subsection } from '../ManageListing';

interface SidebarSectionGeneratorProps {
  subsections: Subsection[];
  index: number;
  header: string;
  handleChangeSection: (sectionIndex: number) => void;
  handleChangeSubSection: (subSectionIndex: number) => void;
}
function SidebarSectionGenerator({
  subsections,
  index,
  header,
  handleChangeSection,
  handleChangeSubSection,
}: SidebarSectionGeneratorProps) {
  const { currentOpenSection, currentSubSection } =
    useContext(ManageListingContext)!;

  return (
    <div className='flex flex-col w-full'>
      {/* Header */}
      <div
        className={`${
          currentOpenSection === index ? 'bg-[var(--light-grey)] w-full' : ''
        } cursor-pointer p-2 rounded font-semibold`}
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
                  key={`${subsection.header}+${index}`}
                  className={`${
                    currentSubSection === index
                      ? 'border-l-2 border-l-black font-semibold'
                      : 'border-l-2 border-l-transparent'
                  } flex flex-col cursor-pointer`}
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

export default SidebarSectionGenerator;
