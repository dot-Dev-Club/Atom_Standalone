// Import individual club data
import { hackhiveClub, HackIcon } from './hackhive';
import { dotdevClub, DotIcon } from './dotdev';
import { unbiasClub, BiasIcon } from './unbias';
import { rndClub } from './rnd';
import { careerGuidanceClub } from './career-guidance';

// Export icons for use in components
export { DotIcon, BiasIcon, HackIcon };

// Combine all clubs into a single array
export const clubs = [
  hackhiveClub,
  dotdevClub,
  unbiasClub,
  rndClub,
  careerGuidanceClub,
];