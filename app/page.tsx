import LaunchPoster from "@/components/LaunchPoster";
import {
  AGENCY_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 360,
        height: 150,
      },
      image: `${SITE_URL}/og-image.jpg`,
      description: SITE_DESCRIPTION,
      slogan: SITE_TAGLINE,
      parentOrganization: {
        "@type": "Organization",
        name: "The Better Agency",
        url: AGENCY_URL,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Thrissur",
        addressRegion: "Kerala",
        addressCountry: "IN",
      },
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      sameAs: [AGENCY_URL],
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: `${SITE_NAME} | Launching Soon`,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      description: SITE_DESCRIPTION,
      inLanguage: "en-IN",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.jpg`,
      },
    },
    {
      "@type": "Course",
      "@id": `${SITE_URL}/#course`,
      name: "The Better Academy — Founding Cohort",
      description:
        "A founding cohort for people who'd rather build the real thing than watch another tutorial. Live drafts, working critique, and studio mentorship.",
      provider: { "@id": `${SITE_URL}/#organization` },
      educationalLevel: "Professional",
      inLanguage: "en",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/PreOrder",
        url: AGENCY_URL,
        availabilityStarts: "2026-01-01",
      },
    },
    {
      "@type": "Event",
      "@id": `${SITE_URL}/#launch`,
      name: "The Better Academy Launch — Founding Batch 2026",
      description: SITE_DESCRIPTION,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      startDate: "2026-07-31",
      location: {
        "@type": "Place",
        name: "Thrissur, Kerala, India",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Thrissur",
          addressRegion: "Kerala",
          addressCountry: "IN",
        },
      },
      organizer: { "@id": `${SITE_URL}/#organization` },
      image: [`${SITE_URL}/og-image.jpg`],
      url: SITE_URL,
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <LaunchPoster />
    </>
  );
}
