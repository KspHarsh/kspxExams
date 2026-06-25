// Sample data for development - used when Firebase is not configured
export const sampleExams = [
  {
    id: '1',
    title: 'SSC CGL 2026',
    category: 'SSC',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
    description: 'Staff Selection Commission Combined Graduate Level Examination 2026. Apply online for various Group B and Group C posts in Ministries/Departments/Organizations.',
    importantDates: {
      applicationStart: '2026-03-01',
      applicationEnd: '2026-04-15',
      examDate: '2026-07-10',
      admitCardDate: '2026-06-25',
      resultDate: '2026-09-15'
    },
    eligibility: 'Graduate from a recognized University. Age: 18-32 years.',
    vacancy: '20000+',
    salary: '₹25,500 - ₹81,100 (Level 4 to Level 7)',
    selectionProcess: 'Tier 1 (CBT) → Tier 2 (CBT) → Document Verification',
    applyLink: 'https://ssc.nic.in',
    notificationPDF: 'https://ssc.nic.in/pdf/cgl2026.pdf',
    applicationFee: { general: '₹100', scst: 'Nil', female: 'Nil' },
    status: 'Active',
    featured: true,
    trending: true,
    pinned: true,
    createdAt: new Date('2026-02-28')
  },
  {
    id: '2',
    title: 'IBPS PO 2026',
    category: 'Banking',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop',
    description: 'Institute of Banking Personnel Selection Probationary Officer/Management Trainee Exam 2026.',
    importantDates: {
      applicationStart: '2026-04-01',
      applicationEnd: '2026-05-01',
      examDate: '2026-10-15',
      admitCardDate: '2026-10-01',
      resultDate: '2026-12-20'
    },
    eligibility: 'Graduate in any discipline. Age: 20-30 years.',
    vacancy: '4500+',
    salary: '₹36,000 - ₹63,840 (Basic Pay)',
    selectionProcess: 'Prelims → Mains → Interview',
    applyLink: 'https://ibps.in',
    notificationPDF: 'https://ibps.in/pdf/po2026.pdf',
    applicationFee: { general: '₹850', scst: '₹175', female: '₹175' },
    status: 'Active',
    featured: true,
    trending: true,
    pinned: false,
    createdAt: new Date('2026-03-05')
  },
  {
    id: '3',
    title: 'RRB NTPC 2026',
    category: 'Railway',
    imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&h=250&fit=crop',
    description: 'Railway Recruitment Board Non-Technical Popular Categories Exam 2026 for various posts.',
    importantDates: {
      applicationStart: '2026-03-15',
      applicationEnd: '2026-04-30',
      examDate: '2026-08-20',
      admitCardDate: '2026-08-05',
      resultDate: '2026-11-10'
    },
    eligibility: 'Graduate/12th Pass (varies by post). Age: 18-33 years.',
    vacancy: '35000+',
    salary: '₹19,900 - ₹63,200',
    selectionProcess: 'CBT 1 → CBT 2 → Typing/CBAT → Document Verification',
    applyLink: 'https://rrbapply.gov.in',
    notificationPDF: 'https://rrbapply.gov.in/pdf/ntpc2026.pdf',
    applicationFee: { general: '₹500', scst: '₹250', female: '₹250' },
    status: 'Active',
    featured: false,
    trending: true,
    pinned: false,
    createdAt: new Date('2026-03-10')
  },
  {
    id: '4',
    title: 'NDA Exam 2026',
    category: 'Defence',
    imageUrl: 'https://images.unsplash.com/photo-1579912437766-7896df6d3cd3?w=400&h=250&fit=crop',
    description: 'National Defence Academy & Naval Academy Examination 2026 conducted by UPSC.',
    importantDates: {
      applicationStart: '2026-01-10',
      applicationEnd: '2026-02-10',
      examDate: '2026-04-14',
      admitCardDate: '2026-03-30',
      resultDate: '2026-06-15'
    },
    eligibility: '12th Pass (Science stream for Navy/Air Force). Age: 16.5-19.5 years. Unmarried Males only.',
    vacancy: '400',
    salary: '₹56,100 (Level 10) after training',
    selectionProcess: 'Written Exam → SSB Interview → Medical',
    applyLink: 'https://upsc.gov.in',
    notificationPDF: 'https://upsc.gov.in/pdf/nda2026.pdf',
    applicationFee: { general: '₹100', scst: 'Nil', female: 'N/A' },
    status: 'Active',
    featured: true,
    trending: false,
    pinned: false,
    createdAt: new Date('2026-01-05')
  },
  {
    id: '5',
    title: 'CTET 2026',
    category: 'Teaching',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop',
    description: 'Central Teacher Eligibility Test 2026 for Primary and Upper Primary Level Teachers.',
    importantDates: {
      applicationStart: '2026-05-01',
      applicationEnd: '2026-06-01',
      examDate: '2026-08-10',
      admitCardDate: '2026-07-25',
      resultDate: '2026-09-30'
    },
    eligibility: 'D.El.Ed / B.Ed with 50% marks in graduation. No upper age limit.',
    vacancy: 'Eligibility Certificate',
    salary: '₹35,400 - ₹1,12,400 (Varies by state)',
    selectionProcess: 'Paper 1 (Primary) / Paper 2 (Upper Primary)',
    applyLink: 'https://ctet.nic.in',
    notificationPDF: 'https://ctet.nic.in/pdf/ctet2026.pdf',
    applicationFee: { general: '₹1,000', scst: '₹500', female: '₹500' },
    status: 'Upcoming',
    featured: false,
    trending: false,
    pinned: false,
    createdAt: new Date('2026-03-12')
  },
  {
    id: '6',
    title: 'SBI Clerk 2026',
    category: 'Banking',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
    description: 'State Bank of India Junior Associate (Clerk) Recruitment 2026 for clerical cadre posts.',
    importantDates: {
      applicationStart: '2026-04-10',
      applicationEnd: '2026-05-10',
      examDate: '2026-07-25',
      admitCardDate: '2026-07-10',
      resultDate: '2026-09-05'
    },
    eligibility: 'Graduate from a recognized University. Age: 20-28 years.',
    vacancy: '8000+',
    salary: '₹26,730 - ₹48,270',
    selectionProcess: 'Prelims → Mains → Local Language Test',
    applyLink: 'https://sbi.co.in/careers',
    notificationPDF: 'https://sbi.co.in/pdf/clerk2026.pdf',
    applicationFee: { general: '₹750', scst: 'Nil', female: 'Nil' },
    status: 'Active',
    featured: false,
    trending: true,
    pinned: false,
    createdAt: new Date('2026-03-08')
  },
  {
    id: '7',
    title: 'GATE 2026',
    category: 'Engineering',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop',
    description: 'Graduate Aptitude Test in Engineering 2026 for admission to M.Tech/M.E. programs and PSU recruitment.',
    importantDates: {
      applicationStart: '2025-09-01',
      applicationEnd: '2025-10-15',
      examDate: '2026-02-08',
      admitCardDate: '2026-01-15',
      resultDate: '2026-03-20'
    },
    eligibility: 'B.E./B.Tech or equivalent. No age limit.',
    vacancy: 'Score-based qualification',
    salary: 'PSU jobs: ₹40,000 - ₹1,80,000',
    selectionProcess: 'CBT Exam → Score → PSU/M.Tech admission',
    applyLink: 'https://gate.iitb.ac.in',
    notificationPDF: 'https://gate.iitb.ac.in/pdf/gate2026.pdf',
    applicationFee: { general: '₹1,700', scst: '₹850', female: '₹850' },
    status: 'Result Declared',
    featured: false,
    trending: false,
    pinned: false,
    createdAt: new Date('2025-08-25')
  },
  {
    id: '8',
    title: 'NEET UG 2026',
    category: 'Medical',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop',
    description: 'National Eligibility cum Entrance Test (UG) 2026 for MBBS/BDS/AYUSH admissions.',
    importantDates: {
      applicationStart: '2026-02-15',
      applicationEnd: '2026-03-20',
      examDate: '2026-05-04',
      admitCardDate: '2026-04-20',
      resultDate: '2026-06-10'
    },
    eligibility: '12th Pass with PCB. Age: 17 years minimum.',
    vacancy: '1,08,000+ MBBS seats',
    salary: 'Varies (Medical profession)',
    selectionProcess: 'OMR-based Exam → Counselling → Admission',
    applyLink: 'https://neet.nta.nic.in',
    notificationPDF: 'https://neet.nta.nic.in/pdf/neetug2026.pdf',
    applicationFee: { general: '₹1,700', scst: '₹1,000', female: '₹1,000' },
    status: 'Active',
    featured: true,
    trending: true,
    pinned: false,
    createdAt: new Date('2026-02-10')
  },
  {
    id: '9',
    title: 'UPPSC PCS 2026',
    category: 'State Govt',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=400&h=250&fit=crop',
    description: 'Uttar Pradesh Public Service Commission Provincial Civil Service Exam 2026.',
    importantDates: {
      applicationStart: '2026-06-01',
      applicationEnd: '2026-07-05',
      examDate: '2026-09-28',
      admitCardDate: '2026-09-15',
      resultDate: '2027-01-15'
    },
    eligibility: 'Graduate from a recognized University. Age: 21-40 years.',
    vacancy: '550+',
    salary: '₹56,100 - ₹1,77,500',
    selectionProcess: 'Prelims → Mains → Interview',
    applyLink: 'https://uppsc.up.nic.in',
    notificationPDF: 'https://uppsc.up.nic.in/pdf/pcs2026.pdf',
    applicationFee: { general: '₹125', scst: '₹65', female: '₹65' },
    status: 'Upcoming',
    featured: false,
    trending: false,
    pinned: false,
    createdAt: new Date('2026-03-14')
  }
];

