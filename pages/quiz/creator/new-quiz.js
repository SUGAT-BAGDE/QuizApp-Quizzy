import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useImmer } from "use-immer";
import { FaTrash } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import NonAvoidableModal from "@/components/nonAvoidableModal";
import { GoIssueOpened } from "react-icons/go";

const NewQuiz = ({ user }) => {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [editName, setEditName] = useState("");
  const [editValue, setEditValue] = useState("");

  /* The below code is defining a state variable called "questions" using the "useImmer" hook in React.
  It initializes the state with an array containing one object that represents a quiz question. The
  question object has a question string, an array of options, the index of the correct option, and
  the number of points the question is worth. */
  const [questions, updateQuestions] = useImmer([
    {
      question: "Your Question 1st?",
      options: ["Option 1", "Option 2"],
      correctOption: 0,
      points: 1,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(0); // 0 and any other number stands for no modal, 1 stands for unknown user (not logged in)  & 2 for not a creator
  const router = useRouter()

  /* The above code is using the `useEffect` hook in React to check if the `user` object has a `token`
  and `isCreator` property. If the `token` property is not present, it sets the `showModal` state to
  `true` and `modalType` state to `1`. If the `isCreator` property is not present, it sets the
  `showModal` state to `true` and `modalType` state to `2`. If both properties are present, it sets
  the `showModal` state to `false`. The `useEffect */
  useEffect(() => {
    if (!user.token) {
      setShowModal(true);
      setModalType(1);
      return;
    }
    if (!user.isCreator) {
      setShowModal(true);
      setModalType(2);
    } else {
      setShowModal(false);
    }
  }, [user]);

  const handleChange = (e) => {
    if (e.target.name == "title") {
      setTitle(e.target.value);
    } else if (e.target.name == "topic") {
      setTopic(e.target.value);
    } else if (/questionb-\d/i.test(e.target.name)) {
      setEditName(e.target.name);
      setEditValue(e.target.value);
    } else if (/question\d_option\d_edit/i.test(e.target.name)) {
      setEditName(e.target.name);
      setEditValue(e.target.value);
    }
  };

  const handleFocus = (e) => {
    if (/questionb-\d/i.test(e.target.name)) {
      setEditName(e.target.name);
      setEditValue(e.target.value);
    } else if (/question\d_option\d_edit/i.test(e.target.name)) {
      setEditName(e.target.name);
      setEditValue(e.target.value);
    }
  };

  const handleBlur = (e) => {
    if (/questionb-\d/i.test(e.target.name)) {
      updateQuestions((draft) => {
        draft[e.target.dataset.qno].question = e.target.value
      });
    }
    if (/question\d_option\d_edit/i.test(e.target.name)) {
      updateQuestions((draft) => {
        draft[e.target.dataset.qno].options[e.target.dataset.ono] = e.target.value
      });
    }
    setEditName("");
    setEditValue("");
  };

  const handeQAnsChange = (qNo) => (e) => {
    updateQuestions((draft) => {
      draft[qNo].correctOption = e.target.value;
    });
  };

  const handleOptionDelete = (qNo, ono) => (e) => {
    let toDelete = questions[qNo].options[ono];
    if (questions[qNo].options.length > 2) {
      updateQuestions((draft) => {
        draft[qNo].options = draft[qNo].options.filter((e) => {
          return e != toDelete;
        });
      });
    }
  };

  const handleAddOption = (qNo) => (e) => {
    if (questions[qNo].options.length < 5) {
      updateQuestions((draft) => {
        draft[qNo].options.push(`Option ${questions[qNo].options.length + 1}`);
      });
    }
  };

  const handleChangePoints = (qNo, increase) => (e) => {
    updateQuestions((draft) => {
      increase ? draft[qNo].points++ : draft[qNo].points--;
    });
  };

  const handleAddQuestion = (e) => {
    updateQuestions((draft) => {
      draft.push({
        question: `Your Question ${draft.length + 1}?`,
        options: ["Option 1", "Option 2"],
        correctOption: 0,
        points: 1,
      });
    });
  };

  const moveToHome = () =>{
    router.replace("/")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let a = await fetch("/api/quiz/create-quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xx-login-token": user.token,
      },
      body: JSON.stringify({
        title,
        topic,
        questions,
      }),
    });
    let response = await a.json();
    console.log(response);
    if (!response.success) {
      return;
    } 
    router.replace("/")
  };

  return (
    <>
      <Head>
        <title>Create an Quiz</title>
      </Head>

      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center w-full">
          <div className="xl:w-full max-w-5xl">
            <div className="m-4">
              <div className="w-full p-4 text-center bg-white border border-indigo-400 rounded-lg shadow sm:p-8 border-t-8 container">
                <h1 className="text-4xl font-bold text-gray-900">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={handleChange}
                    value={title}
                    placeholder="Title Of Quiz"
                    required
                    className="outline-none w-full focus:border-b-4 p-1"
                  />
                </h1>
                <h1 className="mt-4 text-2xl text-gray-900">
                  <input
                    id="topic"
                    name="topic"
                    type="text"
                    onChange={handleChange}
                    value={topic}
                    placeholder="Topic Of Quiz"
                    required
                    className="outline-none w-full focus:border-b-4 p-1"
                  />
                </h1>
              </div>
            </div>

            {questions.map((question, qNo) => (
              <div className="m-4" key={question.question}>
                <div className="w-full p-4 text-center bg-white border border-indigo-400 rounded-lg shadow sm:p-8 container">
                  <h3 className="mb-5 text-xl font-medium text-gray-900 flex">
                  <span>{qNo+1}.</span> 
                    <input
                      id={`questionb-${qNo}`}
                      name={`questionb-${qNo}`}
                      type="text"
                      onChange={handleChange}
                      value={
                        editName == `questionb-${qNo}`
                          ? editValue
                          : question.question
                      }
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      data-qno={qNo}
                      placeholder="Question"
                      required
                      className="ms-2 outline-none w-full focus:border-b-4"
                    />
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
                            onChange={handeQAnsChange(qNo)}
                            checked={index == question.correctOption}
                            required
                            data-qno={qNo}
                          />
                          <label
                            htmlFor={`question${qNo}_option${index}`}
                            className="flex items-center p-3 justify-between space-x-3 w-full text-black bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-indigo-600 peer-checked:text-indigo-600 hover:text-gray-600 hover:bg-gray-100 focus:children [&>*>input]:hover:bg-gray-100"
                          >
                            <div className="w-full bg-transparent flex">
                              {/* {option} */}
                              <input
                                id={`question${qNo}_option${index}_edit`}
                                name={`question${qNo}_option${index}_edit`}
                                type="text"
                                onChange={handleChange}
                                value={
                                  editName ==
                                  `question${qNo}_option${index}_edit`
                                    ? editValue
                                    : option
                                }
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                data-qno={qNo}
                                data-ono={index}
                                placeholder={`Option ${index + 1}`}
                                required
                                className="w-full w outline-none focus:border-b-4 text-lg"
                              />
                            </div>
                            <button
                              type="button"
                              data-qno={qNo}
                              data-ono={index}
                              onClick={handleOptionDelete(qNo, index)}
                              className="deleteButton rounded bg-indigo-600 p-3 text-lg font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600"
                            >
                              <FaTrash />
                            </button>
                            <label
                              type="button"
                              htmlFor={`question${qNo}_option${index}`}
                              className={`rounded border-2 ${
                                question.correctOption == index
                                  ? "text-indigo-600"
                                  : "text-white"
                              } border-indigo-600 bg-white p-2 text-xl font-medium uppercase leading-normal transition duration-150 ease-in-out`}
                            >
                              <TiTick />
                            </label>
                          </label>
                        </li>
                      );
                    })}
                  </ul>

                  {question.options.length < 5 && (
                    <div className="w-full my-2 flex justify-end">
                      <button
                        type="button"
                        onClick={handleAddOption(qNo)}
                        className="block rounded bg-indigo-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      >
                        Add Option
                      </button>
                    </div>
                  )}
                  {/* {JSON.stringify(question)} */}
                  <div className="w-full my-2 flex">
                    <div className="flex flex-col justify-start">
                      <div>{"Points :  "}</div>
                      <div className="flex space-x-1">
                        <input
                          type="number"
                          className="hidden"
                          value={question.points}
                          readOnly={true}
                        />
                        <div
                          className="flex items-center w-10 justify-center rounded bg-indigo-600 p-2 text-xl font-medium uppercase leading-normal text-white transition duration-150 ease-in-out cursor-pointer"
                          onClick={handleChangePoints(qNo, false)}
                        >
                          <AiOutlineMinus />
                        </div>
                        <div className="flex items-center w-10 justify-center rounded bg-indigo-300 p-2 text-xl font-medium uppercase leading-normal text-black transition duration-150 ease-in-out select-none">
                          {question.points}
                        </div>
                        <div
                          className="flex items-center w-10 justify-center rounded bg-indigo-600 p-2 text-xl font-medium uppercase leading-normal text-white transition duration-150 ease-in-out cursor-pointer"
                          onClick={handleChangePoints(qNo, true)}
                        >
                          <AiOutlinePlus />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="m-4">
              <div className="w-full px-4 text-center sm:px-8 container flex justify-end">
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="block rounded bg-indigo-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Add Question
                </button>
              </div>
            </div>
          </div>
          <div className="m-4">
            <div className="w-full px-4 text-center shadow sm:px-8 container flex justify-start">
              <button
                type="submit"
                className="block rounded bg-indigo-600 px-6 pb-2 pt-2.5 text-2xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Save Quiz
              </button>
            </div>
          </div>
        </div>
      </form>

      <NonAvoidableModal showModal={showModal}>
        <div className="text-7xl text-indigo-500">
          <GoIssueOpened />
        </div>
        <div>
          <h3 className="text-xl text-center text-gray-700">
            {modalType == 1 ? (
              <>
                You are not logged in. <br /> If you are creator Please Login
              </>
            ) : (
              <>
                You are not a Creator! <br /> Sorry, You cannot create a Quiz
              </>
            )}
          </h3>
        </div>
        <div className="flex w-full md:space-x-2 flex-col md:flex-row space-y-2 md:space-y-0">
          {modalType == 1 ? (
            <button className="outline-none w-full md:w-1/2 text-md rounded shadow bg-indigo-600 text-white">
              <Link href={"/auth/login"} className="block w-full p-2">
                Log In
              </Link>
            </button>
          ) : (
            <button className="outline-none w-full md:w-1/2 text-md rounded shadow bg-indigo-600 text-white">
              <Link href={"/auth/creator/signup"} className="block w-full p-2">
                Be a Creator
              </Link>
            </button>
          )}
          <button className="outline-none p-2 w-full md:w-1/2 text-md rounded shadow bg-white text-black border-2 border-indigo-600" onClick={moveToHome}>
              Back To Home
          </button>
        </div>
      </NonAvoidableModal>
    </>
  );
};

export default NewQuiz;
