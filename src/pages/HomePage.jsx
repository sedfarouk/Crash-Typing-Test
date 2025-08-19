import Header from "@/components/Header";
import Main from "@/components/Main";

export default function HomePage() {
  return (
    <main className="main flex flex-col justify-between mx-auto h-full lg:w-5/9 w-4/5 my-5">
      <Header />
      <Main />
    </main>
  );
}
