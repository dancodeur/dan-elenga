import { Badge } from "@/components/ui/badge"

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

interface ExperienceTimelineProps {
  experiences: Experience[]
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative space-y-8 before:absolute before:inset-0 before:left-5 before:h-full before:w-0.5 before:-ml-px before:bg-gray-200">
      {experiences.map((experience, index) => (
        <div key={experience.id} className="relative pl-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
            <h3 className="text-xl font-semibold">{experience.title}</h3>
            <span className="hidden sm:inline text-gray-400">•</span>
            <span className="text-gray-600">{experience.company}</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
            <span className="text-sm text-gray-500">{experience.location}</span>
            <span className="text-gray-400">•</span>
            <span className="text-sm text-gray-500">{experience.period}</span>
            <span className="text-gray-400">•</span>
            <Badge
              variant={
                experience.type === "stage" ? "outline" : experience.type === "alternance" ? "secondary" : "default"
              }
            >
              {experience.type === "stage" ? "Stage" : experience.type === "alternance" ? "Alternance" : "Emploi"}
            </Badge>
          </div>

          <p className="text-gray-700 mb-3">{experience.description}</p>

          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill) => (
              <Badge key={skill} variant="outline" className="bg-gray-50">
                {skill}
              </Badge>
            ))}
          </div>

          {/* Cercle sur la timeline */}
          <div className="absolute left-0 top-2 h-4 w-4 rounded-full border-2 border-white bg-gray-200"></div>
        </div>
      ))}
    </div>
  )
}
