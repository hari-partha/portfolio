import type { Metadata } from 'next';
import { CambrianReader } from './CambrianReader';

export const metadata: Metadata = {
  title: 'The Evolutionary Biologist’s Guide to AI · Hari Parthasarathy',
  description:
    'A multi-part Brainfood Bytesize series drawing a formal parallel between the biological Cambrian explosion and the current AI landscape.',
};

export default function EvolutionaryBiologistsGuidePage() {
  return <CambrianReader />;
}
