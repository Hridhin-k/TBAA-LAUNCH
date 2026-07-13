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
      width={160}
      height={67}
      className={`h-6 w-auto max-w-[7.5rem] object-contain object-center sm:h-8 sm:max-w-[9rem] ${className}`}
      decoding="async"
      fetchPriority="high"
      draggable={false}
    />
  );
}
