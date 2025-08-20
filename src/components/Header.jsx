import { ModeToggle } from "../components/mode-toggle";
import { Zap } from "lucide-react";

export default function Header() {
  return (
    <header className="flex flex-row items-center justify-between mb-10 mt-6 px-2 lg:mx-10">
      <section className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-semibold text-primary">
          CrashTypingTest
        </h1>
      </section>

      <section className="text-xl">
        <ModeToggle />
      </section>
    </header>
  );
}