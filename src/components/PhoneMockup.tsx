import Image from 'next/image';
import Badge from '@/components/ui/Badge';

export default function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[280px]">
      <div className="relative rounded-[2.75rem] bg-[#1d1d1f] p-[9px] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.35)] ring-1 ring-black/20 sm:rounded-[3rem] sm:p-[10px] sm:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)]">
        <div className="absolute -left-[2px] top-[80px] h-6 w-[3px] rounded-l-sm bg-[#3a3a3c] sm:top-[88px] sm:h-7" />
        <div className="absolute -left-[2px] top-[118px] h-10 w-[3px] rounded-l-sm bg-[#3a3a3c] sm:top-[130px] sm:h-12" />
        <div className="absolute -left-[2px] top-[162px] h-10 w-[3px] rounded-l-sm bg-[#3a3a3c] sm:top-[178px] sm:h-12" />
        <div className="absolute -right-[2px] top-[128px] h-14 w-[3px] rounded-r-sm bg-[#3a3a3c] sm:top-[140px] sm:h-16" />

        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.1rem] bg-white sm:rounded-[2.35rem]">
          <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 pt-2.5 sm:px-7 sm:pt-3">
            <span className="font-body text-[10px] font-semibold text-gray-900 sm:text-[11px]">
              9:41
            </span>
            <div className="flex h-[9px] w-[20px] items-center rounded-[3px] border border-gray-900/80 px-[1px] sm:h-[10px] sm:w-[22px]">
              <div className="h-[5px] w-[12px] rounded-[2px] bg-gray-900 sm:h-[6px] sm:w-[14px]" />
            </div>
          </div>

          <div className="absolute left-1/2 top-[9px] z-30 h-[22px] w-[78px] -translate-x-1/2 rounded-full bg-black sm:top-[10px] sm:h-[26px] sm:w-[90px]" />

          <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-primary-50 to-white px-5 pt-6 sm:px-6 sm:pt-8">
            <Image
              src="/images/icon.png"
              alt="UFIT Training app"
              width={64}
              height={64}
              className="rounded-[16px] shadow-md sm:h-[72px] sm:w-[72px] sm:rounded-[18px]"
            />
            <p className="mt-3 font-heading text-[17px] font-bold text-primary-800 sm:mt-4 sm:text-heading-04">
              UFIT Training
            </p>
            <p className="mt-1.5 text-center font-body text-[11px] leading-[1.4] text-gray-600 sm:mt-2 sm:text-paragraph-03">
              Your next workout, ready when you are.
            </p>
            <div className="mt-5 w-full space-y-2 sm:mt-6">
              <div className="h-2.5 rounded-full bg-primary-100 sm:h-3" />
              <div className="h-2.5 w-4/5 rounded-full bg-gray-200 sm:h-3" />
              <div className="h-2.5 w-3/5 rounded-full bg-gray-200 sm:h-3" />
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-1.5 z-20 flex justify-center sm:bottom-2">
            <div className="h-[3px] w-[88px] rounded-full bg-gray-900/20 sm:h-[4px] sm:w-[100px]" />
          </div>
        </div>
      </div>

      <div className="absolute -right-1 top-8 sm:-right-2 sm:top-10 lg:-right-4">
        <Badge variant="info" className="px-2.5 py-0.5 text-[11px] shadow-sm sm:px-3 sm:py-1 sm:text-paragraph-02">
          Coming Soon
        </Badge>
      </div>
    </div>
  );
}
