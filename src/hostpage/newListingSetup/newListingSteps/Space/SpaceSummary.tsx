import Homes from '../../../../assets/Homes.png';
import NewListingWizardSummary from '../../../../components/NewListingWizardSummary';
function SpaceSummary() {
  return (
    <div>
      <NewListingWizardSummary
        header={'Tell us about your place'}
        description={
          "In this step, we'll ask you which type of property you have and if guests will book the entire place or just a specific room. Then let us know the location and how many guests can join."
        }
        image={Homes}
        step={1}
      />
    </div>
  );
}

export default SpaceSummary;
