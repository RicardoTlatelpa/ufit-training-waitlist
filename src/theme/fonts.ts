import localFont from 'next/font/local';

export const ralewayExtraBold = localFont({
  src: '../../public/fonts/Raleway-ExtraBold.ttf',
  variable: '--font-raleway-extrabold',
  weight: '800',
  display: 'swap',
});

export const ralewayBold = localFont({
  src: '../../public/fonts/Raleway-Bold.ttf',
  variable: '--font-raleway-bold',
  weight: '700',
  display: 'swap',
});

export const ralewaySemiBold = localFont({
  src: '../../public/fonts/Raleway-SemiBold.ttf',
  variable: '--font-raleway-semibold',
  weight: '600',
  display: 'swap',
});

export const openSans = localFont({
  src: '../../public/fonts/OpenSans-Regular.ttf',
  variable: '--font-open-sans',
  weight: '400',
  display: 'swap',
});

export const fontVariables = [
  ralewayExtraBold.variable,
  ralewayBold.variable,
  ralewaySemiBold.variable,
  openSans.variable,
].join(' ');
