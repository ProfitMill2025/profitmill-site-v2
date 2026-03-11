import './globals.css'

import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata, Viewport} from 'next'
import {Inter, Sora} from 'next/font/google'
import Script from 'next/script'
import {GoogleTagManager} from '@next/third-parties/google'
import {draftMode} from 'next/headers'
import {VisualEditing} from 'next-sanity/visual-editing'
import {Toaster} from 'sonner'

import DraftModeToast from '@/app/components/DraftModeToast'
import NavbarV2 from '@/components/v2/navbar-v2'
import Footer from '@/components/v2/footer'
import {SanityLive} from '@/sanity/lib/live'
import {handleError} from '@/app/client-utils'

const inter = Inter({subsets: ['latin']})
const sora = Sora({subsets: ['latin']})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.profitmill.io'),
  title: 'Profit Mill - Google Ads Expert',
  description:
    "Want an ex-Googler to scale your Google Ads - profitably? Hey, I'm Peter, and I spent over 8 years at Google managing 1,000+ ad accounts. Now, I help ambitious lead-generating companies achieve profitable growth through Google Ads.",
  openGraph: {
    title: 'Profit Mill - Google Ads Expert',
    description:
      "Want an ex-Googler to scale your Google Ads - profitably? Hey, I'm Peter, and I spent over 8 years at Google managing 1,000+ ad accounts. Now, I help ambitious lead-generating companies achieve profitable growth through Google Ads.",
    type: 'website',
    locale: 'en_US',
    url: 'https://www.profitmill.io',
    images: [
      {
        url: 'https://res.cloudinary.com/dzn9bpr2h/image/upload/v1736439657/profitmill-opengraph_q2k1uu.png',
        width: 1200,
        height: 630,
        alt: 'Profit Mill',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Profit Mill - Google Ads Expert',
    description:
      "Want an ex-Googler to scale your Google Ads - profitably? Hey, I'm Peter, and I spent over 8 years at Google managing 1,000+ ad accounts. Now, I help ambitious lead-generating companies achieve profitable growth through Google Ads.",
    images: [
      {
        url: 'https://res.cloudinary.com/dzn9bpr2h/image/upload/v1736439657/profitmill-opengraph_q2k1uu.png',
        width: 1200,
        height: 630,
        alt: 'Profit Mill',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.profitmill.io',
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const isProduction = process.env.NODE_ENV === 'production'
  const {isEnabled: isDraftMode} = await draftMode()

  return (
    <html lang="en">
      <head>
        {/* Google Consent Mode v2 - Set defaults BEFORE any Google tags load */}
        <Script
          id="google-consent-mode"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'functionality_storage': 'denied',
                'personalization_storage': 'denied',
                'security_storage': 'granted',
                'wait_for_update': 500
              });
            `,
          }}
        />
        {/* Usercentrics CMP - Manages consent UI and updates consent state */}
        <Script
          id="usercentrics-cmp"
          src="https://app.usercentrics.eu/browser-ui/latest/loader.js"
          data-settings-id="I_a86_39BbFm2p"
          {...(!isProduction && {'data-draft': 'true'})}
          strategy="beforeInteractive"
        />
      </head>
      <GoogleTagManager gtmId="GTM-MXZKWRS6" />
      <body className={`${inter.className} ${sora.className} overflow-x-hidden`}>
        <Toaster />
        {isDraftMode && (
          <>
            <DraftModeToast />
            <VisualEditing />
          </>
        )}
        <SanityLive onError={handleError} />
        <NavbarV2 />
        <main>{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  )
}
