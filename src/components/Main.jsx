import { Input } from "@/components/ui/input";
import Menu from "./Menu";
import { useContext } from "react";
import {AppCtx} from "@/store/app-store";

export default function Main() {
	const appCtx = useContext(AppCtx);

	return <main className="flex flex-col justify-start gap-15 h-full lg:mx-10">
		<Menu />
		<article id="type-content" className="text-muted-foreground">
			<p className="text-2xl">{appCtx.selectedText}</p>
		</article>
		<article id="type-input">
			<Input type="text" placeholder="Start typing..." className="mt-10" />
		</article>
	</main>
}