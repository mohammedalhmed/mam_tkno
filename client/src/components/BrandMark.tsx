type BrandMarkProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  eager?: boolean;
  onDark?: boolean;
};

const sizeClasses = {
  sm: 'h-12 w-12',
  md: 'h-14 w-14',
  lg: 'h-16 w-16',
};

export default function BrandMark({ size = 'md', className = '', eager = false, onDark = false }: BrandMarkProps) {
  return (
    <span className={`group/mark relative isolate block shrink-0 ${sizeClasses[size]} ${className}`} aria-hidden="true">
      <span
        className={`absolute -inset-1.5 rounded-full border transition-transform duration-200 group-hover/mark:scale-105 ${
          onDark ? 'border-[#16d5df]/60 bg-[#16d5df]/10 shadow-[0_0_0_4px_rgba(22,213,223,.06)]' : 'border-[#2145a8]/25 bg-[#16d5df]/12 shadow-[0_0_0_4px_rgba(22,213,223,.08)]'
        }`}
      />
      <img
        src="/manus-storage/mahmoud-brand-logo_4a650db3.jpg"
        alt="شعار MAM_Tkno لوكالة تقنية وتصميمية للمنتجات الرقمية"
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="relative h-full w-full rounded-full bg-white object-cover p-[2px] shadow-[0_8px_24px_rgba(7,22,79,.22)] transition-transform duration-200 group-hover/mark:-rotate-2"
      />
      <span className="absolute -bottom-0.5 -left-0.5 h-3 w-3 rounded-full border-2 border-white bg-[#ff7a0a] shadow-[0_0_0_2px_rgba(7,22,79,.12)]" />
    </span>
  );
}
