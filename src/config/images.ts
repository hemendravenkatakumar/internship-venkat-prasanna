/**
 * Centralized Industrial Images Configuration
 * Venkata Prasanna Enterprises (VPE)
 * 
 * Sourced high-resolution industrial reference photography representing
 * heavy agro-industrial processing, rice milling, machinery maintenance,
 * compressor servicing, and industrial facilities.
 * 
 * All reference images are centralized here for easy substitution when
 * company-authorized photography is supplied.
 */

export interface IndustrialImageItem {
  id: string;
  title: string;
  url: string;
  alt: string;
  caption?: string;
  category: 'hero' | 'services' | 'industries' | 'about' | 'gallery';
}

export const INDUSTRIAL_IMAGES = {
  // Hero & General Factory Imagery
  hero: {
    wideFactory: {
      id: 'hero-wide-factory',
      title: 'Industrial Plant Operations',
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80',
      alt: 'Modern industrial processing plant with heavy automated machinery and overhead conveyors',
      caption: 'Reference: Industrial plant machinery operations',
    },
    technicianInspecting: {
      id: 'hero-technician-inspecting',
      title: 'Technician Machinery Inspection',
      url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      alt: 'Certified field service engineer conducting precision diagnostic inspection on industrial machinery',
      caption: 'Precision mechanical & electrical diagnostic inspection',
    },
    motorCompressorServicing: {
      id: 'hero-motor-compressor',
      title: 'Motor & Compressor Servicing',
      url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
      alt: 'Technician servicing high-pressure industrial compressor and electric drive motor',
      caption: 'Heavy compressor & electric drive servicing',
    },
    machineRepair: {
      id: 'hero-machine-repair',
      title: 'Machine Mechanical Repair',
      url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
      alt: 'Industrial maintenance engineer calibrating precision drive assembly during mechanical overhaul',
      caption: 'Mechanical overhaul & bearing alignment',
    },
    workshopFactory: {
      id: 'hero-workshop-factory',
      title: 'Industrial Workshop Facility',
      url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
      alt: 'Heavy engineering workshop equipped with lathes, fabrication tools, and component testing stands',
      caption: 'VPE engineering workshop & component testing support',
    },
  },

  // Services Image Cards (8 Core Required Services)
  services: {
    inspection: {
      id: 'srv-inspection',
      title: 'Industrial Machine Inspection',
      url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      alt: 'Technician inspecting industrial plant machinery',
      description: 'Systematic condition evaluation and ultrasonic/vibration analysis to detect wear before breakdown.',
    },
    troubleshooting: {
      id: 'srv-troubleshooting',
      title: 'Troubleshooting & Fault Diagnostics',
      url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
      alt: 'Engineer diagnosing industrial control panel and motor drive fault',
      description: 'Rapid diagnostic troubleshooting for electrical trips, PLC automation lockups, and mechanical jams.',
    },
    servicing: {
      id: 'srv-servicing',
      title: 'Machine Servicing',
      url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
      alt: 'Industrial equipment being serviced by maintenance technician',
      description: 'Routine and corrective servicing of gearboxes, drive belts, pneumatic valves, and optical sorters.',
    },
    preventiveMaintenance: {
      id: 'srv-preventive',
      title: 'Preventive Maintenance',
      url: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
      alt: 'Technician maintaining industrial equipment with scheduled calibration',
      description: 'Scheduled multi-point maintenance regimens preventing catastrophic plant downtime.',
    },
    machineRepair: {
      id: 'srv-repair',
      title: 'Machine Repair',
      url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
      alt: 'Mechanical repair work being executed on industrial drive shafts',
      description: 'On-site precision mechanical overhaul, shaft alignment, bearing replacement, and dynamic balancing.',
    },
    compressorServices: {
      id: 'srv-compressor',
      title: 'Compressor Services',
      url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
      alt: 'Industrial air compressor equipment and screw chiller units',
      description: 'Overhaul and pressure tuning of rotary screw, reciprocating, and high-pressure plant air compressors.',
    },
    gasSystemServices: {
      id: 'srv-gas-system',
      title: 'Gas System Services',
      url: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80',
      alt: 'Industrial gas equipment, pipeline manifolds, and pressure regulators',
      description: 'Industrial refrigeration gas charging, leak detection, and pressure safety valve calibration.',
      isOffered: true,
    },
    installationCommissioning: {
      id: 'srv-installation',
      title: 'Installation & Commissioning',
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      alt: 'Industrial equipment installation and turnkey commissioning on plant floor',
      description: 'Turnkey erection, leveling, electrical interfacing, and test-run handover for industrial lines.',
      isOffered: true,
    },
  },

  // Industries & Companies Served (7 Required Categories)
  industries: {
    riceMills: {
      id: 'ind-rice-mills',
      name: 'Rice Mills',
      url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      alt: 'Rice mill interior showing modern grain elevators, destoners, and optical color sorters',
      servicesProvided: 'Optical sorter calibration, bucket elevator repair, de-stoner balancing, air ejector tuning',
      vendorStatus: 'Registered' as const,
      verifiedExperience: 'Extensive service experience across Godavari delta agro clusters.',
    },
    textile: {
      id: 'ind-textile',
      name: 'Textile Industries',
      url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
      alt: 'Textile production machines and weaving equipment in operation',
      servicesProvided: 'Loom motor rewinding, spinning frame alignment, pneumatic thread tensioners, drive inverter diagnostics',
      vendorStatus: 'Registered' as const,
      verifiedExperience: 'Multi-year breakdown support for regional spinning and weaving plants.',
    },
    cashew: {
      id: 'ind-cashew',
      name: 'Cashew Industries',
      url: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80',
      alt: 'Cashew processing machinery and industrial steam roasting units',
      servicesProvided: 'Automatic shell cutting machine maintenance, steam drying chamber calibration, grading sieve repair',
      vendorStatus: 'Registered' as const,
      verifiedExperience: 'Specialized maintenance for high-speed cashew processing machinery.',
    },
    paperMills: {
      id: 'ind-paper-mills',
      name: 'Paper Mills',
      url: 'https://images.unsplash.com/photo-1590725140246-20acceedcad8?auto=format&fit=crop&w=800&q=80',
      alt: 'Industrial paper manufacturing machinery and high-tonnage pulp rollers',
      servicesProvided: 'Heavy roller bearing overhaul, steam condensate pumps, calendar stack hydraulic servicing',
      vendorStatus: 'Pending' as const,
      verifiedExperience: 'Experienced with heavy pulp machinery and high-pressure steam utility circuits.',
    },
    steelPlants: {
      id: 'ind-steel-plants',
      name: 'Steel Plants',
      url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      alt: 'Steel production and metal processing equipment with heavy rolling mills',
      servicesProvided: 'Rolling mill gear drives, cooling water circulation pumps, overhead crane electrical inspections',
      vendorStatus: 'Registered' as const,
      verifiedExperience: 'Heavy mechanical support for metal fabrication and rolling operations.',
    },
    dairy: {
      id: 'ind-dairy',
      name: 'Dairy Industries',
      url: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80',
      alt: 'Milk processing equipment, homogenizers, and stainless steel sanitary storage tanks',
      servicesProvided: 'Ammonia blast chilling maintenance, homogenizer seal overhaul, sanitary centrifugal pumps',
      vendorStatus: 'Registered' as const,
      verifiedExperience: 'Sanitary standard maintenance for cold chain and milk processing plants.',
    },
    other: {
      id: 'ind-other',
      name: 'Other Industrial Plants',
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      alt: 'General agro-chemical and manufacturing machinery',
      servicesProvided: 'Biomass boiler pumps, feed pellet extruders, pneumatic conveying, bulk packaging lines',
      vendorStatus: 'Not Registered' as const,
      verifiedExperience: 'Broad-spectrum industrial maintenance on industrial utility machinery.',
    },
  },

  // About Us Page Reference Imagery & Gallery
  about: {
    leadEngineer: {
      id: 'about-engineer',
      title: 'Lead Service Specialist',
      url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
      alt: 'Professional certified industrial field engineer in safety helmet and reflective uniform',
      caption: 'Reference: Certified Lead Field Engineer / Technical Coordinator',
    },
    teamInAction: {
      id: 'about-team-action',
      title: 'Field Team in Operation',
      url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
      alt: 'Industrial engineering crew conducting emergency on-site breakdown service',
      caption: 'On-site technical service dispatch team',
    },
    gallery: [
      {
        id: 'gal-01',
        title: 'Optical Sorter Alignment & Calibration',
        url: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
        alt: 'High-speed optical sorting camera calibration',
        sector: 'Rice Milling & Grain Processing',
      },
      {
        id: 'gal-02',
        title: 'Industrial Compressor Valve & Ring Servicing',
        url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
        alt: 'Industrial compressor valve overhaul',
        sector: 'Refrigeration & Compressed Air',
      },
      {
        id: 'gal-03',
        title: 'Electrical Control Switchgear & Inverter Testing',
        url: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80',
        alt: 'Control panel wiring and PLC diagnostic',
        sector: 'Power & Electrical Automation',
      },
      {
        id: 'gal-04',
        title: 'Boiler Feed Pump & Steam Turbine Balancing',
        url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
        alt: 'Multi-stage boiler feed pump overhaul',
        sector: 'Biomass & Co-Gen Power',
      },
      {
        id: 'gal-05',
        title: 'Sanitary Centrifuge & Heat Exchanger Servicing',
        url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
        alt: 'Sanitary disc-stack centrifuge maintenance',
        sector: 'Food Processing & Edible Oil',
      },
      {
        id: 'gal-06',
        title: 'Precision Shaft Laser Alignment',
        url: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=800&q=80',
        alt: 'Laser alignment kit mounted on industrial motor and pump shaft',
        sector: 'Precision Mechanical Services',
      },
    ],
  },
};

/**
 * Inline SVG placeholder data URI for graceful image fallbacks
 */
export const INDUSTRIAL_FALLBACK_SVG =
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22600%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20400%22%3E%3Crect%20fill%3D%22%231e293b%22%20width%3D%22600%22%20height%3D%22400%22%2F%3E%3Cpath%20d%3D%22M250%2C180%20L350%2C180%20L370%2C220%20L230%2C220%20Z%22%20fill%3D%22%23f59e0b%22%20opacity%3D%220.8%22%2F%3E%3Ctext%20fill%3D%22%2394a3b8%22%20font-family%3D%22sans-serif%22%20font-size%3D%2214%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2265%25%22%20text-anchor%3D%22middle%22%3EVPE%20Industrial%20Reference%20Image%3C%2Ftext%3E%3C%2Fsvg%3E';
