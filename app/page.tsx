import Calendar from '@/components/Calendar';

export default function Home() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: 'linear-gradient(135deg, #ece9e3 0%, #d4d0c8 100%)' }}
    >
      <Calendar />
    </main>
  );
}
