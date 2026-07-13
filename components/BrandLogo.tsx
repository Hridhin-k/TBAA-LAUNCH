type BrandLogoProps = {
  className?: string;
  dark?: boolean;
};

export default function BrandLogo({ className = "", dark = false }: BrandLogoProps) {
  return (
    <span
      data-cursor="logo"
      className={`inline-flex items-center justify-center ${className}`}
      aria-label="The Better Academy"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={dark ? "/logo-white.png" : "/logo.png"}
        alt=""
        width={120}
        height={50}
        className="h-7 w-auto sm:h-8"
        aria-hidden="true"
        draggable={false}
      />
    </span>
  );
}
