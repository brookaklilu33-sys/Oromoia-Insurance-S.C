import {
  InsuranceProduct,
  Branch,
  Department,
  OperatorProfile,
  StaffProfile,
  AgentProfile,
  BrokerProfile,
  CustomerProfile,
  InsurancePolicy,
  InsuranceApplication,
  InsuranceClaim,
  PaymentAttempt,
  TrainingCourse,
  EmailTemplate,
  AuditLogEntry,
  AdminUploadedDocument,
  NewsArticle,
  SiteCmsConfig,
  BusinessReport,
  NewsletterSubscriber
} from '../types/insurance';

export const OFFICIAL_DISCLAIMER = 'Oromia Insurance S.C. (OIC) Official Insurance Schedule · Regulated by the National Bank of Ethiopia';
export const DEMO_DISCLAIMER = OFFICIAL_DISCLAIMER;
export const INDICATIVE_RATE_NOTICE = 'Indicative tariff preview only. Binding rates, deductibles, and endorsements require official Oromia Insurance S.C. underwriting and actuarial confirmation.';

export const SEED_BRANCHES: Branch[] = [
  {
    "branchId": "BR-OIC-HQ",
    "name": "Oromia Insurance S.C. Headquarters (Lideya Plaza)",
    "city": "Addis Ababa (Finfinne)",
    "region": "headquarters",
    "address": "Ethio-China Friendship Avenue, Lideya Plaza (Oromia Insurance Headquarters), P.O. Box: 10090",
    "phone": "+251-115-572121",
    "fax": "+251-115-572122",
    "poBox": "10090",
    "email": "info@oromiainsurance.com",
    "managerName": "Chief Executive & Corporate Directorate",
    "isHeadquarters": true,
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-01",
    "name": "ABDISA AGA BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Beklobet, Garad Mall 1st Floor Office No. 432-1-5",
    "phone": "+251-114-706-413 / +251-944-110-363",
    "poBox": "10090",
    "email": "temesgenc@oromiainsurance.com",
    "managerName": "Mr. Temesgen Chawaka",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-02",
    "name": "FINFINNE BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Mexico Sengatera, Biftu Tower 1st Floor",
    "phone": "+251-115-572-126 / +251-929-907-515",
    "fax": "+251-115-572-085",
    "poBox": "10090",
    "email": "negussied@oromiainsurance.com",
    "managerName": "Mr. Niguse Daba",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-03",
    "name": "AFRICA GODANA BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Bole Road, Africa Avenue, Oromia Bank Building 1st Floor Office No. 407-1-11",
    "phone": "+251-115-528-557 / +251-929-907-518",
    "fax": "+251-115-503-192",
    "poBox": "10090",
    "email": "dinayasd@oromiainsurance.com",
    "managerName": "Mr. Dinayas Daba",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-04",
    "name": "BOLE BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Bole Japan, Novis Building 1st Floor Office No. 755/23-24",
    "phone": "+251-116-623-194 / +251-929-907-517",
    "fax": "+251-116-160-900",
    "poBox": "10090",
    "email": "mengistue@oromiainsurance.com",
    "managerName": "Mr. Mengistu Ebisa",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-05",
    "name": "MERKATO BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Merkato, In front of Bus Station, Mamada Building 1st Floor",
    "phone": "+251-118-275-287 / +251-929-907-521",
    "fax": "+251-112-732-800",
    "poBox": "10090",
    "email": "ruthg@oromiainsurance.com",
    "managerName": "Ms. Ruth Gemesa",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-06",
    "name": "GOFA BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Sarbet, Alexander Pushkin Square, Ki-Ab Building 1st Floor",
    "phone": "+251-114-161-122 / +251-929-907-527",
    "fax": "+251-114-160-607",
    "poBox": "10090",
    "email": "samuelw@oromiainsurance.com",
    "managerName": "Mr. Samuel Workneh",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-07",
    "name": "DOKA BORA BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Megenagna, Derartu Tullu Building 1st Floor on Right side of Stairs.",
    "phone": "+251-116-630-208 / +251-929-907-520",
    "poBox": "10090",
    "email": "takeleg@oromiainsurance.com",
    "managerName": "Mr. Takele Gudeta",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-08",
    "name": "GULELLE BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Gulelle Next to Medanialem Secondary School on Cooperative Bank of Oromia Building 2nd Floor.",
    "phone": "+251-112-595-577 / +251-929-907-528",
    "fax": "+251-112-595-576",
    "poBox": "10090",
    "email": "sisayb@oromiainsurance.com",
    "managerName": "Mr. Sisay Buli",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-09",
    "name": "WADESSA BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Churchill Avenue, Infront of Grand Eliana Hotel, Aman Plaza 3rd Floor",
    "phone": "+251-111-118-404 / +251-929-907-522",
    "fax": "+251-111-118-636",
    "poBox": "10090",
    "email": "aberaa@oromiainsurance.com",
    "managerName": "Mr. Abera Alemu",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-10",
    "name": "BIRBIRSA BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Merkato Infront of Anuwar Mosque, Wajidi Business Center 4th Floor Office No. 402.",
    "phone": "+251-112-130-111 / +251-929-907-523",
    "fax": "+251-112-130-200",
    "poBox": "10090",
    "email": "derejet@oromiainsurance.com",
    "managerName": "Mr. Dereje Tefera",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-11",
    "name": "CHAFFE BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Flamingo, Africa Avenue, Get House Tower 2nd Floor",
    "phone": "+251-115-527-271 / +251-929-907-501",
    "fax": "+251-115-527-271",
    "poBox": "10090",
    "email": "teferia@oromiainsurance.com",
    "managerName": "Mr. Teferi Amena",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-12",
    "name": "KERSA BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Kazanchis NEGA CITY MALL 1st Floor Office No. 104-B.",
    "phone": "+251-11-557-12-84 / +251-929-907-519",
    "fax": "+251-11-557-12-55",
    "poBox": "10090",
    "email": "meronm@oromiainsurance.com",
    "managerName": "Mrs. Meron Mulatu",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-13",
    "name": "JAMO BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Ayer Tena Besides Megertu Building, Located on the Building Where Berhan Bank founded 2nd Floor",
    "phone": "+251-113-480-293 / +251-929-907-529",
    "fax": "+251-113-480-334",
    "poBox": "10090",
    "email": "sifend@oromiainsurance.com",
    "managerName": "Mrs. Sifan Dame",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-14",
    "name": "SARIS BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Saris Kadisco, Kadisco Group Building 2nd Floor",
    "phone": "+251-114-430-181 / +251-929-907-524",
    "fax": "+251-114-430-001",
    "poBox": "10090",
    "email": "rorisab@oromiainsurance.com",
    "managerName": "Mr. Rorisa Bulcha",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-15",
    "name": "KOLFE BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Kolfe Atena Tera, EKHAAST MALL 1st Floor",
    "phone": "+251-112-791-432 / +251-929-907-530",
    "fax": "+251-112-791-039",
    "poBox": "10090",
    "email": "ayelecho@oromiainsurance.com",
    "managerName": "Mrs. Ayelech Olkeba",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-16",
    "name": "GERJI BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Gerji Roba Dabo, Located on the Fruits and Vegetables Building 2nd Floor",
    "phone": "+251-116-394-037 / +251-929-907-526",
    "fax": "+251-116-394-049",
    "poBox": "10090",
    "email": "daniele@oromiainsurance.com",
    "managerName": "Mr. Daniel Etefa",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-17",
    "name": "DOLLO BIDDENA BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Meskel Flower, Mossy Building 1st Floor",
    "phone": "+251-114-168-956 / +251-929-907-525",
    "fax": "+251-114-160-807",
    "poBox": "10090",
    "email": "berhanen@oromiainsurance.com",
    "managerName": "Mrs. Berhane Negessu",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-18",
    "name": "MUDA BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Lideta, MB Business Center Building",
    "phone": "+251-115-573-103 / +251-929-907-506",
    "fax": "+251-115-573-097",
    "poBox": "10090",
    "email": "tolawakb@oromiainsurance.com",
    "managerName": "Mr. Tolawak Barsisa",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-19",
    "name": "EJERSA BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Bole Medhanialem, Oromia Building Ground Floor",
    "phone": "+251-116-392-252 / +251-929-907-516",
    "fax": "+251-116-392-262",
    "poBox": "10090",
    "email": "kassahuns@oromiainsurance.com",
    "managerName": "Mr. Kassahun Sisay",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-20",
    "name": "KALITY BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Kality Bus Station Area, Solomon Building 2nd Floor Office No. 2-7",
    "phone": "+251-114-715-279 / +251-929-907-507",
    "fax": "+251-114-715-915",
    "poBox": "10090",
    "email": "hodatat@oromiainsurance.com",
    "managerName": "Mr. Hodeta Tafari",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-21",
    "name": "LEBU BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Jemo 1 On the way to Lebu, Located on Building Cooperative and Awash Bank found 1st Floor.",
    "phone": "+251-114-625-288 / +251-929-907-511",
    "poBox": "10090",
    "email": "desalegng@oromiainsurance.com",
    "managerName": "Mr. Desalegn Getahun",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-22",
    "name": "FIGA BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Lemi Kura Sub-City, Figa Traffic Light, Building In front of Dawit Kitfo 2nd Floor.",
    "phone": "+251-929-907-513",
    "poBox": "10090",
    "email": "tsiona@oromiainsurance.com",
    "managerName": "Mrs. Tsion Assefa",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-23",
    "name": "TULLU METI BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Bethel on the way to Woyra Sefer, Located on Building Oromia Bank found 1st Floor",
    "phone": "+251-929-907-514",
    "poBox": "10090",
    "email": "yadetab@oromiainsurance.com",
    "managerName": "Mr. Yadeta Babu",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-24",
    "name": "GENERAL TADESSE BIRU BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Addisu Gebeya, Jambo Building 3rd Floor",
    "phone": "+251-11-154-68-79 / +251-944-11-04-02",
    "poBox": "10090",
    "email": "alemue@oromiainsurance.com",
    "managerName": "Mr. Alemu Ejigu",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-25",
    "name": "KOTOBE BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Yeka Sub-City Woreda 11, Wossen Road on Ethio-telecom Service Center Building 1st Floor, Besides NOC Gas Station",
    "phone": "+251-944-110-408 / +251-116-681-036",
    "poBox": "10090",
    "email": "gemechuu@oromiainsurance.com",
    "managerName": "Mr. Gemechu Urgessa",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-26",
    "name": "HEAD OFFICE BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Ethio-China Friendship Avenue, Lideya Plaza 1st Floor",
    "phone": "+251-944-110-0357",
    "poBox": "10090",
    "email": "bezawity@oromiainsurance.com",
    "managerName": "Mrs. Bezawit Yilma",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-27",
    "name": "CHALCHALI",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Bisrate Gebriel, Shimekit Business Center Building Ground Floor",
    "phone": "+251-114-715-279 / +251-929-907-507",
    "fax": "+251-114-715-915",
    "poBox": "10090",
    "email": "falmatab@oromiainsurance.com",
    "managerName": "Mr. Falmata Bekele",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-28",
    "name": "LEMI KURA BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Ayat Area, Adjacent to Lemi Kura Sub-City, HASBI Building 1st Floor",
    "phone": "+251116391825",
    "fax": "+251116390530",
    "poBox": "10090",
    "email": "toleras@oromiainsurance.com",
    "managerName": "Mr. Tolera Sisay",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-29",
    "name": "GOFA GEBRIEL BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Around Gofa Gebriel Square, BULGOFA Real State S.C. Building 1st Floor",
    "phone": "0943523248",
    "poBox": "10090",
    "email": "tilahunf@oromiainsurance.com",
    "managerName": "Mr. Tilahun Fikadu",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-FIN-30",
    "name": "BULBULA BRANCH",
    "city": "Addis Ababa (Finfinne)",
    "region": "finfinne",
    "address": "Bole Bulbula, Mariam Mazoria WANOS Building.",
    "phone": "+251943523408",
    "poBox": "10090",
    "email": "fikruy@oromiainsurance.com",
    "managerName": "Mr. Fikru Yazew",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-01",
    "name": "ADAMA BRANCH",
    "city": "Adama",
    "region": "upcountry",
    "address": "Adama Town, Geda Kebele, ADI HOUSE 1st Floor",
    "phone": "+251221119187 / +251929907531",
    "fax": "+251221119188",
    "poBox": "2582",
    "email": "mihereta@oromiainsurance.com",
    "managerName": "Mrs. Mihret Angasa",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-02",
    "name": "AMBO BRANCH",
    "city": "Ambo",
    "region": "upcountry",
    "address": "Ambo Town, Ya'i Gadaa, Gaba Baqala Union Building 1st Floor",
    "phone": "+251112366414 / +251929907532",
    "fax": "+251112365466",
    "poBox": "150",
    "email": "berhanuk@oromiainsurance.com",
    "managerName": "Mr. Birhanu Kumi",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-03",
    "name": "ASSELA BRANCH",
    "city": "Assela",
    "region": "upcountry",
    "address": "Assela Town, Dashen Area, Around URJII Building, Yoseph Bldg. 1st Floor",
    "phone": "+251929907502 / +251223318214",
    "poBox": "211",
    "email": "marus@oromiainsurance.com",
    "managerName": "Mr. Maru Sime",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-04",
    "name": "BAHIR DAR BRANCH",
    "city": "Bahir dar",
    "region": "upcountry",
    "address": "Bahir Dar Town, Kebele 04, Arada/Old Gambi Hospital Building 2nd Floor",
    "phone": "+251582208360 / +251929907500",
    "email": "merkebut@oromiainsurance.com",
    "managerName": "Mr. Merkebu Tessema",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-05",
    "name": "BALE ROBE BRANCH",
    "city": "Bale robe",
    "region": "upcountry",
    "address": "Bale Robe Town, General Wako Gutu Square, Siko Mando Union Building 1st Floor Office No. G-1",
    "phone": "+251226650375 / +251929907503",
    "poBox": "1368",
    "email": "astera@oromiainsurance.com",
    "managerName": "Ms. Aster Adugna",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-06",
    "name": "BISHOFTU BRANCH",
    "city": "Bishoftu",
    "region": "upcountry",
    "address": "Bishoftu Town, Cooperative Bank of Oromia Building 1st Floor",
    "phone": "+251114370439 / +251929907575",
    "fax": "+251114339447",
    "email": "gizewa@oromiainsurance.com",
    "managerName": "Mr. Gizew Adugna",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-07",
    "name": "BULE HORA BRANCH",
    "city": "Bule hora",
    "region": "upcountry",
    "address": "Bule Hora Town",
    "phone": "+251464430349 / +251929907298",
    "email": "debebel@oromiainsurance.com",
    "managerName": "Mr. Debebe Lema",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-08",
    "name": "DESSIE BRANCH",
    "city": "Dessie",
    "region": "upcountry",
    "address": "Dessie Town, Addis General Trading Building 1st Floor",
    "phone": "+251333111065 / +251929907576",
    "fax": "+251333111053",
    "poBox": "1205",
    "email": "semiraa@oromiainsurance.com",
    "managerName": "Mrs. Semira Ali",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-09",
    "name": "DIRE DAWA BRANCH",
    "city": "Dire dawa",
    "region": "upcountry",
    "address": "Dire Dawa Town, Konel Sefer Garad Building Ground Floor",
    "phone": "+251251110647 / +251929907538",
    "fax": "+251251110624",
    "poBox": "916",
    "email": "wondwosons@oromiainsurance.com",
    "managerName": "Mr. Wondwosen Solomon",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-10",
    "name": "HAWASSA BRANCH",
    "city": "Hawassa",
    "region": "upcountry",
    "address": "Hawassa Town, Hawassa City Alliance Building 1st Floor, Hawassa, Ethiopia.",
    "phone": "+251929907558 / +251462201008",
    "fax": "+251462201009",
    "poBox": "1576",
    "email": "mignotworkh@oromiainsurance.com",
    "managerName": "Mr. Mignotwork Haileselase",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-11",
    "name": "HOLETA BRANCH",
    "city": "Holeta",
    "region": "upcountry",
    "address": "Holeta Town",
    "phone": "+251944110356",
    "email": "tadessek@oromiainsurance.com",
    "managerName": "Mr. Tadesse Kebede",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-12",
    "name": "JIMMA BRANCH",
    "city": "Jimma",
    "region": "upcountry",
    "address": "Jimma Town, Merkato Areboch Tera, Abbabiya Abbawari Building 2nd Floor",
    "phone": "+251471115224 / +251929907534",
    "fax": "+251471121724",
    "poBox": "1401",
    "email": "teshomez@oromiainsurance.com",
    "managerName": "Mr. Teshome Zerihun",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-13",
    "name": "LEGATAFO BRANCH",
    "city": "Legatafo",
    "region": "upcountry",
    "address": "Sheger City, Lega Tafo Lega Dadi Sub-City, Jote Building 2nd Floor",
    "phone": "+251116679985 / +251929907509",
    "fax": "+251116679892",
    "poBox": "10090",
    "email": "feyok@oromiainsurance.com",
    "managerName": "Mr. Feyo Kasim",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-14",
    "name": "MEKELE BRANCH",
    "city": "Mekele",
    "region": "upcountry",
    "address": "Mekelle Town, Kebele 16 In front of Segenet Hotel",
    "phone": "+251344408371 / +251929907574",
    "fax": "+251344408364",
    "poBox": "2072",
    "email": "meberatut@oromiainsurance.com",
    "managerName": "Mr. Mebrehatu Teka",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-15",
    "name": "METTU BRANCH",
    "city": "Mettu",
    "region": "upcountry",
    "address": "Mettu Town, Around Arat Kilo, located on Oromia Bank Mettu branch Building 1st Floor",
    "phone": "+251471410018 / +251929907510",
    "fax": "+251471410037",
    "email": "ragaa@oromiainsurance.com",
    "managerName": "Mr. Raga Adino",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-16",
    "name": "MODJO BRANCH",
    "city": "Modjo",
    "region": "upcountry",
    "address": "Modjo Town, Biruk Building 1st Floor",
    "phone": "+251944110349 / +251222360275",
    "fax": "+251222360273",
    "email": "gemechus@oromiainsurance.com",
    "managerName": "Mr. Gemechu Shumi",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-17",
    "name": "NEKEMTE BRANCH",
    "city": "Nekemte",
    "region": "upcountry",
    "address": "Nekemte Town, Kebele 07",
    "phone": "+251576616680 / +251929907535",
    "fax": "+251576617111",
    "poBox": "57",
    "email": "dinkad@oromiainsurance.com",
    "managerName": "Mr. Dinka Daba",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-18",
    "name": "SEBETA BRANCH",
    "city": "Sebeta",
    "region": "upcountry",
    "address": "Sheger City, Sebeta Sub-City, Mergia Building 2nd Floor Office No. 204",
    "phone": "+251113679875 / +251929907505",
    "fax": "+251113679264",
    "poBox": "10090",
    "email": "masreshat@oromiainsurance.com",
    "managerName": "Mr. Masresha Teshome",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-19",
    "name": "SELALE BRANCH",
    "city": "Selale",
    "region": "upcountry",
    "address": "Selale Town, Fiche Komando, Tafari Ayana Building 1st Floor",
    "phone": "+251111609143 / +251944110343",
    "email": "tegenuf@oromiainsurance.com",
    "managerName": "Mr. Tegenu Fikadu",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-20",
    "name": "SHASHEMENE BRANCH",
    "city": "Shashemene",
    "region": "upcountry",
    "address": "Shashemene City, Kebele 06, Dagalo Building 1st Floor",
    "phone": "+251461102190 / +251929907539",
    "fax": "+251461101650",
    "poBox": "1368",
    "email": "melesea@oromiainsurance.com",
    "managerName": "Mr. Melesse Alemu",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-21",
    "name": "WOLISO BRANCH",
    "city": "Woliso",
    "region": "upcountry",
    "address": "Woliso Town, Cooperative Bank of Oromia Building Ground Floor",
    "phone": "+251113413511 / +251929907533",
    "fax": "+251113410243",
    "poBox": "305",
    "email": "samuelj@oromiainsurance.com",
    "managerName": "Mr. Samuel Jote",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-22",
    "name": "GIMBI BRANCH",
    "city": "Gimbi",
    "region": "upcountry",
    "address": "Gimbi Town, Belay Building 2nd Floor",
    "phone": "+251929907504 / +251557710344",
    "poBox": "320",
    "email": "mengeshan@oromiainsurance.com",
    "managerName": "Mr. Mengesha Negera",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-23",
    "name": "BURAYU BRANCH",
    "city": "Burayu",
    "region": "upcountry",
    "address": "Burayu Gafarsa Nono, SHAKA MALL 2nd Floor Office No. 2F-6",
    "phone": "+251112601934 / +251929907508",
    "fax": "+251112601383",
    "poBox": "10090",
    "email": "berhanek@oromiainsurance.com",
    "managerName": "Mrs. Berhane Kebede",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-24",
    "name": "HARAR BRANCH",
    "city": "Harar",
    "region": "upcountry",
    "address": "Harar Town, Ras Hotel, Ras City Center 1st Floor",
    "phone": "+251944110358",
    "email": "hawasw@oromiainsurance.com",
    "managerName": "Mr. Hawas Wako",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-25",
    "name": "GAFARSA BRANCH",
    "city": "Gafarsa",
    "region": "upcountry",
    "address": "Burayu Mariyam",
    "phone": "+251-112625025 / +251-943523414",
    "fax": "+251-112625108",
    "poBox": "10090",
    "email": "ebab@oromiainsurance.com",
    "managerName": "Mr. Eba Bula",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-26",
    "name": "MEKI BRANCH",
    "city": "Meki",
    "region": "upcountry",
    "address": "Maki Town, In front of Ethio-telecom Jamana Oda Building 1st Floor",
    "phone": "+251221182006 / +251943523242",
    "fax": "+251-221-821-556",
    "email": "hulukad@oromiainsurance.com",
    "managerName": "Mr. Huluka Dadi",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-27",
    "name": "FURI BRANCH",
    "city": "Furi",
    "region": "upcountry",
    "address": "Sheger City Administration, Furi Town, KINA MALL 1st Floor Besides of NOC gas station",
    "phone": "+2511133803566 / +251943523448",
    "fax": "+2511133803962",
    "poBox": "10090",
    "email": "diribab@oromiainsurance.com",
    "managerName": "Mr. Diriba Bekele",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-28",
    "name": "DODOLA BRANCH",
    "city": "Dodola",
    "region": "upcountry",
    "address": "Dodola Town Square, around Old Bus station, near CBE Barisa Branch new Building 1st Floor",
    "phone": "+251943523271",
    "poBox": "10090",
    "email": "rozak@oromiainsurance.com",
    "managerName": "Mrs. Roza Kedir",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-29",
    "name": "ASSOSA BRANCH",
    "city": "Assosa",
    "region": "upcountry",
    "address": "Assosa Anwar Area, Located on the Building where Dashan Bank Assosa Branch was founded 1st Floor",
    "phone": "+251943524107",
    "poBox": "10090",
    "email": "zelaleml@oromiainsurance.com",
    "managerName": "Mr. Zelalem Lemi",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-30",
    "name": "GAMBELLA BRANCH",
    "city": "Gambella",
    "region": "upcountry",
    "address": "Gambella Town, Infront of Kare Commercial Shopping Center, on Building Berhan Bank found 1st Floor",
    "phone": "+251943523291 / +251471518949",
    "poBox": "10090",
    "email": "gudetab@oromiainsurance.com",
    "managerName": "Mr. Gudeta Bekele",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-31",
    "name": "JIGJIGA BRANCH",
    "city": "Jigjiga",
    "region": "upcountry",
    "address": "Jigjiga Town, Woreda 07 Dashen Bank Garad Wilwal IFB branch Building 1st Floor",
    "phone": "+251943523262 / +251252786960",
    "poBox": "10090",
    "email": "desalegnf@oromiainsurance.com",
    "managerName": "Mr. Desalegn Firo",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-UPC-32",
    "name": "GELAN BRANCH",
    "city": "Gelan",
    "region": "upcountry",
    "address": "Gelan Town, SETS General Trading PLC Building 1st Floor Office No. (2,1)",
    "phone": "+251114625840 / +251944110377",
    "poBox": "10090",
    "email": "lemia@oromiainsurance.com",
    "managerName": "Mr. Lemi Ararsa",
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM"
  },
  {
    "branchId": "BR-CNT-01",
    "name": "YABELLO CONTACT OFFICE",
    "city": "Yabello",
    "region": "contact_office",
    "address": "Yabello Town, Ethiopia",
    "phone": "+251-464-461-231",
    "fax": "+251-464-461-173",
    "email": "info@oromiainsurance.com",
    "managerName": "Branch Liaison Desk",
    "isContactOffice": true,
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM"
  },
  {
    "branchId": "BR-CNT-02",
    "name": "KEMISE CONTACT OFFICE",
    "city": "Kemise",
    "region": "contact_office",
    "address": "Kemise Town, Ethiopia",
    "phone": "+251-335-541-859",
    "fax": "+251-335-541-909",
    "email": "info@oromiainsurance.com",
    "managerName": "Branch Liaison Desk",
    "isContactOffice": true,
    "status": "active",
    "openingHours": "Mon - Fri: 8:00 AM - 5:00 PM"
  }
];

