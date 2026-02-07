import { Heart } from "lucide-react"

const painPoints = [
  "パソコンに向かってじっと座っているのが辛い",
  "静かすぎるオフィスだと緊張してしまう",
  "「就労支援」という響きに、少し抵抗がある",
  "人間関係が不安で通い続けられるか心配",
  "体調が安定しないことが不安",
]

export function PainPointsSection() {
  return (
    <section className="px-5 py-16 bg-background">
      <div className="mx-auto max-w-md">
        <h2
          className="mb-4 text-center text-xl font-bold text-balance"
          style={{ color: "#6B5541" }}
        >
          {"こんな"}
          <span className="relative inline-block">
            <span
              className="relative z-10"
              style={{ color: "#E86833" }}
            >
              {"悩み"}
            </span>
            <span
              className="absolute -top-1 left-0 right-0 flex justify-center gap-1"
              aria-hidden="true"
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "#E86833" }}
              />
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "#E86833" }}
              />
            </span>
          </span>
          {"、ありませんか？"}
        </h2>

        {/* Worried illustration - directly below heading */}
        <div className="mb-6 flex justify-center">
          <img
            src="/images/nayami.png"
            alt="こんな悩み、ありませんか？"
            className="h-40 w-auto rounded-xl object-contain"
          />
        </div>

        {/* Speech bubble style pain points */}
        <div className="flex flex-col gap-3">
          {painPoints.map((point) => (
            <div
              key={point}
              className="rounded-2xl border-2 px-4 py-3"
              style={{ borderColor: "#D0EBE5", backgroundColor: "#FFFFFF" }}
            >
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#6B5541" }}
              >
                {point}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mt-8 flex items-center gap-3 rounded-2xl p-5"
          style={{ backgroundColor: "#D0EBE5" }}
        >
          <Heart
            className="h-8 w-8 shrink-0"
            style={{ color: "#6B5541" }}
            fill="#6B5541"
          />
          <p
            className="text-sm font-bold leading-relaxed"
            style={{ color: "#6B5541" }}
          >
            {"アネラカフェなら、動物たちが一緒だから自然体でいられます。"}
          </p>
        </div>
      </div>
    </section>
  )
}
