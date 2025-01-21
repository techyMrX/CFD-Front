import { supabase } from './supabase';
import { CriminalRecord, EmergencyContact } from '../types';
import { z } from 'zod';

// Validation schemas
const criminalRecordSchema = z.object({
  name: z.string().min(1),
  status: z.enum(['wanted', 'arrested']),
  description: z.string().optional(),
  lastSeen: z.string().optional(),
  imageUrl: z.string().url(),
});

const emergencyContactSchema = z.object({
  name: z.string().min(1),
  relationship: z.string().min(1),
  phone: z.string().min(10),
});

const emergencyAlertSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  description: z.string().optional(),
});

// API functions
export async function searchCriminalRecords(query: string) {
  const { data, error } = await supabase
    .from('criminal_records')
    .select('*')
    .ilike('name', `%${query}%`);

  if (error) throw error;
  return data as CriminalRecord[];
}

export async function addCriminalRecord(record: Omit<CriminalRecord, 'id'>) {
  const validated = criminalRecordSchema.parse(record);
  
  const { data, error } = await supabase
    .from('criminal_records')
    .insert([validated])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getEmergencyContacts() {
  const { data, error } = await supabase
    .from('emergency_contacts')
    .select('*');

  if (error) throw error;
  return data as EmergencyContact[];
}

export async function addEmergencyContact(contact: Omit<EmergencyContact, 'id'>) {
  const validated = emergencyContactSchema.parse(contact);

  const { data, error } = await supabase
    .from('emergency_contacts')
    .insert([validated])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function sendEmergencyAlert(
  latitude: number,
  longitude: number,
  description?: string
) {
  const validated = emergencyAlertSchema.parse({
    latitude,
    longitude,
    description,
  });

  const { data, error } = await supabase
    .from('emergency_alerts')
    .insert([validated])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Create this new file for API calls
const API_BASE_URL = 'http://localhost:5000/api'; // or whatever your backend URL is

export const contactsApi = {
  getContacts: async () => {
    const response = await fetch(`${API_BASE_URL}/contacts`);
    return response.json();
  },

  addContact: async (contact: Omit<Contact, 'id'>) => {
    const response = await fetch(`${API_BASE_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    return response.json();
  },

  deleteContact: async (id: number) => {
    await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: 'DELETE',
    });
  }
};