import ListingDetails from './ListingDetails';
import PoliciesAndRules from './PoliciesAndRules';
import InfoForGuests from './InfoForGuests';
function Sidebar() {
  return (
    <div className='space-y-4'>
      <ListingDetails />
      <PoliciesAndRules />
      <InfoForGuests />
    </div>
  );
}

export default Sidebar;
