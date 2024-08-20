import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import ButtonPayment from '@/components/ui/pricing/ButtonPayment';
import { PackagePricing } from '@/data/pricing';

// interface plan_type {
//   id: string;
//   tag: string;
//   title: string;
//   description: string;
//   features: string[];
//   price: string;
//   price_original: string;
//   url: string;
//   button: string;
// }

export default function Page({
  params: { slug, locale }
}: {
  params: { slug: string; locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Pricing');
  const p = useTranslations('Payment');
  //   const data: Object = DictPackagePricing;
  const plan = PackagePricing.find((node) => node.id === slug);
  return (
    <div className="flex w-full flex-row justify-center">
      <div className="m-auto flex w-full flex-row md:max-w-7xl">
        <div className="py-6 sm:py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {p('title')}
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-400">
                {p('description')}
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
              <div className="p-8 sm:p-10 lg:flex-auto">
                <h3 className="text-2xl font-bold tracking-tight">
                  {t(plan?.title)}
                </h3>
                <p className="mt-6 text-base leading-7 text-gray-400">
                  {t(plan?.description)}
                </p>
                <div className="mt-10 flex items-center gap-x-4">
                  <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                    What’s included
                  </h4>
                  <div className="h-px flex-auto bg-gray-100"></div>
                </div>
                <ul
                  role="list"
                  className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-400 sm:grid-cols-2 sm:gap-6"
                >
                  {plan?.features?.map((item, index) => {
                    return (
                      <li key={index} className="flex gap-x-3">
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
                        {t(item)}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                <div className="h-full rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                  <div className="mx-auto max-w-xs px-8">
                    <p className="text-base font-semibold text-gray-600">
                      {p('total')}
                    </p>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                      <span className="text-nowrap text-5xl font-bold tracking-tight text-gray-700">
                        {t(plan?.price)}
                      </span>
                      {/* <span className="text-sm font-semibold leading-6 tracking-wide text-gray-700">
                        {t(plan.)}
                      </span> */}
                    </p>
                    <ButtonPayment
                      plan={slug}
                      //   title={'Crypto'}
                      // handle={handle}
                    ></ButtonPayment>
                    <p className="mt-6 text-xs leading-5 text-gray-400">
                      {p('total_description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
