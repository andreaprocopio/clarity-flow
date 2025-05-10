import { redirect } from "next/navigation";
import { Features } from "./Features";
import { FloatingNavbar } from "./FloatingNavbar";
import Hero from "./Hero";
import { currentUser } from "@clerk/nextjs/server";
import Footer from "./Footer";
import Tutorial from "./Tutorial";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const noRedirect = (await searchParams).noRedirect;
  const isLoggedIn = !!(await currentUser());

  if (!noRedirect && isLoggedIn) {
    redirect("/tasks");
  }

  return (
    <div>
      <FloatingNavbar isLoggedIn={isLoggedIn} />
      <Hero />
      <Features />
      <div className="my-20"></div>
      <Tutorial />
      <div className="my-20"></div>
      <Footer />
    </div>
  );
};

export default Home;
