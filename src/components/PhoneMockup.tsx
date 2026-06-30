import Image from 'next/image';
import Badge from '@/components/ui/Badge';

export default function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[280px] lg:max-w-[320px]">
      <div className="relative rounded-[2.5rem] border-[10px] border-gray-900 bg-gray-900 p-2 shadow-xl">
        <div className="absolute left-1/2 top-3 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-gray-900" />
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-primary-50 to-white aspect-[9/19.5]">
          <div className="flex h-full flex-col items-center justify-center px-6 pt-10">
            <Image
              src="/images/icon.png"
              alt="UFIT Training app"
              width={80}
              height={80}
              className="rounded-2xl shadow-md"
            />
            <p className="mt-4 font-heading text-heading-04 font-bold text-primary-800">
              UFIT Training
            </p>
            <p className="mt-2 text-center font-body text-paragraph-03 text-gray-600">
              Your next workout, ready when you are.
            </p>
            <div className="mt-6 w-full space-y-2">
              <div className="h-3 rounded-full bg-primary-100" />
              <div className="h-3 w-4/5 rounded-full bg-gray-200" />
              <div className="h-3 w-3/5 rounded-full bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -right-2 top-8 lg:-right-4">
        <Badge variant="info" className="px-3 py-1 text-paragraph-02 shadow-sm">
          Coming Soon
        </Badge>
      </div>
    </div>
  );
}
