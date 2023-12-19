import HomesExtra from '../../../../assets/HomesExtra.png';
import NewListingWizardSummary from '../../../../components/NewListingWizardSummary';
function SpaceSummary() {
  return (
    <div>
      <NewListingWizardSummary
        header={'Make your place stand out'}
        description={
          'In this step, you’ll add some of the amenities your place offers, plus 5 or more photos. Then, you’ll create a title and description.'
        }
        image={HomesExtra}
        step={2}
      />
    </div>
  );
}

export default SpaceSummary;
