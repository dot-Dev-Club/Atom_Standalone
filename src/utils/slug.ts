/**
 * Convert a string to URL-safe slug
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    // Replace spaces and underscores with hyphens
    .replace(/[\s_-]+/g, '-')
    // Remove special characters except hyphens and alphanumeric
    .replace(/[^a-z0-9-]/g, '')
    // Remove multiple consecutive hyphens
    .replace(/-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '');
};

/**
 * Find event by slug from the events list
 */
export const findEventBySlug = (slug: string, events: any[]) => {
  return events.find(event => generateSlug(event.title) === slug);
};
