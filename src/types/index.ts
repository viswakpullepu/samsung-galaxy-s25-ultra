export interface PhoneColor {
  id: 'silver' | 'gray' | 'black' | 'green' | 'gold';
  name: string;
  tagline: string;
  hex: string;
  threeColor: string;
  textColor: string;
  description: string;
  isExclusive?: boolean;
}

export interface StorageOption {
  size: '256GB' | '512GB' | '1TB';
  price: number;
  originalPrice: number;
  ram: string;
  popular?: boolean;
}

export interface TradeInOption {
  brand: string;
  model: string;
  credit: number;
}

export interface AccessoryOption {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  image: string;
  selected: boolean;
}

export interface CartState {
  color: PhoneColor;
  storage: StorageOption;
  tradeIn: TradeInOption | null;
  accessories: AccessoryOption[];
  samsungCare: boolean;
}

export type ViewMode = 'hero' | 'front' | 'back' | 'exploded' | 'spen' | 'xray';
