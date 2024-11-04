import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import auth from "../../Firebase Auth/firebaseAuth.init";
import { useRef, useState } from "react";

const Login = () => {

  const [sucessMessage, setSucessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [displayPass, setDisplayPass] = useState(false)
  const emailRef = useRef(null)



  const handleLogIn = (e) => {
    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email)
    console.log(password)

    setErrorMessage('');
    setSucessMessage('')


    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user)
        setSucessMessage('Sucessfully Login!')
      })
      .catch(error => {
        console.error("error from: ", error)
        setErrorMessage('Wrong, Credential! Please try Again!')
      })
  }




  const handleForgetPass = () => {

    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const email = emailRef.current.value;

    setErrorMessage('')
    setSucessMessage('')

    if (!email) {
      setErrorMessage('Please type a your Email Address!')
      return;
    }else if(!emailRegex.test(email)){
      setErrorMessage("Please Type a Valid Email Address")
      return;
    }


    sendPasswordResetEmail(auth, email)
    .then(result => {
      console.log(result)
      setSucessMessage('Password reset email sent!');
    })
    .catch(error=> {
      console.error(error)
      setErrorMessage('Password Reset Email not sent!')
    })

  }


  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">

          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Sign in</h2>
            <form onSubmit={handleLogIn} className="mt-8 space-y-4">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email Address</label>
                <div className="relative flex items-center">
                  <input ref={emailRef} name="email" type="email" required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Email Address" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={
                      displayPass ? 'text' : 'password'
                    }
                    required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter password" />

                  {
                    displayPass ?
                      <svg
                        onClick={() => setDisplayPass(!displayPass)}
                        xmlns="http://www.w3.org/2000/svg" height="24px" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 -960 960 960" width="24px" fill="#bbb" stroke="#bbb"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" /></svg> :


                      <svg
                        onClick={() => setDisplayPass(!displayPass)}
                        xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                        <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                      </svg>
                  }
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <span
                    onClick={handleForgetPass}
                    className="text-blue-600 hover:underline font-semibold cursor-pointer">
                    Forgot your password?
                  </span>
                </div>
              </div>

              <div className="!mt-8">
                <button type="submit" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                  Sign in
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">Dont have an account? <Link to={'/signup'} className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">Register here</Link></p>
            </form>
          </div>
          <div>
            {
              sucessMessage && (
                <p>{sucessMessage}</p>
              )
            }
            {
              errorMessage && (
                <p>{errorMessage}</p>
              )
            }
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;