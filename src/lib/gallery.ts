export type GalleryImage = {
  src: string;
  alt: string;
  category: "parade" | "queen" | "river" | "community";
};

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: "/images/river-dyeing-boat.jpg", alt: "Boat crew dyeing the Chicago River emerald green", category: "river" },
  { src: "/images/marchers-columbus.jpg", alt: "Marchers processing down Columbus Drive with the Chicago skyline behind", category: "parade" },
  { src: "/images/queen-carriage.jpg", alt: "Parade Queen waving from a horse-drawn carriage on the parade route", category: "parade" },
  { src: "/images/court-float-crowd.jpg", alt: "The Queen and her court waving to crowds from the parade float", category: "parade" },
  { src: "/images/queen-green-river.jpg", alt: "Parade Queen beside the freshly dyed green Chicago River", category: "river" },
  { src: "/images/queen-court-stage.jpg", alt: "The 2026 Queen and her court on stage at the crowning ceremony", category: "queen" },
  { src: "/images/queen-crowned-flags.jpg", alt: "The newly crowned Parade Queen with flags behind her", category: "queen" },
  { src: "/images/queen-claire-portrait.jpg", alt: "Portrait of the 2026 Parade Queen", category: "queen" },
  { src: "/images/queen-court-full-length.jpg", alt: "The Queen and court in full dress at a parade event", category: "queen" },
  { src: "/images/queen-court-emerald-isle.jpg", alt: "The Queen and court visiting Emerald Isle in Edison Park", category: "community" },
  { src: "/images/queen-court-elis.jpg", alt: "The Queen and court visiting Eli's Cheesecake", category: "community" },
  { src: "/images/community-metra-kids.jpg", alt: "Families and kids celebrating at a parade community event", category: "community" },
  { src: "/images/community-emerald-isle.jpg", alt: "Community celebration with the parade court", category: "community" },
  { src: "/images/pipe-band-street.jpg", alt: "Irish pipe band performing in the street", category: "parade" },
  { src: "/images/queen-white-sox.jpg", alt: "Parade Queen throwing the first pitch at a Chicago White Sox game", category: "community" },
  { src: "/images/queen-court-beach.jpg", alt: "The Queen and court at the lakefront", category: "community" },
  { src: "/images/queen-2025-portrait.jpg", alt: "The 2025 Parade Queen with the American and Irish flags", category: "queen" },
  { src: "/images/queen-2022-kelley-leyden.jpg", alt: "Kelley Leyden, Queen of the 2022 Chicago St. Patrick's Day Parade", category: "queen" },
  { src: "/images/guest-of-honor-2022-kevin-byrne.jpg", alt: "Kevin Byrne, Consul General of Chicago, 2022 Guest of Honor", category: "queen" },
  { src: "/images/queen-2021-portrait.jpg", alt: "Parade Queen portrait with flags", category: "queen" },
  { src: "/images/queen-2020-portrait.jpg", alt: "Parade Queen portrait with bouquet", category: "queen" },
  { src: "/images/queen-court-bw-laughing.jpg", alt: "The Queen and court sharing a laugh", category: "queen" },
  { src: "/images/queen-court-bw-elegant.jpg", alt: "The Queen and court in an elegant black and white portrait", category: "queen" },
  { src: "/images/vintage-queen-carriage.jpg", alt: "A Parade Queen riding a carriage through downtown Chicago in years past", category: "parade" },
  { src: "/images/vintage-queen-portrait.jpg", alt: "A vintage portrait of a past Parade Queen", category: "queen" },
];

export const GALLERY_CATEGORIES = [
  { id: "all", label: "All Photos" },
  { id: "parade", label: "The Parade" },
  { id: "river", label: "River Dyeing" },
  { id: "queen", label: "Queens & Court" },
  { id: "community", label: "Community" },
] as const;
