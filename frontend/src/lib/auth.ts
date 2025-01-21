import { supabase } from './supabase';
import { z } from 'zod';

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function signUp(email: string, password: string) {
  const validated = signUpSchema.parse({ email, password });

  const { data, error } = await supabase.auth.signUp({
    email: validated.email,
    password: validated.password,
  });

  if (error) throw error;
  return data;
}

export async function signIn(email: string, password: string) {
  const validated = signInSchema.parse({ email, password });

  const { data, error } = await supabase.auth.signInWithPassword({
    email: validated.email,
    password: validated.password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}