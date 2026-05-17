import { Product, StoryLine } from './types';

export const BRAND = {
  name: 'AETHER',
  tagline: 'The Future of Focus.',
  description: 'Precision engineering meets cinematic design. Aether creates modular productivity ecosystems for the modern visionary.',
};

export const PRODUCTS: Product[] = [
  {
    id: 'nova',
    name: 'AETHER NOVA',
    category: 'Mechanical Keyboard',
    headline: 'Tactile Intelligence.',
    description: 'A glass-chassis mechanical powerhouse. Featuring modular magnetic switches and zero-latency wireless connectivity.',
    price: '$499',
    image: 'https://picsum.photos/seed/aether-nova/1920/1080?grayscale&blur=2',
    accent: '#6EE7F9',
    features: ['Modular Glass Chassis', 'Ultra-Low Latency', 'Magnetic Actuation'],
  },
  {
    id: 'pulse',
    name: 'AETHER PULSE',
    category: 'Smart Ambient Lighting',
    headline: 'Light, Sculpted.',
    description: 'Synchronized workspace illumination that mimics the rhythm of your productivity. Atmospheric, precise, reactive.',
    price: '$249',
    image: 'https://picsum.photos/seed/aether-pulse/1920/1080?grayscale&blur=2',
    accent: '#7C3AED',
    features: ['Reactive Glow', 'Titanium Foundation', 'Neural Sync'],
  },
  {
    id: 'core',
    name: 'AETHER CORE',
    category: 'Productivity System',
    headline: 'The Master Hub.',
    description: 'A modular connectivity system that bridges the gap between physical tools and digital workflows.',
    price: '$799',
    image: 'https://picsum.photos/seed/aether-core/1920/1080?grayscale&blur=2',
    accent: '#FFFFFF',
    features: ['Modular expansion', 'OLED Status HUD', 'Thunderbolt 5'],
  },
];

export const STORYLINES: StoryLine[] = [
  {
    title: 'Precision Architecture',
    text: 'Every line, every curve, every shadow is intentional. We don’t just build tools; we craft environments for high-performance thinking.',
  },
  {
    title: 'Immersive Workflows',
    text: 'Aether products are designed to disappear into your workflow, leaving only the focus and the results.',
  },
  {
    title: 'Futuristic Legacy',
    text: 'Built with materials meant to last generations. Sustainable luxury that evolves with your ambition.',
  },
];
