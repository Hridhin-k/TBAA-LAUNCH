import LaunchPoster from "@/components/LaunchPoster";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "The Better Academy",
  url: "https://tbaa.pages.dev",
  logo: "https://tbaa.pages.dev/og-image.jpg",
  description:
    "Something Better Takes Time. The Better Academy is preparing a new way to learn advertising, storytelling, branding, filmmaking, and creative thinking.",
  parentOrganization: {
    "@type": "Organization",
    name: "The Better Agency",
    url: "https://thebetteragency.in",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Thrissur",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  sameAs: ["https://thebetteragency.in"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LaunchPoster />
    </>
  );
}
