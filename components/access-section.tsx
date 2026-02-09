import { MapPin, TrainFront, Bus } from "lucide-react"

const accessRoutes = [
  { icon: Bus, line: "川崎鶴見臨港バス 貝塚", time: "徒歩1分" },
  { icon: TrainFront, line: "JR南武支線 川崎新町駅", time: "徒歩11分" },
  { icon: TrainFront, line: "JR上野東京ライン 川崎駅", time: "徒歩13分" },
  { icon: TrainFront, line: "JR東海道本線 川崎駅", time: "徒歩13分" },
  { icon: TrainFront, line: "JR京浜東北線 川崎駅", time: "徒歩13分" },
  { icon: TrainFront, line: "JR南武線 川崎駅", time: "徒歩13分" },
]

export function AccessSection() {
  return (
    <section className="px-5 py-16" style={{ backgroundColor: "#F8FDFB" }}>
      <div className="mx-auto max-w-md">
        <h2
          className="mb-2 text-center text-xl font-bold"
          style={{ color: "#6B5541" }}
        >
          {"アクセス"}
        </h2>
        <div className="mb-8 flex items-center justify-center gap-1.5 text-sm" style={{ color: "#9A8573" }}>
          <MapPin className="h-4 w-4" />
          <p>{"〒210-0014 神奈川県川崎市川崎区貝塚2-2-1"}</p>
        </div>

        {/* Google Map */}
        <div className="mb-8 overflow-hidden rounded-xl shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3247.5!2d139.7005!3d35.5280!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60185cf4bcb9ba6f%3A0x0!2z56We5aWI5bed55yM5bed5bSO5biC5bed5bSO5Yy66LKd5aGa77yS5LiB55uu77yS4oiS77yR!5e0!3m2!1sja!2sjp!4v1"
            width="100%"
            height="220"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="アネラカフェ川崎駅前店の地図"
          />
        </div>

        {/* Access routes list */}
        <div className="flex flex-col gap-3">
          {accessRoutes.map((route) => (
            <div
              key={route.line}
              className="flex items-center gap-3 rounded-xl border px-4 py-3"
              style={{ borderColor: "#D0EBE5", backgroundColor: "#F7FDFC" }}
            >
              <route.icon className="h-5 w-5 shrink-0" style={{ color: "#6B5541" }} />
              <div className="flex flex-1 items-center justify-between gap-2">
                <span className="text-sm" style={{ color: "#6B5541" }}>
                  {route.line}
                </span>
                <span
                  className="shrink-0 rounded-full px-3 py-0.5 text-xs font-bold"
                  style={{ backgroundColor: "#D0EBE5", color: "#4A6B5E" }}
                >
                  {route.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
