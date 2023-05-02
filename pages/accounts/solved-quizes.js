import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { MdSportsScore, MdSubject } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { BsCalendarDate, BsEyeFill } from "react-icons/bs";

const SolvedQuizes = ({ user, userData, loaded }) => {
  const [responses, setResponses] = useState([]);

  const loadResponses = async () => {
    try {
      let a = await fetch("/api/accounts/get-all-responses", {
        method: "GET",
        headers: {
          "xx-login-token": user.token,
        },
      });
      let res = await a.json();
      if (res.status === "success") {
        setResponses(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loaded && user.token != null) {
      loadResponses();
    }
  }, [loaded]);

  return (
    <>
      <Head>
        {loaded ? <title>{`${userData.name} | Responses`}</title> : ""}
      </Head>
      <div className="container px-5 my-5 mx-auto">
        <div className="sm:p-10 grid items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {responses.map((response) => (
            <div
              key={response.quizSlug}
              className="flex flex-col justify-center w-auto h-full my-2.5 p-3  bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
            >
              <h5 className="text-3xl font-bold text-gray-900 dark:text-white">
                {response.quizTitle}
              </h5>
              <div className="space-y-2 my-2 text-xl font-semibold">
                <p className="text-base text-gray-500 sm:text-lg dark:text-gray-400">
                  <span>
                    <MdSubject className="inline text-2xl text-indigo-500 w-10" />{" "}
                    {response.quizTopic}
                  </span>
                </p>
                <p className="text-base text-gray-500 sm:text-lg dark:text-gray-400">
                  <span>
                    <FaUserAlt className="inline text-2xl text-indigo-500 w-10" />{" "}
                    {response.quizCreator}
                  </span>
                </p>
                <p className="text-base text-gray-500 sm:text-lg dark:text-gray-400">
                  <span>
                    <MdSportsScore className="inline text-3xl text-indigo-500 w-10" />{" "}
                    <span>{`${response.score} / ${response.quizMaxScore}`}</span>
                  </span>
                </p>
                <p className="text-base text-gray-500 sm:text-lg dark:text-gray-400">
                  <span>
                    <BsCalendarDate className="inline text-3xl text-indigo-500 w-10" />{" "}
                    <span>{new Date().toLocaleString("en-us")}</span>
                  </span>
                </p>
              </div>
              <Link
                href={`/quiz/response/${response.quizSlug}`}
                className="inline-flex w-fit items-center mt-3 px-3 py-2 text-md font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none"
              >
                View
                <BsEyeFill className="text-xl w-4 h-4 ml-2" />
              </Link>
            </div>
          ))}

          {loaded && responses.length === 0 && (
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                You haven't solved any quiz yet!
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SolvedQuizes;
