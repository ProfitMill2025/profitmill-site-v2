// ============================================
// 100% CLIENT-SIDE — NO DATA LEAVES THE BROWSER
// ============================================

// ===== TYPES =====
export type FieldType =
  | 'email' | 'phone' | 'firstName' | 'lastName' | 'fullName'
  | 'companyName' | 'companyDomain' | 'jobTitle' | 'industry'
  | 'fullAddress' | 'street' | 'city' | 'state' | 'zip' | 'country'
  | 'linkedinUrl' | 'twitterHandle' | 'dob' | 'gender' | 'ignore';

export interface ColumnMapping {
  sourceColumn: string;
  fieldType: FieldType;
  confidence: number; // 0-1
}

export interface PlatformFormat {
  id: string;
  name: string;
  description: string;
  fields: { key: string; label: string; required: boolean }[];
}

// ===== PLATFORM FORMAT DEFINITIONS =====
export const platformFormats: PlatformFormat[] = [
  {
    id: 'google_customer_match',
    name: 'Google Customer Match',
    description: 'Upload to Google Ads for Search, Display, YouTube, Gmail targeting',
    fields: [
      { key: 'Email', label: 'Email', required: false },
      { key: 'Phone', label: 'Phone (+E.164)', required: false },
      { key: 'First Name', label: 'First Name', required: false },
      { key: 'Last Name', label: 'Last Name', required: false },
      { key: 'Country', label: 'Country (ISO 2)', required: false },
      { key: 'Zip', label: 'Zip Code', required: false },
    ],
  },
  {
    id: 'linkedin_company',
    name: 'LinkedIn Company List',
    description: 'ABM targeting — reach employees at specific companies',
    fields: [
      { key: 'companyname', label: 'Company Name', required: true },
      { key: 'companywebsite', label: 'Website Domain', required: false },
      { key: 'companyemaildomains', label: 'Email Domain', required: false },
      { key: 'linkedincompanypageurl', label: 'LinkedIn Page URL', required: false },
      { key: 'industry', label: 'Industry', required: false },
      { key: 'city', label: 'City', required: false },
      { key: 'state', label: 'State/Province', required: false },
      { key: 'country', label: 'Country', required: false },
      { key: 'zip', label: 'Zip Code', required: false },
    ],
  },
  {
    id: 'linkedin_contact',
    name: 'LinkedIn Contact List',
    description: 'Target specific individuals on LinkedIn by email',
    fields: [
      { key: 'email', label: 'Email', required: true },
      { key: 'firstname', label: 'First Name', required: false },
      { key: 'lastname', label: 'Last Name', required: false },
      { key: 'jobtitle', label: 'Job Title', required: false },
      { key: 'companyname', label: 'Company Name', required: false },
      { key: 'country', label: 'Country', required: false },
    ],
  },
  {
    id: 'meta_custom_audience',
    name: 'Meta Custom Audience',
    description: 'Upload to Meta Ads for Facebook & Instagram targeting',
    fields: [
      { key: 'email', label: 'Email', required: false },
      { key: 'phone', label: 'Phone', required: false },
      { key: 'fn', label: 'First Name', required: false },
      { key: 'ln', label: 'Last Name', required: false },
      { key: 'ct', label: 'City', required: false },
      { key: 'st', label: 'State (2-letter)', required: false },
      { key: 'zip', label: 'Zip Code', required: false },
      { key: 'country', label: 'Country (ISO 2)', required: false },
      { key: 'dob', label: 'DOB (YYYYMMDD)', required: false },
      { key: 'gen', label: 'Gender (m/f)', required: false },
    ],
  },
  {
    id: 'reddit_custom_audience',
    name: 'Reddit Custom Audience',
    description: 'Upload emails for Reddit Ads targeting',
    fields: [
      { key: 'email', label: 'Email', required: true },
    ],
  },
  {
    id: 'x_custom_audience',
    name: 'X (Twitter) Custom Audience',
    description: 'Upload emails, phone numbers, or @handles for X Ads',
    fields: [
      { key: 'email', label: 'Email', required: false },
      { key: 'phone', label: 'Phone', required: false },
      { key: 'handle', label: '@Handle', required: false },
    ],
  },
];

