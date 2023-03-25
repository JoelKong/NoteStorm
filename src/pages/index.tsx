import { Inter } from "next/font/google";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import { getSession } from "next-auth/react";

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

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      props: { session },
      redirect: { destination: "/home", permanent: false },
    };
  }

  return {
    props: {},
  };
}