export const SEED_DEPARTMENTS: Department[] = [
  {
    "departmentId": "DEPT-HQ-01",
    "name": "CHIEF EXECUTIVE OFFICE",
    "category": "executive",
    "telephone": "+251-115-572-121",
    "fax": "+251-115-572-122",
    "poBox": "10090",
    "headTitle": "Chief Executive Officer",
    "headName": "Mr. Tegistu Shiferaw Tadesse",
    "description": "Overall executive leadership and strategic direction of Oromia Insurance S.C.",
    "status": "active"
  },
  {
    "departmentId": "DEPT-HQ-02",
    "name": "CHIEF RESOURCES OFFICE",
    "category": "executive",
    "telephone": "+251-115-572-143",
    "fax": "+251-115-572-122",
    "poBox": "10090",
    "headTitle": "Chief Resources Officer",
    "headName": "Mr. Samuel Tesfa Tolessa",
    "description": "Enterprise human capital, finance, investment, IT, and corporate resource coordination.",
    "status": "active"
  },
  {
    "departmentId": "DEPT-HQ-03",
    "name": "CHIEF OPERATIONS OFFICE",
    "category": "executive",
    "telephone": "+251-115-572-058",
    "fax": "+251-115-572-122",
    "poBox": "10090",
    "headTitle": "Chief Operations Officer",
    "headName": "Mr. Tamene Hailemariam Hordofa",
    "description": "Operational oversight across Non-Life, Life & Health, Agriculture, Takaful, and 62 branches.",
    "status": "active"
  },
  {
    "departmentId": "DEPT-HQ-04",
    "name": "COMPANY SECRETARY OFFICE",
    "category": "support_governance",
    "telephone": "+251-115-588-122",
    "fax": "+251-115-572-122",
    "poBox": "10090",
    "headTitle": "Company Secretary",
    "headName": "Mr. Teshome Tadele Diribsa",
    "description": "Board governance, shareholder records, and statutory corporate secretariat duties.",
    "status": "active"
  },
  {
    "departmentId": "DEPT-HQ-05",
    "name": "UNDERWRITING & BRANCHES SUPPORT DIRECTORATE",
    "category": "operations",
    "telephone": "+251-115-588-718",
    "fax": "+215-115-589-603",
    "poBox": "10090",
    "headTitle": "A/Director, Underwriting & Branches Support",
    "headName": "Mr. Hawi Tesfaye Basha",
    "description": "Non-Life underwriting governance, branch technical support, and tariff administration.",
    "status": "active"
  },
  {
    "departmentId": "DEPT-HQ-06",
    "name": "RISK MANAGEMENT & COMPLIANCE DIRECTORATE",
    "category": "support_governance",
    "telephone": "+251-115-572-141",
    "fax": "+215-115-589-603",
    "poBox": "10090",
    "headTitle": "Director, Risk Management & Compliance Services",
    "headName": "Mr. Deriba Balcha Kaba",
    "description": "Enterprise risk management, NBE regulatory compliance, and internal control assurance.",
    "status": "active"
  },
  {
    "departmentId": "DEPT-HQ-07",
    "name": "LEGAL SERVICES DIRECTORATE",
    "category": "support_governance",
    "telephone": "+251-115-572-060",
    "fax": "+215-115-589-603",
    "poBox": "10090",
    "headTitle": "Director, Legal Services",
    "headName": "Mr. Tesfa Tolla Meko",
    "description": "Contract review, litigation management, recovery, and regulatory legal advisory.",
    "status": "active"
  },
  {
    "departmentId": "DEPT-HQ-08",
    "name": "MARKETING & BUSINESS DEVELOPMENT DIRECTORATE",
    "category": "operations",
    "telephone": "+251-115-572-152",
    "fax": "+215-115-589-603",
    "poBox": "10090",
    "headTitle": "A/Director, Marketing & Business Development",
    "headName": "Mr. Mekonnen Degu Gerbo",
    "description": "Brand stewardship, corporate partnerships, product distribution, and sales growth.",
    "status": "active"
  },
  {
    "departmentId": "DEPT-HQ-09",
    "name": "STRATEGY & CHANGE MANAGEMENT DIRECTORATE",
    "category": "support_governance",
    "telephone": "+251-115-586-118",
    "fax": "+215-115-589-603",
    "poBox": "10090",
    "headTitle": "Director, Strategy & Change Management",
    "headName": "Mr. Daniel Negassa Lemu",
    "description": "Strategic planning, performance monitoring, and organizational transformation.",
    "status": "active"
  },
  {
    "departmentId": "DEPT-HQ-10",
    "name": "INVESTMENT & PROJECTS MANAGEMENT DIRECTORATE",
    "category": "support_governance",
    "telephone": "+251-115-585-669",
    "fax": "+215-115-589-603",
    "poBox": "10090",
    "headTitle": "Director, Investment & Projects Management",
    "headName": "Mr. Berhanu Debela Beche",
    "description": "Capital investment portfolio, strategic projects, and headquarters development.",
    "status": "active"
  },
  {
    "departmentId": "DEPT-HQ-11",
    "name": "FINANCE DIRECTORATE",
    "category": "operations",
    "telephone": "+251-115-572-027",
    "fax": "+215-115-589-603",
    "poBox": "10090",
    "headTitle": "Director, Finance",
    "headName": "Mr. Kefale Birhanu Duresa",
    "description": "Financial accounting, premium reconciliation, claims disbursement, and audited reporting.",
    "status": "active"
  },
  {
    "departmentId": "DEPT-HQ-12",
    "name": "HUMAN RESOURCE DIRECTORATE",
    "category": "support_governance",
    "telephone": "+251-115-572-086",
    "fax": "+215-115-589-603",
    "poBox": "10090",
    "headTitle": "A/Director, Human Resources Management",
    "headName": "Mrs. Meaza Dibekulu Tsega",
    "description": "Talent acquisition, training, employee relations, and performance appraisal.",
    "status": "active"
  },
  {
    "departmentId": "DEPT-HQ-13",
    "name": "PROPERTY & FACILITIES MANAGEMENT DIRECTORATE",
    "category": "support_governance",
    "telephone": "+251-115-572-151",
    "fax": "+215-115-589-603",
    "poBox": "10090",
    "headTitle": "Director, Property & Facilities Management",
    "headName": "Mr. Gize Zenebe Aschenaki",
    "description": "Fixed assets, branch facilities, logistics, and procurement administration.",
    "status": "active"
  },
  {
    "departmentId": "DEPT-HQ-14",
    "name": "TAKAFUL INSURANCE DIRECTORATE",
    "category": "business_line",
    "telephone": "+251-115-583-543",
    "fax": "+215-115-589-603",
    "poBox": "10090",
    "headTitle": "Director, Takaful Insurance",
    "headName": "Mr. Adem Abdi Batu",
    "description": "Sharia-compliant Halal Takaful underwriting, fund stewardship, and Sharia Advisory coordination.",
    "status": "active"
  },
  {
    "departmentId": "DEPT-HQ-15",
    "name": "LIFE & HEALTH INSURANCE DIRECTORATE",
    "category": "business_line",
    "telephone": "+251-115-585-625",
    "fax": "+215-115-589-603",
    "poBox": "10090",
    "headTitle": "Director, Life & Health Insurance",
    "headName": "Mr. Teshome Gadisa Tasisa",
    "description": "Individual & group life assurance, endowment plans, mortgage protection, and medical insurance.",
    "status": "active"
  },
  {
    "departmentId": "DEPT-HQ-16",
    "name": "AGRICULTURE & MICROINSURANCE DIRECTORATE",
    "category": "business_line",
    "telephone": "+251-115-588-581",
    "fax": "+215-115-589-603",
    "poBox": "10090",
    "headTitle": "Director, Agricultural & Microinsurance",
    "headName": "Mr. Berhanu Dinka Bedane",
    "description": "Weather-index and multi-peril crop, livestock, credit life, and rural cooperative protection.",
    "status": "active"
  },
  {
    "departmentId": "DEPT-HQ-17",
    "name": "INTERNAL AUDIT DIRECTORATE",
    "category": "support_governance",
    "telephone": "+251-115-572-152",
    "fax": "+251-115-572-122",
    "poBox": "10090",
    "headTitle": "Director, Internal Audit",
    "headName": "Mr. Demie Shiferaw Minda",
    "description": "Independent assurance, operational auditing, and Board Audit Committee reporting.",
    "status": "active"
  },
  {
    "departmentId": "DEPT-HQ-18",
    "name": "HEADQUARTERS PROJECT OFFICE",
    "category": "support_governance",
    "telephone": "+251-115-589-439",
    "fax": "+251-115-572-122",
    "poBox": "10090",
    "headTitle": "Headquarters Project Manager",
    "description": "Coordination of the Oromia Insurance Headquarters development project.",
    "status": "active"
  },
  {
    "departmentId": "DEPT-HQ-19",
    "name": "CLAIMS MANAGEMENT DIRECTORATE",
    "category": "operations",
    "telephone": "+251-115-589-676",
    "fax": "+251-115-572-116",
    "poBox": "10090",
    "headTitle": "Director, Claims Management",
    "headName": "Mr. Abdisa Biratu Daba",
    "description": "Motor, property, marine, life, and agricultural claims assessment and prompt settlement.",
    "status": "active"
  },
  {
    "departmentId": "DEPT-HQ-20",
    "name": "INFORMATION TECHNOLOGY DIRECTORATE",
    "category": "support_governance",
    "telephone": "+251-115-587-002",
    "fax": "+251-115-572-122",
    "poBox": "10090",
    "headTitle": "Director, Information Technology",
    "headName": "Mr. Alemayehu Dorsis Regassa",
    "description": "Core insurance systems, digital platforms, cybersecurity, and branch connectivity.",
    "status": "active"
  },
  {
    "departmentId": "DEPT-HQ-21",
    "name": "ENGINEERING SERVICES DIRECTORATE",
    "category": "operations",
    "telephone": "+215-115-572-136",
    "fax": "+251-115-572-122",
    "poBox": "10090",
    "headTitle": "Director, Engineering Services",
    "headName": "Mr. Misganaw Teklu Fite",
    "description": "Pre-risk engineering surveys, motor assessment, and specialized construction/machinery valuation.",
    "status": "active"
  },
  {
    "departmentId": "DEPT-HQ-22",
    "name": "REINSURANCE SERVICES DIRECTORATE",
    "category": "operations",
    "telephone": "+251-115-572-118",
    "fax": "+251-115-572-122",
    "poBox": "10090",
    "headTitle": "Director, Reinsurance Services",
    "headName": "Mr. Daniel Girma Kebede",
    "description": "Reinsurance treaties, facultative placements, and Re-Takaful capacity agreements.",
    "status": "active"
  }
];

