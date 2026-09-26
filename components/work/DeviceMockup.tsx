import Image from "next/image";

// A monitor with a phone leaning in front of it, drawn in CSS around real screenshots.
// No background box, so it sits on either theme like a cut-out PNG.
// Screenshots: desktop 1440x900 (16:10), phone 390x844.
export default function DeviceMockup({
  desktop,
  mobile,
  alt,
  priority,
}: {
  desktop: string;
  mobile: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <figure className="relative mx-auto w-full max-w-[640px] pb-[2%] pr-[6%]">
      {/* Monitor */}
      <div className="relative">
        <div className="rounded-[14px] bg-[#0d0d0f] p-[1.6%] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)] ring-1 ring-white/10">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] bg-black">
            <Image
              src={desktop}
              alt={alt}
              fill
              priority={priority}
              sizes="(min-width: 1280px) 600px, 92vw"
              className="object-cover object-top"
            />
          </div>
        </div>
        {/* Chin and stand, in aluminium whatever the theme */}
        <div className="mx-auto h-[5%] min-h-[14px] rounded-b-[14px] bg-gradient-to-b from-[#e6e6e9] to-[#c7c7cc]" />
        <div className="mx-auto h-[42px] w-[18%] bg-gradient-to-b from-[#bdbdc2] to-[#a7a7ad] [clip-path:polygon(12%_0,88%_0,100%_100%,0_100%)]" />
        <div className="mx-auto h-[6px] w-[30%] rounded-full bg-[#b9b9be]" />
      </div>

      {/* Phone, overlapping the lower right corner */}
      <div className="absolute bottom-0 right-0 w-[22%] rounded-[18%/8.5%] bg-[#0d0d0f] p-[1.6%] shadow-[0_30px_50px_-20px_rgb(0_0_0/0.7)] ring-1 ring-white/10">
        <div className="relative aspect-[390/844] overflow-hidden rounded-[15%/7%] bg-black">
          <Image src={mobile} alt="" fill sizes="160px" className="object-cover object-top" />
        </div>
      </div>
      <figcaption className="sr-only">{alt}</figcaption>
    </figure>
  );
}
