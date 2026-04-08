import Calendar from '@/components/Calendar';

export default function Home() {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #ece9e3 0%, #d4d0c8 100%)',
        padding: '20px 16px',
      }}
    >
      <div className="w-full" style={{ maxWidth: '860px' }}>
        <Calendar />
      </div>
    </main>
  );
}
