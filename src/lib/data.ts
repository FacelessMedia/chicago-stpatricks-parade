export const PARADE_INFO = {
  year: 2027,
  name: "Chicago St. Patrick's Day Parade",
  tagline: "Celebrating Irish Heritage in the Heart of Chicago",
  theme: "To Be Announced",
  themeAnnounced: false,
  paradeDate: "2027-03-13", // Saturday before St. Patrick's Day (Mar 17, 2027 is a Wednesday)
  paradeTime: "12:00 PM",
  paradeRoute: "Columbus Drive, from Balbo Drive to Monroe Street",
  riverDyeing: {
    date: "2027-03-13",
    time: "9:00 AM",
    location: "Chicago River at Michigan Avenue",
  },
  cbcDinner: {
    name: "Annual Corned Beef & Cabbage Dinner",
    date: "2027-01-28",
    time: "6:00 PM",
    location: "Chicago",
    isPast: false,
    dateConfirmed: false,
  },
  // 2027 deadlines are provisional (mirroring the 2026 cadence) until the
  // committee confirms them — editable in Airtable once Phase 2.2 wiring lands.
  deadlines: {
    queenContest: "2027-01-10",
    queenContestRegistration: "2027-01-04",
    cbcDinner: "2027-01-28",
    cbcDinnerRegistration: "2027-01-15",
    logoDeadline: "2027-01-08",
    adBookDeadline: "2027-01-29",
    premierPackageDeadline: "2027-01-08",
    lightPoleBannerDeadline: "2027-01-29",
    paradeEntryDeadline: "2027-02-08",
    grandstandPurchaseDeadline: "2027-03-08",
  },
  // 2027 honorees not yet announced — showing the 2026 honorees until then.
  honoreesAnnounced: false,
  grandMarshal: {
    name: "Rev. Thomas R. McCarthy, O.S.A.",
    title: "2026 Grand Marshal",
    bio: `Rev. Thomas R. McCarthy, O.S.A., has dedicated his life to serving others through faith, education, and community. A beloved figure in the Chicago Irish community, Father Tom has touched countless lives through his pastoral work and unwavering commitment to bringing people together. His leadership exemplifies the parade's theme of Faith, Peace & Unity.`,
    website: "http://www.frtommccarthy.com/",
  },
  guestOfHonor: {
    name: "The Shannon Rovers",
    title: "2026 Guest of Honor",
    subtitle: "Celebrating their 100th Anniversary — 1926-2026",
    bio: `Chicago's one and only Shannon Rovers Irish Pipe Band celebrates an extraordinary milestone in 2026 — their 100th anniversary. Founded in 1926, the Shannon Rovers have been an integral part of Chicago's Irish heritage and cultural identity for a century. Their stirring performances of traditional Irish music have graced countless events and celebrations, making them one of the most iconic Irish pipe bands in America.`,
  },
  queen: {
    name: "Claire Cahill",
    title: "2026 Parade Queen",
    bio: `Congratulations to Claire Cahill, crowned the 2026 Chicago St. Patrick's Day Parade Queen! Claire represents the best of Chicago's Irish-American community and will reign over the parade festivities.`,
    crownedLink: "https://abc7chicago.com/post/chicago-st-patricks-day-parade-2026-claire-cahill-win-contest-crowned-new-queen/18388388/",
  },
};

