import React, { useEffect, useState } from "react";
import mongoose from "mongoose";
import QuizSet from "@/models/QuizSet";
import Head from "next/head";
import { useImmer } from "use-immer";
import QuizCreator from "@/models/QuizCreator";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import NonAvoidableModal from "@/components/nonAvoidableModal";
import { MdSportsScore } from "react-icons/md";
import { GoIssueOpened } from 'react-icons/go'

const Quiz = ({ user, quizSet, loaded }) => {
  const router = useRouter();
  const { slug } = router.query;

  const { questions } = quizSet;
  const initialAnswers = [];

  for (let i = 0; i < questions.length; i++)
    initialAnswers.push({ option: -1 });

  const [answers, updateAnswers] = useImmer(initialAnswers);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(answers);
    try {
      let a = await fetch("/api/quiz/solve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xx-login-token": user.token,
        },
        body: JSON.stringify({ quizSlug: quizSet.slug, answers }),
      });
      let res = await a.json();
      if (res.success) {
        toast(res.msg);
        toast.success("You earned " + res.score + " points");
        router.replace(`/quiz/response/${slug}`);
      }
    } catch (error) {}
  };

  const moveToHome = () =>{
    router.replace("/")
  }

  const checkIFSolved = async () => {
    try {
      let a = await fetch("/api/quiz/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xx-login-token": user.token,
        },
        body: JSON.stringify({ quizSlug: quizSet.slug }),
      });
      let res = await a.json();
      if (res.status === "success") {
        if(res.isSolved){
          toast.success("You have already solved this quiz");
          router.replace(`/quiz/response/${slug}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (loaded) {
      if (!user.token) {
        setShowLoginModal(true);
        return
      }
      checkIFSolved();
    }
  }, [loaded, user]);

  const handeAnsChange = (qNo) => (e) => {
    updateAnswers((draft) => {
      draft[qNo].option = parseInt(e.target.value);
    });
  };

  return (
    <>
      <Head>
        <title>{`Solve | ${quizSet.title}`}</title>
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

          <form action="" onSubmit={handleSubmit}>
            {questions.map((question, qNo) => (
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
                          <input
                            type="radio"
                            id={`question${qNo}_option${index}`}
                            value={index}
                            className="hidden peer"
                            onChange={handeAnsChange(qNo)}
                            checked={index == answers[qNo].option}
                            data-qno={qNo}
                          />
                          <label
                            htmlFor={`question${qNo}_option${index}`}
                            className="flex items-center p-3 justify-between space-x-3 w-full text-black bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:text-indigo-600 hover:text-gray-600 hover:bg-gray-100 focus:children [&>*>input]:hover:bg-gray-100"
                          >
                            <div className="w-full bg-transparent flex">
                              {option}
                            </div>
                          </label>
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
            ))}

            <div className="m-4">
              <div className="mx-auto w-full px-4 text-center sm:px-8 container flex justify-start">
                <button
                  type="submit"
                  className="block rounded bg-indigo-600 px-6 pb-2 pt-2.5 text-2xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <NonAvoidableModal showModal={showLoginModal}>
        <div className="text-7xl text-indigo-500">
          <GoIssueOpened />
        </div>
        <div>
          <h3 className="text-xl text-center text-gray-700">
            You are not a logged in. <br/> Please Login to solve the quiz.
          </h3>
        </div>
        <div className="flex w-full md:space-x-2 flex-col md:flex-row space-y-2 md:space-y-0">
          <button className="outline-none w-full md:w-1/2 text-md rounded shadow bg-indigo-600 text-white">
            <Link href={"/auth/login"} className="block w-full p-2">
              Log In
            </Link>
          </button>
          <button
            className="outline-none p-2 w-full md:w-1/2 text-md rounded shadow bg-white text-black border-2 border-indigo-600"
            onClick={moveToHome}
          >
            Back To Home
          </button>
        </div>
      </NonAvoidableModal>
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
    delete question.correctOption;
    delete question._id;
  }

  return {
    props: { quizSet }, // will be passed to the page component as props
  };
}

export default Quiz;