// ===== COLUMN AUTO-DETECTION =====
const fieldPatterns: { type: FieldType; headerPatterns: RegExp[]; dataPattern?: RegExp }[] = [
  {
    type: 'email',
    headerPatterns: [/e[-_]?mail/i, /email[-_]?addr/i, /^e[-_]?mail$/i],
    dataPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  {
    type: 'phone',
    headerPatterns: [/phone/i, /mobile/i, /cell/i, /tel(?:ephone)?/i, /fax/i],
    dataPattern: /^[\+]?[\d\s\-\(\)\.]{7,}$/,
  },
  {
    type: 'firstName',
    headerPatterns: [/^first[-_\s]?name$/i, /^fname$/i, /^given[-_\s]?name$/i, /^first$/i],
  },
  {
    type: 'lastName',
    headerPatterns: [/^last[-_\s]?name$/i, /^lname$/i, /^sur[-_]?name$/i, /^family[-_\s]?name$/i, /^last$/i],
  },
  {
    type: 'fullName',
    headerPatterns: [/^full[-_\s]?name$/i, /^name$/i, /^contact[-_\s]?name$/i, /^person$/i],
  },
  {
    type: 'companyName',
    headerPatterns: [/company/i, /organization/i, /org[-_\s]?name/i, /employer/i, /account[-_\s]?name/i, /business/i],
  },
  {
    type: 'companyDomain',
    headerPatterns: [/domain/i, /website/i, /web[-_\s]?site/i, /url/i, /company[-_\s]?url/i],
    dataPattern: /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/.*)?$/i,
  },
  {
    type: 'jobTitle',
    headerPatterns: [/title/i, /job[-_\s]?title/i, /position/i, /role/i, /designation/i],
  },
  {
    type: 'industry',
    headerPatterns: [/industry/i, /sector/i, /vertical/i],
  },
  {
    type: 'fullAddress',
    headerPatterns: [/^address$/i, /^full[-_\s]?address$/i, /^mailing[-_\s]?address$/i, /^location$/i],
  },
  {
    type: 'street',
    headerPatterns: [/street/i, /address[-_\s]?1/i, /address[-_\s]?line/i, /addr1/i],
  },
  {
    type: 'city',
    headerPatterns: [/^city$/i, /^town$/i, /^municipality$/i],
  },
  {
    type: 'state',
    headerPatterns: [/^state$/i, /^province$/i, /^region$/i, /^st$/i],
  },
  {
    type: 'zip',
    headerPatterns: [/zip/i, /postal/i, /post[-_\s]?code/i, /^zip[-_\s]?code$/i],
    dataPattern: /^\d{4,10}(-\d{4})?$/,
  },
  {
    type: 'country',
    headerPatterns: [/country/i, /nation/i, /country[-_\s]?code/i],
  },
  {
    type: 'linkedinUrl',
    headerPatterns: [/linkedin/i, /li[-_\s]?url/i, /li[-_\s]?profile/i],
    dataPattern: /linkedin\.com/i,
  },
  {
    type: 'twitterHandle',
    headerPatterns: [/twitter/i, /x[-_\s]?handle/i, /handle/i, /^@/],
    dataPattern: /^@?[a-zA-Z0-9_]{1,15}$/,
  },
  {
    type: 'dob',
    headerPatterns: [/birth/i, /dob/i, /date[-_\s]?of[-_\s]?birth/i, /birthday/i],
  },
  {
    type: 'gender',
    headerPatterns: [/gender/i, /sex/i, /^gen$/i],
    dataPattern: /^(m|f|male|female|man|woman|other)$/i,
  },
];

export function autoDetectColumns(headers: string[], sampleRows: string[][]): ColumnMapping[] {
  return headers.map((header, colIdx) => {
    let bestType: FieldType = 'ignore';
    let bestConfidence = 0;

    // Check header patterns
    for (const fp of fieldPatterns) {
      for (const pattern of fp.headerPatterns) {
        if (pattern.test(header.trim())) {
          const confidence = 0.85;
          if (confidence > bestConfidence) {
            bestType = fp.type;
            bestConfidence = confidence;
          }
        }
      }
    }

    // If no header match, check data patterns
    if (bestConfidence < 0.5 && sampleRows.length > 0) {
      for (const fp of fieldPatterns) {
        if (fp.dataPattern) {
          const matchCount = sampleRows.filter(
            (row) => row[colIdx] && fp.dataPattern!.test(row[colIdx].trim())
          ).length;
          const confidence = matchCount / sampleRows.length;
          if (confidence > 0.5 && confidence > bestConfidence) {
            bestType = fp.type;
            bestConfidence = confidence * 0.7; // data-based is less certain
          }
        }
      }
    }

    return { sourceColumn: header, fieldType: bestType, confidence: bestConfidence };
  });
}

