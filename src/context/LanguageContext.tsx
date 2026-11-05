import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'te' | 'hi';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const STORAGE_KEY_LANGUAGE = 'vpe_selected_language';

/**
 * Multi-language dictionary supporting English, Telugu (తెలుగు), and Hindi (हिन्दी)
 * Covers Navigation, Auth, Customer Service Requests, Voice Recording workflow,
 * Owner & Admin Dashboard modules, Engineer Service Records, 26 Companies,
 * and All Website Sections.
 */
export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Company Information
    'company.name': 'Venkata Prasanna Enterprises',
    'company.founder': 'Y Srinivas',
    'company.founder_title': 'Founder & Lead Service Engineer',
    'company.email': 'venkataprasannaenterprises@gmail.com',
    'company.phone': '9866227780',
    'company.phone_display': '+91 9866227780',
    'company.gstin': '37ADYPY2158A1Z1',
    'company.location': 'Andhra Pradesh, India',
    'company.support_availability': '24/7 Breakdown Support & Maintenance',

    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.industries': 'My Services',
    'nav.vendor_experience': 'Vendor Registration',
    'nav.service_charges': 'Service Charges',
    'nav.reviews': 'Reviews',
    'nav.contact': 'Contact',
    'nav.login': 'Portal Login',
    'nav.register': 'Register Account',
    'nav.dashboard': 'Dashboard',
    'nav.logout': 'Sign Out',
    'nav.emergency_phone': 'Emergency Hotline: +91 9866227780',
    'nav.portal_title': 'VPE Industrial Service Management',

    // Language Selector
    'lang.select': 'Language',
    'lang.en': 'English',
    'lang.te': 'తెలుగు (Telugu)',
    'lang.hi': 'हिन्दी (Hindi)',

    // Home Page Hero & Sections
    'home.hero_badge': 'Venkata Prasanna Enterprises',
    'home.hero_tag': 'Industrial Service & Breakdown Support',
    'home.hero_title': 'Reliable Industrial Service & Maintenance Solutions',
    'home.hero_subtitle':
      'Comprehensive engineering care for rice mills, textile plants, cashew processing facilities, ammonia refrigeration, and heavy industrial machinery. Field inspection, precision overhaul, compressor tuning, and rapid technical dispatch.',
    'home.cta_request': 'Request a Service',
    'home.cta_explore': 'Explore Our Services',
    'home.call_desk': 'Call Operating Desk',

    // Home Page About Section
    'home.about_badge': 'About VPE',
    'home.about_title': 'Industrial Equipment Servicing for Your Facility',
    'home.about_subtitle':
      'Venkata Prasanna Enterprises is an industrial service company specializing in equipment maintenance, repair, and troubleshooting for manufacturing and processing plants.',
    'home.about_p1':
      'We provide skilled engineering services directly at your plant location. Our team works with a range of industrial equipment across multiple sectors — from rice processing machinery and textile looms to cashew plant equipment and general manufacturing systems.',
    'home.about_p2':
      'Every service engagement follows a structured process: initial assessment, diagnosis, service execution, testing, and proper documentation — ensuring transparency and accountability at each step.',
    'home.about_learn_more': 'Learn More About VPE',
    'home.what_we_do': 'What We Do',
    'home.view_all_services': 'View All Services',

    // Founder Section
    'home.founder_badge': 'Our Leadership',
    'home.founder_title': 'Meet the Founder',
    'home.founder_subtitle':
      'The driving force behind Venkata Prasanna Enterprises — hands-on expertise in industrial equipment servicing.',
    'home.founder_pro_bg': 'Professional Background',
    'home.founder_bg_text':
      'Y Srinivas is the founder of Venkata Prasanna Enterprises, bringing practical, hands-on expertise in servicing industrial equipment across manufacturing and processing plants. His work spans mechanical repairs, electrical troubleshooting, equipment installation, and preventive maintenance programs.',
    'home.founder_expertise': 'Areas of Expertise',
    'home.get_in_touch': 'Get in Touch',

    // Services Section
    'home.services_badge': 'What We Offer',
    'home.services_title': 'Core Industrial Services',
    'home.services_subtitle':
      'Specialized engineering support tailored to heavy processing facilities, manufacturing lines, and agro-industries.',

    // My Services / 26 Companies Section
    'home.my_services_badge': 'Client Service Experience',
    'home.my_services_title': 'My Services — Industries & Companies Served',
    'home.my_services_subtitle':
      'Venkata Prasanna Enterprises provides industrial service support across a range of industries, including rice mills, textiles, food processing, paper, dairy, steel, energy, cashew processing and industrial equipment.',
    'companies.title': 'My Services — 26 Verified Companies & Industries',
    'companies.subtitle':
      'Actual verified industrial client experience and confirmed vendor registrations from our official records.',
    'companies.all_filter': 'All Industries (26)',
    'companies.filter_rice': 'Rice Mills',
    'companies.filter_food': 'Food & Edible Oils',
    'companies.filter_paper': 'Paper Industry',
    'companies.filter_oil_energy': 'Oil & Energy',
    'companies.filter_steel': 'Steel Plants',
    'companies.filter_dairy': 'Dairy',
    'companies.filter_equipment': 'Equipment & Compressors',
    'companies.filter_textiles': 'Textiles',
    'companies.filter_cashew': 'Cashew Processing',
    'companies.filter_other': 'Other Industries',
    'companies.search_placeholder': 'Search by company name or sector...',
    'companies.badge_registered': 'Vendor Registration Completed',
    'companies.experience': 'Experience',
    'companies.sector': 'Sector',
    'companies.view_all': 'View All 26 Companies',
    'companies.view_details': 'View Details',

    // Strengths
    'home.strengths_badge': 'Why Choose VPE',
    'home.strengths_title': 'What Sets Our Service Apart',
    'home.strengths_subtitle':
      'Operational qualities that define how we work with our industrial clients.',

    // Service Request CTA
    'home.cta_badge': 'Ready to Get Started?',
    'home.cta_box_title': 'Need Industrial Equipment Servicing?',
    'home.cta_box_desc':
      'Whether your plant needs emergency troubleshooting, scheduled maintenance, or a comprehensive equipment inspection — submit a service request and our engineering team will coordinate with you.',

    // Footer
    'footer.certified': 'Certified Standards',
    'footer.certified_desc':
      'Compliant industrial safety & OEM calibrated equipment procedures.',
    'footer.rapid': 'Rapid Breakdown Response',
    'footer.rapid_desc':
      'High-priority on-site deployment for manufacturing line shutdowns.',
    'footer.support': 'End-to-End Plant Support',
    'footer.support_desc':
      'Preventive maintenance, retrofitting, spare parts, and service management.',
    'footer.about_desc':
      'Industrial Service Management system providing mission-critical maintenance, mechanical overhauls, electrical engineering, and precision equipment servicing for heavy manufacturing facilities.',
    'footer.company_services': 'Company & Services',
    'footer.application_portals': 'Application Portals',
    'footer.emergency_dispatch': 'Emergency & Dispatch',
    'footer.rights': 'All rights reserved.',
    'footer.platform': 'Industrial Service Management Platform',
    'footer.gstin_note': 'GSTIN: 37ADYPY2158A1Z1 • Founder: Y Srinivas',

    // About Us Page
    'about.page_title': 'About Venkata Prasanna Enterprises',
    'about.page_subtitle':
      'Industrial service reliability and engineering excellence for manufacturing, processing, and agro-industrial facilities.',
    'about.mission_title': 'Our Mission & Approach',
    'about.mission_desc':
      'We provide hands-on, high-standard maintenance and engineering support to ensure industrial plant machinery operates at maximum capacity with zero preventable downtime.',
    'about.compliance_title': 'Enterprise Registration & Tax Compliance',
    'about.compliance_desc':
      'Statutory compliance including GST registration (37ADYPY2158A1Z1), verified safety procedures, and formal engineering dispatch.',

    // Vendor Registration Page
    'vendor.page_title': 'Vendor Registration & Compliance Records',
    'vendor.page_subtitle':
      'Statutory certifications, GST registration, verified industry service credentials, and formal vendor documentation.',
    'vendor.gst_title': 'Goods & Services Tax (GST) Registration',
    'vendor.gst_num': 'GSTIN: 37ADYPY2158A1Z1',
    'vendor.gst_status': 'Verified Statutory Record',
    'vendor.gst_desc':
      'Registered under GST for industrial machinery servicing, breakdown maintenance, and engineering services.',
    'vendor.experience_title': 'Confirmed Vendor Registrations',
    'vendor.experience_subtitle':
      'Companies where Venkata Prasanna Enterprises vendor registration is confirmed and completed.',

    // Contact Page
    'contact.page_title': 'Contact & Service Dispatch',
    'contact.page_subtitle':
      'Reach Venkata Prasanna Enterprises for industrial machinery maintenance, breakdown support, and field service visits.',
    'contact.phone_title': 'Emergency Hotline & Dispatch',
    'contact.email_title': 'Official Business Email',
    'contact.gstin_title': 'GSTIN Identification',
    'contact.location_title': 'Operating Headquarters',
    'contact.location_val': 'Andhra Pradesh, India',
    'contact.form_title': 'Submit a Service Inquiry',
    'contact.name_label': 'Your Name',
    'contact.email_label': 'Your Email',
    'contact.phone_label': 'Phone Number',
    'contact.company_label': 'Company / Plant Name',
    'contact.message_label': 'Machinery Requirements / Inquiry',
    'contact.submit_btn': 'Send Service Inquiry',
    'contact.send_success': 'Your inquiry has been submitted successfully!',

    // Customer Service Request Form
    'request.title': 'Submit Industrial Service Request',
    'request.subtitle':
      'Register machine breakdowns, emergency repairs, or scheduled plant maintenance.',
    'request.company_name': 'Company / Industry Name',
    'request.contact_person': 'Contact Person Name',
    'request.mobile': 'Mobile Number',
    'request.location': 'Operating Location / Plant Address',
    'request.industry_type': 'Industry Type',
    'request.machine_issue': 'Machine Issue Description',
    'request.machine_issue_placeholder':
      'Describe the machine malfunction, observed symptoms, error codes, and operational impact...',
    'request.problem_start_date': 'Problem Start Date',
    'request.category': 'Service Category',
    'request.attachments': 'Photo / Video / Document Attachments',
    'request.attachments_help':
      'Upload photos, videos of the machine issue, or equipment spec documents (JPG, PNG, MP4, PDF).',
    'request.submit_btn': 'Submit Service Request',
    'request.submitting': 'Registering Request...',
    'request.request_id': 'Service Request ID',
    'request.success_title': 'Service Request Successfully Submitted!',
    'request.success_desc':
      'Your request has been logged. Our dispatch team has been notified.',
    'request.view_dashboard': 'View in Customer Dashboard',

    // Voice Recording (Strict 6-step workflow)
    'voice.section_title': 'Voice Recording of Machine Issue',
    'voice.section_desc':
      'Record the sounds of the faulty machine or describe the problem by speaking.',
    'voice.step1_record': 'Click to Record Issue',
    'voice.step2_recording': 'Recording in Progress...',
    'voice.step2_speak':
      'Please explain the machine issue or hold phone near the machine.',
    'voice.step2_stop': 'Stop Recording',
    'voice.step3_playback': 'Listen to Recording',
    'voice.step3_playing': 'Playing Audio...',
    'voice.step4_delete': 'Delete Recording',
    'voice.step4_rerecord': 'Re-record Audio',
    'voice.step5_ready': 'Audio recording attached and ready to submit.',
    'voice.no_speech_to_text':
      'Audio is stored directly without text conversion.',

    // Customer Dashboard
    'customer.dashboard_title': 'Customer Service Dashboard',
    'customer.total_requests': 'Total Requests',
    'customer.pending': 'Pending / Under Review',
    'customer.scheduled': 'Scheduled Visits',
    'customer.completed': 'Completed Services',
    'customer.active_requests': 'Active Service Requests',
    'customer.service_history': 'Previous Service History',
    'customer.view_report': 'View Engineer Service Record',
    'customer.scheduled_for': 'Scheduled Visit Date',
    'customer.engineer_assigned': 'Assigned Engineer',

    // Owner & Admin Dashboard Modules
    'admin.portal_name': 'Owner & Admin Command Console',
    'admin.unified_role': 'Single Unified Account: Owner & Admin Console',
    'admin.tab_dashboard': 'Dashboard',
    'admin.tab_customers': 'Customers',
    'admin.tab_requests': 'Service Requests',
    'admin.tab_scheduling': 'Scheduling',
    'admin.tab_records': 'Service Records',
    'admin.tab_services': 'Services',
    'admin.tab_industries': 'Industries',
    'admin.tab_vendors': 'Vendor Registrations',
    'admin.tab_reviews': 'Reviews',
    'admin.tab_notifications': 'Notifications',
    'admin.tab_reports': 'Reports',
    'admin.tab_settings': 'Settings',

    // Engineer Service Record
    'record.title': 'Engineer Service Record',
    'record.subtitle':
      'Formal on-site inspection, repair, parts, and completion documentation.',
    'record.request_id': 'Service Request ID',
    'record.company': 'Customer / Industry Name',
    'record.machine_issue': 'Machine Issue',
    'record.visit_date': 'Visit Date',
    'record.inspection_findings': 'Inspection Findings',
    'record.work_performed': 'Work Performed',
    'record.tools_materials': 'Tools & Materials Used',
    'record.gas_compressor': 'Additional Gas / Compressor Requirements',
    'record.engineer_remarks': 'Engineer Remarks',
    'record.completion_status': 'Completion Status',
    'record.create_btn': 'Create Service Record',
    'record.fully_operational': 'Fully Operational',
    'record.requires_followup': 'Requires Follow-up',
    'record.under_observation': 'Under Observation',

    // Status Labels
    'status.submitted': 'Submitted',
    'status.under_review': 'Under Review',
    'status.scheduled': 'Scheduled',
    'status.in_progress': 'In Progress',
    'status.completed': 'Completed',
    'status.cancelled': 'Cancelled',

    // Common Buttons & Messages
    'btn.save': 'Save Changes',
    'btn.cancel': 'Cancel',
    'btn.confirm': 'Confirm',
    'btn.filter': 'Filter',
    'btn.search': 'Search',
    'btn.download': 'Download Report',
    'btn.approve': 'Approve',
    'btn.reject': 'Reject',
    'msg.loading': 'Loading data...',
    'msg.success': 'Operation completed successfully.',
  },

  te: {
    // Company Information
    'company.name': 'వెంకట ప్రసన్న ఎంటర్‌ప్రైజెస్',
    'company.founder': 'వై. శ్రీనివాస్',
    'company.founder_title': 'వ్యవస్థాపకుడు & లీడ్ సర్వీస్ ఇంజనీర్',
    'company.email': 'venkataprasannaenterprises@gmail.com',
    'company.phone': '9866227780',
    'company.phone_display': '+91 9866227780',
    'company.gstin': '37ADYPY2158A1Z1',
    'company.location': 'ఆంధ్రప్రదేశ్, భారతదేశం',
    'company.support_availability': '24/7 బ్రేక్‌డౌన్ సర్వీస్ & నిర్వహణ మద్దతు',

    // Navigation
    'nav.home': 'హోమ్',
    'nav.about': 'గురించి',
    'nav.services': 'సేవలు',
    'nav.industries': 'నా సేవలు',
    'nav.vendor_experience': 'వెండర్ రిజిస్ట్రేషన్',
    'nav.service_charges': 'సర్వీస్ ఛార్జీలు',
    'nav.reviews': 'సమీక్షలు',
    'nav.contact': 'సంప్రదించండి',
    'nav.login': 'పోర్టల్ లాగిన్',
    'nav.register': 'ఖాతా నమోదు',
    'nav.dashboard': 'డాష్‌బోర్డ్',
    'nav.logout': 'లాగౌట్',
    'nav.emergency_phone': 'అత్యవసర హెల్ప్‌లైన్: +91 9866227780',
    'nav.portal_title': 'VPE పారిశ్రామిక సర్వీస్ మేనేజ్మెంట్',

    // Language Selector
    'lang.select': 'భాష',
    'lang.en': 'English',
    'lang.te': 'తెలుగు (Telugu)',
    'lang.hi': 'हिन्दी (Hindi)',

    // Home Page Hero & Sections
    'home.hero_badge': 'వెంకట ప్రసన్న ఎంటర్‌ప్రైజెస్',
    'home.hero_tag': 'పారిశ్రామిక సర్వీస్ & బ్రేక్‌డౌన్ సపోర్ట్',
    'home.hero_title': 'విశ్వసనీయ పారిశ్రామిక సర్వీస్ & నిర్వహణ పరిష్కారాలు',
    'home.hero_subtitle':
      'వరి మిల్లులు, వస్త్ర పరిశ్రమలు, జీడిపప్పు ప్రాసెసింగ్ యూనిట్లు, అమ్మోనియా రిఫ్రిజిరేషన్ మరియు భారీ పారిశ్రామిక యంత్రాలకు నిపుణుల ఇంజనీరింగ్ సేవలు. ఆన్-సైట్ తనిఖీ, ఖచ్చితమైన మరమ్మతులు, కంప్రెసర్ ట్యూనింగ్ మరియు వేగవంతమైన సాంకేతిక మద్దతు.',
    'home.cta_request': 'సర్వీస్ అభ్యర్థించండి',
    'home.cta_explore': 'మా సేవలను అన్వేషించండి',
    'home.call_desk': 'కాల్ ఆపరేటింగ్ డెస్క్',

    // Home Page About Section
    'home.about_badge': 'VPE గురించి',
    'home.about_title': 'మీ పరిశ్రమ కోసం సమగ్ర యంత్ర పరికరాల సర్వీసింగ్',
    'home.about_subtitle':
      'వెంకట ప్రసన్న ఎంటర్‌ప్రైజెస్ ఉత్పాదక మరియు ప్రాసెసింగ్ ప్లాంట్ల యంత్రాల నిర్వహణ, మరమ్మతులు మరియు ట్రబుల్షూటింగ్‌లో ప్రత్యేకత కలిగిన పారిశ్రామిక సర్వీస్ సంస్థ.',
    'home.about_p1':
      'మేము మీ ప్లాంట్ ప్రాంగణంలోనే నైపుణ్యం కలిగిన ఇంజనీరింగ్ సేవలను అందిస్తాము. వరి మిల్లుల యంత్రాలు మరియు టెక్స్‌టైల్ లూమ్‌ల నుండి జీడిపప్పు పరిశ్రమ పరికరాలు మరియు సాధారణ తయారీ వ్యవస్థల వరకు విభిన్న రంగాల యంత్రాలకు మా బృందం సేవలందిస్తుంది.',
    'home.about_p2':
      'ప్రతి సర్వీస్ పని ఒక క్రమబద్ధమైన విధానాన్ని అనుసరిస్తుంది: ప్రాథమిక పరిశీలన, సమస్య నిర్ధారణ, మరమ్మతు అమలు, పరీక్ష మరియు అధికారిక డాక్యుమెంటేషన్ — తద్వారా ప్రతి దశలోనూ పూర్తి పారదర్శకత ఉంటుంది.',
    'home.about_learn_more': 'VPE గురించి మరింత తెలుసుకోండి',
    'home.what_we_do': 'మేము అందించే సేవలు',
    'home.view_all_services': 'అన్ని సేవలను చూడండి',

    // Founder Section
    'home.founder_badge': 'మా నాయకత్వం',
    'home.founder_title': 'వ్యవస్థాపకుని పరిచయం',
    'home.founder_subtitle':
      'వెంకట ప్రసన్న ఎంటర్‌ప్రైజెస్ వ్యవస్థాపకుడు — పారిశ్రామిక పరికరాల సర్వీసింగ్‌లో విస్తృత ప్రత్యక్ష నైపుణ్యం.',
    'home.founder_pro_bg': 'వృత్తిపరమైన నేపథ్యం',
    'home.founder_bg_text':
      'వై. శ్రీనివాస్ వెంకట ప్రసన్న ఎంటర్‌ప్రైజెస్ వ్యవస్థాపకుడు. వివిధ ఉత్పాదక మరియు ప్రాసెసింగ్ పరిశ్రమలలో యంత్రాల సర్వీసింగ్ మరియు నిర్వహణలో విస్తృత ప్రత్యక్ష అనుభవం కలిగి ఉన్నారు. మెకానికల్ మరమ్మతులు, ఎలక్ట్రికల్ ట్రబుల్షూటింగ్, పరికరాల అమరిక మరియు నివారణ నిర్వహణ కార్యక్రమాలలో ఆయన ప్రత్యేక నిపుణులు.',
    'home.founder_expertise': 'నైపుణ్య విభాగాలు',
    'home.get_in_touch': 'సంప్రదించండి',

    // Services Section
    'home.services_badge': 'మా సేవలు',
    'home.services_title': 'ప్రధాన పారిశ్రామిక సేవలు',
    'home.services_subtitle':
      'భారీ ప్రాసెసింగ్ ప్లాంట్లు, ఉత్పాదక లైన్లు మరియు ఆగ్రో పరిశ్రమల కోసం ప్రత్యేక ఆన్-సైట్ ఇంజనీరింగ్ సేవలు.',

    // My Services / 26 Companies Section
    'home.my_services_badge': 'కస్టమర్ సేవా అనుభవం',
    'home.my_services_title': 'నా సేవలు — పరిశ్రమలు మరియు సేవలందించిన కంపెనీలు',
    'home.my_services_subtitle':
      'వరి మిల్లులు, వస్త్ర పరిశ్రమలు, ఫుడ్ ప్రాసెసింగ్, పేపర్, డైరీ, స్టీల్, ఎనర్జీ, జీడిపప్పు పరిశ్రమలు మరియు పారిశ్రామిక పరికరాలతో సహా విస్తృత రంగాలలో వెంకట ప్రసన్న ఎంటర్‌ప్రైజెస్ పారిశ్రామిక సేవా సహకారాన్ని అందిస్తోంది.',
    'companies.title': 'నా సేవలు — 26 ధృవీకరించబడిన కంపెనీలు & పరిశ్రమలు',
    'companies.subtitle':
      'మా అధికారిక రికార్డుల నుండి వాస్తవ పరిశ్రమ అనుభవం మరియు ధృవీకరించబడిన వెండర్ రిజిస్ట్రేషన్లు.',
    'companies.all_filter': 'అన్ని పరిశ్రమలు (26)',
    'companies.filter_rice': 'వరి మిల్లులు',
    'companies.filter_food': 'ఫుడ్ & ఆయిల్స్',
    'companies.filter_paper': 'పేపర్ పరిశ్రమ',
    'companies.filter_oil_energy': 'ఆయిల్ & ఎనర్జీ',
    'companies.filter_steel': 'స్టీల్ ప్లాంట్లు',
    'companies.filter_dairy': 'డెయిరీ',
    'companies.filter_equipment': 'పరికరాలు & కంప్రెసర్లు',
    'companies.filter_textiles': 'టెక్స్‌టైల్స్',
    'companies.filter_cashew': 'జీడిపప్పు ప్రాసెసింగ్',
    'companies.filter_other': 'ఇతర పరిశ్రమలు',
    'companies.search_placeholder': 'కంపెనీ లేదా పరిశ్రమ పేరుతో శోధించండి...',
    'companies.badge_registered': 'Vendor Registration Completed',
    'companies.experience': 'అనుభవం',
    'companies.sector': 'విభాగం',
    'companies.view_all': 'అన్ని 26 కంపెనీలను చూడండి',
    'companies.view_details': 'వివరాలు చూడండి',

    // Strengths
    'home.strengths_badge': 'VPE ను ఎందుకు ఎంచుకోవాలి',
    'home.strengths_title': 'మా సేవల విశిష్టత',
    'home.strengths_subtitle':
      'మా పారిశ్రామిక క్లయింట్‌లకు మేము అందించే విశ్వసనీయ పనితీరు మరియు నైపుణ్యం.',

    // Service Request CTA
    'home.cta_badge': 'సేవలు పొందడానికి సిద్ధంగా ఉన్నారా?',
    'home.cta_box_title': 'మీ పరిశ్రమకు యంత్ర పరికరాల సర్వీసింగ్ అవసరమా?',
    'home.cta_box_desc':
      'మీ ప్లాంట్‌కు అత్యవసర ట్రబుల్షూటింగ్, షెడ్యూల్ చేసిన నిర్వహణ లేదా సమగ్ర పరికరాల తనిఖీ అవసరమైతే — వెంటనే సర్వీస్ అభ్యర్థనను సమర్పించండి, మా ఇంజనీరింగ్ బృందం మీతో సమన్వయం చేసుకుంటుంది.',

    // Footer
    'footer.certified': 'ధృవీకరించబడిన ప్రమాణాలు',
    'footer.certified_desc':
      'చట్టబద్ధమైన పారిశ్రామిక భద్రత మరియు ఖచ్చితమైన పరికరాల నిర్వహణ విధానాలు.',
    'footer.rapid': 'వేగవంతమైన బ్రేక్‌డౌన్ స్పందన',
    'footer.rapid_desc':
      'ఉత్పాదక లైన్ ఆగిపోకుండా తక్షణ ఆన్-సైట్ ఇంజనీరింగ్ బృంద నియామకం.',
    'footer.support': 'సంపూర్ణ ప్లాంట్ మద్దతు',
    'footer.support_desc':
      'నివారణ నిర్వహణ, రీఫిట్టింగ్, విడిభాగాలు మరియు పూర్తి సేవా నిర్వహణ.',
    'footer.about_desc':
      'భారీ ఉత్పాదక రంగాలలో మిషన్-క్రిటికల్ నిర్వహణ, మెకానికల్ మరమ్మతులు, ఎలక్ట్రికల్ ఇంజనీరింగ్ మరియు ఖచ్చితమైన పరికరాల నిర్వహణను అందించే పారిశ్రామిక సేవా వేదిక.',
    'footer.company_services': 'కంపెనీ & సేవలు',
    'footer.application_portals': 'అప్లికేషన్ పోర్టల్స్',
    'footer.emergency_dispatch': 'అత్యవసర సంప్రదింపులు',
    'footer.rights': 'సర్వహక్కులు ప్రత్యేకించబడ్డాయి.',
    'footer.platform': 'పారిశ్రామిక సర్వీస్ మేనేజ్‌మెంట్ ప్లాట్‌ఫామ్',
    'footer.gstin_note': 'GSTIN: 37ADYPY2158A1Z1 • వ్యవస్థాపకుడు: వై. శ్రీనివాస్',

    // About Us Page
    'about.page_title': 'వెంకట ప్రసన్న ఎంటర్‌ప్రైజెస్ గురించి',
    'about.page_subtitle':
      'తయారీ, ప్రాసెసింగ్ మరియు ఆగ్రో పరిశ్రమల కోసం విశ్వసనీయ ఇంజనీరింగ్ సేవలు మరియు నాణ్యతా ప్రమాణాలు.',
    'about.mission_title': 'మా లక్ష్యం మరియు పనితీరు',
    'about.mission_desc':
      'పరిశ్రమల యంత్రాలు ఎటువంటి ఆటంకం లేకుండా పూర్తి సామర్థ్యంతో నడిచేలా ఉన్నత స్థాయి సాంకేతిక మరియు నిర్వహణ సేవలను అందించడం మా ప్రధాన ఉద్దేశ్యం.',
    'about.compliance_title': 'సంస్థ రిజిస్ట్రేషన్ & పన్ను ధృవీకరణలు',
    'about.compliance_desc':
      'GST రిజిస్ట్రేషన్ (37ADYPY2158A1Z1), ప్రామాణిక పారిశ్రామిక భద్రతా విధానాలు మరియు అధికారిక ఇంజనీరింగ్ సేవా నిబంధనలకు అనుగుణంగా నడుస్తోంది.',

    // Vendor Registration Page
    'vendor.page_title': 'వెండర్ రిజిస్ట్రేషన్ & చట్టబద్ధమైన రికార్డులు',
    'vendor.page_subtitle':
      'చట్టబద్ధమైన ధృవీకరణలు, GST నమోదు, నిర్ధారిత పరిశ్రమ అనుభవం మరియు అధికారిక వెండర్ డాక్యుమెంటేషన్.',
    'vendor.gst_title': 'వస్తు మరియు సేవల పన్ను (GST) రిజిస్ట్రేషన్',
    'vendor.gst_num': 'GSTIN: 37ADYPY2158A1Z1',
    'vendor.gst_status': 'ధృవీకరించబడిన రికార్డు',
    'vendor.gst_desc':
      'పారిశ్రామిక యంత్రాల సర్వీసింగ్, బ్రేక్‌డౌన్ నిర్వహణ మరియు ఇంజనీరింగ్ సేవల కొరకు GST క్రింద నమోదైంది.',
    'vendor.experience_title': 'ధృవీకరించబడిన వెండర్ రిజిస్ట్రేషన్లు',
    'vendor.experience_subtitle':
      'వెంకట ప్రసన్న ఎంటర్‌ప్రైజెస్ వెండర్ రిజిస్ట్రేషన్ విజయవంతంగా పూర్తయిన కంపెనీలు.',

    // Contact Page
    'contact.page_title': 'సంప్రదింపులు & సర్వీస్ డిస్పాచ్',
    'contact.page_subtitle':
      'యంత్రాల నిర్వహణ, బ్రేక్‌డౌన్ మద్దతు మరియు ఇంజనీర్ సందర్శన కోసం వెంకట ప్రసన్న ఎంటర్‌ప్రైజెస్‌ను సంప్రదించండి.',
    'contact.phone_title': 'అత్యవసర హెల్ప్‌లైన్ & డిస్పాచ్',
    'contact.email_title': 'అధికారిక ఈమెయిల్',
    'contact.gstin_title': 'GSTIN గుర్తింపు సంఖ్య',
    'contact.location_title': 'ప్రధాన కార్యాలయం',
    'contact.location_val': 'ఆంధ్రప్రదేశ్, భారతదేశం',
    'contact.form_title': 'సర్వీస్ విచారణను సమర్పించండి',
    'contact.name_label': 'మీ పూర్తి పేరు',
    'contact.email_label': 'మీ ఈమెయిల్',
    'contact.phone_label': 'ఫోన్ నంబర్',
    'contact.company_label': 'కంపెనీ / ప్లాంట్ పేరు',
    'contact.message_label': 'యంత్ర సమస్య లేదా సేవా అవసరాలు',
    'contact.submit_btn': 'విచారణను పంపండి',
    'contact.send_success': 'మీ విచారణ విజయవంతంగా సమర్పించబడింది!',

    // Customer Service Request Form
    'request.title': 'పారిశ్రామిక సర్వీస్ అభ్యర్థనను సమర్పించండి',
    'request.subtitle':
      'మెషిన్ బ్రేక్‌డౌన్లు, అత్యవసర మరమ్మతులు లేదా షెడ్యూల్ చేసిన నిర్వహణ కోసం నమోదు చేయండి.',
    'request.company_name': 'కంపెనీ / పరిశ్రమ పేరు',
    'request.contact_person': 'సంప్రదించవలసిన వ్యక్తి పేరు',
    'request.mobile': 'మొబైల్ నంబర్',
    'request.location': 'ప్లాంట్ చిరునామా / లొకేషన్',
    'request.industry_type': 'పరిశ్రమ రకం',
    'request.machine_issue': 'మెషిన్ సమస్య వివరణ',
    'request.machine_issue_placeholder':
      'మెషిన్ వైఫల్యం, లోపం సంకేతాలు మరియు ఇతర సమస్యలను వివరించండి...',
    'request.problem_start_date': 'సమస్య ప్రారంభమైన తేదీ',
    'request.category': 'సర్వీస్ విభాగం',
    'request.attachments': 'ఫోటో / వీడియో / పత్రాల జోడింపులు',
    'request.attachments_help':
      'మెషిన్ సమస్యకు సంబంధించిన ఫోటోలు, వీడియోలు లేదా పత్రాలను అప్‌లోడ్ చేయండి (JPG, PNG, MP4, PDF).',
    'request.submit_btn': 'సర్వీస్ అభ్యర్థన సమర్పించండి',
    'request.submitting': 'నమోదు చేయబడుతోంది...',
    'request.request_id': 'సర్వీస్ అభ్యర్థన ID',
    'request.success_title': 'సర్వీస్ అభ్యర్థన విజయవంతంగా సమర్పించబడింది!',
    'request.success_desc':
      'మీ అభ్యర్థన నమోదు చేయబడింది. మా ఇంజనీరింగ్ బృందానికి తెలియజేయబడింది.',
    'request.view_dashboard': 'కస్టమర్ డాష్‌బోర్డ్‌లో చూడండి',

    // Voice Recording (Strict 6-step workflow)
    'voice.section_title': 'మెషిన్ సమస్య వాయిస్ రికార్డింగ్',
    'voice.section_desc':
      'మెషిన్ శబ్దం లేదా సమస్యను మీ గొంతుతో రికార్డ్ చేయండి.',
    'voice.step1_record': 'రికార్డ్ చేయడానికి క్లిక్ చేయండి',
    'voice.step2_recording': 'రికార్డింగ్ జరుగుతోంది...',
    'voice.step2_speak':
      'దయచేసి మెషిన్ సమస్యను మాట్లాడండి లేదా మెషిన్ దగ్గర ఉంచండి.',
    'voice.step2_stop': 'రికార్డింగ్ ఆపండి',
    'voice.step3_playback': 'రికార్డింగ్ వినండి',
    'voice.step3_playing': 'ఆడియో ప్లే అవుతోంది...',
    'voice.step4_delete': 'రికార్డింగ్ తొలగించు',
    'voice.step4_rerecord': 'మళ్లీ రికార్డ్ చేయండి',
    'voice.step5_ready': 'వాయిస్ రికార్డింగ్ సిద్ధంగా ఉంది.',
    'voice.no_speech_to_text':
      'ఆడియో నేరుగా నిల్వ చేయబడుతుంది (టెక్స్ట్‌గా మార్చబడదు).',

    // Customer Dashboard
    'customer.dashboard_title': 'కస్టమర్ సర్వీస్ డాష్‌బోర్డ్',
    'customer.total_requests': 'మొత్తం అభ్యర్థనలు',
    'customer.pending': 'పరిశీలనలో ఉన్నవి',
    'customer.scheduled': 'షెడ్యూల్ చేసిన సందర్శనలు',
    'customer.completed': 'పూర్తయిన సేవలు',
    'customer.active_requests': 'ప్రస్తుత సర్వీస్ అభ్యర్థనలు',
    'customer.service_history': 'మునుపటి సేవా చరిత్ర',
    'customer.view_report': 'ఇంజనీర్ సర్వీస్ రికార్డ్ చూడండి',
    'customer.scheduled_for': 'షెడ్యూల్ చేసిన తేదీ',
    'customer.engineer_assigned': 'కేటాయించిన ఇంజనీర్',

    // Owner & Admin Dashboard Modules
    'admin.portal_name': 'ఓనర్ & అడ్మిన్ కమాండ్ కన్సోల్',
    'admin.unified_role': 'ఏకీకృత ఖాతా: ఓనర్ & అడ్మిన్ నిర్వహణ',
    'admin.tab_dashboard': 'డాష్‌బోర్డ్',
    'admin.tab_customers': 'కస్టమర్లు',
    'admin.tab_requests': 'సర్వీస్ అభ్యర్థనలు',
    'admin.tab_scheduling': 'షెడ్యూలింగ్',
    'admin.tab_records': 'సర్వీస్ రికార్డులు',
    'admin.tab_services': 'సేవలు & ఛార్జీలు',
    'admin.tab_industries': 'పరిశ్రమలు',
    'admin.tab_vendors': 'వెండర్ రిజిస్ట్రేషన్లు',
    'admin.tab_reviews': 'సమీక్షలు',
    'admin.tab_notifications': 'నోటిఫికేషన్లు',
    'admin.tab_reports': 'నివేదికలు',
    'admin.tab_settings': 'సెట్టింగ్‌లు',

    // Engineer Service Record
    'record.title': 'ఇంజనీర్ సర్వీస్ రికార్డ్',
    'record.subtitle':
      'ఆన్-సైట్ తనిఖీ, మరమ్మత్తు, విడిభాగాలు మరియు సేవా పూర్తయిన అధికారిక వివరాలు.',
    'record.request_id': 'సర్వీస్ అభ్యర్థన ID',
    'record.company': 'కస్టమర్ / పరిశ్రమ పేరు',
    'record.machine_issue': 'మెషిన్ సమస్య',
    'record.visit_date': 'సందర్శించిన తేదీ',
    'record.inspection_findings': 'తనిఖీ ఫలితాలు (Findings)',
    'record.work_performed': 'చేసిన పని (Work Performed)',
    'record.tools_materials': 'ఉపయోగించిన సాధనాలు & విడిభాగాలు',
    'record.gas_compressor': 'గ్యాస్ / కంప్రెసర్ అదనపు అవసరాలు',
    'record.engineer_remarks': 'ఇంజనీర్ అభిప్రాయం & సూచనలు',
    'record.completion_status': 'పూర్తయిన స్థితి',
    'record.create_btn': 'సర్వీస్ రికార్డ్ సృష్టించండి',
    'record.fully_operational': 'పూర్తిగా పనిచేస్తోంది',
    'record.requires_followup': 'మరింత తనిఖీ అవసరం',
    'record.under_observation': 'పరిశీలనలో ఉంది',

    // Status Labels
    'status.submitted': 'సమర్పించబడింది',
    'status.under_review': 'పరిశీలనలో ఉంది',
    'status.scheduled': 'షెడ్యూల్ చేయబడింది',
    'status.in_progress': 'పురోగతిలో ఉంది',
    'status.completed': 'పూర్తయింది',
    'status.cancelled': 'రద్దు చేయబడింది',

    // Common Buttons & Messages
    'btn.save': 'మార్పులను భద్రపరుచు',
    'btn.cancel': 'రద్దు చేయి',
    'btn.confirm': 'ధృవీకరించు',
    'btn.filter': 'ఫిల్టర్',
    'btn.search': 'శోధించండి',
    'btn.download': 'రిపోర్ట్ డౌన్‌లోడ్',
    'btn.approve': 'ఆమోదించు',
    'btn.reject': 'తిరస్కరించు',
    'msg.loading': 'లోడ్ అవుతోంది...',
    'msg.success': 'విజయవంతంగా పూర్తయింది.',
  },

  hi: {
    // Company Information
    'company.name': 'वेंकट प्रसन्ना एंटरप्राइजेज',
    'company.founder': 'वाई श्रीनिवास',
    'company.founder_title': 'संस्थापक और मुख्य सेवा इंजीनियर',
    'company.email': 'venkataprasannaenterprises@gmail.com',
    'company.phone': '9866227780',
    'company.phone_display': '+91 9866227780',
    'company.gstin': '37ADYPY2158A1Z1',
    'company.location': 'आंध्र प्रदेश, भारत',
    'company.support_availability': '24/7 ब्रेकडाउन सपोर्ट और मेंटेनेंस',

    // Navigation
    'nav.home': 'होम',
    'nav.about': 'हमारे बारे में',
    'nav.services': 'सेवाएं',
    'nav.industries': 'माय सर्विसेज',
    'nav.vendor_experience': 'वेंडर पंजीकरण',
    'nav.service_charges': 'सर्विस शुल्क',
    'nav.reviews': 'समीक्षाएं',
    'nav.contact': 'संपर्क करें',
    'nav.login': 'पोर्टल लॉगिन',
    'nav.register': 'खाता पंजीकरण',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.logout': 'लॉग आउट',
    'nav.emergency_phone': 'आपातकालीन हेल्पलाइन: +91 9866227780',
    'nav.portal_title': 'VPE औद्योगिक सेवा प्रबंधन',

    // Language Selector
    'lang.select': 'भाषा',
    'lang.en': 'English',
    'lang.te': 'తెలుగు (Telugu)',
    'lang.hi': 'हिन्दी (Hindi)',

    // Home Page Hero & Sections
    'home.hero_badge': 'वेंकट प्रसन्ना एंटरप्राइजेज',
    'home.hero_tag': 'औद्योगिक सेवा और ब्रेकडाउन सहायता',
    'home.hero_title': 'विश्वसनीय औद्योगिक सेवा और रखरखाव समाधान',
    'home.hero_subtitle':
      'चावल मिलों, कपड़ा संयंत्रों, काजू प्रसंस्करण सुविधाओं, अमोनिया प्रशीतन और भारी औद्योगिक मशीनरी के लिए व्यापक इंजीनियरिंग सेवा। साइट पर निरीक्षण, सटीक मरम्मत और त्वरित सेवा।',
    'home.cta_request': 'सेवा का अनुरोध करें',
    'home.cta_explore': 'हमारी सेवाएं देखें',
    'home.call_desk': 'ऑपरेटिंग डेस्क को कॉल करें',

    // Home Page About Section
    'home.about_badge': 'VPE के बारे में',
    'home.about_title': 'आपकी सुविधा के लिए औद्योगिक उपकरण सेवा',
    'home.about_subtitle':
      'वेंकट प्रसन्ना एंटरप्राइजेज विनिर्माण और प्रसंस्करण संयंत्रों के लिए उपकरण रखरखाव, मरम्मत और समस्या निवारण में विशेषज्ञता वाली कंपनी है।',
    'home.about_p1':
      'हम आपके प्लांट स्थान पर कुशल इंजीनियरिंग सेवाएं प्रदान करते हैं। हमारी टीम कई क्षेत्रों में औद्योगिक उपकरणों के साथ काम करती है।',
    'home.about_p2':
      'प्रत्येक सेवा कार्य एक संरचित प्रक्रिया का पालन करता है: प्रारंभिक मूल्यांकन, निदान, सेवा निष्पादन, परीक्षण और उचित दस्तावेज।',
    'home.about_learn_more': 'VPE के बारे में अधिक जानें',
    'home.what_we_do': 'हम क्या करते हैं',
    'home.view_all_services': 'सभी सेवाएं देखें',

    // Founder Section
    'home.founder_badge': 'हमारा नेतृत्व',
    'home.founder_title': 'संस्थापक से मिलें',
    'home.founder_subtitle':
      'वेंकट प्रसन्ना एंटरप्राइजेज के पीछे की प्रेरक शक्ति — औद्योगिक उपकरण सेवा में व्यावहारिक विशेषज्ञता।',
    'home.founder_pro_bg': 'व्यावसायिक पृष्ठभूमि',
    'home.founder_bg_text':
      'वाई श्रीनिवास वेंकट प्रसन्ना एंटरप्राइजेज के संस्थापक हैं, जो विनिर्माण और प्रसंस्करण संयंत्रों में औद्योगिक उपकरणों की सेवा में व्यावहारिक अनुभव लाते हैं।',
    'home.founder_expertise': 'विशेषज्ञता के क्षेत्र',
    'home.get_in_touch': 'संपर्क करें',

    // Services Section
    'home.services_badge': 'हमारी सेवाएं',
    'home.services_title': 'प्रमुख औद्योगिक सेवाएं',
    'home.services_subtitle':
      'भारी प्रसंस्करण सुविधाओं और विनिर्माण लाइनों के लिए विशेष साइट पर इंजीनियरिंग सेवाएं।',

    // My Services / 26 Companies Section
    'home.my_services_badge': 'ग्राहक सेवा अनुभव',
    'home.my_services_title': 'माय सर्विसेज — उद्योग और सेवा प्राप्त कंपनियां',
    'home.my_services_subtitle':
      'वेंकट प्रसन्ना एंटरप्राइजेज चावल मिलों, कपड़ा, खाद्य प्रसंस्करण, कागज, डेयरी, इस्पात, ऊर्जा और औद्योगिक उपकरणों सहित विभिन्न उद्योगों में सेवा सहायता प्रदान करता है।',
    'companies.title': 'माय सर्विसेज — 26 सत्यापित कंपनियां और उद्योग',
    'companies.subtitle':
      'हमारे आधिकारिक रिकॉर्ड से वास्तविक उद्योग अनुभव और पुष्टि किए गए वेंडर पंजीकरण।',
    'companies.all_filter': 'सभी उद्योग (26)',
    'companies.filter_rice': 'चावल मिलें',
    'companies.filter_food': 'खाद्य और खाद्य तेल',
    'companies.filter_paper': 'कागज उद्योग',
    'companies.filter_oil_energy': 'तेल और ऊर्जा',
    'companies.filter_steel': 'इस्पात संयंत्र',
    'companies.filter_dairy': 'डेयरी',
    'companies.filter_equipment': 'उपकरण और कंप्रेसर',
    'companies.filter_textiles': 'कपड़ा उद्योग',
    'companies.filter_cashew': 'काजू प्रसंस्करण',
    'companies.filter_other': 'अन्य उद्योग',
    'companies.search_placeholder': 'कंपनी या उद्योग के नाम से खोजें...',
    'companies.badge_registered': 'वेंडर पंजीकरण पूर्ण',
    'companies.experience': 'अनुभव',
    'companies.sector': 'क्षेत्र',
    'companies.view_all': 'सभी 26 कंपनियां देखें',
    'companies.view_details': 'विवरण देखें',

    // Strengths
    'home.strengths_badge': 'VPE क्यों चुनें',
    'home.strengths_title': 'हमारी सेवा को क्या खास बनाता है',
    'home.strengths_subtitle':
      'परिचालन गुण जो परिभाषित करते हैं कि हम अपने औद्योगिक ग्राहकों के साथ कैसे काम करते हैं।',

    // Service Request CTA
    'home.cta_badge': 'शुरुआत करने के लिए तैयार हैं?',
    'home.cta_box_title': 'औद्योगिक उपकरण सेवा की आवश्यकता है?',
    'home.cta_box_desc':
      'चाहे आपके प्लांट को आपातकालीन समस्या निवारण या निर्धारित रखरखाव की आवश्यकता हो — सेवा अनुरोध सबमिट करें और हमारी टीम समन्वय करेगी।',

    // Footer
    'footer.certified': 'प्रमाणित मानक',
    'footer.certified_desc':
      'औद्योगिक सुरक्षा और सटीक उपकरण प्रक्रियाओं का अनुपालन।',
    'footer.rapid': 'त्वरित ब्रेकडाउन प्रतिक्रिया',
    'footer.rapid_desc':
      'विनिर्माण लाइनों के लिए उच्च प्राथमिकता पर साइट पर परिनियोजन।',
    'footer.support': 'संपूर्ण प्लांट सहायता',
    'footer.support_desc':
      'निवारक रखरखाव, रेट्रोफिटिंग, स्पेयर पार्ट्स और सेवा प्रबंधन।',
    'footer.about_desc':
      'भारी विनिर्माण सुविधाओं के लिए मिशन-महत्वपूर्ण रखरखाव, यांत्रिक मरम्मत और विद्युत इंजीनियरिंग प्रदान करने वाली औद्योगिक सेवा प्रणाली।',
    'footer.company_services': 'कंपनी और सेवाएं',
    'footer.application_portals': 'एप्लिकेशन पोर्टल',
    'footer.emergency_dispatch': 'आपातकालीन और डिस्पैच',
    'footer.rights': 'सर्वाधिकार सुरक्षित।',
    'footer.platform': 'औद्योगिक सेवा प्रबंधन मंच',
    'footer.gstin_note': 'GSTIN: 37ADYPY2158A1Z1 • संस्थापक: वाई श्रीनिवास',

    // About Us Page
    'about.page_title': 'वेंकट प्रसन्ना एंटरप्राइजेज के बारे में',
    'about.page_subtitle':
      'विनिर्माण और प्रसंस्करण सुविधाओं के लिए औद्योगिक सेवा विश्वसनीयता।',
    'about.mission_title': 'हमारा मिशन और दृष्टिकोण',
    'about.mission_desc':
      'औद्योगिक मशीनरी अधिकतम क्षमता पर काम करे यह सुनिश्चित करने के लिए हम व्यावहारिक इंजीनियरिंग सहायता प्रदान करते हैं।',
    'about.compliance_title': 'उद्यम पंजीकरण और कर अनुपालन',
    'about.compliance_desc':
      'GST पंजीकरण (37ADYPY2158A1Z1) और सत्यापित सुरक्षा प्रक्रियाओं सहित वैधानिक अनुपालन।',

    // Vendor Registration Page
    'vendor.page_title': 'वेंडर पंजीकरण और अनुपालन रिकॉर्ड',
    'vendor.page_subtitle':
      'वैधानिक प्रमाणपत्र, GST पंजीकरण और औपचारिक वेंडर दस्तावेज।',
    'vendor.gst_title': 'वस्तु एवं सेवा कर (GST) पंजीकरण',
    'vendor.gst_num': 'GSTIN: 37ADYPY2158A1Z1',
    'vendor.gst_status': 'सत्यापित वैधानिक रिकॉर्ड',
    'vendor.gst_desc':
      'औद्योगिक मशीनरी सेवा और ब्रेकडाउन रखरखाव के लिए GST के तहत पंजीकृत।',
    'vendor.experience_title': 'पुष्टि किए गए वेंडर पंजीकरण',
    'vendor.experience_subtitle':
      'वे कंपनियां जहां वेंकट प्रसन्ना एंटरप्राइजेज का वेंडर पंजीकरण पूर्ण है।',

    // Contact Page
    'contact.page_title': 'संपर्क और सेवा डिस्पैच',
    'contact.page_subtitle':
      'औद्योगिक मशीनरी रखरखाव और ऑन-साइट सेवा के लिए वेंकट प्रसन्ना एंटरप्राइजेज से संपर्क करें।',
    'contact.phone_title': 'आपातकालीन हेल्पलाइन और डिस्पैच',
    'contact.email_title': 'आधिकारिक व्यापार ईमेल',
    'contact.gstin_title': 'GSTIN पहचान संख्या',
    'contact.location_title': 'परिचालन मुख्यालय',
    'contact.location_val': 'आंध्र प्रदेश, भारत',
    'contact.form_title': 'सेवा पूछताछ सबमिट करें',
    'contact.name_label': 'आपका नाम',
    'contact.email_label': 'आपका ईमेल',
    'contact.phone_label': 'फोन नंबर',
    'contact.company_label': 'कंपनी / प्लांट का नाम',
    'contact.message_label': 'मशीनरी आवश्यकताएं / पूछताछ',
    'contact.submit_btn': 'पूछताछ भेजें',
    'contact.send_success': 'आपकी पूछताछ सफलतापूर्वक सबमिट हो गई है!',

    // Customer Service Request Form
    'request.title': 'औद्योगिक सेवा अनुरोध दर्ज करें',
    'request.subtitle':
      'मशीन खराबी, आपातकालीन मरम्मत या निर्धारित रखरखाव के लिए अनुरोध सबमिट करें।',
    'request.company_name': 'कंपनी / उद्योग का नाम',
    'request.contact_person': 'संपर्क व्यक्ति का नाम',
    'request.mobile': 'मोबाइल नंबर',
    'request.location': 'प्लांट स्थान / पता',
    'request.industry_type': 'उद्योग का प्रकार',
    'request.machine_issue': 'मशीन खराबी का विवरण',
    'request.machine_issue_placeholder':
      'मशीन खराबी, लक्षण, एरर कोड और परिचालन प्रभाव का विवरण दें...',
    'request.problem_start_date': 'समस्या शुरू होने की तिथि',
    'request.category': 'सेवा श्रेणी',
    'request.attachments': 'फोटो / वीडियो / दस्तावेज संलग्नक',
    'request.attachments_help':
      'मशीन समस्या की तस्वीरें, वीडियो या दस्तावेज अपलोड करें (JPG, PNG, MP4, PDF)।',
    'request.submit_btn': 'सेवा अनुरोध सबमिट करें',
    'request.submitting': 'अनुरोध दर्ज किया जा रहा है...',
    'request.request_id': 'सेवा अनुरोध ID',
    'request.success_title': 'सेवा अनुरोध सफलतापूर्वक दर्ज हुआ!',
    'request.success_desc':
      'आपका अनुरोध सिस्टम में दर्ज कर लिया गया है। हमारी टीम को सूचित कर दिया गया है।',
    'request.view_dashboard': 'ग्राहक डैशबोर्ड में देखें',

    // Voice Recording (Strict 6-step workflow)
    'voice.section_title': 'मशीन समस्या की वॉयस रिकॉर्डिंग',
    'voice.section_desc':
      'खराब मशीन की आवाज या समस्या को अपनी आवाज में रिकॉर्ड करें।',
    'voice.step1_record': 'रिकॉर्ड करने के लिए क्लिक करें',
    'voice.step2_recording': 'रिकॉर्डिंग जारी है...',
    'voice.step2_speak':
      'कृपया मशीन की समस्या बताएं या फोन को मशीन के पास रखें।',
    'voice.step2_stop': 'रिकॉर्डिंग बंद करें',
    'voice.step3_playback': 'रिकॉर्डिंग सुनें',
    'voice.step3_playing': 'ऑडियो बज रहा है...',
    'voice.step4_delete': 'रिकॉर्डिंग हटाएं',
    'voice.step4_rerecord': 'फिर से रिकॉर्ड करें',
    'voice.step5_ready': 'वॉयस रिकॉर्डिंग सबमिट करने के लिए तैयार है।',
    'voice.no_speech_to_text':
      'ऑडियो सीधे स्टोर किया जाता है (टेक्स्ट में परिवर्तित नहीं)।',

    // Customer Dashboard
    'customer.dashboard_title': 'ग्राहक सेवा डैशबोर्ड',
    'customer.total_requests': 'कुल अनुरोध',
    'customer.pending': 'लंबित / समीक्षाधीन',
    'customer.scheduled': 'निर्धारित विजिट्स',
    'customer.completed': 'पूर्ण सेवाएं',
    'customer.active_requests': 'सक्रिय सेवा अनुरोध',
    'customer.service_history': 'पिछला सेवा इतिहास',
    'customer.view_report': 'इंजीनियर सेवा रिकॉर्ड देखें',
    'customer.scheduled_for': 'निर्धारित विजिट तिथि',
    'customer.engineer_assigned': 'नियुक्त इंजीनियर',

    // Owner & Admin Dashboard Modules
    'admin.portal_name': 'मालिक और एडमिन कमांड कंसोल',
    'admin.unified_role': 'एकल एकीकृत खाता: ओनर और एडमिन कंसोल',
    'admin.tab_dashboard': 'डैशबोर्ड',
    'admin.tab_customers': 'ग्राहक',
    'admin.tab_requests': 'सेवा अनुरोध',
    'admin.tab_scheduling': 'शेड्यूलिंग',
    'admin.tab_records': 'सर्विस रिकॉर्ड्स',
    'admin.tab_services': 'सेवाएं और शुल्क',
    'admin.tab_industries': 'उद्योग',
    'admin.tab_vendors': 'वेंडर पंजीकरण',
    'admin.tab_reviews': 'समीक्षाएं',
    'admin.tab_notifications': 'सूचनाएं (Notifications)',
    'admin.tab_reports': 'रिपोर्ट्स',
    'admin.tab_settings': 'सेटिंग्स',

    // Engineer Service Record
    'record.title': 'इंजीनियर सर्विस रिकॉर्ड',
    'record.subtitle':
      'साइट पर निरीक्षण, मरम्मत कार्य, पुर्जे और पूर्णता का औपचारिक तकनीकी रिकॉर्ड।',
    'record.request_id': 'सेवा अनुरोध ID',
    'record.company': 'ग्राहक / उद्योग का नाम',
    'record.machine_issue': 'मशीन की समस्या',
    'record.visit_date': 'विजिट की तारीख',
    'record.inspection_findings': 'निरीक्षण निष्कर्ष (Findings)',
    'record.work_performed': 'किया गया कार्य (Work Performed)',
    'record.tools_materials': 'प्रयुक्त उपकरण और सामग्री',
    'record.gas_compressor': 'गैस / कंप्रेसर की अतिरिक्त आवश्यकताएं',
    'record.engineer_remarks': 'इंजीनियर की टिप्पणी और सिफारिशें',
    'record.completion_status': 'कार्य पूर्णता स्थिति',
    'record.create_btn': 'सर्विस रिकॉर्ड बनाएं',
    'record.fully_operational': 'पूरी तरह कार्यात्मक',
    'record.requires_followup': 'फॉलो-अप आवश्यक',
    'record.under_observation': 'निगरानी में',

    // Status Labels
    'status.submitted': 'सबमिट किया गया',
    'status.under_review': 'समीक्षाधीन',
    'status.scheduled': 'निर्धारित',
    'status.in_progress': 'प्रगति पर',
    'status.completed': 'पूर्ण',
    'status.cancelled': 'रद्द',

    // Common Buttons & Messages
    'btn.save': 'बदलाव सहेजें',
    'btn.cancel': 'रद्द करें',
    'btn.confirm': 'पुष्टि करें',
    'btn.filter': 'फ़िल्टर',
    'btn.search': 'खोजें',
    'btn.download': 'रिपोर्ट डाउनलोड',
    'btn.approve': 'स्वीकार करें',
    'btn.reject': 'अस्वीकार करें',
    'msg.loading': 'लोड हो रहा है...',
    'msg.success': 'सफलतापूर्वक पूर्ण हुआ।',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_LANGUAGE);
      if (saved === 'en' || saved === 'te' || saved === 'hi') {
        return saved;
      }
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_LANGUAGE, lang);
    }
  };

  const t = (key: string, fallback?: string): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    if (langDict && langDict[key]) return langDict[key];
    const enDict = TRANSLATIONS.en;
    if (enDict && enDict[key]) return enDict[key];
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