export const sampleCategories = [
  { id: '1', name: 'Banking', slug: 'banking', icon: '🏦', color: 'from-blue-500 to-blue-700', count: 12 },
  { id: '2', name: 'SSC', slug: 'ssc', icon: '📋', color: 'from-indigo-500 to-indigo-700', count: 8 },
  { id: '3', name: 'Railway', slug: 'railway', icon: '🚂', color: 'from-green-500 to-green-700', count: 6 },
  { id: '4', name: 'Defence', slug: 'defence', icon: '🎖️', color: 'from-red-500 to-red-700', count: 5 },
  { id: '5', name: 'Teaching', slug: 'teaching', icon: '📚', color: 'from-purple-500 to-purple-700', count: 4 },
  { id: '6', name: 'State Govt', slug: 'state-govt', icon: '🏛️', color: 'from-teal-500 to-teal-700', count: 10 },
  { id: '7', name: 'Engineering', slug: 'engineering', icon: '⚙️', color: 'from-orange-500 to-orange-700', count: 7 },
  { id: '8', name: 'Medical', slug: 'medical', icon: '🏥', color: 'from-pink-500 to-pink-700', count: 3 },
];

export const sampleResults = [
  { id: '1', title: 'SSC CHSL 2025 Result', date: '2026-03-10', status: 'Declared' },
  { id: '2', title: 'IBPS Clerk 2025 Mains Result', date: '2026-03-08', status: 'Declared' },
  { id: '3', title: 'RRB Group D 2025 Result', date: '2026-03-05', status: 'Declared' },
  { id: '4', title: 'GATE 2026 Result', date: '2026-03-20', status: 'Upcoming' },
  { id: '5', title: 'CTET Dec 2025 Result', date: '2026-02-28', status: 'Declared' },
];

export const sampleAdmitCards = [
  { id: '1', title: 'NDA 2026 Admit Card', date: '2026-03-30', status: 'Available' },
  { id: '2', title: 'SSC CGL 2026 Tier 1 Admit Card', date: '2026-06-25', status: 'Upcoming' },
  { id: '3', title: 'NEET UG 2026 Admit Card', date: '2026-04-20', status: 'Upcoming' },
  { id: '4', title: 'IBPS PO 2025 Mains Admit Card', date: '2026-03-12', status: 'Available' },
  { id: '5', title: 'SBI PO 2026 Prelims Admit Card', date: '2026-04-05', status: 'Upcoming' },
];

export const statusColors = {
  'Active': 'badge-success',
  'Upcoming': 'badge-warning',
  'Expired': 'badge-danger',
  'Result Declared': 'badge-primary',
  'Draft': 'badge-warning',
  'Declared': 'badge-success',
  'Available': 'badge-success',
};

export const getCategoryColor = (category) => {
  const cat = sampleCategories.find(c => c.name === category);
  return cat?.color || 'from-gray-500 to-gray-700';
};
