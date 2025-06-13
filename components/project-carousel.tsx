"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "@/contexts/theme-context"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Project = {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  githubUrl: string
  demoUrl: string
}

interface ProjectCarouselProps {
  projects: Project[]
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slidesToShow, setSlidesToShow] = useState(2)
  const [totalSlides, setTotalSlides] = useState(Math.ceil(projects.length / slidesToShow))

  // Ajuster le nombre de slides visibles en fonction de la taille de l'écran
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1)
      } else {
        setSlidesToShow(2)
      }
    }

    // Initialiser
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Recalculer le nombre total de slides quand slidesToShow change
  useEffect(() => {
    setTotalSlides(Math.ceil(projects.length / slidesToShow))
  }, [slidesToShow, projects.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === totalSlides - 1 ? 0 : prevIndex + 1))
  }

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex)
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }}
        >
          {projects.map((project) => (
            <div key={project.id} className="px-2" style={{ width: `${100 / slidesToShow}%`, flexShrink: 0 }}>
              <Card className="overflow-hidden h-full border border-gray-200 dark:border-zinc-700 shadow-sm dark:shadow-none ring-1 ring-gray-200/50 dark:ring-zinc-700/50">
                <div className="relative h-48">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-zinc-300">{project.title}</h3>
                  <p className="text-gray-600 dark:text-zinc-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:text-zinc-300 dark:border-zinc-700 dark:hover:bg-zinc-800"
                    >
                      <Link href={project.githubUrl} className="flex items-center gap-1">
                        <Github className="h-4 w-4" /> {t("code", "projects")}
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      asChild
                      className="bg-gray-900 hover:bg-gray-800 text-white dark:bg-zinc-800 dark:hover:bg-zinc-700"
                    >
                      <Link href={project.demoUrl} className="flex items-center gap-1">
                        <ExternalLink className="h-4 w-4" /> {t("demo", "projects")}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - collés aux cartes */}
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-zinc-800/80 rounded-r-md p-2 hover:bg-white dark:hover:bg-zinc-700 transition-colors z-10 text-gray-700 dark:text-zinc-300 shadow-sm"
        aria-label="Projet précédent"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-zinc-800/80 rounded-l-md p-2 hover:bg-white dark:hover:bg-zinc-700 transition-colors z-10 text-gray-700 dark:text-zinc-300 shadow-sm"
        aria-label="Projet suivant"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalSlides }).map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`h-2 w-2 rounded-full transition-all ${
              currentIndex === slideIndex ? "bg-gray-800 dark:bg-zinc-300 w-4" : "bg-gray-300 dark:bg-zinc-700"
            }`}
            aria-label={`Aller au groupe de projets ${slideIndex + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
