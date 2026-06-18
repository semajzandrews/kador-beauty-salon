import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kador Beauty Salon — Scotland Road, Orange NJ",
  description:
    "A full-service beauty salon on Scotland Road in the City of Orange, New Jersey. Cuts, color, blowouts, styling and care. Rated 4.8 stars by our guests.",
  openGraph: {
    title: "Kador Beauty Salon",
    description:
      "Sit down. Leave luminous. A full-service beauty salon on Scotland Road, City of Orange, NJ.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  );
}
