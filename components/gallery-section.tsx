"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { Coins, UtensilsCrossed } from "lucide-react"

const galleryImages = [
  { src: "/images/店内画像1.JPG", alt: "店内の様子1" },
  { src: "/images/店内画像2.JPG", alt: "店内の様子2" },
  { src: "/images/店内画像3.JPG", alt: "店内の様子3" },
  { src: "/images/店内画像4.JPG", alt: "店内の様子4" },
  { src: "/images/店内画像5.JPG", alt: "店内の様子5" },
  { src: "/images/店内画像6.JPG", alt: "店内の様子6" },
  { src: "/images/店内画像7.JPG", alt: "店内の様子7" },
  { src: "/images/店内画像8.JPG", alt: "店内の様子8" },
  { src: "/images/店内画像9.JPG", alt: "店内の様子9" },
  { src: "/images/店内画像10.JPG", alt: "店内の様子10" },
  { src: "/images/店内画像11.JPG", alt: "店内の様子11" },
  { src: "/images/店内画像12.JPG", alt: "店内の様子12" },
]

export function GallerySection() {
  return (
    <section className="px-5 py-16 bg-background">
      <div className="mx-auto max-w-md">
        <h2
          className="mb-2 text-center text-xl font-bold"
          style={{ color: "#6B5541" }}
        >
          {"施設の概要と紹介"}
        </h2>
        <p
          className="mb-8 text-center text-sm"
          style={{ color: "#4A6B5E" }}
        >
          {"温かみのある空間でお待ちしています"}
        </p>

        {/* Photo carousel */}
        <div className="px-2">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {galleryImages.map((image) => (
                <CarouselItem key={image.src}>
                  <div className="overflow-hidden rounded-2xl shadow-md">
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="h-56 w-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className="left-2 border-0"
              style={{ backgroundColor: "rgba(255,255,255,0.8)", color: "#6B5541" }}
            />
            <CarouselNext
              className="right-2 border-0"
              style={{ backgroundColor: "rgba(255,255,255,0.8)", color: "#6B5541" }}
            />
          </Carousel>
        </div>

        {/* Wages & Meal info */}
        <div className="mt-10 flex flex-col gap-3">
          <div
            className="flex items-center gap-3 rounded-xl border p-4"
            style={{ borderColor: "#D0EBE5", backgroundColor: "#F8FDFB" }}
          >
            <Coins className="h-6 w-6 shrink-0" style={{ color: "#6B5541" }} />
            <div>
              <p className="text-xs" style={{ color: "#9A8573" }}>
                {"工賃"}
              </p>
              <p className="text-base font-bold" style={{ color: "#6B5541" }}>
                {"時給400円"}
                <span
                  className="ml-1 text-xs font-normal"
                  style={{ color: "#9A8573" }}
                >
                  {"（エリア高水準）"}
                </span>
              </p>
            </div>
          </div>
          <div
            className="flex items-center gap-3 rounded-xl border p-4"
            style={{ borderColor: "#D0EBE5", backgroundColor: "#F8FDFB" }}
          >
            <UtensilsCrossed className="h-6 w-6 shrink-0" style={{ color: "#6B5541" }} />
            <div>
              <p className="text-xs" style={{ color: "#9A8573" }}>
                {"食事"}
              </p>
              <p className="text-base font-bold" style={{ color: "#6B5541" }}>
                {"お弁当 100円"}
                <span
                  className="ml-1 text-xs font-normal"
                  style={{ color: "#9A8573" }}
                >
                  {"（管理栄養士監修）"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
