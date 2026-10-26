/**
 * Automated Verification Test Suite for ReliefNet & VPE Functionality
 * Tests Auth, Complaints, Storage, Services, Email Outbox, and Token Uniqueness.
 */

// Simple in-memory localStorage mock for Node environment
class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

globalThis.localStorage = new MockLocalStorage();
globalThis.window = {
  dispatchEvent: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
};

// Import compiled or source modules
async function runTests() {
  console.log('=== STARTING AUTOMATED TEST VERIFICATION ===\n');
  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, testName) {
    totalTests++;
    if (condition) {
      console.log(`✓ PASS: ${testName}`);
      passedTests++;
    } else {
      console.error(`✗ FAIL: ${testName}`);
      process.exitCode = 1;
    }
  }

  // Dynamically import services
  const { storageService } = await import('./src/services/storageService.ts');
  const { authService } = await import('./src/services/authService.ts');
  const { emailService } = await import('./src/services/emailService.ts');
  const { complaintsService } = await import('./src/services/complaintsService.ts');
  const { servicesService } = await import('./src/services/servicesService.ts');

  // TEST SUITE 1: Token Generation & Uniqueness
  console.log('\n--- 1. Testing Unique Token Generator ---');
  const token1 = storageService.generateComplaintToken();
  const token2 = storageService.generateComplaintToken();
  const token3 = storageService.generateComplaintToken();
  assert(token1.startsWith('RN-') && token1.length === 12, `Token format check: ${token1}`);
  assert(token1 !== token2 && token2 !== token3, `Unique sequential tokens: ${token1}, ${token2}, ${token3}`);

  // TEST SUITE 2: Authentication & Role Routing
  console.log('\n--- 2. Testing Role-Based Authentication ---');
  // Admin Login
  const adminLogin = authService.login('admin@reliefnet.com', 'admin123');
  assert(adminLogin.success && adminLogin.redirectUrl === '/admin/dashboard', 'Admin login routes to /admin/dashboard');
  assert(adminLogin.user?.role === 'admin', 'Admin user profile has admin role');

  // User Login
  const userLogin = authService.login('user@reliefnet.com', 'user123');
  assert(userLogin.success && userLogin.redirectUrl === '/customer/dashboard', 'User login routes to /customer/dashboard');
  assert(userLogin.user?.role === 'user', 'User profile has user role');

  // Failed Login
  const badLogin = authService.login('user@reliefnet.com', 'wrongpassword');
  assert(!badLogin.success, 'Invalid password rejected');

  // User Registration
  const registered = authService.registerUser({
    name: 'Ganesh Plant Manager',
    email: 'ganesh@plant.com',
    phone: '9988776655',
    company: 'Ganesh Rice Mills',
    location: 'Eluru, AP',
    password: 'password123',
  });
  assert(registered.email === 'ganesh@plant.com', 'New user registered persistently');
  const newLogin = authService.login('ganesh@plant.com', 'password123');
  assert(newLogin.success && newLogin.redirectUrl === '/customer/dashboard', 'Newly registered user can log in');

  // Profile Update
  const updatedProfile = authService.updateProfile(registered.id, {
    name: 'Ganesh T. (Senior Director)',
    phone: '9988770000',
  });
  assert(updatedProfile.name === 'Ganesh T. (Senior Director)', 'Profile update persists correctly');

  // TEST SUITE 3: Initial Seed Complaints & Statistics
  console.log('\n--- 3. Testing Complaints Service & Stats ---');
  const initialComplaints = complaintsService.getComplaints();
  assert(initialComplaints.length >= 3, `Initial seed complaints loaded: ${initialComplaints.length} found`);
  const initialStats = complaintsService.getStats();
  assert(initialStats.total >= 3, `Stats total calculated correctly: ${initialStats.total}`);
  assert(initialStats.submitted >= 0, `Stats submitted count: ${initialStats.submitted}`);

  // TEST SUITE 4: Complaint Submission Workflow
  console.log('\n--- 4. Testing User Complaint Submission & Token ---');
  const newComplaint = await complaintsService.submitComplaint({
    userId: userLogin.user.id,
    userName: userLogin.user.name,
    userEmail: userLogin.user.email,
    userPhone: userLogin.user.phone,
    title: 'Boiler Steam Pressure Relief Valve Jammed',
    category: 'Equipment Breakdown',
    description: 'Boiler safety valve sticking at 12 kg/cm2, causing automatic shutoff during peak drying cycle.',
    location: 'Boiler House 1, Tadepalligudem',
    images: ['data:image/png;base64,mockImageData123'],
    voiceRecording: 'data:audio/webm;base64,mockAudioData456',
  });

  assert(newComplaint.token.startsWith('RN-'), `Complaint token generated: ${newComplaint.token}`);
  assert(newComplaint.status === 'Submitted', 'Initial status is "Submitted"');
  assert(newComplaint.images.length === 1, 'Photographic image saved with complaint');
  assert(newComplaint.voiceRecording !== null, 'Voice recording audio saved with complaint');

  // Check admin visibility
  const allAfter = complaintsService.getComplaints();
  const foundInAdmin = allAfter.find((c) => c.token === newComplaint.token);
  assert(Boolean(foundInAdmin), 'Submitted complaint is visible in admin complaints list');

  // Check email notification in outbox
  const outbox = emailService.getOutbox();
  const mailRecord = outbox.find((m) => m.complaintToken === newComplaint.token);
  assert(Boolean(mailRecord), `Email notification found in outbox for ${newComplaint.token}`);
  assert(mailRecord?.status === 'delivered', 'Email notification delivery recorded');

  // TEST SUITE 5: Admin Status Update & Remarks
  console.log('\n--- 5. Testing Admin Status Update & Remarks ---');
  const updatedComplaint = complaintsService.updateComplaintStatus(
    newComplaint.token,
    'In Progress',
    'Specialist dispatched with replacement safety valve calibration kit.',
    'Operations Admin'
  );
  assert(updatedComplaint?.status === 'In Progress', 'Admin updated complaint status to "In Progress"');
  assert(
    updatedComplaint?.adminRemarks === 'Specialist dispatched with replacement safety valve calibration kit.',
    'Admin remarks saved successfully'
  );
  assert(updatedComplaint?.remarksHistory.length >= 2, 'Status history audit trail maintained');

  // User-Side Verification: Ensure user sees updated status and remarks
  const userView = complaintsService.getUserComplaints(userLogin.user.id);
  const userComplaintRecord = userView.find((c) => c.token === newComplaint.token);
  assert(userComplaintRecord?.status === 'In Progress', 'User sees updated "In Progress" status in their dashboard');
  assert(
    userComplaintRecord?.adminRemarks.includes('replacement safety valve'),
    'User sees latest admin remarks in their dashboard'
  );

  // TEST SUITE 6: Dynamic Service Management (Preserve 4 + Add 5th)
  console.log('\n--- 6. Testing Service Management (4 Existing + Dynamic 5th) ---');
  const allServices = servicesService.getAllServices();
  assert(allServices.length === 4, `Preserved exact 4 baseline services on init (found ${allServices.length})`);
  assert(allServices.some((s) => s.id === 'srv-001'), 'Baseline service srv-001 exists');
  assert(allServices.some((s) => s.id === 'srv-002'), 'Baseline service srv-002 exists');
  assert(allServices.some((s) => s.id === 'srv-003'), 'Baseline service srv-003 exists');
  assert(allServices.some((s) => s.id === 'srv-004'), 'Baseline service srv-004 exists');

  // Add 5th Service dynamically
  const fifthService = servicesService.addService({
    name: 'Disaster Emergency Flood Drainage Pumps',
    company: 'VPE Industrial Rescue Operations',
    locations: ['Tadepalligudem', 'West Godavari'],
    description: 'High-volume submersible dewatering pumps for monsoon flood mitigation in low-lying mills.',
    contactInfo: '+91 999-888-7777',
    status: 'active',
  });
  assert(fifthService.id === 'srv-005', `Fifth service generated unique ID: ${fifthService.id}`);

  const servicesAfterAdd = servicesService.getAllServices();
  assert(servicesAfterAdd.length === 5, 'Services catalog now contains 5 services without code modification');

  // Location-based visibility test
  const tadepalligudemServices = servicesService.getActiveServices('Tadepalligudem');
  assert(
    tadepalligudemServices.some((s) => s.id === 'srv-005'),
    'Fifth service is visible for Tadepalligudem user'
  );

  const visakhapatnamServices = servicesService.getActiveServices('Visakhapatnam');
  assert(
    !visakhapatnamServices.some((s) => s.id === 'srv-005'),
    'Fifth service is NOT visible for Visakhapatnam user (location restriction enforced)'
  );

  // Edit Service
  const edited = servicesService.updateService('srv-005', {
    company: 'VPE Rapid Flood Drainage Taskforce',
  });
  assert(edited?.company === 'VPE Rapid Flood Drainage Taskforce', 'Service company edited persistently');

  // Deactivate Service
  const deactivated = servicesService.toggleServiceStatus('srv-005');
  assert(deactivated?.status === 'inactive', 'Service deactivated successfully');
  const activeNow = servicesService.getActiveServices('Tadepalligudem');
  assert(!activeNow.some((s) => s.id === 'srv-005'), 'Deactivated service is hidden from active user services');

  // Historical records preserved
  const allHistory = servicesService.getAllServices();
  assert(allHistory.some((s) => s.id === 'srv-005'), 'Deactivated service is retained in admin master catalog');

  console.log(`\n=== ALL TESTS COMPLETED: ${passedTests}/${totalTests} PASSED ===\n`);
  if (passedTests === totalTests) {
    console.log('SUCCESS: All functional requirements verified!');
  } else {
    console.error('FAILURE: Some tests did not pass.');
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error('Test execution error:', e);
  process.exit(1);
});
