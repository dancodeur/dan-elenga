"use client"

import { Github, Linkedin, Mail, ArrowDown } from "lucide-react"
import Link from "next/link"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ProjectCarousel } from "@/components/project-carousel"
import { AlternatingTimeline } from "@/components/alternating-timeline"
import { GithubActivity } from "@/components/github-activity"
import { ThemeLanguageSwitcher } from "@/components/theme-language-switcher"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "@/contexts/theme-context"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function Home() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const experienceAnimation = useScrollAnimation()
  const projectsAnimation = useScrollAnimation()
  const aboutAnimation = useScrollAnimation()
  const educationAnimation = useScrollAnimation()

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-300">
      {/* Header */}
      <header className="relative min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-100 to-white dark:from-zinc-900 dark:to-zinc-950" />

        {/* Theme & Language Switcher */}
        <div className="absolute top-4 right-4">
          <ThemeLanguageSwitcher />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight animate-fade-in text-gray-900 dark:text-zinc-300">
          {t("title", "header")}
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-600 dark:text-zinc-400 max-w-2xl animate-fade-in animation-delay-200">
          {t("subtitle", "header")}
        </p>
        <div className="flex gap-4 mt-8 animate-fade-in animation-delay-300">
          <Button
            asChild
            variant="outline"
            size="icon"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <Link href="https://github.com/dancodeur" target="_blank" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="icon"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <Link href="https://www.linkedin.com/in/dan-elenga-4ab095229/" target="_blank" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="icon"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <Link href="mailto:elengadan@gmail.com" aria-label="Email">
              <Mail className="h-5 w-5" />
            </Link>
          </Button>
        </div>
        <Button
          className="mt-6 animate-fade-in animation-delay-400 bg-gray-900 hover:bg-gray-800 text-white dark:bg-zinc-800 dark:hover:bg-zinc-700"
          asChild
        >
          <Link href="/Dan Elenga - CV.pdf " download>
            {t("downloadCV", "header")}
          </Link>
        </Button>

        {/* GitHub Activity */}
        <div className="mt-12 w-full hidden md:block max-w-md animate-fade-in animation-delay-500">
          {/* <GithubActivity /> */}
        </div>

        <div className="absolute bottom-10 animate-bounce">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-zinc-400 dark:hover:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <Link href="#experience" aria-label="Défiler vers le bas">
              <ArrowDown className="h-6 w-6" />
            </Link>
          </Button>
        </div>
      </header>

      {/* GitHub Activity */}
      <div className="mt-12 md:mx-auto   flex flex-col items-center justify-center px-4 max-w-md animate-fade-in animation-delay-500">
        <GithubActivity/>
      </div>

      {/* Experiences Section avec timeline alternée */}
      <section id="experience" className="py-20 px-4">
        <div
          ref={experienceAnimation.ref}
          className={`max-w-5xl mx-auto transition-all duration-1000 transform ${
            experienceAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl font-bold mb-16 text-center text-gray-900 dark:text-zinc-300">
            {t("title", "experience")}
          </h2>

          <AlternatingTimeline
            experiences={[
              {
                id: 1,
                title: "Développeur front-end",
                company: "NEYOS",
                location: "Paris",
                period: "Juil. 2024 - Présent",
                type: "alternance",
                description:
                  "Développement d'interfaces utilisateur pour des clients de divers secteurs. Collaboration avec les designers pour transformer des maquettes en sites web fonctionnels et responsives. Participation aux réunions client et aux sprints agiles.",
                skills: ["Vue 3", "Nuxt 3", "TypeScript", "JavaScript", "Tailwind CSS", "Figma", "Git", "GitHub","Docker", "Méthode Agile", "Accessibilité Web", "SEO","CI/CD"],
              },
              {
                id: 2,
                title: "Développeur full stack",
                company: "NEYOS",
                location: "Paris",
                period: "Avril 2024 - Juin 2024",
                type: "stage",
                description:
                  "Stage réalisé en 2ᵉ année du BUT MMI au sein de NEYOS, avec pour mission le développement full-stack d’outils web internes : intégration de fonctionnalités, maintenance applicative, tests et corrections de bugs.",
                skills: ["JavaScript", "React", "Node.js", "Express", "Git", "GitHub", "Docker","Tailwind CSS","Leaflet","Socket.IO", "Adonis JS","CI/CD", "Figma","PHP", "MySQL", "Laravel"],
              },
            ]}
          />
        </div>
      </section>

      {/* Projects Section */}
      <section className={`py-20 px-4 ${theme === "dark" ? "section-gradient-dark" : "section-gradient-light"}`}>
        <div
          ref={projectsAnimation.ref}
          className={`max-w-5xl mx-auto transition-all duration-1000 transform ${
            projectsAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-zinc-300">
            {t("title", "projects")}
          </h2>
          <ProjectCarousel
            projects={[
              {
                id: 1,
                title: "Application bancaire en PHP/MySQL",
                description:
                  "Ce projet est une application web de gestion de comptes bancaires permettant aux utilisateurs de consulter leurs comptes, d'effectuer des transactions et de gérer leurs finances en toute simplicité. Hébergée sur Alwaysdata, le code source est disponible sur GitHub.",
                image: "/projets/application_bancaire.png",
                tags: ["HTML/CSS", "Tailwind CSS", "PHP", "MySQL"],
                githubUrl: "https://github.com/dancodeur/projetB",
                demoUrl: "https://projetb.alwaysdata.net/projetB/src/",
              },
              {
                id: 2,
                title: "Application de cartographie interactive",
                description:
                  "Cette application a été développée pour offrir une visualisation dynamique et interactive des données de géolocalisation, permettant ainsi aux utilisateurs de suivre en direct des itinéraires, d’accéder à des informations météorologiques régionales et d’exploiter des fichiers géospatiaux (GeoJSON, OSM, etc.).",
                image: "/projets/Real_time_map.png",
                tags: ["JavaScript", "Nuxt", "Vue 3", "Github","Docker","Socket.IO", "Leaflet"],
                githubUrl: "https://github.com/dancodeur/Real_time_MapViewer",
                demoUrl: "https://real-time-map-viewer.vercel.app/",
              },
              {
                id: 3,
                title: "JavaQuiz – Application de quiz en ligne de commande",
                description:
                  "Ce programme propose des questions de culture générale sur différents thèmes, calcule un score et fournit un retour personnalisé en fonction des réponses du joueur.Il offre également une expérience interactive en console.",
                image: "/projets/JavaQuiz-dancodeur.png",
                tags: ["Java", "Github", "Intellij IDEA"],
                githubUrl: "https://github.com/dancodeur/JavaQuizBot",
                demoUrl: "https://github.com/dancodeur/JavaQuizBot",
              },
              {
                id: 4,
                title: "Projet universitaire : Lunar Lander AI – Entraînement d’un agent intelligent par apprentissage par renforcement.",
                description:
                  "Ce projet implémente une intelligence artificielle (IA) capable de piloter un vaisseau spatial afin d'effectuer un atterrissage contrôlé dans l’environnement Lunar Lander d’OpenAI Gym.",
                image: "/projets/IA.png",
                tags: ["NumPy", "Python", "Google Colab", "Github" ],
                githubUrl: "https://github.com/dancodeur/LunarLander_Q-learning/tree/main",
                demoUrl: "https://github.com/dancodeur/LunarLander_Q-learning/tree/main",
              },
              {
                id: 5,
                title: "Projet personnel : Maquette Figma d’un prototype de carte interactive.",
                description:
                  "Cette maquette a été réalisée dans un objectif d’apprentissage, afin de me familiariser avec Figma et d’explorer ses fonctionnalités appliquées à un projet concret.",
                image: "/projets/figma.png",
                tags: ["Figma", "UI/UX Design", "Prototypage"],
                githubUrl: "#",
                demoUrl: "https://www.figma.com/proto/ofz4Zg24NmWNeCYb80855x/Dan-Maps?node-id=9-201&p=f&t=9rtEA5prv8UgNkxG-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A53&show-proto-sidebar=1",
              },
            ]}
          />
          <div className="text-center mt-12">
            <Button
              asChild
              className="bg-gray-900 hover:bg-gray-800 text-white dark:bg-zinc-800 dark:hover:bg-zinc-700"
            >
              <Link href="https://github.com/dancodeur" target="_blank">
                {t("viewMore", "projects")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div
          ref={aboutAnimation.ref}
          className={`max-w-5xl mx-auto transition-all duration-1000 transform ${
            aboutAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-zinc-300">
            {t("title", "about")}
          </h2>

          {/* Présentation en une seule ligne */}
          <p className="text-lg text-gray-700 dark:text-zinc-400 mb-16 text-center max-w-3xl mx-auto">
            {t("description", "about")}
          </p>

          {/* Skills Section */}
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-zinc-300">Technologies</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-zinc-400">HTML/CSS</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-zinc-400">80%</span>
                  </div>
                  <Progress value={80} className="h-2 bg-gray-200 dark:bg-zinc-800" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-zinc-400">JavaScript</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-zinc-400">70%</span>
                  </div>
                  <Progress value={70} className="h-2 bg-gray-200 dark:bg-zinc-800" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-zinc-400">Vue 3</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-zinc-400">85%</span>
                  </div>
                  <Progress value={85} className="h-2 bg-gray-200 dark:bg-zinc-800" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-zinc-400">React</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-zinc-400">65%</span>
                  </div>
                  <Progress value={65} className="h-2 bg-gray-200 dark:bg-zinc-800" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-zinc-400">Nuxt.js</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-zinc-400">85%</span>
                  </div>
                  <Progress value={85} className="h-2 bg-gray-200 dark:bg-zinc-800" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-zinc-400">Node.js</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-zinc-400">50%</span>
                  </div>
                  <Progress value={50} className="h-2 bg-gray-200 dark:bg-zinc-800" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-zinc-400">PHP</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-zinc-400">80%</span>
                  </div>
                  <Progress value={80} className="h-2 bg-gray-200 dark:bg-zinc-800" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-zinc-400">Laravel</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-zinc-400">60%</span>
                  </div>
                  <Progress value={60} className="h-2 bg-gray-200 dark:bg-zinc-800" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-zinc-400">MySQL</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-zinc-400">70%</span>
                  </div>
                  <Progress value={70} className="h-2 bg-gray-200 dark:bg-zinc-800" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-zinc-300">Outils & Méthodologies</h3>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  Git
                </Badge>
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  GitHub
                </Badge>
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  VS Code
                </Badge>
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  Figma
                </Badge>
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  Responsive Design
                </Badge>
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  Tailwind CSS
                </Badge>
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  API REST
                </Badge>
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  Méthode Agile
                </Badge>
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  Accessibilité Web
                </Badge>
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  SEO
                </Badge>
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  Shell
                </Badge>
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  Docker
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className={`py-20 px-4 ${theme === "dark" ? "section-gradient-dark" : "section-gradient-light"}`}>
        <div
          ref={educationAnimation.ref}
          className={`max-w-5xl mx-auto transition-all duration-1000 transform ${
            educationAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-zinc-300">
            {t("title", "education")}
          </h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="hidden md:block w-24 md:w-[20rem] text-right text-gray-500 dark:text-zinc-500">
                  <h3 className="text-md font-semibold text-gray-900 dark:text-zinc-300">IIM DIGITAL SCHOOL PARIS - PÔLE LÉONARD DE VINCI</h3>
                  <span>2025 - 2027</span>
               </div>
              <div className="flex-1">
                <h3 className="text-md font-semibold text-gray-900 dark:text-zinc-300 mb-3">
                  MASTÈRE LEAD DEVELOPPEUR FULL STACK
                </h3>
                <h4 className="md:hidden font-semibold text-zinc-700 text-sm">IIM DIGITAL SCHOOL PARIS  -  PÔLE <br /> LÉONARD DE VINCI</h4>
                <p className="md:hidden text-sm text-gray-500 dark:text-zinc-500 mb-2">2025 - 2027</p>
                <p className="text-gray-700 dark:text-zinc-400">
                  Le mastère Développeur Fullstack a pour mission de former des développeuses et développeurs polyvalents ayant des connaissances utiles dans tous les environnements technologiques et à l’aise dans le développement utilisant différentes stacks techniques.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="hidden md:block w-24 md:w-[20rem] text-right text-gray-500 dark:text-zinc-500">
                  <h3 className="text-md font-semibold text-gray-900 dark:text-zinc-300">CY CERGY PARIS UNIVERSITÉ</h3>
                  <span>2022 - 2025</span>
               </div>
              <div className="flex-1">
                <h3 className="text-md font-semibold text-gray-900 dark:text-zinc-300 mb-3">
                  BACHELOR MÉTIERS DU MULTIMÉDIA ET DE L’INTERNET - PARCOURS DÉVELOPPEMENT WEB ET DISPOSITIFS INTERACTIFS
                </h3>
                <h4 className="md:hidden font-semibold text-zinc-700 text-sm">CY CERGY PARIS UNIVERSITÉ</h4>
                <p className="md:hidden text-sm text-gray-500 dark:text-zinc-500 mb-2">2022 - 2025</p>
                <p className="text-gray-700 dark:text-zinc-400">
                  Cette formation forme en 3 ans des des techniciens qualifiés capables de concevoir, réaliser et déployer des produits et services multimédias en utilisant les technologies numériques.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-200 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-600 dark:text-zinc-500">
            © {new Date().getFullYear()} Dan Elenga. {t("rights", "footer")}
          </p>
        </div>
      </footer>
    </div>
  )
}
