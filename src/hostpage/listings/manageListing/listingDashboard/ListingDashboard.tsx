import { useContext } from 'react';
import { HostContext } from '../../../../App';
import { ManageListingContext } from '../ManageListing';
import ListingDetails from './listingDetails/ListingDetails';

function ListingDashboard() {
  const { currentHostListing } = useContext(HostContext)!;
  const { currentOpenSection, currentSubSection, sections } =
    useContext(ManageListingContext)!;

  return (
    <div>
      <div>{JSON.stringify(sections[currentOpenSection].sectionHeader)}</div>
      <br />
      <div>
        {JSON.stringify(
          sections[currentOpenSection].subsections[currentSubSection].header
        )}
      </div>
      <ListingDetails />
    </div>
  );
}

export default ListingDashboard;
