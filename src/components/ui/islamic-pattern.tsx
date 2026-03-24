/**
 * زخارف إسلامية هندسية SVG للخلفيات
 */

export function IslamicPatternBg({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* نجمة ثمانية إسلامية */}
        <pattern
          id="islamic-star"
          x="0"
          y="0"
          width="80"
          height="80"
          patternUnits="userSpaceOnUse"
        >
          {/* النجمة الثمانية */}
          <g fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.12">
            {/* المربع الأول (45 درجة) */}
            <rect x="17" y="17" width="46" height="46" transform="rotate(45 40 40)" />
            {/* المربع الثاني */}
            <rect x="17" y="17" width="46" height="46" />
            {/* الدائرة المركزية */}
            <circle cx="40" cy="40" r="12" />
            {/* خطوط الربط */}
            <line x1="40" y1="0" x2="40" y2="17" />
            <line x1="40" y1="63" x2="40" y2="80" />
            <line x1="0" y1="40" x2="17" y2="40" />
            <line x1="63" y1="40" x2="80" y2="40" />
            {/* الأقطار */}
            <line x1="7.5" y1="7.5" x2="17" y2="17" />
            <line x1="63" y1="63" x2="72.5" y2="72.5" />
            <line x1="72.5" y1="7.5" x2="63" y2="17" />
            <line x1="17" y1="63" x2="7.5" y2="72.5" />
          </g>
        </pattern>

        {/* نمط هندسي متشابك */}
        <pattern
          id="islamic-geometric"
          x="0"
          y="0"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.08">
            {/* مسدس مركزي */}
            <polygon points="30,5 52,17.5 52,42.5 30,55 8,42.5 8,17.5" />
            {/* مثلثات داخلية */}
            <line x1="30" y1="5" x2="30" y2="55" />
            <line x1="8" y1="17.5" x2="52" y2="42.5" />
            <line x1="52" y1="17.5" x2="8" y2="42.5" />
            {/* دائرة داخلية */}
            <circle cx="30" cy="30" r="10" />
            {/* نقاط الزوايا */}
            <circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.06" />
          </g>
        </pattern>

        {/* أرابيسك بسيط */}
        <pattern
          id="islamic-arabesque"
          x="0"
          y="0"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.07">
            {/* أقواس متشابكة */}
            <path d="M0,50 Q25,25 50,50 Q75,75 100,50" />
            <path d="M0,50 Q25,75 50,50 Q75,25 100,50" />
            <path d="M50,0 Q25,25 50,50 Q75,75 50,100" />
            <path d="M50,0 Q75,25 50,50 Q25,75 50,100" />
            {/* دائرة مركزية */}
            <circle cx="50" cy="50" r="8" />
            <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.05" />
            {/* دوائر الزوايا */}
            <circle cx="0" cy="0" r="8" />
            <circle cx="100" cy="0" r="8" />
            <circle cx="0" cy="100" r="8" />
            <circle cx="100" cy="100" r="8" />
          </g>
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#islamic-star)" />
    </svg>
  );
}

export function IslamicGeometricBg({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="geo-pattern"
          x="0"
          y="0"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.08">
            <polygon points="30,5 52,17.5 52,42.5 30,55 8,42.5 8,17.5" />
            <line x1="30" y1="5" x2="30" y2="55" />
            <line x1="8" y1="17.5" x2="52" y2="42.5" />
            <line x1="52" y1="17.5" x2="8" y2="42.5" />
            <circle cx="30" cy="30" r="10" />
            <circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.06" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#geo-pattern)" />
    </svg>
  );
}

export function IslamicArabesqueBg({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="arabesque-pattern"
          x="0"
          y="0"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.07">
            <path d="M0,50 Q25,25 50,50 Q75,75 100,50" />
            <path d="M0,50 Q25,75 50,50 Q75,25 100,50" />
            <path d="M50,0 Q25,25 50,50 Q75,75 50,100" />
            <path d="M50,0 Q75,25 50,50 Q25,75 50,100" />
            <circle cx="50" cy="50" r="8" />
            <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.05" />
            <circle cx="0" cy="0" r="8" />
            <circle cx="100" cy="0" r="8" />
            <circle cx="0" cy="100" r="8" />
            <circle cx="100" cy="100" r="8" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#arabesque-pattern)" />
    </svg>
  );
}

/** خط فاصل بزخرفة إسلامية */
export function IslamicDivider({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 400 30"
        className="mx-auto h-6 w-64 text-primary/20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1">
          {/* خط أفقي */}
          <line x1="0" y1="15" x2="160" y2="15" />
          <line x1="240" y1="15" x2="400" y2="15" />
          {/* نجمة ثمانية مركزية */}
          <rect x="185" y="0" width="30" height="30" transform="rotate(45 200 15)" fill="currentColor" opacity="0.1" />
          <rect x="185" y="0" width="30" height="30" fill="currentColor" opacity="0.1" />
          <circle cx="200" cy="15" r="5" fill="currentColor" opacity="0.15" />
          {/* ماسات جانبية */}
          <rect x="155" y="10" width="10" height="10" transform="rotate(45 160 15)" fill="currentColor" opacity="0.08" />
          <rect x="235" y="10" width="10" height="10" transform="rotate(45 240 15)" fill="currentColor" opacity="0.08" />
        </g>
      </svg>
    </div>
  );
}
