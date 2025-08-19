import { Input } from "@/components/ui/input";
import Menu from "./Menu";

export default function Main() {
	return <main className="flex flex-col justify-start gap-20 h-full lg:mx-10">
		<Menu />
		<article id="type-content" className="text-muted-foreground">
			<p className="text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, architecto esse quod quae similique amet, ea commodi aut dolorum molestiae quos. Expedita dolorem dicta voluptatum, deleniti numquam eaque ea architecto.</p>
		</article>
		<article id="type-input">
			<Input type="text" placeholder="Start typing..." className="mt-10" />
		</article>
	</main>
}