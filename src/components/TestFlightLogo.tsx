import Image from 'next/image';

type TestFlightLogoProps = {
  className?: string;
};

export default function TestFlightLogo({ className }: TestFlightLogoProps) {
  return (
    <Image
      src="/images/testflight-icon.png"
      alt=""
      width={40}
      height={40}
      className={className}
      aria-hidden
    />
  );
}
