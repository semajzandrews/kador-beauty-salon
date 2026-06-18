// Verified facts only. Source: physical recon + assignment brief.
// Address, phone, rating/review-count are confirmed. No invented hours,
// stylist names, prices, or social handles.

export const SITE = {
  name: "Kador Beauty Salon",
  shortName: "Kador",
  street: "408 Scotland Rd",
  city: "City of Orange",
  state: "NJ",
  zip: "07050",
  phoneDisplay: "(862) 703-0073",
  phoneHref: "tel:+18627030073",
  rating: "4.8",
  reviewCount: "40",
  mapsEmbed:
    "https://www.google.com/maps?q=408+Scotland+Rd,+City+of+Orange,+NJ+07050&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Kador+Beauty+Salon+408+Scotland+Rd+City+of+Orange+NJ+07050",
} as const;

export const NAV_LINKS = [
  { label: "The Studio", href: "#studio" },
  { label: "Services", href: "#services" },
  { label: "The Work", href: "#gallery" },
  { label: "Visit", href: "#visit" },
] as const;

// Service categories — generic, category-true descriptions. No prices, no
// invented specialties beyond what a full-service beauty salon offers.
export const SERVICES = [
  {
    key: "Hair",
    title: "Cuts & Shaping",
    body:
      "A consultation before a single snip. Shapes read to your face, your texture and the way you actually wear it day to day.",
    detail: ["Precision cuts", "Trims & reshapes", "Texture work"],
  },
  {
    key: "Color",
    title: "Color & Tone",
    body:
      "Dimension that catches the light. Single process, gloss, grey coverage and lived-in tone, mixed to suit you and kept healthy.",
    detail: ["Single process", "Gloss & toner", "Grey coverage"],
  },
  {
    key: "Style",
    title: "Blowouts & Styling",
    body:
      "The finish that turns a head. Wash, smooth and set for the everyday or the event, with the kind of polish that holds.",
    detail: ["Wash & blowout", "Silk press", "Event styling"],
  },
  {
    key: "Care",
    title: "Treatments & Care",
    body:
      "Strength back into the strand. Deep conditioning and restorative treatments built around the condition of your hair, not a script.",
    detail: ["Deep conditioning", "Scalp care", "Restorative masks"],
  },
] as const;

// Gallery — graded free stock that reads unmistakably as a salon.
// FLAGGED: swap for the salon's real work before any public launch.
export const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1100&q=80",
    caption: "Under the light",
  },
  {
    src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80",
    caption: "The blowout",
  },
  {
    src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80",
    caption: "Color & tone",
  },
  {
    src: "/images/kador-finish.jpg",
    caption: "The finish",
  },
] as const;

// Hero + story + finish are community-fitting STOCK (Pexels CC0). We do NOT use
// Google review photos because those are real customers who did not consent to
// appear on the salon's marketing site. Owner-supplied photos (their own social
// posts) would be fine; customer reviews are not.
export const HERO_IMG = "/images/kador-hero.jpg";
export const STORY_IMG = "/images/kador-story.jpg";
