"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "障害者手帳を持っていないのですが、利用できますか？",
    answer:
      "障害者手帳をお持ちでない方もご利用できます。お気軽にお問い合わせください。",
  },
  {
    question: "何歳から利用できますか？",
    answer:
      "18歳以上の方であれば年齢制限は基本ございません。",
  },
  {
    question: "未経験でも出来る仕事がありますか？",
    answer:
      "アネラカフェでは完全未経験の方でも、学習を通してスキルを身に付けることができ、無理なくお仕事をしていただけます。",
  },
  {
    question: "利用可能な期間に上限はありますか？",
    answer:
      "ご利用期間に上限はございません。納得のいくスキルが身につくまでご利用可能です。",
  },
  {
    question: "利用に必要なスキルはありますか？",
    answer:
      "まったくの未経験の方でも、スタッフのサポートを受けながらご自身のペースで学習していただけます。",
  },
  {
    question: "交通費は支給されますか？",
    answer:
      "お住まいの市町村により、交通費支給の有無や上限が異なるため、詳しくはお問い合わせください。",
  },
  {
    question: "通所可能となる要件を教えてください",
    answer:
      "いずれかの条件を満たす方が対象です。\n・18歳以上の方\n・精神障がい（発達障がい、ADHD、統合失調症等）もしくは知的障がいの方\n・障害者総合支援法の対象疾病となっている難病等の方\n・心身の不調等で通院をされており、一般就労が難しい方",
  },
  {
    question:
      "事業所がある場所と違う都道府県に在住していますが、利用可能ですか？",
    answer:
      "通所する上でご自身の体力等でご負担がなければ、どなたでもご利用可能です。また、在宅利用のご相談も可能です。",
  },
  {
    question: "利用頻度に条件はありますか？",
    answer:
      "条件はまったくございません。ご自身のご体調に合わせたご利用が可能で、無理なくご利用いただけます。",
  },
  {
    question: "体験利用は可能ですか？",
    answer:
      "体験でのご利用も可能です。スタッフ一同心よりお待ちしております。",
  },
  {
    question: "動物を飼ったことがないのですが大丈夫ですか？",
    answer:
      "まったく問題ございません。動物の飼育経験がなくても、専門のスタッフが動物との接し方を丁寧にお伝えしますのでご安心ください。実際に、動物と触れ合うのが初めてという方も多く通所されています。動物たちも人懐っこい子ばかりなので、自然と仲良くなれますよ。",
  },
]

export function FaqSection() {
  return (
    <section className="px-5 py-16 bg-background">
      <div className="mx-auto max-w-md">
        <div className="mb-2 flex items-center justify-center gap-2">
          <HelpCircle className="h-5 w-5" style={{ color: "#6B5541" }} />
          <h2
            className="text-center text-xl font-bold"
            style={{ color: "#6B5541" }}
          >
            {"よくある質問"}
          </h2>
        </div>
        <p
          className="mb-8 text-center text-sm"
          style={{ color: "#9A8573" }}
        >
          {"気になることがあればお気軽にご相談ください"}
        </p>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={`faq-${index}`}
              value={`faq-${index}`}
              className="border-b"
              style={{ borderColor: "#E8DDD4" }}
            >
              <AccordionTrigger
                className="py-4 text-left text-sm font-medium hover:no-underline"
                style={{ color: "#6B5541" }}
              >
                <span className="flex items-start gap-2 pr-4">
                  <span
                    className="mt-0.5 shrink-0 text-xs font-bold"
                    style={{ color: "#C4956A" }}
                  >
                    {"Q."}
                  </span>
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent
                className="text-sm leading-relaxed"
                style={{ color: "#7A6B5D" }}
              >
                <span className="flex items-start gap-2">
                  <span
                    className="shrink-0 text-xs font-bold"
                    style={{ color: "#6B9B8A" }}
                  >
                    {"A."}
                  </span>
                  <span className="whitespace-pre-line">{faq.answer}</span>
                </span>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
