/**
 * Industries Service
 * Manages company, industrial sectors, and machine profiles served by VPE.
 */

import { storageService } from './storageService';

export interface IndustryRecord {
  id: string;
  name: string;
  description: string;
  primaryMachinery: string[];
  keyChallenges: string[];
  standardSLA: string;
  activePlantsServiced: number;
  status: 'active' | 'inactive';
}

const STORAGE_KEY_INDUSTRIES = 'vpe_industries_list';

const INITIAL_INDUSTRIES: IndustryRecord[] = [
  {
    id: 'ind-01',
    name: 'Rice Milling & Grain Processing',
    description: 'High-speed optical color sorters, bucket elevators, de-stoners, and polishing machinery.',
    primaryMachinery: ['Buhler & Sortex Optical Sorters', 'Paddy Pre-Cleaners', 'Bucket Elevators', 'Bagging Automations'],
    keyChallenges: ['Fine dust sensor blindness', 'Belt slippage', 'Pneumatic air ejector clogging'],
    standardSLA: '2 to 4 Hours Emergency Response',
    activePlantsServiced: 48,
    status: 'active',
  },
  {
    id: 'ind-02',
    name: 'Cold Storage & Refrigeration Plants',
    description: 'Ammonia refrigeration plants, semi-hermetic screw compressors, and blast freezers for seafood & perishables.',
    primaryMachinery: ['Mycom / Kirloskar Ammonia Compressors', 'Evaporative Condensers', 'Glycol Chiller Pumps', 'Ammonia Leak Detectors'],
    keyChallenges: ['Shaft seal wear', 'Oil separation fouling', 'Refrigerant vapor lock'],
    standardSLA: '1 to 2 Hours High Priority',
    activePlantsServiced: 34,
    status: 'active',
  },
  {
    id: 'ind-03',
    name: 'Biomass & Co-Generation Power',
    description: 'Biomass husk boilers, steam turbines, mechanical ash conveyors, and feedwater pumps.',
    primaryMachinery: ['Fluidized Bed Boilers', 'Multi-stage Feed Pumps', 'Electrostatic Precipitators', 'Induced Draft Fans'],
    keyChallenges: ['High thermal fatigue', 'Boiler tube soot deposition', 'Vibration imbalance on high-RPM blowers'],
    standardSLA: '4 Hours Response',
    activePlantsServiced: 16,
    status: 'active',
  },
  {
    id: 'ind-04',
    name: 'Food Processing & Edible Oil Refineries',
    description: 'Solvent extraction plants, edible oil centrifuges, continuous bleaching towers, and deodorizers.',
    primaryMachinery: ['Alfa Laval Decanters & Centrifuges', 'Plate Heat Exchangers', 'Steam Jet Vacuum Ejectors', 'Positive Displacement Pumps'],
    keyChallenges: ['Mechanical seal thermal breakdown', 'Centrifuge bowl imbalance', 'Vacuum loss'],
    standardSLA: '4 Hours Response',
    activePlantsServiced: 22,
    status: 'active',
  },
  {
    id: 'ind-05',
    name: 'Aquaculture Feeds & Agro Chemicals',
    description: 'Pellet mills, twin-screw extruders, drying ovens, and liquid flavor coating sprayers.',
    primaryMachinery: ['Twin Screw Extruders', 'High Pressure Steam Conditioners', 'Counter-Flow Coolers', 'Micro-Dosing Systems'],
    keyChallenges: ['Die plate wear', 'Extruder barrel pressure surges', 'Feed auger binding'],
    standardSLA: '4 to 6 Hours Response',
    activePlantsServiced: 28,
    status: 'active',
  },
];

export const industriesService = {
  getIndustries(): IndustryRecord[] {
    const existing = storageService.getItem<IndustryRecord[]>(STORAGE_KEY_INDUSTRIES, []);
    if (existing.length === 0) {
      storageService.setItem(STORAGE_KEY_INDUSTRIES, INITIAL_INDUSTRIES);
      return INITIAL_INDUSTRIES;
    }
    return existing;
  },

  addIndustry(industry: Omit<IndustryRecord, 'id' | 'activePlantsServiced'>): IndustryRecord {
    const industries = this.getIndustries();
    const newRecord: IndustryRecord = {
      ...industry,
      id: `ind-${String(industries.length + 1).padStart(2, '0')}`,
      activePlantsServiced: 1,
    };
    industries.push(newRecord);
    storageService.setItem(STORAGE_KEY_INDUSTRIES, industries);
    return newRecord;
  },

  updateIndustry(id: string, updates: Partial<IndustryRecord>): IndustryRecord | undefined {
    const industries = this.getIndustries();
    const index = industries.findIndex((i) => i.id === id);
    if (index === -1) return undefined;
    industries[index] = { ...industries[index], ...updates };
    storageService.setItem(STORAGE_KEY_INDUSTRIES, industries);
    return industries[index];
  },
};