// ===== SMART PARSING FUNCTIONS =====
const honorifics = /^(mr\.?|mrs\.?|ms\.?|miss|dr\.?|prof\.?|rev\.?)\s+/i;
const suffixes = /\s+(jr\.?|sr\.?|iii|iv|ii|phd|md|esq\.?|dds|do|rn|cpa)$/i;

export function splitFullName(fullName: string): { firstName: string; lastName: string } {
  if (!fullName || !fullName.trim()) return { firstName: '', lastName: '' };

  let name = fullName.trim();
  // Remove honorifics
  name = name.replace(honorifics, '');
  // Extract and preserve suffixes
  let suffix = '';
  const suffixMatch = name.match(suffixes);
  if (suffixMatch) {
    suffix = suffixMatch[0].trim();
    name = name.replace(suffixes, '');
  }

  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: '', lastName: '' };
  if (parts.length === 1) return { firstName: parts[0], lastName: '' };

  const firstName = parts[0];
  // If 3+ parts, last part is last name, middle parts dropped
  const lastName = parts[parts.length - 1] + (suffix ? ' ' + suffix : '');
  return { firstName, lastName };
}

// US state abbreviations
const stateAbbrevs: Record<string, string> = {
  alabama: 'AL', alaska: 'AK', arizona: 'AZ', arkansas: 'AR', california: 'CA',
  colorado: 'CO', connecticut: 'CT', delaware: 'DE', florida: 'FL', georgia: 'GA',
  hawaii: 'HI', idaho: 'ID', illinois: 'IL', indiana: 'IN', iowa: 'IA', kansas: 'KS',
  kentucky: 'KY', louisiana: 'LA', maine: 'ME', maryland: 'MD', massachusetts: 'MA',
  michigan: 'MI', minnesota: 'MN', mississippi: 'MS', missouri: 'MO', montana: 'MT',
  nebraska: 'NE', nevada: 'NV', 'new hampshire': 'NH', 'new jersey': 'NJ',
  'new mexico': 'NM', 'new york': 'NY', 'north carolina': 'NC', 'north dakota': 'ND',
  ohio: 'OH', oklahoma: 'OK', oregon: 'OR', pennsylvania: 'PA', 'rhode island': 'RI',
  'south carolina': 'SC', 'south dakota': 'SD', tennessee: 'TN', texas: 'TX', utah: 'UT',
  vermont: 'VT', virginia: 'VA', washington: 'WA', 'west virginia': 'WV',
  wisconsin: 'WI', wyoming: 'WY', 'district of columbia': 'DC',
};

export function parseFullAddress(address: string): {
  street: string; city: string; state: string; zip: string; country: string;
} {
  const result = { street: '', city: '', state: '', zip: '', country: '' };
  if (!address || !address.trim()) return result;

  let addr = address.trim();

  // Try common US pattern: "123 Main St, City, ST 12345"
  // or "123 Main St, City, State 12345, Country"
  const zipMatch = addr.match(/\b(\d{5}(?:-\d{4})?)\b/);
  if (zipMatch) {
    result.zip = zipMatch[1];
    addr = addr.replace(zipMatch[0], '').trim();
  }

  // Check for country at end
  const countryPatterns = [
    /,?\s*(united states|usa|us|canada|ca|uk|united kingdom|australia|au)$/i,
  ];
  for (const cp of countryPatterns) {
    const cm = addr.match(cp);
    if (cm) {
      result.country = normalizeCountry(cm[1]);
      addr = addr.replace(cm[0], '').trim();
      break;
    }
  }

  // Split by commas
  const parts = addr.split(',').map((p) => p.trim()).filter(Boolean);

  if (parts.length >= 3) {
    result.street = parts[0];
    result.city = parts[1];
    // Last part might be state
    const lastPart = parts[parts.length - 1].trim();
    const stateAbbrev = normalizeState(lastPart);
    if (stateAbbrev) {
      result.state = stateAbbrev;
    } else {
      result.state = lastPart;
    }
  } else if (parts.length === 2) {
    // Could be "Street, City ST" or "City, ST"
    const secondPart = parts[1].trim();
    const stateInSecond = secondPart.match(/^(.+?)\s+([A-Z]{2})$/);
    if (stateInSecond) {
      result.street = parts[0];
      result.city = stateInSecond[1];
      result.state = stateInSecond[2];
    } else {
      result.street = parts[0];
      result.city = parts[1];
    }
  } else if (parts.length === 1) {
    result.street = parts[0];
  }

  return result;
}

