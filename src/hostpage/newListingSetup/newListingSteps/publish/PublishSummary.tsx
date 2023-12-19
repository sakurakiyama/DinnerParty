import Homes from '../../../../assets/HomeSend.png';
import NewListingWizardSummary from '../../../../components/NewListingWizardSummary';
function SpaceSummary() {
  return (
    <div>
      <NewListingWizardSummary
        header={'Finish up and publish'}
        description={
          "Finally, you'll choose booking settings, set up pricing, and publish your listing."
        }
        image={Homes}
        step={3}
      />
    </div>
  );
}

export default SpaceSummary;
