import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { MdSubject } from "react-icons/md";
import { MdSportsScore } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { FaUserFriends } from 'react-icons/fa'

const Quizes = ({ user, loaded, userData }) => {
  const [quizes, setQuizes] = useState([]);

  const loadQuizes = async () => {
    try {
      let a = await fetch("/api/accounts/get-all-quizes", {
        method: "GET",
        headers: {
          "xx-login-token": user.token,
        },
      });
      let res = await a.json();
      if (res.status === "success") {
        setQuizes(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loaded && user.isCreator) {
      loadQuizes();
    }
  }, [loaded]);

  return (
    <>
      <Head>
        <title>{`${userData.name} | Quizes`}</title>
      </Head>

      <div className="container px-5 my-5 mx-auto">
        <Link
          href={`/quiz/creator/new-quiz`}
          className="md:hidden xl:ml-16 text-xl inline-flex my-5 w-fit items-center mt-3 px-3 py-2 text-md font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none"
        >
          <AiOutlinePlus className="text-2xl mr-2 text-white" />
          New Quiz
        </Link>

        {loaded && quizes.length === 0 && (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              You haven't created any quiz yet!!
            </h1>
          </div>
        )}

        <div className="sm:p-10 grid items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Link href={`/quiz/creator/new-quiz`} className="hidden md:block text-white w-auto h-full my-2.5 bg-indigo-600 border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="text-4xl font-bold dark:text-white text-center flex items-center justify-center h-full">
              <span>
                <AiOutlinePlus className="mr-2 inline" />
                New Quiz
              </span>
            </div>
          </Link>

          {quizes.map((quiz) => (
            <div
              key={quiz.slug}
              className="flex flex-col justify-center w-auto h-full my-2.5 p-3 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
            >
              <h5 className="text-3xl font-bold text-gray-900 dark:text-white">
                {quiz.title}
              </h5>
              <div className="space-y-2 m-2 text-xl font-semibold">
                <p className="text-base text-gray-500 sm:text-lg dark:text-gray-400">
                  <span>
                    <MdSubject className="inline text-2xl text-indigo-500" />{" "}
                    {quiz.topic}
                  </span>
                </p>
                <p className="text-base text-gray-500 sm:text-lg dark:text-gray-400">
                  <span>
                    <MdSportsScore className="inline text-2xl text-indigo-500" />{" "}
                    {quiz.maxScore}
                  </span>
                </p>
                <p className="text-base text-gray-500 sm:text-lg dark:text-gray-400">
                  <span>
                    <FaUserFriends className="inline text-2xl text-indigo-500" />{" "}
                    {quiz.noOfAttempts}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Quizes;
