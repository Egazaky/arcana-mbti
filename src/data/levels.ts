import type { LevelId } from '../types';

export const levels: { id: LevelId; roman: string; title: string; subtitle: string; seal: string; description: string }[] = [
  { id: 1, roman: 'I', title: 'Gerbang Kesadaran', subtitle: 'AWAKENING', seal: 'door', description: 'Langkah pertama untuk mengenali pilihan kecil yang membentuk keseharianmu.' },
  { id: 2, roman: 'II', title: 'Labirin Pilihan', subtitle: 'LABYRINTH', seal: 'sparkles', description: 'Telusuri berbagai kemungkinan dan temukan cara alami kamu menentukan arah.' },
  { id: 3, roman: 'III', title: 'Cermin Jiwa', subtitle: 'THE MIRROR', seal: 'shield', description: 'Lihat lebih dekat kebiasaan dan respons yang mencerminkan dirimu.' },
  { id: 4, roman: 'IV', title: 'Ruang Arketipe', subtitle: 'ARCHETYPE REIGN', seal: 'crown', description: 'Lengkapi perjalanan refleksimu. Kartu kepribadianmu menanti di balik gerbang.' },
];
