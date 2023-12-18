import { useContext, useEffect, useState, createContext } from 'react';
import { UserContext } from '../App';
import HostNavBar from './hostnav/HostNavBar';
import NewListingWizard from './newListingSetup/NewListingWizard';

interface NewListingSetupProps {
  newListingModalOpen: boolean;
  setNewListingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HostPageContext = createContext<NewListingSetupProps>({
  newListingModalOpen: false,
  setNewListingModalOpen: () => {},
});

function HostPage() {
  const { user } = useContext(UserContext)!;
  const [newListingModalOpen, setNewListingModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    if (!user?.ishost) {
      setNewListingModalOpen(true);
    }

    if (user?.ishost) {
      setNewListingModalOpen(false);
    }
  }, []);
  return (
    <HostPageContext.Provider
      value={{ newListingModalOpen, setNewListingModalOpen }}
    >
      <div>
        {newListingModalOpen && (
          <div className='top-0 bottom-0 left-0 right-0 fixed flex bg-white h-screen'>
            <NewListingWizard />
          </div>
        )}
        <div>
          <HostNavBar />
        </div>
      </div>
    </HostPageContext.Provider>
  );
}

export default HostPage;
