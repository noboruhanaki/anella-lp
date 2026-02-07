import { Clock } from "lucide-react"

const scheduleItems = [
  {
    time: "10:00",
    label: "通所・朝礼",
  },
  {
    time: "10:15",
    label: "作業開始（犬猫部屋の掃除、ご飯やり、グルーミング）",
  },
  {
    time: "12:00",
    label: "昼食（100円で提供）",
  },
  {
    time: "13:00",
    label: "作業再開（リード作り、犬の服作り、接客対応）",
  },
  {
    time: "15:00",
    label: "片付け・終礼",
  },
]

export function ScheduleSection() {
  return (
    <section className="px-5 py-16" style={{ backgroundColor: "#F8FDFB" }}>
      <div className="mx-auto max-w-md">
        <div className="mb-2 flex items-center justify-center gap-2">
          <Clock className="h-5 w-5" style={{ color: "#6B5541" }} />
          <h2
            className="text-center text-xl font-bold"
            style={{ color: "#6B5541" }}
          >
            {"1日の流れ"}
          </h2>
        </div>
        <p
          className="mb-10 text-center text-sm"
          style={{ color: "#9A8573" }}
        >
          {"自分のペースで無理なく過ごせます"}
        </p>

        <div className="relative">
          <div
            className="absolute left-[52px] top-0 h-full w-0.5"
            style={{ backgroundColor: "#D0EBE5" }}
          />

          <div className="flex flex-col gap-6">
            {scheduleItems.map((item, index) => (
              <div key={item.time} className="flex items-start gap-4">
                <span
                  className="w-12 shrink-0 text-right text-sm font-bold"
                  style={{ color: "#6B5541" }}
                >
                  {item.time}
                </span>
                <div
                  className="relative z-10 mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2"
                  style={{
                    backgroundColor: index === 0 ? "#6B5541" : "#D0EBE5",
                    borderColor: "#6B5541",
                  }}
                />
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#7A6B5D" }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
