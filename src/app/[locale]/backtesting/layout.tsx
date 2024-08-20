import Link from 'next/link';
// import ComingSoon from '@/components/ui/ComingSoon';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex w-full flex-col">
        <div className="flex w-full flex-row items-center justify-center space-x-6">
          <Link className="font-medium" href="/backtesting">
            Backtesting
          </Link>
          <Link className="font-medium" href="/backtesting/history">
            History
          </Link>
        </div>
        <div className="flex w-full">{children}</div>
      </div>
    </>
  );
}
