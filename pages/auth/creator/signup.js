import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

function Signup({ user, verifyUser }) {

  const router = useRouter()

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [mostCommonSubjectsInQuiz, setMostCommonSubjectsInQuiz] = useState("");
  const [creatorId, setCreatorId] = useState("");

  const handleChange = (e) => {
    if (e.target.name == "phone") {
      if (e.target.value.length <= 10) {
        setPhone(e.target.value);
      }
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "mostCommonSubjects") {
      setMostCommonSubjectsInQuiz(e.target.value);
    } else if (e.target.name == "creatorId") {
      setCreatorId(e.target.value);
    }
  };

  /**
   * This function handles the submission of a form for creating a new user account and sends a POST
   * request to the server with the user's information.
   * @param e - The `e` parameter is an event object that represents the event that triggered the form
   * submission. In this case, it is the `submit` event of a form.
   * @returns The function `handleSubmit` does not return anything. It is an asynchronous function that
   * makes a POST request to a server endpoint and handles the response accordingly.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let a = await fetch("/api/auth/creator/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xx-login-token": user.token,
        },
        body: JSON.stringify({ phone, password, mostCommonSubjectsInQuiz, creatorId }),
      });
      let response = await a.json();
      console.log(response);
      if (!response.success) {
        // toast.error(response.error, {
        //   position: "top-left",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: false,
        //   progress: undefined,
        //   progressStyle: { background: "#f00" }
        // })
        setPassword("");
        return;
      } else {
        verifyUser(user.token)
        router.back()
        // toast.success(response.message, {
        //   position: "top-left",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: false,
        //   progress: undefined,
        // })
      }
    } catch (error) {
      console.error(error);
      setPassword("");
    }
  };

  return (
    <>
      <Head>
        <title> Sign Up as Creator | Create an Creator Account </title>
      </Head>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up as Creator
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} method="POST">
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="creatorId"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Creator Id
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="creatorId"
                  name="creatorId"
                  type="text"
                  onChange={handleChange}
                  value={creatorId}
                  required
                  className="px-3 flex justify-center items-center w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="mostCommonSubjectsInQuiz"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  On Which Subject are you going to write quiz?
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="mostCommonSubjectsInQuiz"
                  name="mostCommonSubjects"
                  type="text"
                  onChange={handleChange}
                  value={mostCommonSubjectsInQuiz}
                  required
                  className="px-3 flex justify-center items-center w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                  onChange={handleChange}
                  value={phone}
                  required
                  className="px-3 flex justify-center items-center w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none"
                />
              </div>
              <p
                htmlFor="email"
                className="px-3 block text-sm text-gray-900 mt-1"
              >
                Example : 1234567890
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Your Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={password}
                  autoComplete="current-password"
                  required
                  className="px-3 flex justify-center items-center w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
