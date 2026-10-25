import GivingPage from './(util)/give-now/mpesa-new/page';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Give Online | Karen Community SDA',
  description: 'Secure online giving to Karen Community Seventh-day Adventist Church.',
  robots: { index: true, follow: true },
};

export default function HomePage() {
  return <GivingPage />;
}
