import { Inter } from "next/font/google";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Example from "../../components/test";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="fixed h-screen w-screen bg-yellow-50">
        <Header />
        <Hero />
      </div>
    </>
  );
}
