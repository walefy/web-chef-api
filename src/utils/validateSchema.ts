import { ZodSchema } from 'zod';

export function validateSchema<T>(schema: ZodSchema, data: T) {
  const result = schema.safeParse(data);
  if (result.success) return null;

  const message = result.error.errors.map((item) => {
    const fieldName = item.path[item.path.length - 1];

    return `[${fieldName}]: ${item.message}`;
  }).join(', ');

  return { message };
}