export interface BoardMemberProfile {
  id: string;
  name: string;
  position: string;
  qualification: string;
  experienceYears?: number;
  photo: string;
}

export const SEED_BOARD_MEMBERS: BoardMemberProfile[] = [
  { id: 'BOD-01', name: 'Mrs. Merem Chibsa', position: 'Chairperson', qualification: 'LLB Degree', experienceYears: 22, photo: '/assets/oic/board/Merem.jpg' },
  { id: 'BOD-02', name: 'Mr. Tiruneh Mitafa', position: 'Vice Chairperson', qualification: 'M.A in Human Resource & B.A in Management', experienceYears: 40, photo: '/assets/oic/board/Tiruneh.jpg' },
  { id: 'BOD-03', name: 'Mr. Abraham Ejeta', position: 'Board Member', qualification: 'MSc. in Trade Economics', experienceYears: 24, photo: '/assets/oic/board/Abraham.jpg' },
  { id: 'BOD-04', name: 'Mrs. Almaz Mideksa', position: 'Board Member', qualification: 'MBA in Project Management & B.A in Accounting', experienceYears: 32, photo: '/assets/oic/board/Almaz.jpg' },
  { id: 'BOD-05', name: 'Mr. Solomon Geda', position: 'Board Member', qualification: 'M.A in TEFL and LLB Degree', experienceYears: 20, photo: '/assets/oic/board/Solomon.jpg' },
  { id: 'BOD-06', name: 'Mr. Assegid Regassa', position: 'Board Member', qualification: 'M.A in Public Management & M.A in Logistic and Supply Management', photo: '/assets/oic/board/Asegid.jpg' },
  { id: 'BOD-07', name: 'Mrs. Simegn Kuma', position: 'Board Member', qualification: 'MBA in Business Administration & B.A in Management and Business Administration', experienceYears: 23, photo: '/assets/oic/board/Simegn.jpg' },
  { id: 'BOD-08', name: 'Eng. Tamene Tadesse', position: 'Board Member', qualification: 'MSc. in Geotechnical Engineering & BSc. in Civil Engineering', photo: '/assets/oic/board/Tamene.jpg' },
  { id: 'BOD-09', name: 'Mrs. Meaza Yohannes', position: 'Board Member', qualification: 'MBA in Business Administration & B.A in Management', experienceYears: 15, photo: '/assets/oic/board/Meaza.jpg' },
  { id: 'BOD-10', name: 'Mr. Teshome Tadele', position: 'Company Secretary', qualification: 'Qualification & experience pending confirmation', photo: '/assets/oic/board/Teshome.jpg' }
];

export interface ExecutiveMemberProfile {
  no: string;
  name: string;
  position: string;
  tier: 'c_suite' | 'directorate';
  photo?: string;
}

export const SEED_EXECUTIVES: ExecutiveMemberProfile[] = [
  { no: '01', name: 'Mr. Tegistu Shiferaw Tadesse', position: 'Chief Executive Officer (CEO)', tier: 'c_suite', photo: '/assets/oic/executives/Tegistu_Shiferaw.jpg' },
  { no: '02', name: 'Mr. Tamene Hailemariam Hordofa', position: 'Chief Operations Officer (COO)', tier: 'c_suite', photo: '/assets/oic/executives/Tamene_Hailemariam.jpg' },
  { no: '03', name: 'Mr. Samuel Tesfa Tolessa', position: 'Chief Resources Officer (CRO)', tier: 'c_suite', photo: '/assets/oic/executives/Samuel_Tesfa.jpg' },
  { no: '04', name: 'Mr. Teshome Tadele Diribsa', position: 'Company Secretary', tier: 'c_suite' },
  { no: '05', name: 'Mr. Demie Shiferaw Minda', position: 'Director, Internal Audit Directorate', tier: 'directorate', photo: '/assets/oic/executives/Demie_Shiferaw.jpg' },
  { no: '06', name: 'Mr. Deriba Balcha Kaba', position: 'Director, Risk Management & Compliance Services Directorate', tier: 'directorate', photo: '/assets/oic/executives/Deriba_Balcha.jpg' },
  { no: '07', name: 'Mr. Daniel Negassa Lemu', position: 'Director, Strategy & Change Management Directorate', tier: 'directorate', photo: '/assets/oic/executives/Daniel_Negassa.jpg' },
  { no: '08', name: 'Mr. Mekonnen Degu Gerbo', position: "A/Director, Marketing & Business Development Directorate", tier: 'directorate', photo: '/assets/oic/executives/Mekonnen_Degu.jpg' },
  { no: '09', name: 'Mr. Alemayehu Dorsis Regassa', position: 'Director, Information Technology Directorate', tier: 'directorate' },
  { no: '10', name: 'Mr. Tesfa Tolla Meko', position: 'Director, Legal Services Directorate', tier: 'directorate', photo: '/assets/oic/executives/Tesfa_Tolla.jpg' },
  { no: '11', name: 'Mr. Hawi Tesfaye Basha', position: 'A/Director, Underwriting & Branches Support Directorate', tier: 'directorate' },
  { no: '12', name: 'Mr. Adem Abdi Batu', position: 'Director, Takaful Insurance Directorate', tier: 'directorate' },
  { no: '13', name: 'Mr. Teshome Gadisa Tasisa', position: 'Director, Life & Health Insurance Directorate', tier: 'directorate' },
  { no: '14', name: 'Mr. Berhanu Dinka Bedane', position: 'Director, Agricultural & Microinsurance Directorate', tier: 'directorate' },
  { no: '15', name: 'Mr. Kefale Birhanu Duresa', position: 'Director, Finance Directorate', tier: 'directorate' },
  { no: '16', name: 'Mr. Berhanu Debela Beche', position: 'Director, Investment and Projects Management Directorate', tier: 'directorate' },
  { no: '17', name: 'Mr. Gize Zenebe Aschenaki', position: 'Director, Property & Facilities Management Directorate', tier: 'directorate' },
  { no: '18', name: 'Mr. Daniel Girma Kebede', position: 'Director, Reinsurance Services Directorate', tier: 'directorate' },
  { no: '19', name: 'Mr. Misganaw Teklu Fite', position: 'Director, Engineering Services Directorate', tier: 'directorate' },
  { no: '20', name: 'Mr. Abdisa Biratu Daba', position: 'Director, Claims Management Directorate', tier: 'directorate' },
  { no: '21', name: 'Mrs. Meaza Dibekulu Tsega', position: 'A/Director, Human Resources Management Directorate', tier: 'directorate' }
];

export const SEED_CMS_CONFIG: SiteCmsConfig = {
  configId: 'oic-site-cms',
  motto: 'Rest. Assured.',
  mottoOromo: 'Boqonnaa. Wabiituu.',
  mottoAmharic: 'በእርግጠኝነት ይረጋጉ።',
  vision: 'Becoming the most trusted protector of a secured tomorrow.',
  mission: 'We provide accessible, dependable insurance and settle claims with speed and fairness protecting the lives, livelihoods, and futures of households, farmers, and businesses across Ethiopia, and turning shared risk into shared peace of mind.',
  capitalNotice: 'Paid-Up Capital: ETB 1 Billion · Subscribed Capital: ETB 3 Billion · 62 Branches & 2 Contact Offices · 1.6M+ Low-Income Farmer Shareholders',
  headOfficeAddress: 'Ethio-China Friendship Avenue, Lideya Plaza (Oromia Insurance Headquarters), P.O. Box: 10090, Addis Ababa, Ethiopia',
  headOfficePhone: '+251-115-572121',
  headOfficeFax: '+251-115-572122',
  headOfficeEmail: 'info@oromiainsurance.com',
  claimsPhone: '+251-115-589-676',
  emergencyHelpline: '+251-115-572121',
  activeAlertBanner: 'All four OIC business lines — General (Non-Life), Life & Health, Agriculture & Microinsurance, and Halal Takaful — available across 62 branches & 2 contact offices.'
};

export const SEED_NEWS: NewsArticle[] = [
  {
    id: 'NEWS-OIC-01',
    tag: 'Crop Insurance Milestone',
    title: 'Oromia Insurance Pays ETB 40 Million — Largest Crop Insurance Compensation to Farmers in Amhara Region',
    date: '2024',
    summary: 'Oromia Insurance S.C. disbursed ETB 40 Million in Weather Index & Multi-Peril Crop Insurance compensation to affected farmers in the Amhara region — the largest single crop insurance payout in Ethiopia’s insurance history.',
    category: 'news',
    image: '/assets/oic/news_amhara_payout.jpg',
    isFeatured: true
  },
  {
    id: 'NEWS-OIC-02',
    tag: 'Industry Partnership',
    title: 'Oromia Insurance Welcomes Fair Insurance and Reinsurance Brokers',
    date: '2024',
    summary: 'Oromia Insurance S.C. hosted Fair Insurance and Reinsurance Brokers to strengthen treaty reinsurance partnerships, regional underwriting capacity, and corporate risk-transfer collaboration.',
    category: 'announcements',
    image: '/assets/oic/hero_homepage.png',
    isFeatured: true
  },
  {
    id: 'NEWS-OIC-03',
    tag: 'Community & CSR',
    title: 'Oromia Insurance Participates as Partner on "March with Deborah 2024"',
    date: '2024',
    summary: 'Standing with households and communities nationwide, Oromia Insurance S.C. partnered in the March with Deborah 2024 World Down Syndrome Day initiative.',
    category: 'news',
    image: '/assets/oic/news_deborah.jpg',
    isFeatured: false
  }
];

export const SEED_FAQS: { question: string; answer: string }[] = [
  {
    question: 'What is insurance?',
    answer: 'Insurance is protection against financial loss arising on the happening of an unexpected event. Insurance companies collect premiums to provide for this protection and losses are paid out of the pooled funds.'
  },
  {
    question: 'Why do I need insurance?',
    answer: 'Insurance is a hedge against the occurrence of unforeseen incidents. Oromia Insurance products help mitigate risks and provide a financial cushion against adverse financial burdens suffered by households, farmers, and businesses.'
  },
  {
    question: 'What is the meaning of Endorsement in insurance?',
    answer: 'An insurance endorsement or rider is an amendment to an existing insurance contract that changes the terms of the original policy at purchase, mid-term, or renewal. Premiums may be adjusted accordingly.'
  },
  {
    question: 'What is premium and deductible / excess underwriting?',
    answer: 'Premium is the fixed amount paid by the insured to the insurer to complete the contract of insurance. Where an excess/deductible applies, the agreed portion borne by the insured is first deducted from the assessed payable claim amount.'
  },
  {
    question: 'What makes Halal Takaful Insurance distinct?',
    answer: 'Oromia Insurance Halal Takaful is Sharia-compliant cooperative insurance free from prohibited elements and supervised by an independent Sharia Advisory Committee overseeing underwriting, claims, finance, and Re-Takaful treaties.'
  },
  {
    question: 'How can I renew my Oromia Insurance policy?',
    answer: 'You can initiate policy renewal directly in your Oromia Insurance Customer Portal, contact your issuing branch among our 62 branches and 2 contact offices, or call Head Office at +251-115-572121.'
  }
];

