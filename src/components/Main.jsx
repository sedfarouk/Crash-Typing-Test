import { Input } from "@/components/ui/input";
import Menu from "./Menu";
import { useContext, useState } from "react";
import { AppCtx } from "@/store/app-store";

export default function Main() {
  const appCtx = useContext(AppCtx);
  const [userInput, setUserInput] = useState("");

  function handleUserInputChange(e) {
    setUserInput(e.target.value);

    if (e.target.value.length === 1 && !appCtx.gameStart) {
      appCtx.handleGameStart("started");
    }
  }

  return (
		<>
    <main className="flex flex-col justify-start gap-15 h-full lg:mx-10">
      <Menu />
      <article id="type-content" className="text-muted-foreground">
        <p className="text-2xl">
          {appCtx.selectedText.split("").map((char, index) => {
            let style = "";

            if (index < userInput.length) {
              style =
                userInput[index] === char
                  ? "text-green-500" 
                  : "text-red-500"; 
            } else if (index === userInput.length) {
              style = "bg-yellow-200"; 
            } else {
              style = "text-gray-400"; 
            }

            return (
              <span key={index} className={style}>
                {char}
              </span>
            );
          })}
        </p>
      </article>
      <article id="type-input">
        <Input
          type="text"
          placeholder="Start typing..."
          className="mt-10"
          onChange={handleUserInputChange}
          autoFocus
          value={userInput}
        />
      </article>
    </main>
		</>
  );
}
