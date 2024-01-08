import { useContext } from 'react';
import { ManageListingContext } from '../ManageListing';

function ListingDashboard() {
  const { currentOpenSection, sections } = useContext(ManageListingContext)!;

  return (
    <div className='w-full'>
      {sections[currentOpenSection].sectionComponent}
    </div>
  );
}

export default ListingDashboard;
