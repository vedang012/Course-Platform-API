const randomSuffix = () => {
  const timestampPart = Date.now().toString(36);
  const randomPart = Math.random().toString(36).slice(2, 8);
  return `${timestampPart}-${randomPart}`;
};

export const generateUniqueSlug = (value: string): string => {
  const baseSlug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const safeBase = baseSlug || 'item';
  return `${safeBase}-${randomSuffix()}`;
};
