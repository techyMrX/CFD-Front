export type User = {
  id: string;
  name: string;
  email: string;
  role: 'public' | 'police';
};

export type EmergencyContact = {
  id: string;
  name: string;
  relationship: string;
  phone: string;
};

export type CriminalRecord = {
  id: string;
  name: string;
  status: 'wanted' | 'arrested';
  description: string;
  lastSeen: string;
  imageUrl: string;
};