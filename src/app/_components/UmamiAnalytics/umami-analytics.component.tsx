import Script from 'next/script';

const UmamiAnalytics = () => (
  <Script
    id="umami-analytics"
    strategy="afterInteractive"
    src="https://analytics.umami.is/script.js"
    data-website-id="8110a8a7-c042-4ada-8306-ed6b7327a5b7"
    data-domains="hugomendez.dev"
  />
);

export default UmamiAnalytics;
