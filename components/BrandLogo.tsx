type BrandLogoProps = {
  className?: string;
  dark?: boolean;
};

export default function BrandLogo({ className = "", dark = false }: BrandLogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      data-cursor="logo"
      src={dark ? "/logo-white.png" : "/logo.png"}
      alt="The Better Academy"
      width={120}
      height={50}
      className={`h-7 w-auto sm:h-8 ${className}`}
      decoding="async"
      fetchPriority="high"
      draggable={false}
    />
  );
}
