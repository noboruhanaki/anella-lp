import { Heart, HandHeart, Coffee } from "lucide-react"
import { cn } from "@/lib/utils"
import { imagePath } from "@/lib/constants"

const features = [
  {
    icon: Heart,
    number: "01",
    title: "辛い時は、動物を撫でて「休憩」していい。心の安定を最優先する働き方。",
    description:
      "「仕事中に休むなんて…」と気負う必要はありません。ここでは、あなたの心のペースが一番大切です。作業中に不安を感じたり、少し疲れたりした時は、そばにいる犬や猫を撫でてリラックスしてください。動物たちの温もりに触れることが、一番の心のケアになります。無理せず、ゆっくりと、あなたのペースで社会とのつながりを取り戻しましょう。",
    image: "/images/店舗画像3.png",
    imageAlt: "犬と触れ合いながらリラックスする利用者の様子",
    imagePosition: undefined as string | undefined,
  },
  {
    icon: Coffee,
    number: "02",
    title: "「お掃除」や「ごはん」が、小さな命を支える立派な仕事になる。",
    description:
      "特別なスキルがなくても大丈夫。日々の作業は、保護犬・猫たちが快適に過ごすための「環境づくり」が中心です。たとえば、犬猫部屋のお掃除、コロコロがけ、ブラッシング、ごはんの準備など。単純な作業に見えますが、これらは全て動物たちの命を守るために欠かせない大切な役割です。「誰かの役に立っている」という実感を、動物たちの嬉しそうな表情からダイレクトに感じることができます。",
    image: "/images/cafe-care.png",
    imageAlt: "犬にごはんをあげる様子",
    imagePosition: undefined as string | undefined,
  },
  {
    icon: HandHeart,
    number: "03",
    title: "パソコンが苦手でも輝ける。手仕事で「世界にひとつ」を作る喜び。",
    description:
      "ITやパソコン作業が苦手な方でも安心してください。アネラカフェでは、パラコードを使ったリード作りや、手編みの帽子・洋服作りなど、手先を使った「モノづくり」の作業が充実しています。マニュアル通りにコツコツ進める作業から、センスを活かした作品作りまで。自分の作った商品が店頭に並び、誰かの愛犬に使ってもらえる喜びは、何にも代えがたい自信になります。",
    image: "/images/teshigoto-work.png",
    imageAlt: "編み物をしながら犬と過ごす様子",
    imagePosition: "object-left-bottom",
  },
]

export function FeaturesSection() {
  return (
    <section className="px-5 py-16" style={{ backgroundColor: "#F8FDFB" }}>
      <div className="mx-auto max-w-md">
        <h2
          className="mb-2 text-center text-xl font-bold"
          style={{ color: "#6B5541" }}
        >
          {"アネラカフェの特徴"}
        </h2>
        <p
          className="mb-10 text-center text-sm"
          style={{ color: "#9A8573" }}
        >
          {"あなたらしい働き方を応援します"}
        </p>

        <div className="flex flex-col gap-8">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="overflow-hidden rounded-2xl bg-background shadow-sm"
              style={{ borderLeft: "4px solid #D0EBE5" }}
            >
              {/* Feature image */}
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={imagePath(feature.image || "/placeholder.svg")}
                  alt={feature.imageAlt}
                  className={cn("h-full w-full object-cover", feature.imagePosition)}
                />
                <div
                  className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1"
                  style={{ backgroundColor: "rgba(208,235,229,0.9)" }}
                >
                  <feature.icon className="h-3.5 w-3.5" style={{ color: "#6B5541" }} />
                  <span
                    className="text-xs font-bold tracking-widest"
                    style={{ color: "#6B5541" }}
                  >
                    {"POINT "}
                    {feature.number}
                  </span>
                </div>
              </div>

              {/* Feature text content */}
              <div className="p-5">
                <h3
                  className="mb-2 text-base font-bold"
                  style={{ color: "#6B5541" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#7A6B5D" }}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
