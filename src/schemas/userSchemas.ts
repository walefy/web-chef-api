import { z } from 'zod';

export const creationUserSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  photo: z.string().url(),
  favorites: z.array(z.string()),
});

export const addFavoritesSchema = z.object({
  favorites: z.array(z.string()),
});
