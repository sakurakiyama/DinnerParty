import SidebarSectionGenerator from './components/SidebarSectionGenerator';
import { useContext } from 'react';
import { ManageListingContext } from './ManageListing';

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
            <div key={`${section.sectionHeader}+${index}`}>
              <SidebarSectionGenerator
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
      <div className='block md:hidden flex flex-row text-sm justify-center border-b font-medium'>
        {sections.map((section, index) => {
          return (
            <div
              className={`p-2 ${
                currentOpenSection === index
                  ? 'border-b-2 border-b-black'
                  : 'border-b-2 border-b-transparent'
              }`}
              key={`${section.sectionHeader}+${index}`}
            >
              <button
                className='hover:bg-[var(--light-grey)] hover:bg-[var(--light-grey)] p-2 rounded-md'
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
