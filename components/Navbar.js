import { Fragment, useState, useEffect } from "react";

import { Menu, Transition } from "@headlessui/react";

import Link from "next/link";
import { MdQuiz } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { AiOutlineSolution } from "react-icons/ai";
import { useRouter } from "next/router";

const Navbar = ({ user, userData, logout }) => {
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
        setMobileNavOpen(false);
    });
  }, []);

  return (
    <>
      {/* Page Container */}
      <div
        id="page-container"
        className="flex flex-col mx-auto w-full min-w-[320px] bg-gray-100 dark:text-gray-100 dark:bg-gray-900 z-10"
      >
        {/* Page Header */}
        <header
          id="page-header"
          className="flex flex-none items-center bg-white shadow-sm z-1 dark:bg-gray-800"
        >
          <div className="container xl:max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex justify-between py-4">
              {/* Left Section */}
              <div className="flex items-center">
                {/* Logo */}
                <Link
                  href={"/"}
                  className="group inline-flex items-center space-x-2 font-bold text-lg tracking-wide text-gray-700 hover:text-indigo-600 active:text-gray-700 dark:font-semibold dark:text-gray-200 dark:hover:text-indigo-400 dark:active:text-gray-200"
                >
                  <svg
                    className="hi-mini hi-cube-transparent inline-block w-5 h-5 text-indigo-600 transition group-hover:scale-110 dark:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.638 1.093a.75.75 0 01.724 0l2 1.104a.75.75 0 11-.724 1.313L10 2.607l-1.638.903a.75.75 0 11-.724-1.313l2-1.104zM5.403 4.287a.75.75 0 01-.295 1.019l-.805.444.805.444a.75.75 0 01-.724 1.314L3.5 7.02v.73a.75.75 0 01-1.5 0v-2a.75.75 0 01.388-.657l1.996-1.1a.75.75 0 011.019.294zm9.194 0a.75.75 0 011.02-.295l1.995 1.101A.75.75 0 0118 5.75v2a.75.75 0 01-1.5 0v-.73l-.884.488a.75.75 0 11-.724-1.314l.806-.444-.806-.444a.75.75 0 01-.295-1.02zM7.343 8.284a.75.75 0 011.02-.294L10 8.893l1.638-.903a.75.75 0 11.724 1.313l-1.612.89v1.557a.75.75 0 01-1.5 0v-1.557l-1.612-.89a.75.75 0 01-.295-1.019zM2.75 11.5a.75.75 0 01.75.75v1.557l1.608.887a.75.75 0 01-.724 1.314l-1.996-1.101A.75.75 0 012 14.25v-2a.75.75 0 01.75-.75zm14.5 0a.75.75 0 01.75.75v2a.75.75 0 01-.388.657l-1.996 1.1a.75.75 0 11-.724-1.313l1.608-.887V12.25a.75.75 0 01.75-.75zm-7.25 4a.75.75 0 01.75.75v.73l.888-.49a.75.75 0 01.724 1.313l-2 1.104a.75.75 0 01-.724 0l-2-1.104a.75.75 0 11.724-1.313l.888.49v-.73a.75.75 0 01.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Quizzy</span>
                </Link>
                {/* END Logo */}
              </div>
              {/* END Left Section */}

              {/* Right Section */}
              <div className="flex items-center space-x-2 lg:space-x-5">
                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-2">
                  <Link
                    href={"/"}
                    className={`group text-sm font-semibold flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-800 border border-transparent hover:text-indigo-600 hover:bg-indigo-50 active:border-indigo-100 dark:text-gray-100 dark:hover:text-indigo-100 dark:hover:bg-indigo-500 dark:hover:bg-opacity-20 dark:active:border-indigo-500 dark:active:border-opacity-25 ${
                      router.pathname === "/"
                        ? "bg-indigo-50 text-indigo-600"
                        : ""
                    }`}
                  >
                    <svg
                      className={`inline-block w-5 h-5 ${
                        router.pathname === "/"
                          ? "opacity-100"
                          : "opacity-25 group-hover:opacity-100"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Home</span>
                  </Link>
                  <Link
                    href={"/quiz"}
                    className={`group text-sm font-semibold flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-800 border border-transparent hover:text-indigo-600 hover:bg-indigo-50 active:border-indigo-100 dark:text-gray-100 dark:hover:text-indigo-100 dark:hover:bg-indigo-500 dark:hover:bg-opacity-20 dark:active:border-indigo-500 dark:active:border-opacity-25 ${
                      router.pathname === "/quiz"
                        ? "bg-indigo-50 text-indigo-600"
                        : ""
                    }`}
                  >
                    <MdQuiz
                      className={`text-xl ${
                        router.pathname === "/quiz"
                          ? "opacity-100"
                          : "opacity-25 group-hover:opacity-100"
                      }`}
                    />
                    <span>Quizes</span>
                  </Link>
                  <Link
                    href={"/about"}
                    className={`group text-sm font-semibold flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-800 border border-transparent hover:text-indigo-600 hover:bg-indigo-50 active:border-indigo-100 dark:text-gray-100 dark:hover:text-indigo-100 dark:hover:bg-indigo-500 dark:hover:bg-opacity-20 dark:active:border-indigo-500 dark:active:border-opacity-25 ${
                      router.pathname === "/about"
                        ? "bg-indigo-50 text-indigo-600"
                        : ""
                    }`}
                  >
                    <BsInfoCircleFill
                      className={`text-xl ${
                        router.pathname === "/about"
                          ? "opacity-100"
                          : "opacity-25 group-hover:opacity-100"
                      }`}
                    />
                    <span>About Us</span>
                  </Link>
                </nav>
                {/* END Desktop Navigation */}

                {/* User Dropdown */}
                {user.token && (
                  <Menu as="div" className="relative inline-block">
                    {/* Dropdown Toggle Button */}
                    <Menu.Button className="inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-3 py-2 leading-5 text-sm border-indigo-200 bg-white text-indigo-800 hover:border-indigo-300 hover:text-indigo-900 hover:shadow-sm focus:ring focus:ring-indigo-300 focus:ring-opacity-25 active:border-indigo-200 active:shadow-none dark:border-indigo-700 dark:bg-indigo-800 dark:text-indigo-300 dark:hover:border-indigo-600 dark:hover:text-indigo-200 dark:focus:ring-indigo-600 dark:focus:ring-opacity-40 dark:active:border-indigo-700">
                      <span>{ user.isCreator ? userData.creatorId : userData.name}</span>
                      <svg
                        className="hi-mini hi-chevron-down inline-block w-5 h-5 opacity-40"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Menu.Button>
                    {/* END Dropdown Toggle Button */}

                    {/* Dropdown */}
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="opacity-0 scale-90"
                      enterTo="opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-90"
                    >
                      <Menu.Items className="absolute right-0 origin-top-right mt-2 w-48 shadow-xl rounded-lg dark:shadow-gray-900 focus:outline-none">
                        <div className="bg-white ring-1 ring-black ring-opacity-5 rounded-lg divide-y divide-gray-100 dark:bg-gray-800 dark:divide-gray-700 dark:ring-gray-700">
                          <div className="p-2.5 space-y-1">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href={"/accounts/profile"}
                                  className={`group text-sm font-medium flex items-center justify-between space-x-2 px-2.5 py-2 rounded-lg border border-transparent ${
                                    active
                                      ? "text-indigo-800 bg-indigo-50 border-indigo-100 dark:text-indigo-100 dark:bg-indigo-500  dark:border-indigo-500 dark:border-opacity-25"
                                      : "hover:text-indigo-800 hover:bg-indigo-50 active:border-indigo-100 dark:text-gray-300 dark:hover:text-indigo-100 dark:hover:bg-indigo-500 dark:hover:bg-opacity-20 dark:active:border-indigo-500 dark:active:border-opacity-25"
                                  }`}
                                >
                                  <CgProfile className="flex-none hi-mini inline-block w-5 h-5 opacity-25 group-hover:opacity-50" />
                                  <span className="grow">Profile</span>
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href={"/accounts/solved-quizes"}
                                  className={`group text-sm font-medium flex items-center justify-between space-x-2 px-2.5 py-2 rounded-lg border border-transparent ${
                                    active
                                      ? "text-indigo-800 bg-indigo-50 border-indigo-100 dark:text-indigo-100 dark:bg-indigo-500 dark:bg-opacity-20 dark:border-indigo-500 dark:border-opacity-25"
                                      : "hover:text-indigo-800 hover:bg-indigo-50 active:border-indigo-100 dark:text-gray-300 dark:hover:text-indigo-100 dark:hover:bg-indigo-500 dark:hover:bg-opacity-20 dark:active:border-indigo-500 dark:active:border-opacity-25"
                                  }`}
                                >
                                  <AiOutlineSolution className="flex-none hi-mini inline-block w-5 h-5 opacity-25 group-hover:opacity-50" />
                                  <span className="grow">Your Solutions</span>
                                </Link>
                              )}
                            </Menu.Item>
                          </div>
                          {user.isCreator && (
                            <div className="p-2.5 space-y-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    href={"/accounts/quizes"}
                                    className={`group text-sm font-medium flex items-center justify-between space-x-2 px-2.5 py-2 rounded-lg border border-transparent ${
                                      active
                                        ? "text-indigo-800 bg-indigo-50 border-indigo-100 dark:text-indigo-100 dark:bg-indigo-500 dark:bg-opacity-20 dark:border-indigo-500 dark:border-opacity-25"
                                        : "hover:text-indigo-800 hover:bg-indigo-50 active:border-indigo-100 dark:text-gray-300 dark:hover:text-indigo-100 dark:hover:bg-indigo-500 dark:hover:bg-opacity-20 dark:active:border-indigo-500 dark:active:border-opacity-25"
                                    }`}
                                  >
                                    <MdQuiz className="flex-none hi-mini inline-block w-5 h-5 opacity-25 group-hover:opacity-50" />
                                    <span className="grow">Your Quizes</span>
                                  </Link>
                                )}
                              </Menu.Item>
                            </div>
                          )}
                          <div className="p-2.5 space-y-1">
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  onClick={logout}
                                  className={`w-full group text-sm font-medium flex items-center justify-between space-x-2 px-2.5 py-2 rounded-lg border border-transparent ${
                                    active
                                      ? "text-indigo-800 bg-indigo-50 border-indigo-100 dark:text-indigo-100 dark:bg-indigo-500 dark:bg-opacity-20 dark:border-indigo-500 dark:border-opacity-25"
                                      : "hover:text-indigo-800 hover:bg-indigo-50 active:border-indigo-100 dark:text-gray-300 dark:hover:text-indigo-100 dark:hover:bg-indigo-500 dark:hover:bg-opacity-20 dark:active:border-indigo-500 dark:active:border-opacity-25"
                                  }`}
                                >
                                  <svg
                                    className="flex-none hi-mini hi-lock-closed inline-block w-5 h-5 opacity-25 group-hover:opacity-50"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span className="grow">Log out</span>
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                        </div>
                      </Menu.Items>
                    </Transition>
                    {/* END Dropdown */}
                  </Menu>
                )}
                {/* END User Dropdown */}

                {!user.token && (
                  <div className="space-x-2 hidden lg:block">
                    <Link
                      href={"/auth/signup"}
                      className={`text-sm font-semibold px-3 py-2 rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 border border-transparent`}
                    >
                      <span>Sign Up</span>
                    </Link>
                    <Link
                      href={"/auth/login"}
                      className={`text-sm font-semibold px-3 py-2 rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 border border-transparent`}
                    >
                      <span>Log In</span>
                    </Link>
                  </div>
                )}

                {/* Toggle Mobile Navigation */}
                <div className="lg:hidden">
                  <button
                    onClick={() => setMobileNavOpen(!mobileNavOpen)}
                    type="button"
                    className="inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-3 py-2 leading-5 text-sm border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      className="hi-solid hi-menu inline-block w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                {/* END Toggle Mobile Navigation */}
              </div>
              {/* END Right Section */}
            </div>

            {/* Mobile Navigation */}
            <div className={`lg:hidden ${mobileNavOpen ? "" : "hidden"}`}>
              <nav className="flex flex-col space-y-2 py-4 border-t dark:border-gray-700">
                <Link
                  href={"/"}
                  className={`group text-sm font-semibold flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-800 border border-transparent hover:text-indigo-600 hover:bg-indigo-50 active:border-indigo-100 dark:text-gray-100 dark:hover:text-indigo-100 dark:hover:bg-indigo-500 dark:hover:bg-opacity-20 dark:active:border-indigo-500 dark:active:border-opacity-25 ${
                    router.pathname === "/"
                      ? "bg-indigo-50 text-indigo-600"
                      : ""
                  }`}
                >
                  <svg
                    className={`inline-block w-5 h-5 ${
                      router.pathname === "/"
                        ? "opacity-100"
                        : "opacity-25 group-hover:opacity-100"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Home</span>
                </Link>
                <Link
                  href={"/quiz"}
                  className={`group text-sm font-semibold flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-800 border border-transparent hover:text-indigo-600 hover:bg-indigo-50 active:border-indigo-100 dark:text-gray-100 dark:hover:text-indigo-100 dark:hover:bg-indigo-500 dark:hover:bg-opacity-20 dark:active:border-indigo-500 dark:active:border-opacity-25 ${
                    router.pathname === "/quiz"
                      ? "bg-indigo-50 text-indigo-600"
                      : ""
                  }`}
                >
                  <MdQuiz
                    className={`text-xl ${
                      router.pathname === "/quiz"
                        ? "opacity-100"
                        : "opacity-25 group-hover:opacity-100"
                    }`}
                  />
                  <span>Quizes</span>
                </Link>
                <Link
                  href={"/about"}
                  className={`group text-sm font-semibold flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-800 border border-transparent hover:text-indigo-600 hover:bg-indigo-50 active:border-indigo-100 dark:text-gray-100 dark:hover:text-indigo-100 dark:hover:bg-indigo-500 dark:hover:bg-opacity-20 dark:active:border-indigo-500 dark:active:border-opacity-25 ${
                    router.pathname === "/about"
                      ? "bg-indigo-50 text-indigo-600"
                      : ""
                  }`}
                >
                  <BsInfoCircleFill
                    className={`text-xl ${
                      router.pathname === "/about"
                        ? "opacity-100"
                        : "opacity-25 group-hover:opacity-100"
                    }`}
                  />
                  <span>About Us</span>
                </Link>

                {!user.token && (
                  <div className="space-x-2 px-3 mt-2">
                    <Link
                      href={"/auth/signup"}
                      className={`text-sm font-semibold px-3 py-2 rounded-lg text-white bg-indigo-500 border border-transparent`}
                    >
                      <span>Sign Up</span>
                    </Link>
                    <Link
                      href={"/auth/login"}
                      className={`text-sm font-semibold px-3 py-2 rounded-lg text-white bg-indigo-500 border border-transparent`}
                    >
                      <span>Log In</span>
                    </Link>
                  </div>
                )}

              </nav>
            </div>
            {/* END Mobile Navigation */}
          </div>
        </header>
        {/* END Page Header */}
      </div>
      {/* END Page Container */}
    </>
  );
};

export default Navbar;