export const SEED_PRODUCTS: InsuranceProduct[] = [
  // ================= 1. NON-LIFE (GENERAL) INSURANCE =================
  {
    productId: 'PRD-NL-MOTOR',
    slug: 'motor-insurance',
    productName: 'Motor Insurance (Comprehensive & Third-Party)',
    productCategory: 'non_life',
    subCategory: 'Motor & Fleet',
    shortDescription: 'Comprehensive and compulsory third-party motor protection for private, commercial, and fleet vehicles across Ethiopia.',
    fullDescription: 'Protects private vehicles, commercial trucks, public transport, and fleets against accidental collision, overturning, fire, theft, malicious damage, and statutory third-party bodily injury or property damage.',
    heroImage: '/assets/oic/hero_motor.jpg',
    disclaimer: OFFICIAL_DISCLAIMER,
    isDemonstration: false,
    benefits: [
      'Own-damage cover up to agreed market value after physical inspection',
      'Compulsory third-party bodily injury and property damage indemnity',
      'Prompt claims survey and repair authorization through Claims Management Directorate (+251-115-589-676)'
    ],
    coverageSections: [
      { title: 'Own Damage & Theft', description: 'Covers accidental collision, overturning, fire, self-ignition, lightning, and theft.', limitOrFormula: 'Subject to vehicle inspection & OIC tariff' },
      { title: 'Third-Party Road Liability', description: 'Statutory indemnity for third-party death, bodily injury, and property damage.', limitOrFormula: 'National statutory limits (Proclamation No. 799/2013)' }
    ],
    exclusions: ['Unlicensed drivers or driving under intoxication', 'Wear, tear, mechanical/electrical breakdown absent collision', 'Consequential loss or territorial breach without endorsement'],
    eligibilityRules: ['Valid Ethiopian vehicle registration (Libre)', 'Valid driving license for operating driver'],
    requiredDocuments: [
      { code: 'DOC_LIBRE', title: 'Vehicle Logbook (Libre)', description: 'Scanned vehicle ownership book', mandatory: true },
      { code: 'DOC_DL', title: 'Driver License', description: 'Valid Ethiopian driving license', mandatory: true },
      { code: 'DOC_PROPOSAL', title: 'OIC Motor Proposal Form', description: 'Completed Motor Insurance Proposal Form', mandatory: true }
    ],
    faq: [{ question: 'Where can I get the official Motor Proposal Form?', answer: 'Available in Media & Downloads as Motor Insurance Proposal Form.pdf or online via the Customer Portal.' }],
    applicationSchema: [
      {
        stepTitle: 'Vehicle Particulars',
        fields: [
          { id: 'coverScope', label: 'Coverage Type', type: 'select', options: [{ label: 'Comprehensive Own Damage + Third Party', value: 'comprehensive' }, { label: 'Compulsory Third-Party Only', value: 'third_party' }], required: true },
          { id: 'vehicleMakeModel', label: 'Vehicle Make & Model', type: 'text', placeholder: 'e.g. Toyota Hilux / Isuzu NPR', required: true },
          { id: 'yearOfManufacture', label: 'Year of Manufacture', type: 'number', placeholder: '2022', required: true },
          { id: 'plateNumber', label: 'Plate Number', type: 'text', placeholder: 'e.g. AA-2-B48102', required: true },
          { id: 'chassisNumber', label: 'Chassis / Engine Number', type: 'text', placeholder: 'VIN / Chassis serial', required: true },
          { id: 'estimatedValueETB', label: 'Estimated Vehicle Value (ETB)', type: 'number', placeholder: '2200000', required: true }
        ]
      }
    ],
    quotationConfiguration: {
      baseRateDescription: 'Indicative preview rate; final tariff confirmed by OIC Underwriting & Branches Support Directorate',
      standardMinimumPremiumETB: 2500,
      taxRatePercent: 15,
      stampDutyETB: 50,
      indicativeCalculationSample: 'Indicative Estimate + 15% VAT + 50 ETB Stamp (Requires OIC Underwriting Confirmation)',
      requiresActuarialConfirmation: true
    },
    underwritingConfiguration: { requiresInspection: true, makerCheckerRequired: false, autoQuoteEligible: true, maxAutoQuoteAmountETB: 4000000 },
    policyTemplateId: 'TPL-OIC-NL-MOTOR',
    renewalConfiguration: { defaultTenureMonths: 12, gracePeriodDays: 14, reminderCadenceDays: [30, 14, 7, 0] },
    publicStatus: 'published',
    availability: 'online_and_operator',
    version: 1,
    createdBy: 'OIC-UNDERWRITING',
    publishedAt: '2026-01-01T08:00:00Z',
    createdAt: '2026-01-01T08:00:00Z',
    updatedAt: '2026-01-01T08:00:00Z'
  },
  {
    productId: 'PRD-NL-FIRE',
    slug: 'fire-and-allied-perils',
    productName: 'Fire & Allied Perils, Condominium & All Risk Insurance',
    productCategory: 'non_life',
    subCategory: 'Property & Fire',
    shortDescription: 'Protection for buildings, residences, condominiums, warehouses, stock, and business premises against fire, lightning, storm, flood, and allied perils.',
    fullDescription: 'Covers residential homes, condominiums, commercial buildings, factories, warehouses, and stocks against fire, lightning, explosion, storm, tempest, flood, overflowing of water tanks, burglary, plate glass breakage, and consequential loss.',
    heroImage: '/assets/oic/hero_fire.jpg',
    disclaimer: OFFICIAL_DISCLAIMER,
    benefits: [
      'Covers Fire & Allied Perils, Condominium Insurance, and All Risk extensions',
      'Optional Consequential Loss (Business Interruption), Burglary, and Plate Glass cover',
      'Pre-risk property survey support by OIC Engineering Services Directorate'
    ],
    coverageSections: [
      { title: 'Standard Fire & Lightning', description: 'Covers buildings, plant, and stocks against fire, lightning, and domestic boiler/gas explosion.', limitOrFormula: 'Sum insured on replacement or indemnity basis' },
      { title: 'Allied Perils, Burglary & Consequential Loss', description: 'Optional extensions for flood, earthquake, burst pipes, forcible burglary, and loss of gross profit.', limitOrFormula: 'As per scheduled extensions' }
    ],
    exclusions: ['War, civil commotion (unless endorsed), nuclear risks', 'Electrical short-circuit to dynamo itself unless fire ensues'],
    eligibilityRules: ['Legal title deed, lease contract, or verified asset inventory'],
    requiredDocuments: [
      { code: 'DOC_TITLE', title: 'Title Deed / Lease Agreement', description: 'Proof of property ownership or occupancy', mandatory: true },
      { code: 'DOC_PROPOSAL', title: 'Fire Proposal Form', description: 'Completed Fire Proposal Form.PDF / Burglary.PDF', mandatory: true }
    ],
    faq: [{ question: 'Are Condominium units covered?', answer: 'Yes, Oromia Insurance offers dedicated Condominium Insurance alongside Fire & Allied Perils and All Risk coverage.' }],
    applicationSchema: [
      {
        stepTitle: 'Property Details',
        fields: [
          { id: 'propertyClass', label: 'Plan Type', type: 'select', options: [{ label: 'Fire & Allied Perils', value: 'fire' }, { label: 'Condominium Insurance', value: 'condominium' }, { label: 'All Risk Insurance', value: 'all_risk' }, { label: 'Burglary & Housebreaking', value: 'burglary' }], required: true },
          { id: 'propertyLocation', label: 'Property City & Sub-City', type: 'text', placeholder: 'e.g. Addis Ababa, Bole', required: true },
          { id: 'constructionMaterial', label: 'Construction Type', type: 'select', options: [{ label: 'Concrete / Masonry (First Class)', value: 'concrete' }, { label: 'Mixed / Industrial Steel', value: 'industrial' }], required: true },
          { id: 'estimatedValueETB', label: 'Total Property & Stock Value (ETB)', type: 'number', placeholder: '5000000', required: true }
        ]
      }
    ],
    quotationConfiguration: {
      baseRateDescription: 'Indicative property rate subject to construction & occupancy class',
      standardMinimumPremiumETB: 2000,
      taxRatePercent: 15,
      stampDutyETB: 50,
      indicativeCalculationSample: 'Subject to OIC Underwriting & Engineering survey confirmation',
      requiresActuarialConfirmation: true
    },
    underwritingConfiguration: { requiresInspection: true, makerCheckerRequired: true, autoQuoteEligible: true, maxAutoQuoteAmountETB: 10000000 },
    policyTemplateId: 'TPL-OIC-NL-FIRE',
    renewalConfiguration: { defaultTenureMonths: 12, gracePeriodDays: 14, reminderCadenceDays: [30, 14, 7, 0] },
    publicStatus: 'published',
    availability: 'online_and_operator',
    version: 1,
    createdBy: 'OIC-UNDERWRITING',
    publishedAt: '2026-01-01T08:00:00Z',
    createdAt: '2026-01-01T08:00:00Z',
    updatedAt: '2026-01-01T08:00:00Z'
  },
  {
    productId: 'PRD-NL-ENG',
    slug: 'engineering-insurance',
    productName: 'Engineering Insurance (CAR, EAR, CPM, Boiler & Machinery)',
    productCategory: 'non_life',
    subCategory: 'Engineering & Construction',
    shortDescription: 'Contractors All Risks (CAR), Erection All Risks (EAR), Contractors Plant & Machinery (CPM), Boiler, Electronic Equipment & Machinery Breakdown.',
    fullDescription: 'Comprehensive technical engineering portfolio safeguarding infrastructure works, industrial plant erection, heavy earthmoving equipment, boilers, electronic installations, machinery breakdown, and machinery loss of profit.',
    heroImage: '/assets/oic/hero_engineering.jpg',
    disclaimer: OFFICIAL_DISCLAIMER,
    benefits: [
      'Covers Contractors All Risks (CAR), Erection All Risks (EAR), and CPM',
      'Includes Boiler, Electronic Equipment, and Machinery Breakdown + Loss of Profit',
      'Dedicated technical risk review by OIC Engineering Services Directorate'
    ],
    coverageSections: [
      { title: 'Contract Works & Erection (CAR / EAR)', description: 'Protects civil and mechanical construction/erection projects plus surrounding third-party liability.', limitOrFormula: 'Full contract value' },
      { title: 'Plant, Boiler & Machinery Breakdown (CPM / MB / EEI)', description: 'Covers sudden and unforeseen mechanical/electrical breakdown of industrial machinery and equipment.', limitOrFormula: 'New replacement / indemnity basis' }
    ],
    exclusions: ['Normal wear and tear or gradual deterioration', 'Defective design unless specifically endorsed'],
    eligibilityRules: ['Signed construction/installation contract or machinery valuation schedule'],
    requiredDocuments: [
      { code: 'DOC_BOQ', title: 'Contract Agreement / BoQ / Asset Schedule', description: 'Bill of Quantities or itemized machinery schedule', mandatory: true }
    ],
    faq: [{ question: 'Does OIC cover Machinery Loss of Profit?', answer: 'Yes, Oromia Insurance provides Machinery Breakdown & Loss of Profit Insurance alongside CAR, EAR, CPM, Boiler, and Electronic Equipment cover.' }],
    applicationSchema: [
      {
        stepTitle: 'Project / Equipment Scope',
        fields: [
          { id: 'engClass', label: 'Engineering Class', type: 'select', options: [{ label: 'Contractors All Risks (CAR)', value: 'car' }, { label: 'Erection All Risks (EAR)', value: 'ear' }, { label: "Contractors' Plant & Machinery (CPM)", value: 'cpm' }, { label: 'Machinery Breakdown / Loss of Profit', value: 'mb' }, { label: 'Boiler / Electronic Equipment', value: 'boiler_eei' }], required: true },
          { id: 'projectName', label: 'Project / Factory Name', type: 'text', placeholder: 'Project or industrial facility', required: true },
          { id: 'estimatedValueETB', label: 'Contract / Sum Insured Value (ETB)', type: 'number', placeholder: '15000000', required: true }
        ]
      }
    ],
    quotationConfiguration: {
      baseRateDescription: 'Project-specific engineering underwriting schedule',
      standardMinimumPremiumETB: 7500,
      taxRatePercent: 15,
      stampDutyETB: 50,
      indicativeCalculationSample: 'Subject to OIC Engineering & Reinsurance review',
      requiresActuarialConfirmation: true
    },
    underwritingConfiguration: { requiresInspection: true, makerCheckerRequired: true, autoQuoteEligible: false, maxAutoQuoteAmountETB: 0 },
    policyTemplateId: 'TPL-OIC-NL-ENG',
    renewalConfiguration: { defaultTenureMonths: 12, gracePeriodDays: 14, reminderCadenceDays: [30, 14, 7, 0] },
    publicStatus: 'published',
    availability: 'online_and_operator',
    version: 1,
    createdBy: 'OIC-UNDERWRITING',
    publishedAt: '2026-01-01T08:00:00Z',
    createdAt: '2026-01-01T08:00:00Z',
    updatedAt: '2026-01-01T08:00:00Z'
  },
  {
    productId: 'PRD-NL-MAR',
    slug: 'marine-goods-in-transit',
    productName: 'Marine Cargo, Goods-in-Transit & Carrier Liability',
    productCategory: 'non_life',
    subCategory: 'Marine & Transit',
    shortDescription: 'Import/export marine cargo, inland goods-in-transit, and inland carrier liability insurance across sea, air, rail, and road corridors.',
    fullDescription: 'Secures commercial importers, exporters, manufacturers, and freight carriers against physical loss or damage during sea/air transit (Marine Cargo), domestic overland movement (Goods-in-Transit), and Inland Carrier’s Legal Liability.',
    heroImage: '/assets/oic/hero_marine.jpg',
    disclaimer: OFFICIAL_DISCLAIMER,
    benefits: [
      'Supports L/C and CAD bank import documentation (OB, CBO & partner banks)',
      'Covers Goods-in-Transit and Inland Carrier’s Liability across Ethiopia & Djibouti corridors',
      'Prompt joint survey coordination at dry ports'
    ],
    coverageSections: [
      { title: 'Marine Cargo (ICC A / B / C)', description: 'Protects international shipments from warehouse of origin to dry port / final warehouse.', limitOrFormula: 'CIF + 10% valuation' },
      { title: 'Goods-in-Transit & Carrier Liability', description: 'Covers domestic overland haulage and legal liability of commercial transporters.', limitOrFormula: 'Per consignment / annual declaration' }
    ],
    exclusions: ['Inherent vice of cargo', 'Insufficient packaging', 'Insolvency of carrier'],
    eligibilityRules: ['Commercial invoice, bill of lading / airway bill, or transport manifest'],
    requiredDocuments: [
      { code: 'DOC_INV', title: 'Proforma / Commercial Invoice & Packing List', description: 'Shipment valuation & cargo description', mandatory: true }
    ],
    faq: [{ question: 'Are bank L/C marine certificates accepted by Ethiopian commercial banks?', answer: 'Yes, OIC marine cargo certificates comply fully with Ethiopian banking and customs trade requirements.' }],
    applicationSchema: [
      {
        stepTitle: 'Transit Declaration',
        fields: [
          { id: 'transitType', label: 'Transit Cover', type: 'select', options: [{ label: 'Marine Cargo (Import/Export)', value: 'marine' }, { label: 'Goods-in-Transit', value: 'git' }, { label: "Inland Carrier's Liability", value: 'carrier' }], required: true },
          { id: 'originDestination', label: 'Origin -> Destination', type: 'text', placeholder: 'e.g. Port of Djibouti -> Modjo / Finfinne', required: true },
          { id: 'estimatedValueETB', label: 'Total Consignment Value (ETB)', type: 'number', placeholder: '4500000', required: true }
        ]
      }
    ],
    quotationConfiguration: {
      baseRateDescription: 'Indicative cargo transit rating by clause & commodity',
      standardMinimumPremiumETB: 3000,
      taxRatePercent: 15,
      stampDutyETB: 50,
      indicativeCalculationSample: 'Subject to commodity, clause (A/B/C), and route confirmation',
      requiresActuarialConfirmation: true
    },
    underwritingConfiguration: { requiresInspection: false, makerCheckerRequired: true, autoQuoteEligible: true, maxAutoQuoteAmountETB: 8000000 },
    policyTemplateId: 'TPL-OIC-NL-MAR',
    renewalConfiguration: { defaultTenureMonths: 12, gracePeriodDays: 14, reminderCadenceDays: [30, 14, 7, 0] },
    publicStatus: 'published',
    availability: 'online_and_operator',
    version: 1,
    createdBy: 'OIC-UNDERWRITING',
    publishedAt: '2026-01-01T08:00:00Z',
    createdAt: '2026-01-01T08:00:00Z',
    updatedAt: '2026-01-01T08:00:00Z'
  },
  {
    productId: 'PRD-NL-BOND',
    slug: 'bonds-fidelity-money',
    productName: 'Bonds, Fidelity Guarantee & Money Insurance',
    productCategory: 'non_life',
    subCategory: 'Bonds & Pecuniary',
    shortDescription: 'Bid, Performance, Supply, Customs, Maintenance, Advance Payment & Retention Release Bonds alongside Fidelity Guarantee and Money Insurance.',
    fullDescription: 'Supports contractors, suppliers, and financial institutions with statutory surety bonds plus cash-in-safe/cash-in-transit Money Insurance and employee dishonesty Fidelity Guarantee.',
    heroImage: '/assets/oic/cat_non_life.jpg',
    disclaimer: OFFICIAL_DISCLAIMER,
    benefits: [
      'Full surety suite: Bid, Performance, Advance Payment, Supply, Customs, Maintenance & Retention Bonds',
      'Money Insurance for cash in safe, in premises, and in transit',
      'Fidelity Guarantee protecting employers against employee fraud or embezzlement'
    ],
    coverageSections: [
      { title: 'Contract & Statutory Surety Bonds', description: 'Unconditional or conditional guarantees for public & private tenders.', limitOrFormula: 'Bond face value' },
      { title: 'Fidelity Guarantee & Money', description: 'Covers direct pecuniary loss due to dishonesty of bonded employees or robbery of cash in transit/safe.', limitOrFormula: 'Per limit of indemnity' }
    ],
    exclusions: ['Prior known defaults', 'Unverified collateral / counter-indemnity gaps'],
    eligibilityRules: ['Tender invitation / contract award, audited financials, or collateral documentation'],
    requiredDocuments: [
      { code: 'DOC_TENDER', title: 'Bid / Contract Document or Audit Schedule', description: 'Contract agreement or employee schedule', mandatory: true }
    ],
    faq: [{ question: 'Which bond types does Oromia Insurance issue?', answer: 'Bid Bond, Performance Bond, Supply Bond, Customs Bond, Maintenance Bond, Advance Payment Bond, and Retention & Release Bond.' }],
    applicationSchema: [
      {
        stepTitle: 'Bond / Pecuniary Scope',
        fields: [
          { id: 'pecuniaryType', label: 'Facility Type', type: 'select', options: [{ label: 'Performance / Advance / Bid Bond', value: 'bond' }, { label: 'Customs / Supply / Retention Bond', value: 'customs_bond' }, { label: 'Fidelity Guarantee', value: 'fidelity' }, { label: 'Money Insurance (Transit / Safe)', value: 'money' }], required: true },
          { id: 'beneficiaryName', label: 'Beneficiary / Contracting Authority', type: 'text', placeholder: 'e.g. Ethiopian Roads Administration / Enterprise Name', required: true },
          { id: 'estimatedValueETB', label: 'Bond Amount / Limit of Indemnity (ETB)', type: 'number', placeholder: '2000000', required: true }
        ]
      }
    ],
    quotationConfiguration: {
      baseRateDescription: 'Subject to creditworthiness, collateral & bond tenure',
      standardMinimumPremiumETB: 3500,
      taxRatePercent: 15,
      stampDutyETB: 50,
      indicativeCalculationSample: 'Underwriting & collateral review required',
      requiresActuarialConfirmation: true
    },
    underwritingConfiguration: { requiresInspection: false, makerCheckerRequired: true, autoQuoteEligible: false, maxAutoQuoteAmountETB: 0 },
    policyTemplateId: 'TPL-OIC-NL-BOND',
    renewalConfiguration: { defaultTenureMonths: 12, gracePeriodDays: 14, reminderCadenceDays: [30, 14, 7, 0] },
    publicStatus: 'published',
    availability: 'online_and_operator',
    version: 1,
    createdBy: 'OIC-UNDERWRITING',
    publishedAt: '2026-01-01T08:00:00Z',
    createdAt: '2026-01-01T08:00:00Z',
    updatedAt: '2026-01-01T08:00:00Z'
  },
  {
    productId: 'PRD-NL-LIAB',
    slug: 'liability-accident-travel-horticulture',
    productName: 'Liability, Workmen’s Comp, PA, Travel Health & Horticulture',
    productCategory: 'non_life',
    subCategory: 'Liability, Accident & Specialty',
    shortDescription: 'Public Liability, Professional Indemnity, Workmen’s Compensation, Personal/Group Personal Accident, Travel Health, Plate Glass & Horticulture-Plantation.',
    fullDescription: 'Protects employers, professionals, commercial venues, travelers, and horticultural farms against workplace injury liability, third-party legal claims, professional errors, personal accidents, travel emergencies, and plantation risks.',
    heroImage: '/assets/oic/cat_non_life.jpg',
    disclaimer: OFFICIAL_DISCLAIMER,
    benefits: [
      'Workmen’s Compensation compliant with Ethiopian Labour Proclamation',
      'Public Liability & Professional Indemnity for businesses and specialists',
      'Travel Health, Personal/Group Accident & Horticulture-Plantation plans'
    ],
    coverageSections: [
      { title: 'Employer & Third-Party Liability', description: 'Covers Workmen’s Compensation, Public Liability, and Professional Indemnity.', limitOrFormula: 'Annual wage roll / selected indemnity limit' },
      { title: 'Accident, Travel & Horticulture', description: '24/7 Personal/Group Accident, overseas Travel Health, and commercial horticulture-plantation protection.', limitOrFormula: 'Capital sum / plantation schedule' }
    ],
    exclusions: ['Intentional wrongful acts', 'Pre-existing medical conditions (Travel Health)'],
    eligibilityRules: ['Valid business license, employee payroll list, or travel itinerary'],
    requiredDocuments: [
      { code: 'DOC_LIC', title: 'Business License / Employee Roll / Proposal Form', description: 'Workmens Compensation.PDF or Personal Accident Proposal Form.pdf', mandatory: true }
    ],
    faq: [{ question: 'Does Workmen’s Compensation cover all staff?', answer: 'Yes, coverage applies to scheduled permanent and contract employees based on declared annual payroll.' }],
    applicationSchema: [
      {
        stepTitle: 'Coverage Selection',
        fields: [
          { id: 'liabilityClass', label: 'Plan Selected', type: 'select', options: [{ label: "Workmen's Compensation", value: 'wc' }, { label: 'Public Liability', value: 'public' }, { label: 'Professional Indemnity', value: 'pi' }, { label: 'Personal / Group Personal Accident', value: 'pa' }, { label: 'Travel Health Insurance', value: 'travel' }, { label: 'Horticulture-Plantation', value: 'horticulture' }], required: true },
          { id: 'entityName', label: 'Organization / Insured Name', type: 'text', placeholder: 'Company or Individual Name', required: true },
          { id: 'estimatedValueETB', label: 'Declared Payroll / Limit / Sum Insured (ETB)', type: 'number', placeholder: '1500000', required: true }
        ]
      }
    ],
    quotationConfiguration: {
      baseRateDescription: 'Rated per occupation hazard, limit, or travel duration',
      standardMinimumPremiumETB: 1500,
      taxRatePercent: 15,
      stampDutyETB: 50,
      indicativeCalculationSample: 'Subject to occupation & schedule confirmation',
      requiresActuarialConfirmation: true
    },
    underwritingConfiguration: { requiresInspection: false, makerCheckerRequired: false, autoQuoteEligible: true, maxAutoQuoteAmountETB: 3000000 },
    policyTemplateId: 'TPL-OIC-NL-LIAB',
    renewalConfiguration: { defaultTenureMonths: 12, gracePeriodDays: 14, reminderCadenceDays: [30, 14, 7, 0] },
    publicStatus: 'published',
    availability: 'online_and_operator',
    version: 1,
    createdBy: 'OIC-UNDERWRITING',
    publishedAt: '2026-01-01T08:00:00Z',
    createdAt: '2026-01-01T08:00:00Z',
    updatedAt: '2026-01-01T08:00:00Z'
  },

  // ================= 2. LIFE & HEALTH INSURANCE =================
  {
    productId: 'PRD-LH-TERM',
    slug: 'term-life-insurance',
    productName: 'Group & Individual Term Life Insurance',
    productCategory: 'life_health',
    subCategory: 'Life Assurance',
    shortDescription: 'Lump-sum death benefit protecting employees’ families and designated beneficiaries in the event of loss of life.',
    fullDescription: 'Provides peace of mind for employees and households by guaranteeing an agreed lump-sum benefit to designated beneficiaries. Widely used by employers as a core staff benefit to attract and retain talent.',
    heroImage: '/assets/oic/hero_life.jpg',
    disclaimer: OFFICIAL_DISCLAIMER,
    benefits: [
      'Guaranteed lump-sum payout to designated beneficiaries',
      'Employer Group Term options that strengthen employee benefit packages',
      'Attachable Supplementary Riders: ADB, AD&D, CAI, WOP, Funeral, Terminal Illness & Permanent Disability'
    ],
    coverageSections: [
      { title: 'Core Death Benefit', description: 'Pays full sum assured upon death during the policy term.', limitOrFormula: 'Agreed capital sum or multiple of annual salary' },
      { title: 'Supplementary Riders', description: 'Optional ADB, AD&D, CAI, Waiver of Premium (WOP), Funeral Expense, Terminal Illness, and Permanent Disability riders.', limitOrFormula: 'Per selected rider schedule' }
    ],
    exclusions: ['Suicide within initial exclusion period per policy terms', 'Fraudulent non-disclosure'],
    eligibilityRules: ['Age and medical underwriting guidelines of Life & Health Insurance Directorate'],
    requiredDocuments: [
      { code: 'DOC_ID', title: 'National ID & Beneficiary Designation', description: 'Applicant ID or employer employee roster', mandatory: true }
    ],
    faq: [{ question: 'Can employers add riders like Funeral Expense or Disability?', answer: 'Yes, OIC Life Assurance offers ADB, AD&D, CAI, WOP, Funeral Expense, Terminal Illness/Dread Disease, Permanent Disability, and Supplementary Accident riders.' }],
    applicationSchema: [
      {
        stepTitle: 'Life Assurance Details',
        fields: [
          { id: 'planScope', label: 'Term Plan Type', type: 'select', options: [{ label: 'Individual Term Life', value: 'individual_term' }, { label: 'Group Employee Term Life', value: 'group_term' }], required: true },
          { id: 'insuredCount', label: 'Number of Lives Covered', type: 'number', placeholder: '1', required: true },
          { id: 'estimatedValueETB', label: 'Total Sum Assured (ETB)', type: 'number', placeholder: '1000000', required: true }
        ]
      }
    ],
    quotationConfiguration: {
      baseRateDescription: 'Actuarial mortality table rating by age band & term',
      standardMinimumPremiumETB: 2000,
      taxRatePercent: 0,
      stampDutyETB: 50,
      indicativeCalculationSample: 'Requires OIC Life & Health Actuarial Table Confirmation',
      requiresActuarialConfirmation: true
    },
    underwritingConfiguration: { requiresInspection: false, makerCheckerRequired: true, autoQuoteEligible: true, maxAutoQuoteAmountETB: 2000000 },
    policyTemplateId: 'TPL-OIC-LH-TERM',
    renewalConfiguration: { defaultTenureMonths: 12, gracePeriodDays: 30, reminderCadenceDays: [30, 14, 7, 0] },
    publicStatus: 'published',
    availability: 'online_and_operator',
    version: 1,
    createdBy: 'OIC-LIFE-HEALTH',
    publishedAt: '2026-01-01T08:00:00Z',
    createdAt: '2026-01-01T08:00:00Z',
    updatedAt: '2026-01-01T08:00:00Z'
  },
  {
    productId: 'PRD-LH-ENDOW',
    slug: 'endowment-and-annuity',
    productName: 'Endowment & Annuity Plans (Ordinary, Education, Anticipated, Group)',
    productCategory: 'life_health',
    subCategory: 'Savings & Endowment',
    shortDescription: 'Ordinary Endowment, Pure Endowment, Anticipated Endowment, Education Endowment, Group Endowment & Endowment Annuity.',
    fullDescription: 'Combines life protection with disciplined long-term savings, periodic anticipated payouts, children’s education funding, and retirement annuity security.',
    heroImage: '/assets/oic/hero_life.jpg',
    disclaimer: OFFICIAL_DISCLAIMER,
    benefits: [
      'Choices across Ordinary, Pure, Anticipated, Education & Group Endowment plus Endowment Annuity',
      'Pays full maturity benefit if insured survives term or sum assured on earlier death',
      'Optional Waiver of Premium (WOP) and accident riders'
    ],
    coverageSections: [
      { title: 'Maturity & Survival Benefits', description: 'Accumulated capital benefit at maturity or scheduled periodic payouts (Anticipated / Annuity).', limitOrFormula: 'Actuarial sum assured + bonuses where applicable' },
      { title: 'Family Protection Throughout Term', description: 'Full sum assured payable to beneficiaries if insured passes away during savings term.', limitOrFormula: '100% policy sum assured' }
    ],
    exclusions: ['Early surrender penalties per policy schedule', 'Material health non-disclosure'],
    eligibilityRules: ['Minimum/maximum entry age and policy term rules'],
    requiredDocuments: [
      { code: 'DOC_ID', title: 'Valid ID & Birth Proof', description: 'National ID or Passport', mandatory: true }
    ],
    faq: [{ question: 'What is the difference between Education Endowment and Anticipated Endowment?', answer: 'Education Endowment aligns payouts with higher-education milestones, while Anticipated Endowment pays scheduled cash installments during the policy term.' }],
    applicationSchema: [
      {
        stepTitle: 'Endowment Selection',
        fields: [
          { id: 'endowmentType', label: 'Endowment Variant', type: 'select', options: [{ label: 'Ordinary Endowment', value: 'ordinary' }, { label: 'Education Endowment', value: 'education' }, { label: 'Anticipated Endowment', value: 'anticipated' }, { label: 'Pure Endowment', value: 'pure' }, { label: 'Group Endowment', value: 'group' }, { label: 'Endowment Annuity', value: 'annuity' }], required: true },
          { id: 'termYears', label: 'Policy Term (Years)', type: 'number', placeholder: '10', required: true },
          { id: 'estimatedValueETB', label: 'Target Maturity Sum Assured (ETB)', type: 'number', placeholder: '500000', required: true }
        ]
      }
    ],
    quotationConfiguration: {
      baseRateDescription: 'Actuarial endowment schedule based on entry age & policy term',
      standardMinimumPremiumETB: 3000,
      taxRatePercent: 0,
      stampDutyETB: 50,
      indicativeCalculationSample: 'Subject to Life & Health Directorate actuarial illustration',
      requiresActuarialConfirmation: true
    },
    underwritingConfiguration: { requiresInspection: false, makerCheckerRequired: true, autoQuoteEligible: false, maxAutoQuoteAmountETB: 0 },
    policyTemplateId: 'TPL-OIC-LH-ENDOW',
    renewalConfiguration: { defaultTenureMonths: 12, gracePeriodDays: 30, reminderCadenceDays: [30, 14, 7, 0] },
    publicStatus: 'published',
    availability: 'online_and_operator',
    version: 1,
    createdBy: 'OIC-LIFE-HEALTH',
    publishedAt: '2026-01-01T08:00:00Z',
    createdAt: '2026-01-01T08:00:00Z',
    updatedAt: '2026-01-01T08:00:00Z'
  },
  {
    productId: 'PRD-LH-MORT',
    slug: 'whole-life-and-mortgage-protection',
    productName: 'Whole Life & Mortgage Protection Insurance',
    productCategory: 'life_health',
    subCategory: 'Estate & Credit Life',
    shortDescription: 'Lifelong Whole Life protection and Mortgage Protection safeguarding borrowers’ properties and families from loan default.',
    fullDescription: 'Whole Life provides permanent coverage for the insured’s entire lifetime, while Mortgage Protection clears remaining housing or commercial loan balances with sister and partner banks in the event of death.',
    heroImage: '/assets/oic/hero_life.jpg',
    disclaimer: OFFICIAL_DISCLAIMER,
    benefits: [
      'Lifetime protection (Whole Life) or decreasing/level loan cover (Mortgage Protection)',
      'Protects mortgaged homes from foreclosure upon unexpected loss of breadwinner',
      'Recognized by Oromia Bank (OB), Cooperative Bank of Oromia (CBO), and Ethiopian lenders'
    ],
    coverageSections: [
      { title: 'Whole Life Assurance', description: 'Permanent life coverage with guaranteed death benefit payable whenever death occurs.', limitOrFormula: 'Sum assured per policy' },
      { title: 'Mortgage Loan Protection', description: 'Settles outstanding loan principal owed to lending bank upon death or covered disability.', limitOrFormula: 'Outstanding mortgage balance' }
    ],
    exclusions: ['Pre-existing undisclosed critical illness'],
    eligibilityRules: ['Loan amortization schedule (for Mortgage) and medical declaration'],
    requiredDocuments: [
      { code: 'DOC_LOAN', title: 'Loan Offer / Amortization Schedule (Mortgage)', description: 'Bank facility letter if applying for Mortgage Protection', mandatory: false }
    ],
    faq: [{ question: 'Who receives the payout under Mortgage Protection?', answer: 'The lending bank receives the outstanding loan balance and any surplus goes to the insured’s family/beneficiaries.' }],
    applicationSchema: [
      {
        stepTitle: 'Policy Parameters',
        fields: [
          { id: 'coverType', label: 'Plan Type', type: 'select', options: [{ label: 'Mortgage Protection Insurance', value: 'mortgage' }, { label: 'Whole Life Assurance', value: 'whole_life' }], required: true },
          { id: 'estimatedValueETB', label: 'Loan Amount / Sum Assured (ETB)', type: 'number', placeholder: '3000000', required: true }
        ]
      }
    ],
    quotationConfiguration: {
      baseRateDescription: 'Actuarial mortality / loan-term schedule',
      standardMinimumPremiumETB: 2500,
      taxRatePercent: 0,
      stampDutyETB: 50,
      indicativeCalculationSample: 'Subject to Life & Health underwriting confirmation',
      requiresActuarialConfirmation: true
    },
    underwritingConfiguration: { requiresInspection: false, makerCheckerRequired: true, autoQuoteEligible: false, maxAutoQuoteAmountETB: 0 },
    policyTemplateId: 'TPL-OIC-LH-MORT',
    renewalConfiguration: { defaultTenureMonths: 12, gracePeriodDays: 30, reminderCadenceDays: [30, 14, 7, 0] },
    publicStatus: 'published',
    availability: 'online_and_operator',
    version: 1,
    createdBy: 'OIC-LIFE-HEALTH',
    publishedAt: '2026-01-01T08:00:00Z',
    createdAt: '2026-01-01T08:00:00Z',
    updatedAt: '2026-01-01T08:00:00Z'
  },
  {
    productId: 'PRD-LH-MED',
    slug: 'medical-insurance-and-riders',
    productName: 'Medical Insurance & Supplementary Life Riders',
    productCategory: 'life_health',
    subCategory: 'Health & Medical',
    shortDescription: 'Corporate/family medical insurance covering inpatient, outpatient, maternity & emergency care plus ADB, AD&D, CAI, WOP, Funeral & Dread Disease riders.',
    fullDescription: 'Safeguards organizations and households against rising healthcare costs alongside comprehensive life assurance riders (Accidental Death, AD&D, CAI, Waiver of Premium, Funeral Expense, Terminal Illness & Permanent Disability).',
    heroImage: '/assets/oic/hero_life.jpg',
    disclaimer: OFFICIAL_DISCLAIMER,
    benefits: [
      'Inpatient hospitalization, outpatient consultations, diagnostics & prescribed medications',
      'Full rider flexibility: ADB, AD&D, CAI, WOP, Funeral Expense, Terminal Illness & Permanent Disability',
      'Custom group benefit tiers for employers and institutions'
    ],
    coverageSections: [
      { title: 'Medical Benefit Schedule', description: 'Inpatient, outpatient, surgical, optical/dental (where opted), and maternity care.', limitOrFormula: 'Annual per-person / family limit' },
      { title: 'Life & Disability Riders', description: 'Accidental Death Benefit, AD&D, CAI, WOP, Funeral Expense, Terminal Illness, Permanent Disability.', limitOrFormula: 'Rider benefit schedule' }
    ],
    exclusions: ['Cosmetic procedures unless reconstructive post-accident', 'Self-inflicted injury'],
    eligibilityRules: ['Member census or individual health declaration'],
    requiredDocuments: [
      { code: 'DOC_CENSUS', title: 'Member Census / Health Declaration', description: 'List of covered employees or family members', mandatory: true }
    ],
    faq: [{ question: 'Can SMEs enroll small teams in Medical Insurance?', answer: 'Yes, contact our Life & Health Insurance Directorate (+251-115-585-625) for tailored corporate plans.' }],
    applicationSchema: [
      {
        stepTitle: 'Medical & Rider Preferences',
        fields: [
          { id: 'memberCount', label: 'Number of Members / Dependents', type: 'number', placeholder: '10', required: true },
          { id: 'estimatedValueETB', label: 'Annual Medical Limit per Member (ETB)', type: 'number', placeholder: '250000', required: true }
        ]
      }
    ],
    quotationConfiguration: {
      baseRateDescription: 'Tiered per-member medical & rider underwriting schedule',
      standardMinimumPremiumETB: 4500,
      taxRatePercent: 0,
      stampDutyETB: 50,
      indicativeCalculationSample: 'Subject to census & medical benefit tier confirmation',
      requiresActuarialConfirmation: true
    },
    underwritingConfiguration: { requiresInspection: false, makerCheckerRequired: true, autoQuoteEligible: false, maxAutoQuoteAmountETB: 0 },
    policyTemplateId: 'TPL-OIC-LH-MED',
    renewalConfiguration: { defaultTenureMonths: 12, gracePeriodDays: 30, reminderCadenceDays: [30, 14, 7, 0] },
    publicStatus: 'published',
    availability: 'online_and_operator',
    version: 1,
    createdBy: 'OIC-LIFE-HEALTH',
    publishedAt: '2026-01-01T08:00:00Z',
    createdAt: '2026-01-01T08:00:00Z',
    updatedAt: '2026-01-01T08:00:00Z'
  },

  // ================= 3. AGRICULTURE & MICROINSURANCE =================
  {
    productId: 'PRD-AG-CROP',
    slug: 'crop-insurance',
    productName: 'Crop Insurance (Weather Index, Multi-Peril & Coffee Plantation)',
    productCategory: 'agri_micro',
    subCategory: 'Crop Protection',
    shortDescription: 'Ethiopia’s pioneering Crop Insurance: Weather Index, Multi-Peril Crop, Area Yield Index, Vegetation Index & Coffee Plantation Insurance.',
    fullDescription: 'Empowers Ethiopian smallholder farmers, 34+ cooperative unions, and commercial agribusinesses with satellite-backed Weather Index, Vegetation Index, Area Yield Index, Multi-Peril Crop Insurance, and specialized Coffee Plantation cover.',
    heroImage: '/assets/oic/hero_crop.jpg',
    disclaimer: OFFICIAL_DISCLAIMER,
    benefits: [
      'Proven national track record — including ETB 40 Million crop insurance payout to farmers in Amhara region',
      '5 specialized schemes: Weather Index, Multi-Peril, Area Yield Index, Vegetation Index & Coffee Plantation',
      'Distributed nationwide through branches, farmers’ cooperative unions, OB & CBO'
    ],
    coverageSections: [
      { title: 'Index-Based Crop Insurance (Weather / Vegetation / Area Yield)', description: 'Parametric triggers based on rainfall deficit, excess rain, NDVI vegetation index, or woreda crop yield.', limitOrFormula: 'Per hectare / input investment value' },
      { title: 'Multi-Peril & Coffee Plantation Insurance', description: 'Indemnity cover for named weather, hail, frost, flood, fire, and pest risks affecting commercial farms and coffee estates.', limitOrFormula: 'Production cost or expected harvest value' }
    ],
    exclusions: ['Negligence or poor agronomic management outside covered perils', 'Unregistered cultivation plots'],
    eligibilityRules: ['Individual farmer, farmers’ cooperative union, or licensed commercial agricultural investor'],
    requiredDocuments: [
      { code: 'DOC_FARM', title: 'Cooperative Union / Farm Plot Schedule', description: 'Woreda, kebele, crop type, and cultivated hectarage', mandatory: true }
    ],
    faq: [{ question: 'Does OIC offer specialized Coffee Plantation Insurance?', answer: 'Yes. Coffee Plantation Insurance is a dedicated product within Oromia Insurance’s Agriculture & Microinsurance portfolio.' }],
    applicationSchema: [
      {
        stepTitle: 'Crop & Plot Information',
        fields: [
          { id: 'cropScheme', label: 'Crop Insurance Scheme', type: 'select', options: [{ label: 'Weather Index Crop Insurance', value: 'weather_index' }, { label: 'Multi-Peril Crop Insurance', value: 'multi_peril' }, { label: 'Area Yield Index Insurance', value: 'area_yield' }, { label: 'Vegetation Index Crop Insurance', value: 'vegetation_index' }, { label: 'Coffee Plantation Insurance', value: 'coffee' }], required: true },
          { id: 'regionZone', label: 'Region / Zone / Woreda', type: 'text', placeholder: 'e.g. Oromia, Jimma Zone / Amhara', required: true },
          { id: 'hectares', label: 'Cultivated Area (Hectares)', type: 'number', placeholder: '25', required: true },
          { id: 'estimatedValueETB', label: 'Total Input / Expected Yield Value (ETB)', type: 'number', placeholder: '500000', required: true }
        ]
      }
    ],
    quotationConfiguration: {
      baseRateDescription: 'Actuarial agro-ecological zone & index trigger pricing',
      standardMinimumPremiumETB: 1000,
      taxRatePercent: 0,
      stampDutyETB: 0,
      indicativeCalculationSample: 'Subject to Agricultural & Microinsurance Directorate agro-zone schedule',
      requiresActuarialConfirmation: true
    },
    underwritingConfiguration: { requiresInspection: true, makerCheckerRequired: false, autoQuoteEligible: true, maxAutoQuoteAmountETB: 2000000 },
    policyTemplateId: 'TPL-OIC-AG-CROP',
    renewalConfiguration: { defaultTenureMonths: 12, gracePeriodDays: 14, reminderCadenceDays: [30, 14, 7, 0] },
    publicStatus: 'published',
    availability: 'online_and_operator',
    version: 1,
    createdBy: 'OIC-AGRI-MICRO',
    publishedAt: '2026-01-01T08:00:00Z',
    createdAt: '2026-01-01T08:00:00Z',
    updatedAt: '2026-01-01T08:00:00Z'
  },
  {
    productId: 'PRD-AG-LIVE',
    slug: 'livestock-insurance',
    productName: 'Livestock Insurance (Index-Based & Multi-Peril)',
    productCategory: 'agri_micro',
    subCategory: 'Livestock Protection',
    shortDescription: 'Index-Based Livestock Insurance (IBLI) for pastoralists and Multi-Peril Livestock Insurance for dairy farms and cattle producers.',
    fullDescription: 'Protects pastoralist herds in drought-prone lowlands (Index-Based Livestock Insurance) as well as commercial dairy, beef, and breeding farms (Multi-Peril Livestock Insurance) against drought, disease epidemics, and accidental mortality.',
    heroImage: '/assets/oic/hero_livestock.jpg',
    disclaimer: OFFICIAL_DISCLAIMER,
    benefits: [
      'Both Index-Based Livestock Insurance (satellite forage/drought) & Multi-Peril herd indemnity',
      'Supported by rural contact offices including Yabello & Kemise and partner cooperative banks',
      'Encourages livestock productivity and rural financial inclusion'
    ],
    coverageSections: [
      { title: 'Index-Based Livestock Insurance (IBLI)', description: 'Seasonal drought index payouts triggered automatically before severe herd loss occurs.', limitOrFormula: 'Tropical Livestock Units (TLU) covered' },
      { title: 'Multi-Peril Livestock Insurance', description: 'Covers death of tagged dairy or breeding cattle due to accident, fire, snakebite, or covered disease.', limitOrFormula: 'Veterinary valuation per animal' }
    ],
    exclusions: ['Unattended chronic disease without vaccination', 'Theft without police report (unless endorsed)'],
    eligibilityRules: ['Tagged animals & veterinary health certificate (Multi-Peril) or pastoralist/cooperative enrollment (IBLI)'],
    requiredDocuments: [
      { code: 'DOC_VET', title: 'Herd Count / Veterinary Certificate', description: 'Livestock tag roster or cooperative enrollment list', mandatory: true }
    ],
    faq: [{ question: 'Is Index-Based Livestock Insurance available to pastoralists?', answer: 'Yes, OIC partners with regional cooperatives and development institutions across pastoralist zones.' }],
    applicationSchema: [
      {
        stepTitle: 'Livestock Scope',
        fields: [
          { id: 'livestockScheme', label: 'Livestock Scheme', type: 'select', options: [{ label: 'Index-Based Livestock Insurance (IBLI)', value: 'ibli' }, { label: 'Multi-Peril Livestock Insurance', value: 'multi_peril' }], required: true },
          { id: 'herdSize', label: 'Number of Animals / TLU', type: 'number', placeholder: '20', required: true },
          { id: 'estimatedValueETB', label: 'Total Livestock Valuation (ETB)', type: 'number', placeholder: '800000', required: true }
        ]
      }
    ],
    quotationConfiguration: {
      baseRateDescription: 'Seasonal agro-pastoralist & veterinary rating schedule',
      standardMinimumPremiumETB: 1000,
      taxRatePercent: 0,
      stampDutyETB: 0,
      indicativeCalculationSample: 'Subject to Agricultural & Microinsurance Directorate confirmation',
      requiresActuarialConfirmation: true
    },
    underwritingConfiguration: { requiresInspection: true, makerCheckerRequired: false, autoQuoteEligible: true, maxAutoQuoteAmountETB: 2000000 },
    policyTemplateId: 'TPL-OIC-AG-LIVE',
    renewalConfiguration: { defaultTenureMonths: 12, gracePeriodDays: 14, reminderCadenceDays: [30, 14, 7, 0] },
    publicStatus: 'published',
    availability: 'online_and_operator',
    version: 1,
    createdBy: 'OIC-AGRI-MICRO',
    publishedAt: '2026-01-01T08:00:00Z',
    createdAt: '2026-01-01T08:00:00Z',
    updatedAt: '2026-01-01T08:00:00Z'
  },
  {
    productId: 'PRD-AG-MICRO',
    slug: 'microinsurance-life-health-property',
    productName: 'Microinsurance (Credit Life, Micro-Health & Micro-Property)',
    productCategory: 'agri_micro',
    subCategory: 'Inclusive Microinsurance',
    shortDescription: 'Accessible Term Life, Credit Life (with Funeral & Disability), Micro-Health, and Micro-Property insurance for households, SACCOs & MFIs.',
    fullDescription: 'Provides affordable protection tailored for low-income households, micro-entrepreneurs, SACCOs, and microfinance borrowers: Term Life, Credit Life (stand-alone, with Funeral, with Disability, or combined), Health Microinsurance, and Property Microinsurance.',
    heroImage: '/assets/oic/cat_agri_micro.jpg',
    disclaimer: OFFICIAL_DISCLAIMER,
    benefits: [
      '5 Life variants: Term Life, Credit Life, Credit Life w/ Funeral, Credit Life w/ Disability, & combined',
      'Micro-Health and Micro-Property cover designed for micro-enterprises & rural households',
      'Rapid enrollment through cooperatives, MFIs, OB & CBO branches'
    ],
    coverageSections: [
      { title: 'Micro-Life & Credit Life Variants', description: 'Settles micro-loan balance plus optional funeral expense & disability family benefits.', limitOrFormula: 'Micro-loan / capital benefit tier' },
      { title: 'Micro-Health & Micro-Property', description: 'Affordable hospitalization assistance and small-business stock/premises cover.', limitOrFormula: 'Scheduled microinsurance benefit' }
    ],
    exclusions: ['Material misstatement during cooperative enrollment'],
    eligibilityRules: ['Member of partner MFI, SACCO, cooperative union, or eligible low-income household'],
    requiredDocuments: [
      { code: 'DOC_COOP', title: 'Member Roster / Kebele ID', description: 'Kebele ID or MFI/SACCO borrower roster', mandatory: true }
    ],
    faq: [{ question: 'Who can enroll in OIC Microinsurance?', answer: 'Farmers, micro-business owners, SACCO/MFI members, and rural households across all Ethiopian regions.' }],
    applicationSchema: [
      {
        stepTitle: 'Microinsurance Plan',
        fields: [
          { id: 'microPlan', label: 'Microinsurance Variant', type: 'select', options: [{ label: 'Credit Life Insurance', value: 'credit_life' }, { label: 'Credit Life with Funeral & Disability', value: 'credit_funeral_dis' }, { label: 'Micro Term Life Insurance', value: 'micro_term' }, { label: 'Micro-Health Insurance', value: 'micro_health' }, { label: 'Micro-Property Insurance', value: 'micro_property' }], required: true },
          { id: 'estimatedValueETB', label: 'Loan / Sum Insured (ETB)', type: 'number', placeholder: '100000', required: true }
        ]
      }
    ],
    quotationConfiguration: {
      baseRateDescription: 'Inclusive microinsurance actuarial tariff',
      standardMinimumPremiumETB: 500,
      taxRatePercent: 0,
      stampDutyETB: 0,
      indicativeCalculationSample: 'Subject to Agricultural & Microinsurance Directorate schedule',
      requiresActuarialConfirmation: true
    },
    underwritingConfiguration: { requiresInspection: false, makerCheckerRequired: false, autoQuoteEligible: true, maxAutoQuoteAmountETB: 500000 },
    policyTemplateId: 'TPL-OIC-AG-MICRO',
    renewalConfiguration: { defaultTenureMonths: 12, gracePeriodDays: 30, reminderCadenceDays: [30, 14, 7, 0] },
    publicStatus: 'published',
    availability: 'online_and_operator',
    version: 1,
    createdBy: 'OIC-AGRI-MICRO',
    publishedAt: '2026-01-01T08:00:00Z',
    createdAt: '2026-01-01T08:00:00Z',
    updatedAt: '2026-01-01T08:00:00Z'
  },

  // ================= 4. HALAL TAKAFUL INSURANCE =================
  {
    productId: 'PRD-TK-PROP',
    slug: 'property-takaful-insurance',
    productName: 'Property Takaful (Motor, Fire & Allied, Marine, Burglary, All Risk)',
    productCategory: 'halal_takaful',
    subCategory: 'Property Takaful',
    shariaSupervised: true,
    shortDescription: 'Sharia-compliant Property Takaful covering Motor, Fire & Allied, Marine, Burglary, Plate Glass & All Risk — supervised by OIC Sharia Advisory Committee.',
    fullDescription: 'Free from riba (interest), gharar (uncertainty), and prohibited activities. Participants contribute mutually into the Takaful Fund to indemnify covered losses across Motor Takaful, Fire & Allied Takaful, Marine Takaful, Burglary & Housebreaking Takaful, Plate Glass Takaful, and All Risk Takaful.',
    heroImage: '/assets/oic/cat_takaful.jpg',
    disclaimer: OFFICIAL_DISCLAIMER + " · Supervised by Oromia Insurance Sharia Advisory Committee",
    benefits: [
      '100% Sharia-compliant Takaful contract supervised by qualified Sharia scholars',
      'Available across all 62 Oromia Insurance branches and 2 contact offices',
      'Covers Motor, Fire & Allied, Marine, Burglary, Plate Glass, and All Risk Takaful'
    ],
    coverageSections: [
      { title: 'Motor & Marine Takaful', description: 'Halal protection for vehicles and import/export transit cargo under IFB/Takaful banking requirements.', limitOrFormula: 'Participant declared asset value' },
      { title: 'Fire, Burglary, Plate Glass & All Risk Takaful', description: 'Protects homes, commercial premises, and inventories against fire, lightning, theft, and accidental damage.', limitOrFormula: 'Agreed replacement / indemnity limit' }
    ],
    exclusions: ['Sharia-prohibited goods or activities', 'Fraudulent claims'],
    eligibilityRules: ['Open to all individuals and institutions seeking Halal Takaful cover'],
    requiredDocuments: [
      { code: 'DOC_TAKAFUL', title: 'Takaful Participant Proposal & Asset Proof', description: 'Vehicle Libre, Cargo Invoice, or Property Valuation', mandatory: true }
    ],
    faq: [{ question: 'Who supervises OIC’s Halal Takaful compliance?', answer: 'Oromia Insurance’s independent Sharia Advisory Committee (Sharia Scholars) oversees underwriting, claims, finance, fund management, and Re-Takaful treaties.' }],
    applicationSchema: [
      {
        stepTitle: 'Property Takaful Selection',
        fields: [
          { id: 'takafulClass', label: 'Property Takaful Plan', type: 'select', options: [{ label: 'Motor Takaful', value: 'motor_takaful' }, { label: 'Fire & Allied Takaful', value: 'fire_takaful' }, { label: 'Marine Takaful', value: 'marine_takaful' }, { label: 'Burglary & Housebreaking Takaful', value: 'burglary_takaful' }, { label: 'Plate Glass / All Risk Takaful', value: 'all_risk_takaful' }], required: true },
          { id: 'assetDescription', label: 'Covered Vehicle / Property / Cargo', type: 'text', placeholder: 'Describe vehicle, building, or shipment', required: true },
          { id: 'estimatedValueETB', label: 'Declared Asset Value (ETB)', type: 'number', placeholder: '2000000', required: true }
        ]
      }
    ],
    quotationConfiguration: {
      baseRateDescription: 'Takaful Tabarru contribution schedule supervised by Takaful Directorate',
      standardMinimumPremiumETB: 2500,
      taxRatePercent: 15,
      stampDutyETB: 50,
      indicativeCalculationSample: 'Takaful Fund contribution verified by Takaful Directorate',
      requiresActuarialConfirmation: true
    },
    underwritingConfiguration: { requiresInspection: true, makerCheckerRequired: false, autoQuoteEligible: true, maxAutoQuoteAmountETB: 5000000 },
    policyTemplateId: 'TPL-OIC-TK-PROP',
    renewalConfiguration: { defaultTenureMonths: 12, gracePeriodDays: 14, reminderCadenceDays: [30, 14, 7, 0] },
    publicStatus: 'published',
    availability: 'online_and_operator',
    version: 1,
    createdBy: 'OIC-TAKAFUL',
    publishedAt: '2026-01-01T08:00:00Z',
    createdAt: '2026-01-01T08:00:00Z',
    updatedAt: '2026-01-01T08:00:00Z'
  },
  {
    productId: 'PRD-TK-ENG',
    slug: 'engineering-and-liability-takaful',
    productName: 'Engineering & Liability Takaful Insurance',
    productCategory: 'halal_takaful',
    subCategory: 'Engineering & Liability Takaful',
    shariaSupervised: true,
    shortDescription: 'Halal Engineering Takaful (CAR, CPM, EAR, Machinery, Electronic Equipment, Boiler) & Liability Takaful (Public, Professional, Product, Carrier, Workmen’s Comp).',
    fullDescription: 'Sharia-compliant solidarity protection for construction contractors, factories, employers, and service professionals covering Contractors All Risks, CPM, EAR, Machinery Breakdown, Electronic Equipment, Boiler & Pressure Vessel, Public/Product/Carrier Liability, Professional Indemnity, and Workmen’s Compensation Takaful.',
    heroImage: '/assets/oic/hero_engineering.jpg',
    disclaimer: OFFICIAL_DISCLAIMER + " · Supervised by Oromia Insurance Sharia Advisory Committee",
    benefits: [
      'Complete Engineering Takaful suite: CAR, CPM, EAR, Machinery, Electronic Equipment & Boiler',
      'Full Liability Takaful suite: Public, Professional Indemnity, Product, Carrier’s & Workmen’s Comp',
      'Segregated Takaful Fund & Re-Takaful treaty backing'
    ],
    coverageSections: [
      { title: 'Engineering Takaful', description: 'Covers civil works, erection projects, plant/machinery breakdown, electronic hardware, and boilers.', limitOrFormula: 'Project / equipment sum covered' },
      { title: 'Liability & Workmen’s Compensation Takaful', description: 'Indemnifies third-party injury, professional liability, carrier liability, and statutory worker injury obligations.', limitOrFormula: 'Payroll / limit of indemnity' }
    ],
    exclusions: ['Sharia non-compliant activities', 'Intentional misconduct'],
    eligibilityRules: ['Engineering contract, factory asset schedule, or employer payroll schedule'],
    requiredDocuments: [
      { code: 'DOC_SCHED', title: 'Contract / Payroll / Machinery Schedule', description: 'Project BoQ or staff wage list', mandatory: true }
    ],
    faq: [{ question: 'Are Halal Takaful products available outside Addis Ababa?', answer: 'Yes, Takaful insurance products are available at all 62 Oromia Insurance branches and 2 contact offices.' }],
    applicationSchema: [
      {
        stepTitle: 'Engineering / Liability Takaful Scope',
        fields: [
          { id: 'takafulEngLiab', label: 'Takaful Coverage', type: 'select', options: [{ label: 'Contractors / Erection All Risk Takaful (CAR/EAR)', value: 'car_ear' }, { label: 'Plant, Machinery, Electronic & Boiler Takaful', value: 'cpm_mb' }, { label: 'Public / Product / Carrier Liability Takaful', value: 'liability' }, { label: 'Professional Indemnity Takaful', value: 'pi' }, { label: "Workmen's Compensation Takaful", value: 'wc' }], required: true },
          { id: 'estimatedValueETB', label: 'Project / Indemnity Limit (ETB)', type: 'number', placeholder: '5000000', required: true }
        ]
      }
    ],
    quotationConfiguration: {
      baseRateDescription: 'Takaful Engineering & Liability contribution schedule',
      standardMinimumPremiumETB: 4000,
      taxRatePercent: 15,
      stampDutyETB: 50,
      indicativeCalculationSample: 'Subject to Takaful Insurance Directorate confirmation',
      requiresActuarialConfirmation: true
    },
    underwritingConfiguration: { requiresInspection: true, makerCheckerRequired: true, autoQuoteEligible: false, maxAutoQuoteAmountETB: 0 },
    policyTemplateId: 'TPL-OIC-TK-ENG',
    renewalConfiguration: { defaultTenureMonths: 12, gracePeriodDays: 14, reminderCadenceDays: [30, 14, 7, 0] },
    publicStatus: 'published',
    availability: 'online_and_operator',
    version: 1,
    createdBy: 'OIC-TAKAFUL',
    publishedAt: '2026-01-01T08:00:00Z',
    createdAt: '2026-01-01T08:00:00Z',
    updatedAt: '2026-01-01T08:00:00Z'
  },
  {
    productId: 'PRD-TK-ACC',
    slug: 'pecuniary-and-accident-takaful',
    productName: 'Pecuniary & Accident Takaful (Bonds, Fidelity, Money & PA)',
    productCategory: 'halal_takaful',
    subCategory: 'Pecuniary & Accident Takaful',
    shariaSupervised: true,
    shortDescription: 'Halal Pecuniary Takaful (Bonds, Fidelity Guarantee & Money Insurance) and Accident Takaful (Group & Personal Accident).',
    fullDescription: 'Provides Halal surety and financial guarantees (Bonds Takaful, Fidelity Guarantee Takaful, Money Takaful) alongside 24-hour Group Accident and Personal Accident Takaful backed by mutual solidarity and Sharia oversight.',
    heroImage: '/assets/oic/cat_takaful.jpg',
    disclaimer: OFFICIAL_DISCLAIMER + " · Supervised by Oromia Insurance Sharia Advisory Committee",
    benefits: [
      'Pecuniary Takaful: Bonds, Fidelity Guarantee, and Money Takaful',
      'Accident Takaful: Group Accident and Personal Accident Takaful',
      'Transparent mutual fund management supervised by OIC Sharia Advisory Committee'
    ],
    coverageSections: [
      { title: 'Pecuniary Takaful', description: 'Halal tender/contract bonds, employee fidelity guarantee, and cash-in-transit/safe protection.', limitOrFormula: 'Agreed pecuniary limit' },
      { title: 'Accident Takaful (Group & Personal)', description: '24/7 accidental death, disability, and medical reimbursement benefits for individuals and groups.', limitOrFormula: 'Capital sum per participant' }
    ],
    exclusions: ['Non-Sharia commercial transactions', 'Self-inflicted injury'],
    eligibilityRules: ['Participant identification, employer list, or bond contract documentation'],
    requiredDocuments: [
      { code: 'DOC_ID', title: 'Participant ID / Group List / Bond Notice', description: 'Supporting identification or contract document', mandatory: true }
    ],
    faq: [{ question: 'Can businesses use Group Accident Takaful for employee welfare?', answer: 'Yes, employers can enroll full staff rosters under Group Accident Takaful across any OIC branch.' }],
    applicationSchema: [
      {
        stepTitle: 'Pecuniary / Accident Selection',
        fields: [
          { id: 'takafulPlan', label: 'Takaful Plan', type: 'select', options: [{ label: 'Bonds Takaful', value: 'bonds' }, { label: 'Fidelity Guarantee Takaful', value: 'fidelity' }, { label: 'Money Insurance Takaful', value: 'money' }, { label: 'Group Accident Takaful', value: 'group_accident' }, { label: 'Personal Accident Takaful', value: 'personal_accident' }], required: true },
          { id: 'estimatedValueETB', label: 'Indemnity / Capital Sum (ETB)', type: 'number', placeholder: '1000000', required: true }
        ]
      }
    ],
    quotationConfiguration: {
      baseRateDescription: 'Takaful Directorate schedule for pecuniary & accident lines',
      standardMinimumPremiumETB: 1500,
      taxRatePercent: 15,
      stampDutyETB: 50,
      indicativeCalculationSample: 'Subject to Takaful Insurance Directorate confirmation',
      requiresActuarialConfirmation: true
    },
    underwritingConfiguration: { requiresInspection: false, makerCheckerRequired: true, autoQuoteEligible: true, maxAutoQuoteAmountETB: 2500000 },
    policyTemplateId: 'TPL-OIC-TK-ACC',
    renewalConfiguration: { defaultTenureMonths: 12, gracePeriodDays: 14, reminderCadenceDays: [30, 14, 7, 0] },
    publicStatus: 'published',
    availability: 'online_and_operator',
    version: 1,
    createdBy: 'OIC-TAKAFUL',
    publishedAt: '2026-01-01T08:00:00Z',
    createdAt: '2026-01-01T08:00:00Z',
    updatedAt: '2026-01-01T08:00:00Z'
  }
];

