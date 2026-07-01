import Image from 'next/image';

type AppStoreLogoProps = {
  className?: string;
};

export default function AppStoreLogo({ className }: AppStoreLogoProps) {
  return (
    <Image
      src="/images/download-on-the-app-store.svg"
      alt=""
      width={120}
      height={40}
      className={className}
      aria-hidden
    />
  );
}
