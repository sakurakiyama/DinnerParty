import { useContext, useEffect, useState, createContext } from 'react';
import { UserContext } from '../App';
import HostNavBar from './hostnav/HostNavBar';
import NewListingWizard from './newListingSetup/NewListingWizard';
import axios from 'axios';

interface Listing {
  listingid: number;
  hostid: number;
  listingname: null | string;
  description: null | string;
  neighborhooddescription: null | string;
  gettingarounddescription: null | string;
  listingsize: null | string;
  amenities: string[] | [];
  streetaddress: null | string;
  city: null | string;
  zipcode: null | string;
  type: null | string;
  unavailable: Date[] | [];
  published: boolean;
  requireddetails: boolean;
}

interface Host {
  hostid: number;
  userid: number;
}

interface ListingModalProps {
  newListingModalOpen: boolean;
  setNewListingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface HostProps {
  host: null | Host;
  setHost: React.Dispatch<React.SetStateAction<Host | null>>;
  hostListings: Listing[];
  setHostListings: React.Dispatch<React.SetStateAction<Listing[]>>;
}

interface HostPageContextProps {
  listingModalContext: ListingModalProps;
  hostContext: HostProps;
}

export const HostPageContext = createContext<HostPageContextProps>({
  listingModalContext: {
    newListingModalOpen: false,
    setNewListingModalOpen: () => {},
  },
  hostContext: {
    host: null,
    setHost: () => {},
    hostListings: [],
    setHostListings: () => {},
  },
});

function HostPage() {
  const { user } = useContext(UserContext)!;
  const [newListingModalOpen, setNewListingModalOpen] =
    useState<boolean>(false);
  const [hostListings, setHostListings] = useState<Listing[]>([]);
  const [host, setHost] = useState<Host | null>(null);

  useEffect(() => {
    if (!user?.ishost) {
      setNewListingModalOpen(true);
    }

    if (user?.ishost) {
      setNewListingModalOpen(false);
      const getHostData = async () => {
        const { data } = await axios.get(`/api/host/getHostData`);
        setHost(data.host);
        setHostListings(data.listings);
      };
      getHostData();
    }
  }, []);

  return (
    <HostPageContext.Provider
      value={{
        listingModalContext: {
          newListingModalOpen,
          setNewListingModalOpen,
        },
        hostContext: {
          host,
          setHost,
          hostListings,
          setHostListings,
        },
      }}
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