// ZERO legacy AIC sample customers, employees, policies, applications, claims, payments, or audit records
export const SEED_CUSTOMERS: CustomerProfile[] = [];
export const SEED_OPERATORS: OperatorProfile[] = [];
export const SEED_STAFF: StaffProfile[] = [];
export const SEED_AGENTS: AgentProfile[] = [];
export const SEED_BROKERS: BrokerProfile[] = [];
export const SEED_POLICIES: InsurancePolicy[] = [];
export const SEED_APPLICATIONS: InsuranceApplication[] = [];
export const SEED_CLAIMS: InsuranceClaim[] = [];
export const SEED_PAYMENTS: PaymentAttempt[] = [];
export const SEED_AUDIT_LOGS: AuditLogEntry[] = [];
export const SEED_REPORTS: BusinessReport[] = [];
export const SEED_SUBSCRIBERS: NewsletterSubscriber[] = [];

export const SEED_TRAINING_COURSES: TrainingCourse[] = [
  {
    courseId: 'CRS-OIC-01',
    title: 'Oromia Insurance Values (O.R.O.M.I.A.) & Customer Onboarding',
    description: 'Mandatory compliance module covering Oneness, Reliability, Ownership, Mastery, Innovation, and Accountability in KYC and policy intake.',
    audience: 'all',
    required: true,
    lessons: [
      { lessonId: 'LSN-01', title: 'Living O.R.O.M.I.A. Core Values', durationMinutes: 15, content: 'Applying OIC’s six core values to every customer interaction and assisted proposal submission.' },
      { lessonId: 'LSN-02', title: 'Identity & Cooperative Union KYC Verification', durationMinutes: 15, content: 'Accurate customer contact registration, TIN verification, and Farmers’ Cooperative Union enrollment protocols.' }
    ],
    assessmentQuestions: [
      { question: 'What does the "R" in O.R.O.M.I.A. core values stand for?', options: ['Revenue', 'Reliability', 'Regulation', 'Resilience'], correctIndex: 1 },
      { question: 'May an operator enter their own phone number for a walk-in customer?', options: ['Yes', 'No, customers must retain direct contact & renewal control', 'Only on weekends'], correctIndex: 1 }
    ],
    passScorePct: 80,
    status: 'published',
    createdAt: '2026-01-01T08:00:00Z',
    updatedAt: '2026-01-01T08:00:00Z'
  },
  {
    courseId: 'CRS-OIC-02',
    title: 'Agriculture & Microinsurance Operations for Unions & Farmers',
    description: 'Technical training on Weather Index Crop, Coffee Plantation, Livestock IBLI, and Credit Life products.',
    audience: 'operator',
    productId: 'PRD-AG-CROP',
    required: true,
    lessons: [
      { lessonId: 'LSN-03', title: 'Index-Based vs Multi-Peril Cover', durationMinutes: 20, content: 'Understanding rainfall/NDVI triggers vs physical loss adjustment across Oromia, Amhara, and regional unions.' }
    ],
    assessmentQuestions: [
      { question: 'Which region received OIC’s record ETB 40 Million crop insurance compensation?', options: ['Amhara region', 'Dire Dawa only', 'Gambella only'], correctIndex: 0 }
    ],
    passScorePct: 80,
    status: 'published',
    createdAt: '2026-01-01T08:00:00Z',
    updatedAt: '2026-01-01T08:00:00Z'
  },
  {
    courseId: 'CRS-OIC-03',
    title: 'Halal Takaful Principles & Sharia Governance',
    description: 'Essential guide to Sharia-compliant Takaful underwriting, Tabarru fund segregation, and Sharia Advisory Committee supervision.',
    audience: 'all',
    productId: 'PRD-TK-PROP',
    required: true,
    lessons: [
      { lessonId: 'LSN-04', title: 'Mutual Solidarity & Prohibition of Riba/Gharar', durationMinutes: 20, content: 'How OIC Halal Takaful protects Motor, Property, Engineering, Liability, Pecuniary, and Accident participants.' }
    ],
    assessmentQuestions: [
      { question: 'Who supervises adherence to Sharia rules across OIC Takaful operations?', options: ['Regional Brokers', 'OIC Sharia Advisory Committee', 'Municipal Tax Office'], correctIndex: 1 }
    ],
    passScorePct: 80,
    status: 'published',
    createdAt: '2026-01-01T08:00:00Z',
    updatedAt: '2026-01-01T08:00:00Z'
  }
];

