"use client"

import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"

type Experience = {
  id: number
  title: string
  company: string
  location: string
  period: string
  type: "stage" | "alternance" | "emploi"
  description: string
  skills: string[]
}

interface AlternatingTimelineProps {
  experiences: Experience[]
}

export function AlternatingTimeline({ experiences }: AlternatingTimelineProps) {
  const { t } = useLanguage()

  return (
    <div className="relative">
      {/* Ligne centrale */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-zinc-700"></div>

      <div className="space-y-12">
        {experiences.map((experience, index) => {
          const isEven = index % 2 === 0
          return (
            <div key={experience.id} className={`relative flex ${isEven ? "flex-row" : "flex-row-reverse"}`}>
              {/* Point central */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full border-4 border-white dark:border-zinc-950 bg-gray-200 dark:bg-zinc-600 z-10"></div>

              {/* Contenu */}
              <div className={`w-1/2 ${isEven ? "pr-8" : "pl-8"}`}>
                <div
                  className={`bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md border border-gray-200 dark:border-zinc-700 ring-1 ring-gray-200/50 dark:ring-zinc-700/50 ${
                    isEven ? "text-right" : "text-left"
                  }`}
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-zinc-300">{experience.title}</h3>
                  <div className="flex items-center gap-2 mt-1 mb-2 text-gray-600 dark:text-zinc-400 text-sm">
                    <span className={`font-medium ${isEven ? "ml-auto" : ""}`}>{experience.company}</span>
                    <span>•</span>
                    <span>{experience.location}</span>
                  </div>

                  <div className={`flex gap-2 mb-3 ${isEven ? "justify-end" : "justify-start"}`}>
                    <Badge
                      variant={
                        experience.type === "stage"
                          ? "outline"
                          : experience.type === "alternance"
                            ? "secondary"
                            : "default"
                      }
                      className={
                        experience.type === "stage"
                          ? "border-gray-300 text-gray-700 dark:border-zinc-700 dark:text-zinc-300"
                          : experience.type === "alternance"
                            ? "bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-300"
                            : "bg-gray-900 text-white dark:bg-zinc-700"
                      }
                    >
                      {t(experience.type, "experience")}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-gray-300 text-gray-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
                    >
                      {experience.period}
                    </Badge>
                  </div>

                  <p className="text-gray-700 dark:text-zinc-400 mb-4">{experience.description}</p>

                  <div className={`flex flex-wrap gap-2 ${isEven ? "justify-end" : "justify-start"}`}>
                    {experience.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="border-gray-300 bg-gray-50 text-gray-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