export const PACKAGES = [
  {
    id: "vip",
    name: "VIP Shamrock Package",
    tier: "VIP",
    color: "gold",
    price: 8500,
    priceLabel: "$8,500",
    features: [
      "1 VIP Table for 10 guests at the Corned Beef and Cabbage Dinner",
      "Full Page Color Ad in Parade Ad Book",
      "Jumbo Screen Video Advertisement at the CBC Dinner",
      "Parade Entry for your Float or Marching Group",
      "Parade Route Light Pole Banner on Columbus Drive",
      "6 VIP tickets on a Chartered Boat for the Dyeing of the Chicago River Green",
    ],
    highlight: true,
  },
  {
    id: "executive",
    name: "Executive Shamrock Package",
    tier: "Executive",
    color: "emerald",
    price: 6500,
    priceLabel: "$6,500",
    features: [
      "1 Executive Table for 10 guests at the Corned Beef and Cabbage Dinner",
      "Full Page Color Ad in Parade Ad Book",
      "Jumbo Screen Video Advertisement at the CBC Dinner",
      "Parade Entry for your Float or Marching Group",
      "Parade Route Light Pole Banner on Columbus Drive",
      "4 Executive tickets on a Chartered Boat for the Dyeing of the Chicago River Green",
    ],
    highlight: false,
  },
  {
    id: "premier",
    name: "Premier Shamrock Package",
    tier: "Premier",
    color: "emerald",
    price: 4500,
    priceLabel: "$4,500",
    features: [
      "1 Premier Table for 10 guests at the Corned Beef and Cabbage Dinner",
      "Full Page Black & White Ad in Parade Ad Book",
      "Jumbo Screen Video Advertisement at the CBC Dinner",
      "Parade Entry for your Float or Marching Group",
      "Parade Route Light Pole Banner on Columbus Drive",
      "2 Premier tickets on a Chartered Boat for the Dyeing of the Chicago River Green",
    ],
    highlight: false,
  },
];

export interface AlaCarteItem {
  id: string;
  name: string;
  description: string;
  price: number;
  priceLabel: string;
  unit: string;
  href: string;
  maxQuantity: number;
  limited?: boolean;
  isPast?: boolean;
}

export const ALA_CARTE_ITEMS: AlaCarteItem[] = [
  {
    id: "parade-entry",
    name: "Parade Entry",
    description: "Entry for your float or marching group, including a half-page black & white ad",
    price: 500,
    priceLabel: "$500 per entry",
    unit: "entry",
    href: "/register?type=alacarte&item=parade-entry",
    maxQuantity: 1,
  },
  {
    id: "ad-full-color",
    name: "Full Page Color Ad",
    description: "Full-page color advertisement in the Official Parade Ad Book",
    price: 1000,
    priceLabel: "$1,000",
    unit: "ad",
    href: "/ad-book",
    maxQuantity: 5,
  },
  {
    id: "ad-full-bw",
    name: "Full Page B&W Ad",
    description: "Full-page black & white advertisement in the Official Parade Ad Book",
    price: 750,
    priceLabel: "$750",
    unit: "ad",
    href: "/ad-book",
    maxQuantity: 5,
  },
  {
    id: "ad-half-bw",
    name: "Half Page B&W Ad",
    description: "Half-page black & white advertisement in the Official Parade Ad Book",
    price: 500,
    priceLabel: "$500",
    unit: "ad",
    href: "/ad-book",
    maxQuantity: 5,
  },
  {
    id: "cbc-seat",
    name: "CBC Dinner Individual Seat",
    description: "One individual seat at the Annual Corned Beef & Cabbage Dinner",
    price: 150,
    priceLabel: "$150 per seat",
    unit: "seat",
    href: "/cbc-dinner",
    maxQuantity: 9,
  },
  {
    id: "cbc-table",
    name: "CBC Dinner Table",
    description: "A reserved table for 10 guests at the Annual Corned Beef & Cabbage Dinner",
    price: 1500,
    priceLabel: "$1,500 per table",
    unit: "table",
    href: "/cbc-dinner",
    maxQuantity: 10,
  },
  {
    id: "grandstand",
    name: "Grandstand Seats",
    description: "Reserved seating along the parade route on Columbus Drive",
    price: 65,
    priceLabel: "$65 per seat",
    unit: "seat",
    href: "/grandstand-seats",
    maxQuantity: 50,
  },
  {
    id: "light-pole-banner",
    name: "Light Pole Banner",
    description: "Your company or family name displayed on Columbus Drive on Parade Day",
    price: 2000,
    priceLabel: "$2,000 per banner",
    unit: "banner",
    href: "/light-pole-banner",
    maxQuantity: 10,
  },
  {
    id: "raffle",
    name: "Raffle Tickets",
    description: "Enter the annual raffle; only 750 tickets are available each year",
    price: 100,
    priceLabel: "$100 per ticket",
    unit: "ticket",
    href: "/raffle",
    maxQuantity: 10,
    limited: true,
  },
  {
    id: "lapel-pin",
    name: "Parade Lapel Pin",
    description: "Official commemorative Chicago St. Patrick's Day Parade lapel pin",
    price: 15,
    priceLabel: "$15 per pin",
    unit: "pin",
    href: "/register?type=alacarte&item=lapel-pin",
    maxQuantity: 50,
  },
  {
    id: "donation",
    name: "Parade Donation",
    description: "A contribution supporting the parade and its ongoing traditions",
    price: 1,
    priceLabel: "Choose your amount",
    unit: "dollar",
    href: "/register?type=alacarte&item=donation",
    maxQuantity: 100000,
  },
];

