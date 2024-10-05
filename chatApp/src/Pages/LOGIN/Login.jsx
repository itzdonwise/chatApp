import { useState } from 'react';
import { FaUser, FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signup, login } from '../../Config/Firebase';
// import { useNavigate } from "react-router-dom";


export const Login = () => {

  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  const getSchema = (currstate) => {
    return currstate === "sign up"
      ? yup.object().shape({
          username: yup.string().required("Username is required"),
          email: yup.string().email("Enter a correct email address").required("Email is required"),
          password: yup.string().min(4, "Password must be at least 4 characters").max(19, "Password must be less than 19 characters").required("Password is required"),
          confirmpassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
          agree: yup.bool().oneOf([true], "You must accept terms of use")
        })
      : yup.object().shape({
          email: yup.string().email("Enter a correct email address").required("Email is required"),
          password: yup.string().min(6, "Password must be at least 6 characters").max(19, "Password must be less than 19 characters").required("Password is required"),
        });
  };

  const [currstate, setCurrstate] = useState("sign up");
  const [passwordvisible, setPasswordvisible] = useState(false);
  const [confirmpasswordvisible, setConfirmPasswordvisible] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(getSchema(currstate))
  });

  const TogglepasswordVisibility = () => {
    setPasswordvisible(!passwordvisible);
  };

  const onSubmit = async (data) => {
    const { username, email, password } = data;
    setLoading(true);

    if (currstate === "sign up") {
      const success = await signup(username, email, password);
      if (success) setCurrstate('login');
      reset();
    } else {
      await login(email, password);
      // const success = await login(email, password);
      // if (success) navigate("/chat");
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-600 via-blue-500 to-blue-400 p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
          <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">{currstate === "sign up" ? "Sign Up" : "Login"}</h1>

          {currstate === 'sign up' && (
            <div className="relative mb-4">
              <input 
                type="text" 
                placeholder="Username" 
                className="w-full p-3 focus:outline-none border border-gray-300 rounded-lg focus:border-blue-500"
                {...register("username")}  
                disabled={loading}
              />
              <FaUser className="absolute right-4 top-4 text-gray-400" />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
            </div>
          )}

          <div className="relative mb-4">
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full p-3 focus:outline-none border border-gray-300 rounded-lg focus:border-blue-500" 
              {...register("email")} 
              disabled={loading}
            />
            <FaEnvelope className="absolute right-4 top-4 text-gray-400" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="relative mb-4">
            <input 
              type={passwordvisible ? "text" : "password"} 
              placeholder="Password" 
              className="w-full p-3 focus:outline-none border border-gray-300 rounded-lg focus:border-blue-500" 
              {...register("password")}  
              // disabled={loading}
            />
            <span className="absolute right-4 top-4 text-gray-400 cursor-pointer" onClick={TogglepasswordVisibility}>
              {passwordvisible ? <FaEye /> : <FaEyeSlash />}
            </span>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {currstate === "sign up" && (
            <div className="relative mb-4">
              <input 
                type={confirmpasswordvisible ? "text" : "password"} 
                placeholder="Confirm Password" 
                className="w-full p-3 focus:outline-none border border-gray-300 rounded-lg focus:border-blue-500" 
                {...register("confirmpassword")} 
                disabled={loading}
              />
              <span className="absolute right-4 top-4 text-gray-400 cursor-pointer" onClick={() => setConfirmPasswordvisible(!confirmpasswordvisible)}>
                {confirmpasswordvisible ? <FaEye /> : <FaEyeSlash />}
              </span>
              {errors.confirmpassword && <p className="text-red-500 text-sm mt-1">{errors.confirmpassword.message}</p>}
            </div>
          )}

          {currstate === "sign up" && (
            <div className="flex items-center mb-4">
              <input type="checkbox" className="w-4 h-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded" {...register("agree")}  disabled={loading}
               />
              <label className="ml-2 text-sm text-gray-600">Agree to terms of use & privacy policy</label>
            </div>
          )}
          {errors.agree && <p className="text-red-500 text-sm mb-4">{errors.agree.message}</p>}

          <button type="submit" className="w-full bg-blue-500 text-white text-lg py-2 rounded-lg transition duration-300 hover:bg-blue-600">
            {loading ? "Processing..." : currstate === "sign up" ? 'Create Account' : "Login Now"}
          </button>

          <p className="text-center mt-4 text-gray-600">
            {currstate === "sign up" ? "Already have an account?" : "Create an account"}
            <span 
              onClick={() => setCurrstate(currstate === "sign up" ? 'login' : 'sign up')} 
              className="text-blue-500 font-semibold cursor-pointer ml-1">
              {currstate === "sign up" ? "Login" : "Sign Up"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};
