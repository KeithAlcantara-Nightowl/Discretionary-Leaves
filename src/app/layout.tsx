import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discretionary Leave FAQs | NightOwl Consulting Philippines Inc.',
  description: 'Onboarding guidelines regarding company leave workflows.',
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