export const QUEEN_CONTEST_HISTORY = [
  { year: 2026, name: "Claire Cahill", description: "Claire was crowned the 2026 Chicago St. Patrick's Day Parade Queen, continuing the proud tradition of celebrating young Irish-American women in Chicago." },
  { year: 2025, name: "Parade Queen 2025", description: "Represented the best of Chicago's Irish-American community during the 2025 parade celebrations." },
  { year: 2024, name: "Parade Queen 2024", description: "Reigned over the 2024 Chicago St. Patrick's Day Parade with grace and pride in her Irish heritage." },
  { year: 2023, name: "Parade Queen 2023", description: "Carried on the tradition of the Queen Contest during the 2023 parade season." },
  { year: 2022, name: "Kelley Leyden", description: "Kelley Leyden was crowned Queen of the 2022 Chicago St. Patrick's Day Parade, representing the spirit of Irish Chicago." },
  { year: 2021, name: "Parade Queen 2021", description: "Even during challenging times, the tradition continued with the 2021 Parade Queen." },
  { year: 2020, name: "Parade Queen 2020", description: "Selected as Queen for the 2020 season, a year that showed the resilience of the Chicago Irish community." },
  { year: 2019, name: "Parade Queen 2019", description: "Reigned over one of the largest parades in recent history during the 2019 celebration." },
  { year: 2018, name: "Parade Queen 2018", description: "Represented the parade with distinction during the 2018 festivities." },
  { year: 2017, name: "Parade Queen 2017", description: "Carried on decades of tradition as the 2017 Chicago St. Patrick's Day Parade Queen." },
  { year: 2016, name: "Parade Queen 2016", description: "Crowned in 2016, continuing the cherished Queen Contest tradition." },
  { year: 2015, name: "Parade Queen 2015", description: "The 2015 Parade Queen added her name to the proud list of past queens." },
];

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/parade-info", label: "Parade Info" },
  { href: "/packages", label: "Packages" },
  { href: "/events", label: "Events" },
  { href: "/queen-contest", label: "Queen Contest" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export const SPONSORS = [
  "Aer Lingus", "BlackRock", "Blue Cross Blue Shield", "Boyd Watterson",
  "CannaCard", "Chicago White Sox", "CN Railway", "Constitution Capital Partners",
  "Country Financial", "Diageo Beer Company", "GW Asset Management",
  "Intercontinental Realty", "Irish Fellowship Club of Chicago", "Janus Henderson",
  "Labor First", "Legacy Professionals", "Marathon Health", "Marquette Associates",
  "Mercedes Benz", "Metra", "Midwest Institutional Trust", "Monster Energy",
  "National Investment Services", "Nuveen", "O'Briens Restaurant", "Segal",
  "Shoreline", "Sopel Foundation for Dyslexia",
];
