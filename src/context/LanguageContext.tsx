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
 * Owner & Admin Dashboard modules, Engineer Service Records, and Notifications.
 */
export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.industries': 'Industries',
    'nav.vendor_experience': 'Vendor Experience',
    'nav.service_charges': 'Service Charges',
    'nav.reviews': 'Reviews',
    'nav.contact': 'Contact',
    'nav.login': 'Portal Login',
    'nav.register': 'Register Account',
    'nav.dashboard': 'Dashboard',
    'nav.logout': 'Sign Out',
    'nav.emergency_phone': 'Emergency Hotline: +91 800-000-0000',
    'nav.portal_title': 'VPE Industrial Service Management',

    // Language Selector
    'lang.select': 'Language',
    'lang.en': 'English',
    'lang.te': 'తెలుగు (Telugu)',
    'lang.hi': 'हिन्दी (Hindi)',

    // Customer Service Request Form
    'request.title': 'Submit Industrial Service Request',
    'request.subtitle': 'Register machine breakdowns, emergency repairs, or scheduled plant maintenance.',
    'request.company_name': 'Company / Industry Name',
    'request.contact_person': 'Contact Person Name',
    'request.mobile': 'Mobile Number',
    'request.location': 'Operating Location / Plant Address',
    'request.industry_type': 'Industry Type',
    'request.machine_issue': 'Machine Issue Description',
    'request.machine_issue_placeholder': 'Describe the machine malfunction, observed symptoms, error codes, and operational impact...',
    'request.problem_start_date': 'Problem Start Date',
    'request.category': 'Service Category',
    'request.attachments': 'Photo / Video / Document Attachments',
    'request.attachments_help': 'Upload photos, videos of the machine issue, or equipment spec documents (JPG, PNG, MP4, PDF).',
    'request.submit_btn': 'Submit Service Request',
    'request.submitting': 'Registering Request...',
    'request.request_id': 'Service Request ID',
    'request.success_title': 'Service Request Successfully Submitted!',
    'request.success_desc': 'Your request has been logged. Our dispatch team has been notified.',
    'request.view_dashboard': 'View in Customer Dashboard',

    // Voice Recording (Strict 6-step workflow)
    'voice.section_title': 'Voice Recording of Machine Issue',
    'voice.section_desc': 'Record the sounds of the faulty machine or describe the problem by speaking.',
    'voice.step1_record': 'Click to Record Issue',
    'voice.step2_recording': 'Recording in Progress...',
    'voice.step2_speak': 'Please explain the machine issue or hold phone near the machine.',
    'voice.step2_stop': 'Stop Recording',
    'voice.step3_playback': 'Listen to Recording',
    'voice.step3_playing': 'Playing Audio...',
    'voice.step4_delete': 'Delete Recording',
    'voice.step4_rerecord': 'Re-record Audio',
    'voice.step5_ready': 'Audio recording attached and ready to submit.',
    'voice.no_speech_to_text': 'Audio is stored directly without text conversion.',

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
    'customer.track_issue': 'Track Issue',
    'customer.tracker_title': 'Live Machine Issue & Service Tracker',
    'customer.tracker_subtitle': 'Real-time progress, technician assignment, and milestone status for your reported machine issues.',
    'customer.select_issue_to_track': 'Select Machine Issue to Track',
    'customer.track_by_token': 'Track by Request ID / Token',
    'customer.tracking_step_1': 'Request Logged',
    'customer.tracking_step_2': 'Technical Triage',
    'customer.tracking_step_3': 'Visit Scheduled',
    'customer.tracking_step_4': 'Repair In Progress',
    'customer.tracking_step_5': 'Certified & Completed',

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
    'record.subtitle': 'Formal on-site inspection, repair, parts, and completion documentation.',
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
    // Navigation
    'nav.home': 'హోమ్',
    'nav.about': 'గురించి',
    'nav.services': 'సేవలు',
    'nav.industries': 'పరిశ్రమలు',
    'nav.vendor_experience': 'వెండర్ అనుభవం',
    'nav.service_charges': 'సర్వీస్ ఛార్జీలు',
    'nav.reviews': 'సమీక్షలు',
    'nav.contact': 'సంప్రదించండి',
    'nav.login': 'పోర్టల్ లాగిన్',
    'nav.register': 'ఖాతా నమోదు',
    'nav.dashboard': 'డాష్‌బోర్డ్',
    'nav.logout': 'లాగౌట్',
    'nav.emergency_phone': 'అత్యవసర హెల్ప్‌లైన్: +91 800-000-0000',
    'nav.portal_title': 'VPE పారిశ్రామిక సర్వీస్ మేనేజ్మెంట్',

    // Language Selector
    'lang.select': 'భాష',
    'lang.en': 'English',
    'lang.te': 'తెలుగు (Telugu)',
    'lang.hi': 'हिन्दी (Hindi)',

    // Customer Service Request Form
    'request.title': 'పారిశ్రామిక సర్వీస్ అభ్యర్థనను సమర్పించండి',
    'request.subtitle': 'మెషిన్ బ్రేక్‌డౌన్లు, అత్యవసర మరమ్మతులు లేదా షెడ్యూల్ చేసిన నిర్వహణ కోసం నమోదు చేయండి.',
    'request.company_name': 'కంపెనీ / పరిశ్రమ పేరు',
    'request.contact_person': 'సంప్రదించవలసిన వ్యక్తి పేరు',
    'request.mobile': 'మొబైల్ నంబర్',
    'request.location': 'ప్లాంట్ చిరునామా / లొకేషన్',
    'request.industry_type': 'పరిశ్రమ రకం',
    'request.machine_issue': 'మెషిన్ సమస్య వివరణ',
    'request.machine_issue_placeholder': 'మెషిన్ వైఫల్యం, లోపం సంకేతాలు మరియు ఇతర సమస్యలను వివరించండి...',
    'request.problem_start_date': 'సమస్య ప్రారంభమైన తేదీ',
    'request.category': 'సర్వీస్ విభాగం',
    'request.attachments': 'ఫోటో / వీడియో / పత్రాల జోడింపులు',
    'request.attachments_help': 'మెషిన్ సమస్యకు సంబంధించిన ఫోటోలు, వీడియోలు లేదా పత్రాలను అప్‌లోడ్ చేయండి (JPG, PNG, MP4, PDF).',
    'request.submit_btn': 'సర్వీస్ అభ్యర్థన సమర్పించండి',
    'request.submitting': 'నమోదు చేయబడుతోంది...',
    'request.request_id': 'సర్వీస్ అభ్యర్థన ID',
    'request.success_title': 'సర్వీస్ అభ్యర్థన విజయవంతంగా సమర్పించబడింది!',
    'request.success_desc': 'మీ అభ్యర్థన నమోదు చేయబడింది. మా ఇంజనీరింగ్ బృందానికి తెలియజేయబడింది.',
    'request.view_dashboard': 'కస్టమర్ డాష్‌బోర్డ్‌లో చూడండి',

    // Voice Recording (Strict 6-step workflow)
    'voice.section_title': 'మెషిన్ సమస్య వాయిస్ రికార్డింగ్',
    'voice.section_desc': 'మెషిన్ శబ్దం లేదా సమస్యను మీ గొంతుతో రికార్డ్ చేయండి.',
    'voice.step1_record': 'రికార్డ్ చేయడానికి క్లిక్ చేయండి',
    'voice.step2_recording': 'రికార్డింగ్ జరుగుతోంది...',
    'voice.step2_speak': 'దయచేసి మెషిన్ సమస్యను మాట్లాడండి లేదా మెషిన్ దగ్గర ఉంచండి.',
    'voice.step2_stop': 'రికార్డింగ్ ఆపండి',
    'voice.step3_playback': 'రికార్డింగ్ వినండి',
    'voice.step3_playing': 'ఆడియో ప్లే అవుతోంది...',
    'voice.step4_delete': 'రికార్డింగ్ తొలగించు',
    'voice.step4_rerecord': 'మళ్లీ రికార్డ్ చేయండి',
    'voice.step5_ready': 'వాయిస్ రికార్డింగ్ సిద్ధంగా ఉంది.',
    'voice.no_speech_to_text': 'ఆడియో నేరుగా నిల్వ చేయబడుతుంది (టెక్స్ట్‌గా మార్చబడదు).',

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
    'customer.track_issue': 'సమస్యను ట్రాక్ చేయండి',
    'customer.tracker_title': 'ప్రత్యక్ష యంత్ర సమస్య & సేవా స్థితి ట్రాకర్',
    'customer.tracker_subtitle': 'మీరు నివేదించిన మెషిన్ సమస్యల నిజ-సమయ పురోగతి మరియు మైలురాళ్ల స్థితి.',
    'customer.select_issue_to_track': 'ట్రాక్ చేయడానికి సమస్యను ఎంచుకోండి',
    'customer.track_by_token': 'రిక్వెస్ట్ ID / టోకెన్ ద్వారా ట్రాక్ చేయండి',
    'customer.tracking_step_1': 'అభ్యర్థన నమోదైంది',
    'customer.tracking_step_2': 'సాంకేతిక సమీక్ష',
    'customer.tracking_step_3': 'సందర్శన షెడ్యూల్',
    'customer.tracking_step_4': 'మరమ్మత్తు పురోగతిలో ఉంది',
    'customer.tracking_step_5': 'ధృవీకరించి పూర్తయింది',

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
    'record.subtitle': 'ఆన్-సైట్ తనిఖీ, మరమ్మత్తు, విడిభాగాలు మరియు సేవా పూర్తయిన అధికారిక వివరాలు.',
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
    // Navigation
    'nav.home': 'होम',
    'nav.about': 'हमारे बारे में',
    'nav.services': 'सेवाएं',
    'nav.industries': 'उद्योग',
    'nav.vendor_experience': 'वेंडर अनुभव',
    'nav.service_charges': 'सर्विस शुल्क',
    'nav.reviews': 'समीक्षाएं',
    'nav.contact': 'संपर्क करें',
    'nav.login': 'पोर्टल लॉगिन',
    'nav.register': 'खाता पंजीकरण',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.logout': 'लॉग आउट',
    'nav.emergency_phone': 'आपातकालीन हेल्पलाइन: +91 800-000-0000',
    'nav.portal_title': 'VPE औद्योगिक सेवा प्रबंधन',

    // Language Selector
    'lang.select': 'भाषा',
    'lang.en': 'English',
    'lang.te': 'తెలుగు (Telugu)',
    'lang.hi': 'हिन्दी (Hindi)',

    // Customer Service Request Form
    'request.title': 'औद्योगिक सेवा अनुरोध दर्ज करें',
    'request.subtitle': 'मशीन खराबी, आपातकालीन मरम्मत या निर्धारित रखरखाव के लिए अनुरोध सबमिट करें।',
    'request.company_name': 'कंपनी / उद्योग का नाम',
    'request.contact_person': 'संपर्क व्यक्ति का नाम',
    'request.mobile': 'मोबाइल नंबर',
    'request.location': 'प्लांट स्थान / पता',
    'request.industry_type': 'उद्योग का प्रकार',
    'request.machine_issue': 'मशीन खराबी का विवरण',
    'request.machine_issue_placeholder': 'मशीन खराबी, लक्षण, एरर कोड और परिचालन प्रभाव का विवरण दें...',
    'request.problem_start_date': 'समस्या शुरू होने की तिथि',
    'request.category': 'सेवा श्रेणी',
    'request.attachments': 'फोटो / वीडियो / दस्तावेज संलग्नक',
    'request.attachments_help': 'मशीन समस्या की तस्वीरें, वीडियो या दस्तावेज अपलोड करें (JPG, PNG, MP4, PDF)।',
    'request.submit_btn': 'सेवा अनुरोध सबमिट करें',
    'request.submitting': 'अनुरोध दर्ज किया जा रहा है...',
    'request.request_id': 'सेवा अनुरोध ID',
    'request.success_title': 'सेवा अनुरोध सफलतापूर्वक दर्ज हुआ!',
    'request.success_desc': 'आपका अनुरोध सिस्टम में दर्ज कर लिया गया है। हमारी टीम को सूचित कर दिया गया है।',
    'request.view_dashboard': 'ग्राहक डैशबोर्ड में देखें',

    // Voice Recording (Strict 6-step workflow)
    'voice.section_title': 'मशीन समस्या की वॉयस रिकॉर्डिंग',
    'voice.section_desc': 'खराब मशीन की आवाज या समस्या को अपनी आवाज में रिकॉर्ड करें।',
    'voice.step1_record': 'रिकॉर्ड करने के लिए क्लिक करें',
    'voice.step2_recording': 'रिकॉर्डिंग जारी है...',
    'voice.step2_speak': 'कृपया मशीन की समस्या बताएं या फोन को मशीन के पास रखें।',
    'voice.step2_stop': 'रिकॉर्डिंग बंद करें',
    'voice.step3_playback': 'रिकॉर्डिंग सुनें',
    'voice.step3_playing': 'ऑडियो बज रहा है...',
    'voice.step4_delete': 'रिकॉर्डिंग हटाएं',
    'voice.step4_rerecord': 'फिर से रिकॉर्ड करें',
    'voice.step5_ready': 'वॉयस रिकॉर्डिंग सबमिट करने के लिए तैयार है।',
    'voice.no_speech_to_text': 'ऑडियो सीधे स्टोर किया जाता है (टेक्स्ट में परिवर्तित नहीं)।',

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
    'customer.track_issue': 'समस्या ट्रैक करें',
    'customer.tracker_title': 'लाइव मशीन समस्या और सेवा ट्रैकर',
    'customer.tracker_subtitle': 'आपकी रिपोर्ट की गई मशीन समस्याओं की रियल-टाइम प्रगति, तकनीशियन आवंटन और स्थिति।',
    'customer.select_issue_to_track': 'ट्रैक करने के लिए समस्या चुनें',
    'customer.track_by_token': 'अनुरोध ID / टोकन द्वारा ट्रैक करें',
    'customer.tracking_step_1': 'अनुरोध दर्ज',
    'customer.tracking_step_2': 'तकनीकी समीक्षा',
    'customer.tracking_step_3': 'विजिट निर्धारित',
    'customer.tracking_step_4': 'मरम्मत कार्य प्रगति पर',
    'customer.tracking_step_5': 'प्रमाणित और पूर्ण',

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
    'record.subtitle': 'साइट पर निरीक्षण, मरम्मत कार्य, पुर्जे और पूर्णता का औपचारिक तकनीकी रिकॉर्ड।',
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
    if (langDict[key]) return langDict[key];
    const enDict = TRANSLATIONS.en;
    if (enDict[key]) return enDict[key];
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
