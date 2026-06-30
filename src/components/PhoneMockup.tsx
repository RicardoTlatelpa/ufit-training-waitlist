import Image from 'next/image';
import Badge from '@/components/ui/Badge';

export default function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[260px] lg:max-w-[280px]">
      {/* iPhone frame */}
      <div className="relative rounded-[3rem] bg-[#1d1d1f] p-[10px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] ring-1 ring-black/20">
        {/* Side buttons */}
        <div className="absolute -left-[2px] top-[88px] h-7 w-[3px] rounded-l-sm bg-[#3a3a3c]" />
        <div className="absolute -left-[2px] top-[130px] h-12 w-[3px] rounded-l-sm bg-[#3a3a3c]" />
        <div className="absolute -left-[2px] top-[178px] h-12 w-[3px] rounded-l-sm bg-[#3a3a3c]" />
        <div className="absolute -right-[2px] top-[140px] h-16 w-[3px] rounded-r-sm bg-[#3a3a3c]" />

        {/* Screen */}
        <div className="relative overflow-hidden rounded-[2.35rem] bg-white aspect-[9/19.5]">
          {/* Status bar */}
          <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-7 pt-3">
            <span className="font-body text-[11px] font-semibold text-gray-900">9:41</span>
            <div className="flex h-[10px] w-[22px] items-center rounded-[3px] border border-gray-900/80 px-[1px]">
              <div className="h-[6px] w-[14px] rounded-[2px] bg-gray-900" />
            </div>
          </div>

          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-[10px] z-30 h-[26px] w-[90px] -translate-x-1/2 rounded-full bg-black" />

          {/* App content */}
          <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-primary-50 to-white px-6 pt-8">
            <Image
              src="/images/icon.png"
              alt="UFIT Training app"
              width={72}
              height={72}
              className="rounded-[18px] shadow-md"
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

          {/* Home indicator */}
          <div className="absolute inset-x-0 bottom-2 z-20 flex justify-center">
            <div className="h-[4px] w-[100px] rounded-full bg-gray-900/20" />
          </div>
        </div>
      </div>

      <div className="absolute -right-2 top-10 lg:-right-4">
        <Badge variant="info" className="px-3 py-1 text-paragraph-02 shadow-sm">
          Coming Soon
        </Badge>
      </div>
    </div>
  );
}
