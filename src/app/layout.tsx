import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discretionary Leave Benefits – FAQs | NightOwl Consulting Philippines Inc.',
  description:
    'How Discretionary Leaves work at NightOwl: client-based additional paid leave on top of the standard 5-day Service Incentive Leave (SIL).',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
