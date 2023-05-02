import React from "react";
import Head from "next/head";

const about = () => {
  return (
    <>
      <Head>
        <title>About | Quizzy</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-centre p-24 h-s">
        <h1 className="text-center text-5xl text-bold my-5">
          Quizzy
        </h1>
        <p className="text-center text-2xl">is our initive to make fun with question of all Subject to increase our knowledge.</p>
      </main>
    </>
  );
};

export default about;
