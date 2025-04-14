export const defaultMetadata = {
  title: "Escape room Mechelen - De Gouden Kooi",
  robots: process.env.NEXT_PUBLIC_META_ROBOTS,
  icons: "/favicons/cropped-pictogram-32x32.png",
  canonicalUrl: "https://degoudenkooi.be/",
  "theme-color": "#987222",
  openGraph: {
    type: "website",
    url: "https://degoudenkooi.be/",
    siteName: "De Gouden Kooi",
    image: [
      {
        url: "https://degoudenkooi.be/share_image_DGK.jpg",
        width: 1080,
        height: 630,
      },
    ],
  },
};

export const englishMetadata = {
  description:
    "Home ✓ Escape rooms ✓ A team activity for families, friends and colleagues ✓ Two locations in the center of Mechelen ✓ Pioneers in Belgium.",
  keywords:
    "Escape rooms, Escape Experiences, teambuilding, families, Mechelen",
};
export const dutchMetadata = {
  description:
    "Plan een leuke uitstap met vrienden, familie of collega’s in onze escape room in Mechelen met zes verschillende escape rooms. Boek snel online!",
  keywords: "Escape rooms, Escape Experiences, teambuilding, familie, Mechelen",
};
