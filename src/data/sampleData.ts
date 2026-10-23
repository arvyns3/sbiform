import { SbiFormData } from '../types/formTypes';

// Clean SVG-generated base64 PNG/data URLs for signature and photo
// Sample transparent stylish signature SVG data URL
export const SAMPLE_SIGNATURE_DATA_URL =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="120" viewBox="0 0 320 120">
  <path d="M 30,85 C 50,20 70,15 80,65 C 85,85 105,45 125,55 C 145,65 140,85 160,50 C 180,20 175,70 205,60 C 225,50 240,65 260,55 M 35,95 Q 160,90 280,75 M 150,88 L 190,82"
        fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`);

// Sample professional passport photo data URL
export const SAMPLE_PHOTO_DATA_URL =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="160" height="200" viewBox="0 0 160 200">
  <rect width="160" height="200" fill="#e2e8f0"/>
  <!-- Light studio gradient backdrop -->
  <circle cx="80" cy="72" r="38" fill="#cbd5e1"/>
  <!-- Head & Hair -->
  <ellipse cx="80" cy="72" rx="30" ry="36" fill="#f8d7b8"/>
  <path d="M 50,65 Q 80,30 110,65 Q 100,45 80,45 Q 60,45 50,65 Z" fill="#2d3748"/>
  <!-- Eyes & Eyebrows -->
  <circle cx="70" cy="70" r="3" fill="#2d3748"/>
  <circle cx="90" cy="70" r="3" fill="#2d3748"/>
  <path d="M 64,64 Q 70,61 76,64" stroke="#2d3748" stroke-width="1.5" fill="none"/>
  <path d="M 84,64 Q 90,61 96,64" stroke="#2d3748" stroke-width="1.5" fill="none"/>
  <!-- Nose & Smile -->
  <path d="M 80,72 L 78,80 L 82,80" stroke="#d49a6a" stroke-width="1.2" fill="none"/>
  <path d="M 74,88 Q 80,93 86,88" stroke="#a14949" stroke-width="1.5" fill="none"/>
  <!-- Formal Collar & Suit -->
  <path d="M 30,190 L 30,150 Q 80,120 130,150 L 130,190 Z" fill="#1e293b"/>
  <polygon points="80,125 65,160 95,160" fill="#ffffff"/>
  <polygon points="80,135 77,180 83,180" fill="#dc2626"/>
  <!-- Border -->
  <rect x="1" y="1" width="158" height="198" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
</svg>
`);

export const EMPTY_FORM_DATA: SbiFormData = {
  applicationDate: '',
  branchName: '',
  branchCode: '',
  customerId: '',
  accountNumber: '',
  ckycNumber: '',
  applicationType: 'new',
  accountType: 'normal',
  pfNumber: '',

  salutation: 'Mr',
  firstName: '',
  middleName: '',
  lastName: '',
  dob: '',
  gender: 'male',
  maritalStatus: 'unmarried',
  dependentsCount: '0',
  relativeType: 'father',
  relativeFirstName: '',
  relativeMiddleName: '',
  relativeLastName: '',
  minorGuardianName: '',
  minorGuardianRelationship: '',
  nationality: 'indian',
  countryName: 'INDIA',
  citizenship: 'INDIAN',
  occupationType: 'pvt',
  employeeId: '',
  organizationName: '',
  designation: '',
  natureOfBusiness: '',
  annualIncome: '',
  netWorth: '',
  sourceOfFunds: 'salary',
  religion: 'hindu',
  category: 'general',
  personWithDisability: 'no',
  disabilityType: '',
  education: 'graduate',
  pep: 'none',
  taxResidenceIndiaOnly: 'yes',
  pan: '',

  mobileNumber: '',
  emailId: '',
  mobileBelongsTo: 'self',

  idProofType: 'aadhaar',
  idDocumentNo: '',
  idIssuedBy: 'UIDAI',
  idIssueDate: '',
  idExpiryDate: '',

  addressType: 'residential_business',
  addressLine1: '',
  addressLine2: '',
  cityVillage: '',
  district: '',
  state: '',
  pincode: '',
  country: 'INDIA',

  sameAsCurrentAddress: true,
  corrAddressType: 'residential_business',
  corrAddressLine1: '',
  corrAddressLine2: '',
  corrCityVillage: '',
  corrDistrict: '',
  corrState: '',
  corrPincode: '',
  corrCountry: 'INDIA',

  aadhaarConsent: 'yes',
  photoDataUrl: '',
  signatureDataUrl: '',
  place: '',
  signatureDate: '',

  accountCategory: 'savings',
  modeOfOperation: 'self',
  atmCardRequired: true,
  cardApplicant: '1st',
  cardType: 'rupay',
  cardFormat: 'physical',
  nameOnCard: '',
  chequeBookRequired: true,
  internetBankingRequired: true,
  transactionRightsRequired: true,
  smsAlertsRequired: true,
  mobileBankingRequired: true,
  passbookRequired: true,
  eStatementRequired: true,
  whatsappAlertsRequired: true,
  emailAlertsRequired: true,

  hasTermDeposit: false,
  termDepositType: 'term',
  termDepositAmount: '',
  termDepositAmountInWords: '',
  termDepositYears: '',
  termDepositMonths: '',
  termDepositDays: '',
  interestPayout: 'quarterly',

  nominationOpted: true,
  depositorName: '',
  nomineeName: '',
  nomineeAddress: '',
  nomineeMobile: '',
  nomineeRelationship: '',
  nomineeAge: '',
  nomineeProportion: '100',
  nomineeIsMinor: false,
  guardianName: '',
  guardianRelationship: '',
  guardianAddress: '',
  guardianMobile: '',

  cityOfBirth: '',
  countryOfBirth: 'INDIA',
  foreignTaxResidence: '',
  foreignTin: ''
};

