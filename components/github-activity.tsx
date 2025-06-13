"use client"

import { useState } from "react"
import { Calendar, GitCommit, GitPullRequest, Star, GitBranch, Code } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "@/contexts/theme-context"

interface GithubActivity {
  date: string
  count: number
}

interface GithubRepo {
  name: string
  stars: number
  forks: number
  language: string
}

interface GithubStats {
  totalContributions: number
  pullRequests: number
  commits: number
  repositories: number
}

export function GithubActivity() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const [activities, setActivities] = useState<GithubActivity[]>([
    { date: "2023-06-01", count: 5 },
    { date: "2023-06-02", count: 3 },
    { date: "2023-06-03", count: 7 },
    { date: "2023-06-04", count: 2 },
    { date: "2023-06-05", count: 4 },
    { date: "2023-06-06", count: 0 },
    { date: "2023-06-07", count: 6 },
    { date: "2023-06-08", count: 8 },
    { date: "2023-06-09", count: 3 },
    { date: "2023-06-10", count: 1 },
    { date: "2023-06-11", count: 0 },
    { date: "2023-06-12", count: 4 },
    { date: "2023-06-13", count: 9 },
    { date: "2023-06-14", count: 2 },
  ])

  const [topRepos, setTopRepos] = useState<GithubRepo[]>([
    { name: "portfolio-nextjs", stars: 12, forks: 3, language: "TypeScript" },
    { name: "weather-app", stars: 8, forks: 2, language: "JavaScript" },
  ])

  const [stats, setStats] = useState<GithubStats>({
    totalContributions: 247,
    pullRequests: 18,
    commits: 183,
    repositories: 15,
  })

  const getIntensityClass = (count: number) => {
    if (theme === "dark") {
      if (count === 0) return "bg-zinc-800"
      if (count < 3) return "bg-emerald-900"
      if (count < 5) return "bg-emerald-700"
      return "bg-emerald-500"
    } else {
      if (count === 0) return "bg-gray-100"
      if (count < 3) return "bg-emerald-200"
      if (count < 5) return "bg-emerald-300"
      return "bg-emerald-500"
    }
  }

  const getLanguageColor = (language: string) => {
    switch (language) {
      case "TypeScript":
        return "bg-blue-500"
      case "JavaScript":
        return "bg-yellow-500"
      case "Python":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card className="bg-white border-gray-200 shadow-md ring-1 ring-gray-200/50 dark:bg-zinc-900 dark:border-zinc-700 dark:shadow-none dark:ring-zinc-700/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2 text-gray-900 dark:text-zinc-300">
          <Calendar className="h-5 w-5 text-gray-600 dark:text-zinc-400" />
          {t("githubActivity", "header")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Contribution graph */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-zinc-400">Contributions récentes</h4>
              <span className="text-xs text-gray-500 dark:text-zinc-500">14 derniers jours</span>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-1">
              {activities.slice(0, 7).map((activity, index) => (
                <div
                  key={index}
                  className={`h-4 w-full rounded-sm ${getIntensityClass(activity.count)}`}
                  title={`${activity.date}: ${activity.count} contributions`}
                ></div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {activities.slice(7, 14).map((activity, index) => (
                <div
                  key={index}
                  className={`h-4 w-full rounded-sm ${getIntensityClass(activity.count)}`}
                  title={`${activity.date}: ${activity.count} contributions`}
                ></div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-zinc-800 rounded-md">
              <div className="flex items-center gap-1 text-gray-600 dark:text-zinc-400 text-xs mb-1">
                <GitCommit className="h-3 w-3" />
                <span>Commits</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-zinc-300">{stats.commits}</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-zinc-800 rounded-md">
              <div className="flex items-center gap-1 text-gray-600 dark:text-zinc-400 text-xs mb-1">
                <GitPullRequest className="h-3 w-3" />
                <span>Pull Requests</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-zinc-300">{stats.pullRequests}</span>
            </div>
          </div>

          {/* Top repos */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-zinc-400 mb-2">Repositories populaires</h4>
            <div className="space-y-2">
              {topRepos.map((repo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 dark:bg-zinc-800 rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Code className="h-4 w-4 text-gray-500 dark:text-zinc-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-zinc-300">{repo.name}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-500">
                        <div className="flex items-center gap-1">
                          <div className={`h-2 w-2 rounded-full ${getLanguageColor(repo.language)}`}></div>
                          <span>{repo.language}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-zinc-500">
                      <Star className="h-3 w-3" />
                      <span>{repo.stars}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-zinc-500">
                      <GitBranch className="h-3 w-3" />
                      <span>{repo.forks}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
