import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import ButtonCustom from '@/components/ui/ButtonCustom';
import { PackagePricing } from '@/data/pricing';
import { Link } from '@/navigation';
export default function PricingPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Pricing');
  return (
    <div className="m-auto my-11 flex h-full w-full max-w-[1400px] flex-wrap items-center justify-center space-x-4">
      {PackagePricing.map((item, index) => {
        return (
          <div
            key={index}
            className="relative h-full w-80 space-y-8 rounded-xl border-2 border-white bg-[rgba(12,10,10,0.8)] px-4 py-4 shadow-custom backdrop-blur-[1px] backdrop-saturate-0 transition delay-75 ease-in-out hover:z-10 hover:scale-105 hover:bg-[rgba(46,40,40,0.8)]"
          >
            <div>
              {item.tag ? (
                <div className="absolute -top-2 right-0 inline-block rounded-2xl bg-red-500 px-4 py-2">
                  {t(item.tag)}
                </div>
              ) : null}

              <p className="mt-3 text-2xl font-semibold">{t(item.title)}</p>
              <p className="line-clamp-3 text-grey-40">{t(item.description)}</p>
            </div>

            <div className="my-4 flex flex-col">
              <p className="text-xl font-bold lining-nums">
                {t(item.price)} / {t(item?.schedule)}
              </p>
              <p className="decoration-slice text-xl font-bold lining-nums text-red-500 line-through">
                {t(item.price_original)}
              </p>
            </div>
            <div className="flex flex-col">
              {item?.features.map((f, i) => {
                return (
                  <div key={i} className="flex flex-row space-y-1">
                    <svg
                      className="h-6 w-5 flex-none text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <p>{t(f)}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center">
              <Link href={`/payment/${item.id}`}>
                <ButtonCustom
                  onClick={null}
                  content={t(item.button)}
                  type={3}
                ></ButtonCustom>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
