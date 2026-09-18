import { PhoneColor, StorageOption, TradeInOption, AccessoryOption } from '../types';

export const PHONE_COLORS: PhoneColor[] = [
  {
    id: 'silver',
    name: 'Titanium Silver Shadow',
    tagline: 'Futuristic luminance with mirror-polished micro bevels',
    hex: '#D2D5DC',
    threeColor: '#C8CBD4',
    textColor: 'text-slate-200',
    description: 'A brilliant aerospace silver finish engineered with dual-coat vapor deposition.',
  },
  {
    id: 'black',
    name: 'Titanium Black',
    tagline: 'Obsidian depths with velvet anti-reflective sheen',
    hex: '#232529',
    threeColor: '#1A1C20',
    textColor: 'text-slate-400',
    description: 'Deep diamond-like carbon layer delivering timeless stealth and zero glare.',
  },
  {
    id: 'gray',
    name: 'Titanium Gray',
    tagline: 'Industrial aerospace Grade 5 raw titanium texture',
    hex: '#7A7C84',
    threeColor: '#707279',
    textColor: 'text-slate-300',
    description: 'The definitive architectural expression of high-strength structural titanium.',
  },
  {
    id: 'green',
    name: 'Titanium Jade Green',
    tagline: 'Exclusive deep emerald with chromatic iridescence',
    hex: '#3E544A',
    threeColor: '#36493F',
    textColor: 'text-emerald-400',
    description: 'Exclusive Samsung.com shade inspired by natural jadeite crystalline formations.',
    isExclusive: true,
  },
  {
    id: 'gold',
    name: 'Titanium Pink Gold',
    tagline: 'Warm champagne blush with liquid luxury reflection',
    hex: '#D8B8B0',
    threeColor: '#CDB1AA',
    textColor: 'text-rose-300',
    description: 'Subtle warm champagne hue anodized into titanium alloy with satin tactile finish.',
    isExclusive: true,
  },
];

export const STORAGE_OPTIONS: StorageOption[] = [
  {
    size: '256GB',
    price: 1299,
    originalPrice: 1299,
    ram: '12GB LPDDR5X',
  },
  {
    size: '512GB',
    price: 1419,
    originalPrice: 1499,
    ram: '16GB LPDDR5X',
    popular: true,
  },
  {
    size: '1TB',
    price: 1659,
    originalPrice: 1799,
    ram: '16GB LPDDR5X',
  },
];

export const TRADE_IN_OPTIONS: TradeInOption[] = [
  { brand: 'Samsung', model: 'Galaxy S24 Ultra', credit: 800 },
  { brand: 'Samsung', model: 'Galaxy S23 Ultra', credit: 650 },
  { brand: 'Apple', model: 'iPhone 15 Pro Max', credit: 750 },
  { brand: 'Apple', model: 'iPhone 14 Pro Max', credit: 550 },
  { brand: 'Google', model: 'Pixel 9 Pro XL', credit: 600 },
];

export const ACCESSORY_OPTIONS: AccessoryOption[] = [
  {
    id: 'buds3-pro',
    name: 'Galaxy Buds3 Pro',
    subtitle: 'Hi-Fi 24bit audio with Adaptive Blade lights & Galaxy AI noise cancel',
    price: 149,
    originalPrice: 249,
    image: '🎧',
    selected: true,
  },
  {
    id: 'watch-ultra',
    name: 'Galaxy Watch Ultra',
    subtitle: 'Grade 4 Titanium cushion case, 100m water resistance & 100hr battery',
    price: 499,
    originalPrice: 649,
    image: '⌚',
    selected: false,
  },
  {
    id: 'spen-pro',
    name: 'S-Pen Pro Stylus',
    subtitle: 'Bluetooth Air Actions, dual device pairing & customizable gesture ring',
    price: 59,
    originalPrice: 99,
    image: '🖊️',
    selected: false,
  },
];

export const CAMERA_SPECS = [
  {
    id: 'wide',
    title: '200MP Wide-Angle',
    subtitle: 'f/1.7 · 24mm · Super Quad Pixel AF · OIS',
    badge: 'ProVisual Engine',
    description: 'Next-generation 200 million pixel sensor with 16-in-1 pixel binning and upgraded AI Image Signal Processor that captures staggering detail in pitch darkness.',
    explodedZ: 1.8,
  },
  {
    id: 'periscope',
    title: '50MP 5x Optical Periscope',
    subtitle: 'f/3.4 · 115mm · Dual Pixel AF · 100x Space Zoom',
    badge: 'Dual Tele System',
    description: 'Folded tetraprism optics combined with multi-frame AI Super Resolution to deliver crystal-clear zoom shots from 5x, 10x, all the way to 100x Space Zoom.',
    explodedZ: 2.2,
  },
  {
    id: 'telephoto',
    title: '50MP 3x Optical Zoom',
    subtitle: 'f/2.4 · 67mm · Dual Pixel AF · OIS',
    badge: 'Portrait Master',
    description: 'High-speed 50MP sensor tailored for natural bokeh portrait photography with true optical depth mapping and studio lighting correction.',
    explodedZ: 1.4,
  },
  {
    id: 'ultrawide',
    title: '50MP Ultra-Wide & Macro',
    subtitle: 'f/2.2 · 12mm · 120° FOV · Dual Pixel AF',
    badge: '120° Panoramic',
    description: 'Upgraded 50MP sensor with phase detection autofocus for panoramic landscape vistas and 2cm extreme macro photography with zero edge distortion.',
    explodedZ: 1.1,
  },
];
