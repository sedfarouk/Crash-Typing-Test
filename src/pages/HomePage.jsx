import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";

export default function HomePage() {
  return (
    <main className="main flex flex-col justify-between mx-auto h-full lg:w-3/5 w-4/5 my-5">
      <Header />
      <Main />
      <Footer />
    </main>
  );
}