export function normalizePhone(phone: string): string {
  if (!phone) return '';
  // Strip everything except digits and leading +
  let cleaned = phone.replace(/[^\d+]/g, '');
  // If starts with + keep it
  if (cleaned.startsWith('+')) return cleaned;
  // If 10 digits (US), add +1
  if (cleaned.length === 10) return '+1' + cleaned;
  // If 11 digits starting with 1 (US), add +
  if (cleaned.length === 11 && cleaned.startsWith('1')) return '+' + cleaned;
  // Otherwise return with + prefix
  return cleaned.length > 0 ? '+' + cleaned : '';
}

export function normalizeState(state: string): string {
  if (!state) return '';
  const trimmed = state.trim();
  // Already abbreviated
  if (/^[A-Z]{2}$/.test(trimmed)) return trimmed;
  // Check full name
  const lower = trimmed.toLowerCase();
  return stateAbbrevs[lower] || trimmed.toUpperCase().substring(0, 2);
}

const countryMap: Record<string, string> = {
  'united states': 'US', usa: 'US', us: 'US', 'united states of america': 'US',
  canada: 'CA', ca: 'CA',
  'united kingdom': 'GB', uk: 'GB', gb: 'GB',
  australia: 'AU', au: 'AU',
  germany: 'DE', de: 'DE',
  france: 'FR', fr: 'FR',
  india: 'IN', 'in': 'IN',
  japan: 'JP', jp: 'JP',
  brazil: 'BR', br: 'BR',
  mexico: 'MX', mx: 'MX',
  netherlands: 'NL', nl: 'NL',
  spain: 'ES', es: 'ES',
  italy: 'IT', it: 'IT',
  sweden: 'SE', se: 'SE',
  switzerland: 'CH', ch: 'CH',
  ireland: 'IE', ie: 'IE',
  singapore: 'SG', sg: 'SG',
  israel: 'IL', il: 'IL',
};

export function normalizeCountry(country: string): string {
  if (!country) return '';
  const trimmed = country.trim();
  if (/^[A-Z]{2}$/.test(trimmed)) return trimmed;
  return countryMap[trimmed.toLowerCase()] || trimmed.toUpperCase().substring(0, 2);
}

export function extractDomain(emailOrUrl: string): string {
  if (!emailOrUrl) return '';
  // From email
  if (emailOrUrl.includes('@')) {
    return emailOrUrl.split('@')[1]?.toLowerCase() || '';
  }
  // From URL
  try {
    const url = emailOrUrl.startsWith('http') ? emailOrUrl : 'https://' + emailOrUrl;
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return emailOrUrl.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0]?.toLowerCase() || '';
  }
}

export function normalizeTwitterHandle(handle: string): string {
  if (!handle) return '';
  return handle.trim().replace(/^@/, '');
}

