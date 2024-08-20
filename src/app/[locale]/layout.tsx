import './globals.css';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from '@/components/footer/Footer';
import StatusCallAPI from '@/components/ui/StatusCallAPI';
import { unstable_setRequestLocale } from 'next-intl/server';
import theme from '@/theme';
import Header from '@/components/header/header';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
// import Script from 'next/script';
import siteMetadata from '@/utils/siteMetaData'


import StoreProvider from './StoreProvider';

const locales = ['en', 'vi'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}


export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title, // a default is required when creating a template
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    images: [siteMetadata.socialBanner],
  },
};

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body>
        <div className="flex min-h-screen flex-col">
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {/* <div className="drawn_light_1"></div> */}
              <SessionProvider>
                <StoreProvider>
                  <NextIntlClientProvider messages={messages}>
                    <Header></Header>
                    <div className="flex flex-1 grow dark:bg-dark dark:text-white">{children}</div>
                    <Footer></Footer>
                    <StatusCallAPI></StatusCallAPI>
                  </NextIntlClientProvider>
                </StoreProvider>
              </SessionProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
          {/* <Script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID" /> */}
        </div>
      </body>
    </html>
  );
}
