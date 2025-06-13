"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/theme-context"
import { useLanguage } from "@/contexts/language-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeLanguageSwitcher() {
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="w-8 h-5 p-0">
            <span className="sr-only">Changer de langue</span>
            <img
              src={language === "fr" ? "/fr-flag.svg" : "/en-flag.svg"}
              alt={language === "fr" ? "Français" : "English"}
              className="w-6 h-5 object-cover"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700">
          <DropdownMenuItem
            onClick={() => setLanguage("fr")}
            className={`${
              language === "fr" ? "bg-gray-100 dark:bg-zinc-800" : ""
            } text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer`}
          >
            <div className="flex items-center gap-2">
              <img src="/fr-flag.svg" alt="Français" className="w-5 h-8 " />
              <span>Français</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setLanguage("en")}
            className={`${
              language === "en" ? "bg-gray-100 dark:bg-zinc-800" : ""
            } text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer`}
          >
            <div className="flex items-center gap-2">
              <img src="/en-flag.svg" alt="English" className="w-5 h-8 " />
              <span>English</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-zinc-300 dark:hover:text-zinc-100 dark:hover:bg-zinc-800"
      >
        {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        <span className="sr-only">Changer de thème</span>
      </Button>
    </div>
  )
}
