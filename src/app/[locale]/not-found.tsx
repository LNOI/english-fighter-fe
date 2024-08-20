import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');
  return (
    <div className="m-auto flex flex-col items-center justify-center space-y-6 text-center">
      <p className="text-3xl font-semibold">{t('title')}</p>
      <p className="text-gray-400">{t('description')}</p>
    </div>
  );
}
