export const SITE = {
  name: "AURA",
  tagline: "Modern Culinary Experience",
  description:
    "Experience a symphony of seasonal ingredients and master craftsmanship curated by award-winning chefs.",
  url: "https://aurarestaurant.co.ke",
  email: "reservations@aurarestaurant.co.ke",
  phone: "+254 700 000 000",
  address: {
    street: "442 Westlands Avenue, Suite 100",
    city: "Nairobi",
    region: "Nairobi County",
    postal: "00100",
    country: "KE",
  },
  social: {
    instagram: "https://instagram.com/aurarestaurant",
    facebook: "https://facebook.com/aurarestaurant",
    tripadvisor: "https://tripadvisor.com/aurarestaurant",
  },
} as const;

/* Currency + locale — change here to switch markets */
export const CURRENCY = "KES" as const;
export const LOCALE = "en-KE" as const;

/* Reservation form endpoint (Web3Forms — frontend only, no backend) */
export const RESERVATION_ENDPOINT =
  "https://api.web3forms.com/submit" as const;

export const RESERVATION_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reservations", href: "/reservations" },
  { label: "Contact", href: "/contact" },
] as const;

export const HOURS = [
  { day: "Monday", value: "Closed", closed: true },
  { day: "Tuesday – Thursday", value: "5:00 PM – 10:30 PM" },
  { day: "Friday – Sunday", value: "4:30 PM – 11:30 PM" },
] as const;

export const RESERVATION_TIMES = [
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
] as const;

export const GUEST_OPTIONS = [
  { value: "1", label: "1 Person" },
  { value: "2", label: "2 People" },
  { value: "3", label: "3 People" },
  { value: "4", label: "4 People" },
  { value: "5", label: "5 People" },
  { value: "6", label: "6+ People" },
] as const;

export type MenuCategory = "starters" | "mains" | "desserts" | "drinks";

export const MENU_CATEGORIES: { value: MenuCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "starters", label: "Starters" },
  { value: "mains", label: "Main Courses" },
  { value: "desserts", label: "Desserts" },
  { value: "drinks", label: "Cocktails" },
];

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: MenuCategory;
  image: string;
  featured?: boolean;
  tags?: string[];
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "scallops",
    name: "Pan-Seared Scallops",
    price: 2400,
    description:
      "Served with parsnip puree, crispy pancetta, and citrus herb oil.",
    category: "starters",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    tags: ["Gluten-Free", "Signature"],
  },
  {
    id: "wagyu",
    name: "Truffle Wagyu Filet",
    price: 6200,
    description:
      "Grade A5 Wagyu, potato fondant, wild mushrooms, and black truffle jus.",
    category: "mains",
    image:
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
    featured: true,
    tags: ["Chef's Pick"],
  },
  {
    id: "chocolate-dome",
    name: "Dark Chocolate Dome",
    price: 1800,
    description:
      "Valrhona chocolate mousse, raspberry coulis, and edible gold leaf.",
    category: "desserts",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    tags: ["Vegetarian"],
  },
  {
    id: "old-fashioned",
    name: "Smoked Rosemary Old Fashioned",
    price: 2000,
    description:
      "Small-batch bourbon, Angostura bitters, maple, smoked with fresh rosemary.",
    category: "drinks",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
    tags: ["Bar Signature"],
  },
  {
    id: "burrata",
    name: "Heirloom Burrata",
    price: 2100,
    description:
      "Creamy burrata, heirloom tomatoes, basil oil, aged balsamic, sea salt.",
    category: "starters",
    image:
      "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&w=800&q=80",
    tags: ["Vegetarian"],
  },
  {
    id: "lobster-risotto",
    name: "Lobster Saffron Risotto",
    price: 4800,
    description:
      "Butter-poached Maine lobster, carnaroli rice, saffron, parmesan crisp.",
    category: "mains",
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80",
    tags: ["Signature"],
  },
  {
    id: "tiramisu",
    name: "Deconstructed Tiramisu",
    price: 1600,
    description:
      "Espresso-soaked ladyfingers, mascarpone cream, cocoa nib tuile.",
    category: "desserts",
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "negroni",
    name: "Barrel-Aged Negroni",
    price: 1900,
    description:
      "Aged 90 days in oak. Gin, Campari, sweet vermouth, orange zest.",
    category: "drinks",
    image:
      "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80",
  },
];

export const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    alt: "Main dining room ambience",
    span: "tall" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80",
    alt: "Bar setup with backlit bottles",
    span: "wide" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
    alt: "Outdoor patio dining at dusk",
    span: "normal" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    alt: "Chef plating a dish",
    span: "normal" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=1200&q=80",
    alt: "Sommelier pouring wine",
    span: "tall" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80",
    alt: "Private dining room",
    span: "wide" as const,
  },
];

export const ABOUT_FEATURES = [
  {
    icon: "seedling",
    title: "Farm-to-Table",
    description: "Sourced daily from local organic farmers.",
  },
  {
    icon: "wine-glass",
    title: "Sommelier Curated",
    description: "Over 300 hand-picked global wine selections.",
  },
  {
    icon: "utensils",
    title: "Chef-Led Kitchen",
    description: "Award-winning chefs crafting every plate to order.",
  },
  {
    icon: "star",
    title: "Michelin Recognized",
    description: "Consistently rated among the city's finest tables.",
  },
] as const;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aurarestaurant.co.ke";
