import { events as defaultEvents, Event } from '@/constants/events';
import { coordinators as defaultCoordinators } from '@/constants/coordinators';
import { clubs as defaultClubs } from '@/constants/clubs';

// Default gallery images
const defaultGalleryImages = [
  '/src/assets/PHOTOS/1000040131.jpg',
  '/src/assets/PHOTOS/1000040149.jpg',
  '/src/assets/PHOTOS/1000040167.jpg',
  '/src/assets/PHOTOS/IMG_9452.jpg',
  '/src/assets/PHOTOS/IMG_20250902_094947838.jpg',
  '/src/assets/PHOTOS/IMG_20250902_095043160.jpg',
  '/src/assets/PHOTOS/IMG_20250902_095256976.jpg',
  '/src/assets/PHOTOS/IMG_20250902_095520986.jpg',
  '/src/assets/PHOTOS/IMG_20250902_095546359.jpg',
  '/src/assets/PHOTOS/IMG_20250902_103850197.jpg',
  '/src/assets/PHOTOS/IMG_20250902_104029210.jpg',
  '/src/assets/PHOTOS/IMG_20250902_104102851.jpg',
  '/src/assets/PHOTOS/IMG_20250902_104155194.jpg',
  '/src/assets/PHOTOS/IMG_20250902_104340841.jpg',
  '/src/assets/PHOTOS/IMG_20250902_104419689.jpg',
  '/src/assets/PHOTOS/IMG_20250902_104439233.jpg',
  '/src/assets/PHOTOS/IMG_20250902_104459009.jpg',
  '/src/assets/PHOTOS/IMG_20250902_104634043.jpg',
  '/src/assets/PHOTOS/IMG_20250902_104654023.jpg',
  '/src/assets/PHOTOS/IMG_20250902_104710298.jpg',
  '/src/assets/PHOTOS/IMG_20250902_104839305.jpg',
  '/src/assets/PHOTOS/IMG_20250902_104926951.jpg',
  '/src/assets/PHOTOS/IMG_20250902_105120442.jpg',
  '/src/assets/PHOTOS/IMG_20250902_105151695.jpg',
  '/src/assets/PHOTOS/IMG_20250902_105415430.jpg',
  '/src/assets/PHOTOS/IMG_20250902_153839440.jpg',
  '/src/assets/PHOTOS/IMG_20250902_154406240.jpg',
  '/src/assets/PHOTOS/IMG_20250902_155659059.jpg',
  '/src/assets/PHOTOS/SAVE_20250903_211046.jpg'
];

export const getEvents = (): Event[] => {
  if (typeof window === 'undefined') return defaultEvents;
  const stored = localStorage.getItem('cms_events');
  return stored ? JSON.parse(stored) : defaultEvents;
};

export const getUpcomingEvents = () => getEvents().filter(event => event.status === 'upcoming');
export const getPastEvents = () => getEvents().filter(event => event.status === 'past');
export const getEventCategories = () => Array.from(new Set(getEvents().map(event => event.category)));
export const getEventYears = () => Array.from(new Set(getEvents().map(event => new Date(event.date).getFullYear().toString())));
export const getEventById = (id: number) => getEvents().find(event => event.id === id);

export const getCoordinators = () => {
  if (typeof window === 'undefined') return defaultCoordinators;
  const stored = localStorage.getItem('cms_coordinators');
  return stored ? JSON.parse(stored) : defaultCoordinators;
};

export const getClubs = () => {
  if (typeof window === 'undefined') return defaultClubs;
  const stored = localStorage.getItem('cms_clubs');
  return stored ? JSON.parse(stored) : defaultClubs;
};

export const getGalleryImages = (): string[] => {
  if (typeof window === 'undefined') return defaultGalleryImages;
  const stored = localStorage.getItem('cms_gallery');
  return stored ? JSON.parse(stored) : defaultGalleryImages;
};
