import { useTheme } from "@/context/ThemeProvider";
import { Moon, Sun } from "lucide-react";

const Theme = () => {
  const { setTheme, theme } = useTheme();
  return (
    <div className="flex justify-center items-center gap-4 p-4 fixed bottom-0 right-0">
      <button
        className={`p-2 rounded dark:hover:bg-[#2f3030] cursor-pointer ${
          theme === "light" && "bg-slate-50"
        }`}
        onClick={() => setTheme("light")}
      >
        <Sun className="w-6 h-6" />
      </button>
      <button
        className={`p-2 rounded dark:hover:bg-[#2f3030] hover:bg-gray-200 bg-[#EEEEEE]/30 cursor-pointer ${
          theme === "dark" && "dark:bg-[#262e2d]"
        }`}
        onClick={() => setTheme("dark")}
      >
        <Moon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Theme;
