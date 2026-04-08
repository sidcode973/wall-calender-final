import Calendar from '@/components/Calendar';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(135deg, #e8eaf0 0%, #d5d8e0 100%)' }}>
      <div className="w-full" style={{ maxWidth: '420px' }}>
        <Calendar />
      </div>
    </main>
  );
}
