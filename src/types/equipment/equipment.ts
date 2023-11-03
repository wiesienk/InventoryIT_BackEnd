export interface AllEquipmentResponse {
  id: string;
  type: string;
  name: string;
  userLastName: string;
  serialNumber: string;
}

export interface EquipmentDetailsResponse {
  id: string;
  type: string;
  name: string;
  serialNumber: string;
  user: {
    id: string;
    firstName?: string;
    lastName: string;
    email?: string;
  };
}

export interface UpdateEquipment {
  type: string;
  name: string;
  userID: string;
  serialNumber: string;
}

export const EquipmentTypes = [
  'Monitor',
  'Klawiatura',
  'Mysz',
  'Drukarka',
  'Notebook',
  'PC',
  'Inne',
];