export const SAMPLE_SBI_FORM_DATA: SbiFormData = {
  // Page 1
  applicationDate: '22102026',
  branchName: 'NARIMAN POINT',
  branchCode: '00214',
  customerId: '874592014',
  accountNumber: '39482015849',
  ckycNumber: '50029481739281',
  applicationType: 'new',
  accountType: 'normal',
  pfNumber: '',

  // Section A
  salutation: 'Mr',
  firstName: 'RAJESH',
  middleName: 'KUMAR',
  lastName: 'SHARMA',
  dob: '14081988',
  gender: 'male',
  maritalStatus: 'married',
  dependentsCount: '2',
  relativeType: 'father',
  relativeFirstName: 'RAMESH',
  relativeMiddleName: 'CHANDRA',
  relativeLastName: 'SHARMA',
  minorGuardianName: '',
  minorGuardianRelationship: '',
  nationality: 'indian',
  countryName: 'INDIA',
  citizenship: 'INDIAN',
  occupationType: 'pvt',
  employeeId: 'EMP-98201',
  organizationName: 'TATA CONSULTANCY SERVICES LTD',
  designation: 'SENIOR SYSTEMS ARCHITECT',
  natureOfBusiness: 'INFORMATION TECHNOLOGY SERVICES',
  annualIncome: '1850000',
  netWorth: '4500000',
  sourceOfFunds: 'salary',
  religion: 'hindu',
  category: 'general',
  personWithDisability: 'no',
  disabilityType: '',
  education: 'engineering',
  pep: 'none',
  taxResidenceIndiaOnly: 'yes',
  pan: 'ABCPS1234K',

  // Section B
  mobileNumber: '9820145678',
  emailId: 'rajesh.sharma88@email.com',
  mobileBelongsTo: 'self',

  // Page 2: Section C
  idProofType: 'aadhaar',
  idDocumentNo: '482019485721',
  idIssuedBy: 'UIDAI',
  idIssueDate: '12052019',
  idExpiryDate: '01012099',

  // Section D
  addressType: 'residential',
  addressLine1: 'FLAT 402, SEA GREEN APARTMENTS',
  addressLine2: 'NETAJI SUBHASH ROAD, MARINE DRIVE',
  cityVillage: 'MUMBAI',
  district: 'MUMBAI CITY',
  state: 'MAHARASHTRA',
  pincode: '400020',
  country: 'INDIA',

  // Section E
  sameAsCurrentAddress: true,
  corrAddressType: 'residential',
  corrAddressLine1: 'FLAT 402, SEA GREEN APARTMENTS',
  corrAddressLine2: 'NETAJI SUBHASH ROAD, MARINE DRIVE',
  corrCityVillage: 'MUMBAI',
  corrDistrict: 'MUMBAI CITY',
  corrState: 'MAHARASHTRA',
  corrPincode: '400020',
  corrCountry: 'INDIA',

  // Section G
  aadhaarConsent: 'yes',
  photoDataUrl: SAMPLE_PHOTO_DATA_URL,
  signatureDataUrl: '',
  place: 'MUMBAI',
  signatureDate: '22102026',

  // Page 3: Part II
  accountCategory: 'savings',
  modeOfOperation: 'self',
  atmCardRequired: true,
  cardApplicant: '1st',
  cardType: 'rupay',
  cardFormat: 'physical',
  nameOnCard: 'RAJESH K SHARMA',
  chequeBookRequired: true,
  internetBankingRequired: true,
  transactionRightsRequired: true,
  smsAlertsRequired: true,
  mobileBankingRequired: true,
  passbookRequired: true,
  eStatementRequired: true,
  whatsappAlertsRequired: true,
  emailAlertsRequired: true,

  hasTermDeposit: false,
  termDepositType: 'term',
  termDepositAmount: '50000',
  termDepositAmountInWords: 'FIFTY THOUSAND ONLY',
  termDepositYears: '1',
  termDepositMonths: '0',
  termDepositDays: '0',
  interestPayout: 'quarterly',

  // Page 4: Section F
  nominationOpted: true,
  depositorName: 'RAJESH KUMAR SHARMA',
  nomineeName: 'SNEHA RAJESH SHARMA',
  nomineeAddress: 'FLAT 402, SEA GREEN APTS, MARINE DRIVE, MUMBAI',
  nomineeMobile: '9820145679',
  nomineeRelationship: 'SPOUSE',
  nomineeAge: '34',
  nomineeProportion: '100%',
  nomineeIsMinor: false,
  guardianName: '',
  guardianRelationship: '',
  guardianAddress: '',
  guardianMobile: '',

  // Page 7
  cityOfBirth: 'MUMBAI',
  countryOfBirth: 'INDIA',
  foreignTaxResidence: '',
  foreignTin: ''
};
