import { Helmet } from "react-helmet-async";

// Falls back to the deployed origin when VITE_SITE_URL isn't set, so
// canonical/OG URLs are still absolute (required by the spec) in every
// environment without needing config for local dev. Exported so pages can
// build absolute URLs for JSON-LD (schema.org fields expect full URLs).
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "")
).replace(/\/$/, "");

export interface SeoProps {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  image?: string;
  type?: "website" | "article" | "product";
  noindex?: boolean;
  structuredData?: object | object[];
}

export default function Seo({
  title,
  description,
  path,
  keywords,
  image,
  type = "website",
  noindex = false,
  structuredData,
}: SeoProps) {
  const url = `${SITE_URL}${path}`;
  const ogImage = image || `${SITE_URL}/favicon.svg`;
  const schemas = structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