export const SEED_EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    templateId: 'TPL-EML-WELCOME',
    templateName: 'OIC Portal Welcome & Account Activation',
    category: 'transactional',
    subject: 'Welcome to Oromia Insurance S.C. Digital Platform — Rest. Assured.',
    htmlBody: '<h1>Welcome {{firstName}}</h1><p>Your Oromia Insurance S.C. self-service account is ready. Explore General, Life &amp; Health, Agriculture &amp; Microinsurance, and Halal Takaful plans anytime.</p>',
    textBody: 'Welcome {{firstName}}, your Oromia Insurance S.C. self-service account is active. Rest. Assured.',
    variables: ['firstName', 'portalUrl'],
    version: 1,
    status: 'active',
    preparedBy: 'OIC Marketing & Business Development Directorate',
    updatedAt: '2026-01-10T08:00:00Z'
  },
  {
    templateId: 'TPL-EML-QUOTED',
    templateName: 'Indicative Quotation Schedule Ready',
    category: 'transactional',
    subject: 'Your Oromia Insurance Quotation ({{applicationNumber}})',
    htmlBody: '<p>Dear {{customerName}},</p><p>Your quotation for {{productName}} ({{totalETB}} ETB) is ready in your OIC Customer Portal.</p>',
    textBody: 'Dear {{customerName}}, quotation for {{productName}} ({{totalETB}} ETB) is ready.',
    variables: ['customerName', 'applicationNumber', 'productName', 'totalETB'],
    version: 1,
    status: 'active',
    preparedBy: 'OIC Underwriting & Branches Support Directorate',
    updatedAt: '2026-01-10T08:00:00Z'
  },
  {
    templateId: 'TPL-EML-POLICY-ISSUED',
    templateName: 'Official OIC E-Policy Issued',
    category: 'transactional',
    subject: 'Your Oromia Insurance Policy Issued: {{policyNumber}}',
    htmlBody: '<p>Dear {{customerName}},</p><p>Policy {{policyNumber}} is now active. Verification Code: <strong>{{verificationCode}}</strong>.</p>',
    textBody: 'Policy {{policyNumber}} is active. Verification Code: {{verificationCode}}. Rest. Assured.',
    variables: ['customerName', 'policyNumber', 'verificationCode', 'expiryDate'],
    version: 1,
    status: 'active',
    preparedBy: 'OIC Underwriting & Branches Support Directorate',
    updatedAt: '2026-01-10T08:00:00Z'
  },
  {
    templateId: 'TPL-EML-RENEWAL-30D',
    templateName: 'Policy Renewal Reminder (30 / 14 / 7 Days)',
    category: 'renewal_reminder',
    subject: 'Oromia Insurance Renewal Notice: Policy {{policyNumber}}',
    htmlBody: '<p>Dear {{customerName}},</p><p>Your OIC policy {{policyNumber}} expires on {{expiryDate}}. Please renew online or at any of our 62 branches.</p>',
    textBody: 'Your OIC policy {{policyNumber}} expires on {{expiryDate}}.',
    variables: ['customerName', 'policyNumber', 'expiryDate'],
    version: 1,
    status: 'active',
    preparedBy: 'OIC Renewal Operations',
    updatedAt: '2026-01-10T08:00:00Z'
  }
];

