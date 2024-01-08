import ManageListingDropdown from './components/ManageListingDropdown';
import { useContext } from 'react';
import { ManageListingContext } from './ManageListing';
import { v4 as uuid } from 'uuid';

/*
[] TODO: Adjust scroll to component to use Refs
*/

function Sidebar() {
  const {
    sections,
    currentOpenSection,
    setCurrentOpenSection,
    setCurrentSubSection,
  } = useContext(ManageListingContext)!;

  const handleChangeSection = (sectionIndex: number) => {
    currentOpenSection === sectionIndex
      ? setCurrentOpenSection(-1)
      : setCurrentOpenSection(sectionIndex);
    setCurrentSubSection(0);
  };

  const handleChangeSubSection = (subSectionIndex: number) => {
    setCurrentSubSection(subSectionIndex);
    const subSectionId =
      sections[currentOpenSection].subsections[subSectionIndex].id;
    const element = document.getElementById(subSectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className='hidden md:block max-w-[225px]'>
        {sections.map((section, index) => {
          return (
            <div key={uuid()}>
              <ManageListingDropdown
                subsections={section.subsections}
                index={index}
                header={section.sectionHeader}
                handleChangeSection={handleChangeSection}
                handleChangeSubSection={handleChangeSubSection}
              />
            </div>
          );
        })}
      </div>
      <div className='block md:hidden flex flex-row space-x-4 text-sm justify-center border-b'>
        {sections.map((section, index) => {
          return (
            <div className='p-4' key={uuid()}>
              <button
                className='hover:border-b hover:border-black'
                onClick={() => handleChangeSection(index)}
              >
                {section.sectionHeader}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
