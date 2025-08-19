import Header from "@/components/Header";
import Main from "@/components/Main";
import Menu from "@/components/Menu";

export default function HomePage() {
  return (
    <main className="main flex flex-col justify-evenly mx-auto h-full lg:w-5/9 w-4/5 mt-5 mb-5">
      <Header />
      <Menu />
      <Main />
      <footer>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi obcaecati quae fuga, similique mollitia eaque dolorum enim suscipit omnis nostrum.
      </footer>
    </main>
  );
}
