import { Inter } from "next/font/google";
import Example from "../../components/test";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Example />
    </>
  );
}
