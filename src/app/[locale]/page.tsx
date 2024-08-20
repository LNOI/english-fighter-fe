import HomePage from '@/components/page/HomePage';
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export default function Home({
  params: { locale }
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Index');

  return (
    <main className="flex w-full flex-col items-center justify-center dark:bg-black py-12">
      <HomePage></HomePage>
    </main>
  );
}
