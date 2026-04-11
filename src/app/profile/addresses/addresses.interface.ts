export interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface AddressesResponse {
  status: string;
  message?: string;
  metadata?: {
    count: number;
  };
  data: Address[];
}

export interface AddAddressPayload {
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface GenericResponse {
  status: string;
  message: string;
}
