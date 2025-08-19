import { Input } from "@/components/ui/input";

export default function Main() {
	return <main className="flex flex-col justify-evenly h-full mx-10">
		<article id="type-content">
			<p className="text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, architecto esse quod quae similique amet, ea commodi aut dolorum molestiae quos. Expedita dolorem dicta voluptatum, deleniti numquam eaque ea architecto.</p>
		</article>
		<article id="type-input">
			<Input type="text" placeholder="Start typing..." />
		</article>
	</main>
}