// ===== TRANSFORM DATA FOR PLATFORM =====
export function transformForPlatform(
  rows: Record<string, string>[],
  mappings: ColumnMapping[],
  platformId: string
): { headers: string[]; rows: string[][] } {
  const format = platformFormats.find((f) => f.id === platformId);
  if (!format) return { headers: [], rows: [] };

  // Build a lookup: fieldType → sourceColumn
  const fieldToSource: Partial<Record<FieldType, string>> = {};
  for (const m of mappings) {
    if (m.fieldType !== 'ignore') {
      fieldToSource[m.fieldType] = m.sourceColumn;
    }
  }

  const getValue = (row: Record<string, string>, field: FieldType): string => {
    const col = fieldToSource[field];
    return col ? (row[col] || '').trim() : '';
  };

  const headers = format.fields.map((f) => f.key);

  const transformedRows = rows.map((row) => {
    // Pre-compute derived fields
    const fullName = getValue(row, 'fullName');
    const splitName = fullName ? splitFullName(fullName) : null;
    const firstName = getValue(row, 'firstName') || splitName?.firstName || '';
    const lastName = getValue(row, 'lastName') || splitName?.lastName || '';

    const fullAddress = getValue(row, 'fullAddress');
    const parsedAddr = fullAddress ? parseFullAddress(fullAddress) : null;

    const email = getValue(row, 'email').toLowerCase();
    const phone = normalizePhone(getValue(row, 'phone'));
    const company = getValue(row, 'companyName');
    const domain = getValue(row, 'companyDomain') || extractDomain(email);
    const jobTitle = getValue(row, 'jobTitle');
    const industry = getValue(row, 'industry');
    const city = getValue(row, 'city') || parsedAddr?.city || '';
    const state = normalizeState(getValue(row, 'state') || parsedAddr?.state || '');
    const zip = getValue(row, 'zip') || parsedAddr?.zip || '';
    const country = normalizeCountry(getValue(row, 'country') || parsedAddr?.country || '');
    const street = getValue(row, 'street') || parsedAddr?.street || '';
    const linkedinUrl = getValue(row, 'linkedinUrl');
    const twitterHandle = normalizeTwitterHandle(getValue(row, 'twitterHandle'));
    const dob = getValue(row, 'dob');
    const gender = getValue(row, 'gender').toLowerCase().startsWith('m') ? 'm' :
      getValue(row, 'gender').toLowerCase().startsWith('f') ? 'f' : '';

    // Platform-specific field mapping
    const fieldValues: Record<string, string> = {
      // Google
      'Email': email,
      'Phone': phone,
      'First Name': firstName,
      'Last Name': lastName,
      'Country': country,
      'Zip': zip,
      // LinkedIn Company
      'companyname': company,
      'companywebsite': domain,
      'companyemaildomains': domain,
      'linkedincompanypageurl': linkedinUrl,
      'industry': industry,
      // LinkedIn Contact + Meta + Reddit + X shared keys
      'email': email,
      'phone': phone,
      'firstname': firstName,
      'lastname': lastName,
      'jobtitle': jobTitle,
      'city': city,
      'state': state,
      'zip': zip,
      'country': country,
      // Meta-specific
      'fn': firstName.toLowerCase(),
      'ln': lastName.toLowerCase(),
      'ct': city.toLowerCase().replace(/\s+/g, ''),
      'st': state.toLowerCase(),
      'dob': dob.replace(/[\-\/]/g, ''),
      'gen': gender,
      // X-specific
      'handle': twitterHandle,
    };

    return headers.map((h) => fieldValues[h] || '');
  });

  // Filter out rows where all values are empty
  const nonEmptyRows = transformedRows.filter((row) => row.some((v) => v !== ''));

  return { headers, rows: nonEmptyRows };
}

// ===== CSV GENERATION =====
export function toCSV(headers: string[], rows: string[][]): string {
  const escape = (val: string) => {
    if (val.includes(',') || val.includes('"') || val.includes('\n')) {
      return '"' + val.replace(/"/g, '""') + '"';
    }
    return val;
  };

  const lines = [headers.map(escape).join(',')];
  for (const row of rows) {
    lines.push(row.map(escape).join(','));
  }
  return lines.join('\n');
}

// ===== FILE PARSING (uses dynamic imports for papaparse and xlsx) =====
export function parseFile(
  file: File,
  callback: (data: { headers: string[]; rows: string[][] }) => void,
  onError: (msg: string) => void
) {
  const ext = file.name.split('.').pop()?.toLowerCase();

  if (ext === 'csv' || ext === 'tsv' || ext === 'txt') {
    import('papaparse').then((mod) => {
      const Papa = mod.default;
      Papa.parse(file, {
        header: false,
        skipEmptyLines: true,
        complete: (result: any) => {
          if (result.data && result.data.length > 1) {
            const headers = result.data[0] as string[];
            const rows = result.data.slice(1) as string[][];
            callback({ headers, rows });
          } else {
            onError('File appears empty or has only headers.');
          }
        },
        error: () => onError('Failed to parse CSV file.'),
      });
    }).catch(() => onError('Failed to load CSV parser.'));
  } else if (ext === 'xlsx' || ext === 'xls') {
    import('xlsx').then((XLSX) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData: string[][] = XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: '' });
          if (jsonData.length > 1) {
            const headers = jsonData[0].map(String);
            const rows = jsonData.slice(1).map((r: any[]) => r.map(String));
            callback({ headers, rows });
          } else {
            onError('File appears empty or has only headers.');
          }
        } catch {
          onError('Failed to parse Excel file.');
        }
      };
      reader.onerror = () => onError('Failed to read the file.');
      reader.readAsArrayBuffer(file);
    }).catch(() => onError('Failed to load Excel parser.'));
  } else {
    onError(`Unsupported file type: .${ext}. Please upload a CSV or Excel file.`);
  }
}
