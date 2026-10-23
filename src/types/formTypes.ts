export interface SbiFormData {
  // Page 1: Branch & Office Info
  applicationDate: string; // DDMMYYYY
  branchName: string;
  branchCode: string;
  customerId: string;
  accountNumber: string;
  ckycNumber: string;
  applicationType: 'new' | 'update';
  accountType: 'normal' | 'small' | 'minor' | 'staff';
  pfNumber: string;

  // Page 1: Section A - Personal Details
  salutation: 'Mr' | 'Ms' | 'Mrs' | 'Dr';
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string; // DDMMYYYY
  gender: 'male' | 'female' | 'third';
  maritalStatus: 'married' | 'unmarried' | 'others';
  dependentsCount: string;
  relativeType: 'father' | 'mother' | 'spouse';
  relativeFirstName: string;
  relativeMiddleName: string;
  relativeLastName: string;
  minorGuardianName: string;
  minorGuardianRelationship: string;
  nationality: 'indian' | 'others';
  countryName: string;
  citizenship: string;
  occupationType:
    | 'pvt'
    | 'state_govt'
    | 'central_govt'
    | 'psu'
    | 'defence'
    | 'business'
    | 'other_self'
    | 'student'
    | 'housewife'
    | 'retired'
    | 'professional';
  employeeId: string;
  organizationName: string;
  designation: string;
  natureOfBusiness: string;
  annualIncome: string;
  netWorth: string;
  sourceOfFunds: 'salary' | 'business' | 'agriculture' | 'investment' | 'pension' | 'others';
  religion: 'hindu' | 'muslim' | 'christian' | 'sikh' | 'others';
  category: 'general' | 'obc' | 'sc' | 'st';
  personWithDisability: 'yes' | 'no';
  disabilityType: string;
  education:
    | 'graduate'
    | 'post_graduate'
    | 'engineering'
    | 'law'
    | 'medical'
    | 'ca_mba'
    | 'computer'
    | '10th'
    | 'other';
  pep: 'none' | 'pep' | 'related';
  taxResidenceIndiaOnly: 'yes' | 'no';
  pan: string;

  // Page 1: Section B - Contact Details
  mobileNumber: string;
  emailId: string;
  mobileBelongsTo: 'self' | 'father' | 'mother' | 'spouse' | 'son' | 'daughter';

  // Page 2: Section C - Proof of Identity / Address
  idProofType: 'aadhaar' | 'passport' | 'voter' | 'driving' | 'nrega';
  idDocumentNo: string;
  idIssuedBy: string;
  idIssueDate: string; // DDMMYYYY
  idExpiryDate: string; // DDMMYYYY

  // Page 2: Section D - Current Address
  addressType: 'residential_business' | 'residential' | 'business' | 'registered' | 'unspecified';
  addressLine1: string;
  addressLine2: string;
  cityVillage: string;
  district: string;
  state: string;
  pincode: string;
  country: string;

  // Page 2: Section E - Correspondence Address
  sameAsCurrentAddress: boolean;
  corrAddressType: 'residential_business' | 'residential' | 'business' | 'registered' | 'unspecified';
  corrAddressLine1: string;
  corrAddressLine2: string;
  corrCityVillage: string;
  corrDistrict: string;
  corrState: string;
  corrPincode: string;
  corrCountry: string;

  // Page 2: Section G - Declaration, Photo & Signature
  aadhaarConsent: 'yes' | 'no';
  photoDataUrl: string; // base64 jpeg/png
  signatureDataUrl: string; // base64 png
  place: string;
  signatureDate: string; // DDMMYYYY

  // Page 3: Account & Services (Part II)
  accountCategory: 'savings' | 'bsbda' | 'small' | 'current' | 'fixed_deposit' | 'savings_plus';
  modeOfOperation: 'self' | 'either_or_survivor' | 'former_or_survivor' | 'any_one' | 'jointly';
  atmCardRequired: boolean;
  cardApplicant: '1st' | '2nd' | 'both';
  cardType: 'rupay' | 'visa' | 'master';
  cardFormat: 'physical' | 'virtual';
  nameOnCard: string;
  chequeBookRequired: boolean;
  internetBankingRequired: boolean;
  transactionRightsRequired: boolean;
  smsAlertsRequired: boolean;
  mobileBankingRequired: boolean;
  passbookRequired: boolean;
  eStatementRequired: boolean;
  whatsappAlertsRequired: boolean;
  emailAlertsRequired: boolean;

  // Page 3: Optional Term Deposit / MOD details
  hasTermDeposit: boolean;
  termDepositType: 'term' | 'reinvestment' | 'annuity' | 'tax_saving';
  termDepositAmount: string;
  termDepositAmountInWords: string;
  termDepositYears: string;
  termDepositMonths: string;
  termDepositDays: string;
  interestPayout: 'monthly' | 'quarterly' | 'yearly';

  // Page 4: Section F - Nomination Details
  nominationOpted: boolean;
  depositorName: string;
  nomineeName: string;
  nomineeAddress: string;
  nomineeMobile: string;
  nomineeRelationship: string;
  nomineeAge: string;
  nomineeProportion: string;
  nomineeIsMinor: boolean;
  guardianName: string;
  guardianRelationship: string;
  guardianAddress: string;
  guardianMobile: string;

  // Page 7: FATCA details
  cityOfBirth: string;
  countryOfBirth: string;
  foreignTaxResidence: string;
  foreignTin: string;
}

export type InkColor = 'blue' | 'black';

export interface FieldCoordinate {
  id: string;
  page: number;
  label: string;
  type: 'box_text' | 'line_text' | 'checkbox' | 'image';
  x: number;
  y: number;
  stepX?: number;
  width?: number;
  height?: number;
  fontSize?: number;
}
