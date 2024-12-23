import axios from 'axios';

const KVK_API_URL = 'https://api.kvk.nl/api/v2';

interface KvKCompany {
  kvkNumber: string;
  tradeNames: {
    businessName: string;
    shortBusinessName: string;
  };
  addresses: {
    type: string;
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
    country: string;
  }[];
  foundationDate: string;
  hasEntryInBusinessRegister: boolean;
  hasNonMailingIndication: boolean;
  isLegalPerson: boolean;
  businessActivities: {
    sbiCode: string;
    sbiCodeDescription: string;
    isMainSbi: boolean;
  }[];
}

interface KvKError {
  status: number;
  title: string;
  detail: string;
}

export async function getCompanyByKvKNumber(kvkNumber: string): Promise<{ data?: KvKCompany; error?: KvKError }> {
  try {
    const response = await axios.get(`${KVK_API_URL}/companies/${kvkNumber}`, {
      headers: {
        'apikey': import.meta.env.VITE_KVK_API_KEY,
        'Accept': 'application/hal+json'
      }
    });

    return { data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error: {
          status: error.response?.status || 500,
          title: 'KVK API Error',
          detail: error.response?.data?.detail || 'Failed to fetch company data'
        }
      };
    }
    return {
      error: {
        status: 500,
        title: 'Unknown Error',
        detail: 'An unexpected error occurred'
      }
    };
  }
}

export async function validateKvKNumber(kvkNumber: string): Promise<boolean> {
  // KVK numbers in the Netherlands are 8 digits
  const kvkRegex = /^[0-9]{8}$/;
  if (!kvkRegex.test(kvkNumber)) {
    return false;
  }

  // Check if company exists in KVK register
  const { data, error } = await getCompanyByKvKNumber(kvkNumber);
  return !error && !!data?.hasEntryInBusinessRegister;
}