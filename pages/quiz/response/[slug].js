import React, { useEffect, useState } from "react";
import mongoose from "mongoose";
import QuizSet from "@/models/QuizSet";
import Head from "next/head";
import { MdSportsScore } from "react-icons/md";
import QuizCreator from "@/models/QuizCreator";
import { useRouter } from "next/router";
import { TiTick } from "react-icons/ti";
import { RxCrossCircled } from "react-icons/rx";

const Response = ({ user, quizSet }) => {
  const { questions } = quizSet;

  const initialAnswers = [];
  for (let i = 0; i < questions.length; i++)
    initialAnswers.push({ option: -1 });

  const [answers, setAnswers] = useState(initialAnswers);

  const getQuizResponse = async () => {
    try {
      let a = await fetch("/api/quiz/get-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xx-login-token": user.token,
        },
        body: JSON.stringify({ quizId: quizSet.slug }),
      });
      let res = await a.json();
      if (res.status === "success") {
        setAnswers(res.data.answers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.token) {
      getQuizResponse();
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>{`Response  | ${quizSet.title}`}</title>
      </Head>
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col justify-center mx-auto max-w-5xl">
          <div className="mx-auto w-full">
            <div className="m-4">
              <div className="w-full mx-auto p-4 text-center bg-white border border-indigo-400 rounded-lg shadow sm:p-8 border-t-8 container">
                <h1 className="text-4xl text-center font-bold text-gray-900">
                  {quizSet.title}
                </h1>
              </div>
            </div>
          </div>

          {questions.map((question, qNo) => {
            return (
              <div className="my-2 mx-4" key={question.question}>
                <div className="mx-auto w-full p-4 text-center bg-white border border-indigo-400 rounded-lg shadow sm:p-8 container">
                  <h3 className="mb-5 text-xl font-medium text-gray-900 flex">
                    <span>
                      {qNo + 1}. {question.question}
                    </span>
                  </h3>

                  <ul className="grid gap-2 md:grid-cols-1">
                    {question.options.map((option, index) => {
                      return (
                        <li key={option}>
                          <div
                            className={`flex items-center p-3 justify-between space-x-3 w-full text-black bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:text-indigo-600 focus:children [&>*>input]:hover:bg-gray-100 ${
                              index == answers[qNo].option &&
                              answers[qNo].isCorrect
                                ? "border-green-500 text-green-500 font-bold"
                                : index == answers[qNo].option &&
                                  !answers[qNo].isCorrect
                                ? "border-red-500 text-red-500 font-bold"
                                : index == question.correctOption
                                ? "border-green-500 text-green-500 font-bold"
                                : ""
                            } 
                          `}
                          >
                            <div className="w-full bg-transparent flex">
                              <span className="flex items-center justify-center">
                                {option}
                                {index == answers[qNo].option &&
                                answers[qNo].isCorrect ? (
                                  <TiTick className="text-white bg-green-500 rounded-xl text-xl mx-2" />
                                ) : index == answers[qNo].option &&
                                  !answers[qNo].isCorrect ? (
                                  <RxCrossCircled
                                    className="text-white bg-red-500 rounded-xl text-xl mx-2"
                                  />
                                ) : (
                                  ""
                                )}
                              </span>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="w-full my-2 flex">
                    <div className="flex flex-col justify-start">
                      <div className="flex mt-2 items-center justify-center rounded p-1 font-medium uppercase leading-normal text-black transition duration-150 ease-in-out select-none">
                        <MdSportsScore className="text-2xl text-indigo-600" />
                        <span className="ms-2 text-xl">{question.points}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  /* This code is a server-side function that retrieves a quiz set from a MongoDB database and its
    creator information. */
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  const quizSet = JSON.parse(
    JSON.stringify(await QuizSet.findOne({ slug: context.params.slug }))
  );

  if (!quizSet)
    return {
      notFound: true,
    };

  const creator = JSON.parse(
    JSON.stringify(await QuizCreator.findById(quizSet.creator))
  );

  quizSet.creator = "@" + creator.creatorId;
  /* This code is removing the `correctOption` and `_id` properties from each question object in the
  `quizSet` array. This is likely being done to prevent information about correct answers from being passed to the
  client-side, as well as to simplify the data structure before rendering the quiz. */

  for (const question of quizSet.questions) {
    delete question._id;
  }

  return {
    props: { quizSet }, // will be passed to the page component as props
  };
}

export default Response;
