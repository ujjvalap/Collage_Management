// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { FiLogIn } from "react-icons/fi";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import { baseApiURL } from "../baseUrl";
// const Login = () => {
//   const navigate = useNavigate();
//   const [selected, setSelected] = useState("Student");
//   const { register, handleSubmit } = useForm();
//   const onSubmit = (data) => {
//     if (data.login !== "" && data.password !== "") {
//       const headers = {
//         "Content-Type": "application/json",
//       };
//       axios
//         .post(`${baseApiURL()}/${selected.toLowerCase()}/auth/login`, data, {
//           headers: headers,
//         })
//         .then((response) => {
//           navigate(`/${selected.toLowerCase()}`, {
//             state: { type: selected, loginid: response.data.loginid },
//           });
//         })
//         .catch((error) => {
//           toast.dismiss();
//           console.error(error);
//           toast.error(error.response.data.message);
//         });
//     } else {
//     }
//   };
//   return (
//     <div className="bg-white h-[100vh] w-full flex justify-between items-center">
//       <img
//         className="w-[60%] h-[100vh] object-cover"
//         src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         alt=""
//       />
//       <div className="w-[40%] flex justify-center items-start flex-col pl-8">
//         <p className="text-3xl font-semibold pb-2 border-b-2 border-green-500">
//           {selected && selected} Login
//         </p>
//         <form
//           className="flex justify-center items-start flex-col w-full mt-10"
//           onSubmit={handleSubmit(onSubmit)}
//         >
//           <div className="flex flex-col w-[70%]">
//             <label className="mb-1" htmlFor="eno">
//               {selected && selected} Login ID
//             </label>
//             <input
//               type="number"
//               id="eno"
//               required
//               className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"
//               {...register("loginid")}
//             />
//           </div>
//           <div className="flex flex-col w-[70%] mt-3">
//             <label className="mb-1" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               required
//               className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"
//               {...register("password")}
//             />
//           </div>
//           {/* <div className="flex w-[70%] mt-3 justify-start items-center">
//             <input type="checkbox" id="remember" className="accent-blue-500" />{" "}
//             Remember Me
//           </div> */}
//           <button className="bg-blue-500 mt-5 text-white px-6 py-2 text-xl rounded-md hover:bg-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all flex justify-center items-center">
//             Login
//             <span className="ml-2">
//               <FiLogIn />
//             </span>
//           </button>
//         </form>
//       </div>
//       <div className="absolute top-4 right-4">
//         <button
//           className={`text-blue-500 mr-6 text-base font-semibold hover:text-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
//             selected === "Student" && "border-b-2 border-green-500"
//           }`}
//           onClick={() => setSelected("Student")}
//         >
//           Student
//         </button>
//         <button
//           className={`text-blue-500 mr-6 text-base font-semibold hover:text-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
//             selected === "Faculty" && "border-b-2 border-green-500"
//           }`}
//           onClick={() => setSelected("Faculty")}
//         >
//           Faculty
//         </button>
//         <button
//           className={`text-blue-500 mr-6 text-base font-semibold hover:text-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
//             selected === "Admin" && "border-b-2 border-green-500"
//           }`}
//           onClick={() => setSelected("Admin")}
//         >
//           Admin
//         </button>
//       </div>
//       <Toaster position="bottom-center" />
//     </div>
//   );
// };

// export default Login;




//new 
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { baseApiURL } from "../baseUrl";

const Login = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Student");
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and registration
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (data.loginid !== "" && data.password !== "") {
      const headers = {
        "Content-Type": "application/json",
      };

      // Use different URL based on login or registration
      const apiURL = isRegistering
        ? `${baseApiURL()}/${selected.toLowerCase()}/auth/register`
        : `${baseApiURL()}/${selected.toLowerCase()}/auth/login`;

      axios
        .post(apiURL, data, { headers })
        .then((response) => {
          if (!isRegistering) {
            // On successful login, navigate to the user's dashboard
            navigate(`/${selected.toLowerCase()}`, {
              state: { type: selected, loginid: response.data.loginid },
            });
          } else {
            // On successful registration, show a success message and toggle to login page
            toast.success("Registration successful! Please login.");
            setIsRegistering(false);
          }
        })
        .catch((error) => {
          toast.dismiss();
          console.error(error);
          toast.error(error.response?.data?.message || "An error occurred.");
        });
    } else {
      toast.error("Please fill in all fields.");
    }
  };

  return (
    <div className="bg-white h-[100vh] w-full flex justify-between items-center">
      {/* Background Image with White Frame */}
      <div className="w-[60%] h-[80vh] border-8 border-white">
        <img
          className="w-full h-full object-contain"
          src="https://i.pinimg.com/736x/fa/38/26/fa3826a93d0e347fcaef5c53d7c8f168.jpg"
          alt="Background"
        />
      </div>

      {/* Login and Registration Form */}
      <div className="w-[40%] flex justify-center items-start flex-col pl-8 mt-16">
        <p className="text-3xl font-semibold pb-2 border-b-2 border-green-500 text-black">
          {selected} {isRegistering ? "Registration" : "Login"}
        </p>
        <form
          className="flex justify-center items-start flex-col w-full mt-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          {isRegistering && (
            <>
              <div className="flex flex-col w-[70%]">
                <label className="mb-1 text-black" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  required
                  className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"
                  {...register("firstName")}
                />
              </div>
              <div className="flex flex-col w-[70%] mt-3">
                <label className="mb-1 text-black" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  required
                  className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"
                  {...register("lastName")}
                />
              </div>
            </>
          )}
          <div className="flex flex-col w-[70%] mt-3">
            <label className="mb-1 text-black" htmlFor="loginid">
              {selected} Login ID
            </label>
            <input
              type="text"
              id="loginid"
              required
              className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"
              {...register("loginid")}
            />
          </div>
          <div className="flex flex-col w-[70%] mt-3">
            <label className="mb-1 text-black" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"
              {...register("password")}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 mt-5 text-white px-6 py-2 text-xl rounded-md hover:bg-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all flex justify-center items-center"
          >
            {isRegistering ? "Register" : "Login"}
            <span className="ml-2">
              {isRegistering ? <FiUserPlus /> : <FiLogIn />}
            </span>
          </button>
        </form>
        <p
          className="text-blue-500 mt-4 text-center cursor-pointer"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering
            ? "Already have an account? Login here."
            : "Don't have an account? Register here."}
        </p>
      </div>

      {/* User Type Selection (Student, Faculty, Admin) */}
      <div className="absolute top-4 right-4">
        <button
          className={`text-blue-500 mr-6 text-base font-semibold hover:text-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${selected === "Student" && "border-b-2 border-green-500"}`}
          onClick={() => setSelected("Student")}
        >
          Student
        </button>
        <button
          className={`text-blue-500 mr-6 text-base font-semibold hover:text-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${selected === "Faculty" && "border-b-2 border-green-500"}`}
          onClick={() => setSelected("Faculty")}
        >
          Faculty
        </button>
        <button
          className={`text-blue-500 mr-6 text-base font-semibold hover:text-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${selected === "Admin" && "border-b-2 border-green-500"}`}
          onClick={() => setSelected("Admin")}
        >
          Admin
        </button>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Login;