export const SEED_ADMIN_DOCUMENTS: AdminUploadedDocument[] = [
  // Official Proposal & Governance Forms from oromiainsurance.com/downloads/downloads.php
  {
    id: 'DOC-OIC-FORM-MOTOR',
    title: 'Motor Insurance Proposal Form.pdf',
    productId: 'PRD-NL-MOTOR',
    productName: 'Motor Insurance (Comprehensive & Third-Party)',
    category: 'proposal_form',
    fileType: 'pdf',
    fileSize: '1.39 MB',
    uploadDate: '2026-01-01',
    downloadUrl: 'https://www.oromiainsurance.com/upload_form/Motor%20Insurance%20Proposal%20Form.pdf',
    version: 'Official OIC',
    isPublic: true,
    uploadedBy: 'OIC Underwriting & Branches Support Directorate',
    description: 'Official Oromia Insurance Motor Insurance proposal and vehicle schedule form.'
  },
  {
    id: 'DOC-OIC-FORM-FIRE',
    title: 'Fire Proposal Form.PDF',
    productId: 'PRD-NL-FIRE',
    productName: 'Fire & Allied Perils, Condominium & All Risk Insurance',
    category: 'proposal_form',
    fileType: 'pdf',
    fileSize: '2.03 MB',
    uploadDate: '2026-01-01',
    downloadUrl: 'https://www.oromiainsurance.com/upload_form/Fire%20Proposal%20Form.PDF',
    version: 'Official OIC',
    isPublic: true,
    uploadedBy: 'OIC Underwriting & Branches Support Directorate',
    description: 'Official Fire & Allied Perils proposal questionnaire for residential, condominium, and industrial risks.'
  },
  {
    id: 'DOC-OIC-FORM-PA',
    title: 'Personal Accident Proposal Form.pdf',
    productId: 'PRD-NL-LIAB',
    productName: 'Liability, Workmen’s Comp, PA, Travel Health & Horticulture',
    category: 'proposal_form',
    fileType: 'pdf',
    fileSize: '1.10 MB',
    uploadDate: '2026-01-01',
    downloadUrl: 'https://www.oromiainsurance.com/upload_form/Personal%20Accident%20Proposal%20Form.pdf',
    version: 'Official OIC',
    isPublic: true,
    uploadedBy: 'OIC Underwriting & Branches Support Directorate',
    description: 'Official Oromia Insurance Personal Accident & Group Accident proposal form.'
  },
  {
    id: 'DOC-OIC-FORM-WC',
    title: 'Workmens Compensation.PDF',
    productId: 'PRD-NL-LIAB',
    productName: 'Liability, Workmen’s Comp, PA, Travel Health & Horticulture',
    category: 'proposal_form',
    fileType: 'pdf',
    fileSize: '1.47 MB',
    uploadDate: '2026-01-01',
    downloadUrl: 'https://www.oromiainsurance.com/upload_form/Workmens%20Compensation.PDF',
    version: 'Official OIC',
    isPublic: true,
    uploadedBy: 'OIC Underwriting & Branches Support Directorate',
    description: 'Official Workmen’s Compensation proposal form for employer staff protection.'
  },
  {
    id: 'DOC-OIC-FORM-BURGLARY',
    title: 'Burglary.PDF',
    productId: 'PRD-NL-FIRE',
    productName: 'Fire & Allied Perils, Condominium & All Risk Insurance',
    category: 'proposal_form',
    fileType: 'pdf',
    fileSize: '2.08 MB',
    uploadDate: '2026-01-01',
    downloadUrl: 'https://www.oromiainsurance.com/upload_form/Burglary.PDF',
    version: 'Official OIC',
    isPublic: true,
    uploadedBy: 'OIC Underwriting & Branches Support Directorate',
    description: 'Official Burglary & Housebreaking proposal questionnaire.'
  },
  {
    id: 'DOC-OIC-FORM-MONEY',
    title: 'Money.PDF',
    productId: 'PRD-NL-BOND',
    productName: 'Bonds, Fidelity Guarantee & Money Insurance',
    category: 'proposal_form',
    fileType: 'pdf',
    fileSize: '1.16 MB',
    uploadDate: '2026-01-01',
    downloadUrl: 'https://www.oromiainsurance.com/upload_form/Money.PDF',
    version: 'Official OIC',
    isPublic: true,
    uploadedBy: 'OIC Underwriting & Branches Support Directorate',
    description: 'Official Money Insurance (Cash-in-Safe & Cash-in-Transit) proposal form.'
  },
  {
    id: 'DOC-OIC-FORM-FIDELITY',
    title: 'Fidelity Guarantee.PDF',
    productId: 'PRD-NL-BOND',
    productName: 'Bonds, Fidelity Guarantee & Money Insurance',
    category: 'proposal_form',
    fileType: 'pdf',
    fileSize: '1.72 MB',
    uploadDate: '2026-01-01',
    downloadUrl: 'https://www.oromiainsurance.com/upload_form/Fidelity%20Guarantee.PDF',
    version: 'Official OIC',
    isPublic: true,
    uploadedBy: 'OIC Underwriting & Branches Support Directorate',
    description: 'Official Fidelity Guarantee proposal form for bonded employee coverage.'
  },
  {
    id: 'DOC-OIC-GOV-MOA',
    title: 'Memorandum of Association (Revised).pdf',
    productId: 'all',
    productName: 'Corporate Governance',
    category: 'governance',
    fileType: 'pdf',
    fileSize: '4.39 MB',
    uploadDate: '2026-01-01',
    downloadUrl: 'https://www.oromiainsurance.com/upload_form/Memorandum%20of%20Association%20(Revised)-.pdf',
    version: 'Revised',
    isPublic: true,
    uploadedBy: 'Company Secretary Office',
    description: 'Revised Memorandum of Association of Oromia Insurance S.C.'
  },
  {
    id: 'DOC-OIC-GOV-BOD',
    title: 'Board_of_Directors_Nomination_Form_2026.pdf',
    productId: 'all',
    productName: 'Corporate Governance',
    category: 'governance',
    fileType: 'pdf',
    fileSize: '374 KB',
    uploadDate: '2026-01-01',
    downloadUrl: 'https://www.oromiainsurance.com/upload_form/Board_of_Directors_Nomination_Form_2026.pdf',
    version: '2026',
    isPublic: true,
    uploadedBy: 'Company Secretary Office',
    description: 'Official 2026 Board of Directors Nomination Form for Oromia Insurance S.C. shareholders.'
  },
  // Verified Annual Reports & Audited Financial Statements from oromiainsurance.com/aboutus/performance.php
  {
    id: 'DOC-OIC-AR-2025-26',
    title: 'Audited Annual Financial Statements for FY 2025-2026.pdf',
    productId: 'all',
    productName: 'Annual Reports & Financial Statements',
    category: 'annual_report',
    fileType: 'pdf',
    fileSize: '31.2 MB',
    uploadDate: '2026-09-30',
    downloadUrl: 'https://www.oromiainsurance.com/uploads/Audited%20Annual%20Financial%20Statements%20for%20FY%202025-2026.pdf',
    version: 'FY 2025-2026',
    isPublic: true,
    uploadedBy: 'OIC Finance Directorate',
    description: 'Audited Annual Financial Statements of Oromia Insurance S.C. for Fiscal Year 2025-2026.'
  },
  {
    id: 'DOC-OIC-AR-PROSPECTUS',
    title: 'Prospectus - Oromia Insurance (30-09-26).pdf',
    productId: 'all',
    productName: 'Annual Reports & Financial Statements',
    category: 'annual_report',
    fileType: 'pdf',
    fileSize: '4.36 MB',
    uploadDate: '2026-09-30',
    downloadUrl: 'https://www.oromiainsurance.com/uploads/Prospectus-Oromia%20Insurance%2030-09-26.pdf',
    version: '2026',
    isPublic: true,
    uploadedBy: 'OIC Strategy & Finance',
    description: 'Official Oromia Insurance S.C. Prospectus.'
  },
  {
    id: 'DOC-OIC-AR-2024-25',
    title: 'Oromia Insurance Annual Report 2024-2025.pdf',
    productId: 'all',
    productName: 'Annual Reports & Financial Statements',
    category: 'annual_report',
    fileType: 'pdf',
    fileSize: '5.07 MB',
    uploadDate: '2025-10-01',
    downloadUrl: 'https://www.oromiainsurance.com/uploads/Oromia%20Insurance%20Annual%20Report%202024-2025.pdf',
    version: 'FY 2024-2025',
    isPublic: true,
    uploadedBy: 'OIC Finance Directorate',
    description: 'Annual Performance Report and Financial Highlights for FY 2024-2025.'
  },
  {
    id: 'DOC-OIC-AR-2023-24',
    title: 'Oromia Insurance (S.C) Annual Report 2023-2024.pdf',
    productId: 'all',
    productName: 'Annual Reports & Financial Statements',
    category: 'annual_report',
    fileType: 'pdf',
    fileSize: '8.14 MB',
    uploadDate: '2024-10-01',
    downloadUrl: 'https://www.oromiainsurance.com/uploads/Oromia%20Insurance%20%28S.C%29%20Annual%20Report%202023-2024.pdf',
    version: 'FY 2023-2024',
    isPublic: true,
    uploadedBy: 'OIC Finance Directorate',
    description: 'Annual Performance Report and Audited Statements for FY 2023-2024.'
  },
  {
    id: 'DOC-OIC-AR-2022-23',
    title: 'Oromia Insurance (S.C) Annual Report 2022-23.pdf',
    productId: 'all',
    productName: 'Annual Reports & Financial Statements',
    category: 'annual_report',
    fileType: 'pdf',
    fileSize: '4.02 MB',
    uploadDate: '2023-10-01',
    downloadUrl: 'https://www.oromiainsurance.com/uploads/Oromia%20Insurance%28S.C%29%20Annual%20Report%202022-23.pdf',
    version: 'FY 2022-2023',
    isPublic: true,
    uploadedBy: 'OIC Finance Directorate',
    description: 'Annual Performance Report for FY 2022-2023.'
  },
  {
    id: 'DOC-OIC-AR-2021-22',
    title: 'Oromia Insurance (S.C) Annual Report 2021-22.pdf',
    productId: 'all',
    productName: 'Annual Reports & Financial Statements',
    category: 'annual_report',
    fileType: 'pdf',
    fileSize: '6.91 MB',
    uploadDate: '2022-10-01',
    downloadUrl: 'https://www.oromiainsurance.com/uploads/Oromia%20Insurance%28S.C%29%20Annual%20Report%202021-22.pdf',
    version: 'FY 2021-2022',
    isPublic: true,
    uploadedBy: 'OIC Finance Directorate',
    description: 'Annual Performance Report for FY 2021-2022.'
  }
];
