import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../components/Firebase Auth/firebaseAuth.init";
import { useState } from "react";

const Signup = () => {
    const [displayError, setDisplayError] = useState('')
    const [displaySucess, setDisplaySucess] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleLogIn = (e) => {
        e.preventDefault();
        const fullName = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accetpTerms = e.target.terms.checked;

        console.log(fullName)
        setDisplaySucess('')
        setDisplayError('')

        const regex = /[A-Z]/
        const regexTwo = /[0-9]/

        if (password.length < 8) {
            setDisplayError("Please Type a Password at list 8 letter!")
            return;

        } else if (!regex.test(password)) {
            setDisplayError("Please Type a UpperCase Letter!")
            return;
        } else if (!regexTwo.test(password)) {
            setDisplayError("Please Type a one Number!");
            return;
        } else if (accetpTerms !== true) {
            setDisplayError("Please Accept Our Terms and Condition");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password, accetpTerms)
            .then(userCredential => {
                const user = userCredential.user;
                console.log(user)
                setDisplaySucess("Sucessfully Submited!")

                //Update Profile
                updateProfile(user, {
                    displayName: fullName,
                    photoURL: 'https://lh3.googleusercontent.com/a/ACg8ocKdUDNDpk2RxF0u4xNY9VqU4FGZcqwylM2V6kd28cTBp3lDrq0m=s96-c-rg-br100'
                })
                .then(()=> console.log('Profile Updated'))
                .catch((error)=> console.error(error) )

                // Email send for Verification
                sendEmailVerification(userCredential.user)
                    .then(() => {
                        alert('Email verification sent!')
                    })

            })
            .catch(error => {
                const errorMessgae = error.message;
                setDisplayError(errorMessgae)
            })
    }


    /*    const handleShowPass = () => {
           setShowPassword(true)
          
       }
    */

    return (
        <div className="bg-gray-50 font-[sans-serif]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-md w-full">


                    <div className="p-8 rounded-2xl bg-white shadow">
                        <h2 className="text-gray-800 text-center text-2xl font-bold">Sign Up</h2>
                        <form onSubmit={handleLogIn} className="mt-8 space-y-4">
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Your Name</label>
                                <div className="relative flex items-center">
                                    <input name="name" type="name" required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Your Full Name" />

                                    <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" /></svg>

                                    {/*   <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                                        <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                        <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                                    </svg> */}
                                </div>
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Email Address</label>
                                <div className="relative flex items-center">
                                    <input name="email" type="email" required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Email Address" />
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
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter password" />

                                    {
                                        showPassword ?
                                            <svg
                                                onClick={() => setShowPassword(!showPassword)}
                                                xmlns="http://www.w3.org/2000/svg" height="24px" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 -960 960 960" width="24px" fill="#bbb" stroke="#bbb"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" /></svg> :

                                            <svg
                                                onClick={() => setShowPassword(!showPassword)}
                                                xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                                <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                            </svg>
                                    }
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input id="termsAndCondition" name="terms" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                <label htmlFor="termsAndCondition" className="ml-3 block text-sm text-gray-800">
                                    Accepts Our Terms and Condition
                                </label>
                            </div>

                            <div className="!mt-8">
                                <button type="submit" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                    Sign up
                                </button>
                            </div>

                        </form>
                    </div>
                    <div className="mt-5 mx-auto my-0">
                        {
                            displayError && (
                                <p className="text-red-700">{displayError}</p>
                            )
                        }
                        {
                            displaySucess && (
                                <p className="text-green-700">{displaySucess}</p>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>

    );
};

export default Signup;