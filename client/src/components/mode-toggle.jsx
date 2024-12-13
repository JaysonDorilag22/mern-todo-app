import { Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/components/theme-provider"
import { useState } from "react"

export function ModeToggle() {
  const { setTheme } = useTheme()
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <div className="flex items-center">
      <Sun className={`h-[1.2rem] w-[1.2rem] transition-all ${isDark ? "opacity-0" : "opacity-100"}`} />
      <Switch checked={isDark} onCheckedChange={toggleTheme} className="mx-2" />
      <Moon className={`h-[1.2rem] w-[1.2rem] transition-all ${isDark ? "opacity-100" : "opacity-0"}`} />
      <span className="sr-only">Toggle theme</span>
    </div>
  )
}