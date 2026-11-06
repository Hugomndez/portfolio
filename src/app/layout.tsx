import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Container from '@/components/Container/container.component';
import StructuredData from '@/components/StructuredData/structured-data.component';
import UmamiAnalytics from '@/components/UmamiAnalytics/umami-analytics.component';
import { siteMetadata, siteViewport } from '@/config/site-metadata';
import spaceGrotesk from '@/fonts';

import '@/styles/globals.css';

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en" dir="ltr" data-scroll-behavior="smooth" className={spaceGrotesk.className}>
    <body>
      <Container>{children}</Container>
      <StructuredData />
      <UmamiAnalytics />
      <SpeedInsights />
    </body>
  </html>
);

export default RootLayout;

export const viewport: Viewport = siteViewport;

export const metadata: Metadata = siteMetadata;
