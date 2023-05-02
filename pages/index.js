import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Quizzy</title>
      </Head>
      <main className="flex flex-col items-center justify-centre p-24 h-s">

        <h1 className="text-center text-5xl text-bold my-5">Increase Your Knowledge</h1>        
        <h2 className="text-center text-2xl">With Quizzy</h2>    
        <Link href={'/quiz'} className="mt-10 text-center text-2xl bg-indigo-600 lg:bg-indigo-500 hover:bg-indigo-600 p-3 rounded-md shadow text-white"> Start Solving </Link>


      </main>
    </>
  );
}
