import { ModeToggle } from "../components/mode-toggle";

export default function Header() {
  return (
    <header className="flex flex-row items-center justify-between mb-20 mt-10">
      <section id="title">
        <h1 className="text-2xl font-semibold text-primary">CrashTypingTest</h1>
      </section>
      <section id="misc">
        <ModeToggle />
      </section>
    </header>
  );
}
