import React from "react";
import mongoose from "mongoose";
import QuizSet from "@/models/QuizSet";
import QuizCreator from "@/models/QuizCreator";
import { MdSubject } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import Link from "next/link";
import Head from "next/head";

const Quizes = ({ quizes }) => {
  return (
    <>
      <Head>
        <title>Quizes | Quizzy</title>
      </Head>
      <div className="container px-5 my-5 mx-auto">
        <div className="sm:p-10 grid items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {quizes.map((quiz) => (
              <div
                key={quiz.slug}
                className="flex flex-col justify-center w-auto h-full my-2.5 p-3 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
              >
                <h5 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {quiz.title}
                </h5>
                <div className="space-y-2 m-2">
                  <p className="text-base text-gray-500 sm:text-lg dark:text-gray-400">
                    <span>
                      <MdSubject className="inline text-2xl text-indigo-500" />{" "}
                      {quiz.topic}
                    </span>
                  </p>
                  <p className="text-base text-gray-500 sm:text-lg dark:text-gray-400">
                    <span>
                      <FaUserAlt className="inline text-2xl text-indigo-500" />{" "}
                      {quiz.creator}
                    </span>
                  </p>
                </div>
                <Link
                  href={`/quiz/solve/${quiz.slug}`}
                  className="inline-flex w-fit items-center my-3 px-3 py-2 text-md font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none"
                >
                  Solve
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </div>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let quizes = JSON.parse(JSON.stringify(await QuizSet.find({})));

  for (const quiz of quizes) {
    let creator = JSON.parse(
      JSON.stringify(await QuizCreator.findById(quiz.creator))
    );
    quiz.creator = `@${creator.creatorId}`;
    delete quiz["_id"];
    delete quiz["questions"];
    delete quiz["__v"];
    delete quiz["createdAt"];
    delete quiz["updatedAt"];
  }

  return {
    props: {
      quizes,
    },
  };
}

export default Quizes;
