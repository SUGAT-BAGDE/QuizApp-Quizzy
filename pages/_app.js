import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }) {

  const initialUserState = { token: null, isCreator: false }

  const [user, setUser] = useState(initialUserState);
  const [progress, setProgress] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [userData, setUserData] = useState({})
  const [key, setKey] = useState(0)
  
  const router = useRouter();

  /**
   * The function verifies a user's token by making a fetch request to an API endpoint and updating the
   * user's information based on the response.
   * @param token - The token parameter is a string that represents the authentication (jwt) token of a user.
   * It is used to verify the user's identity and access to certain resources on the server.
   */
  const verifyUser = (token) => {
    if (token) {
      fetch("/api/auth/verify-user", {
        headers: { "xx-login-token": token },
      })
        .then((a) => {
          a.json().then((response) => {
            if (response.status == "available") {
              setUser({ token: token, isCreator: response.isCreator });
              delete response.status;
              setUserData(response)
              setLoaded(true)
              setKey(Math.random())
              return;
            } else if (response.status == "unavailable") {
              toast.error("Please log into your account", {
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
              });
              setUser({ token: null });
              setLoaded(true)
            } else if (response.status == "expired") {
              toast.error("Please log again your account", {
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
              });
              setLoaded(true)
              setUser({ token: null });
            }
          });
        })
        .catch((e) => console.log(e));
    }
    else setLoaded(true)
  };

  useEffect(() => {
    /* This code is setting up event listeners for the Next.js router. Specifically, it is listening
    for the "routeChangeComplete" and "routeChangeStart" events. */
    router.events.on("routeChangeComplete", () => {
      setProgress(100)
    })
    router.events.on("routeChangeStart", () => {
      setProgress(40)
    })
    const token = localStorage.getItem("token");
    setUser({ token: token, isCreator : false });
    verifyUser(token);
  }, []);

  /**
   * The function logs in a user by setting their token in local storage, setting the user's token,
   * verifying the user's token, and navigating back to the previous page.
   * @param token - The `token` parameter is a string that represents a user's jwt authentication token. It
   * is used to authenticate the user and grant them access to certain parts of the application. The
   * `login` function takes this token as an argument and stores it in the browser's local storage,
   * sets the user's token
   */
  const login = (token) => {
    localStorage.setItem("token", token);
    setUser({ token: token });
    verifyUser(token)
    router.back();
    setKey(Math.random())
  };

  const logout = () => {
    localStorage.removeItem('token')
    setUser(initialUserState)
    setKey(Math.random)
  }

  return (
    /* This is the main component of the Next.js application. It includes a loading bar component from
    the "react-top-loading-bar" library, which displays a loading bar at the top of the page when
    the page is loading or when a new page is being navigated to. The loading bar's progress is
    determined by the `progress` state variable, which is updated using the `setProgress` function.
    The `onLoaderFinished` function is called when the loading bar has finished loading, and it sets
    the `progress` state variable back to 0. */
    <>
      <LoadingBar progress={progress} onLoaderFinished={() => setProgress(0)} waitingTime={400} color="#4f46e5"/>
      <ToastContainer position={toast.POSITION.TOP_LEFT}/>  

      <Navbar user={user} userData={userData} key={key} logout={logout}/>
      <Component {...pageProps} login={login} user={user} loaded={loaded} verifyUser={verifyUser} userData={userData}/>
    </>
  );
}
