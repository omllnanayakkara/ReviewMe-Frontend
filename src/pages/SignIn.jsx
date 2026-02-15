import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { displayToastError, displayToastSuccess } from "../utils/toasts";
import { validateEmail } from "../utils/validations";
import { signIn } from "../utils/api";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../state/user/userSlics";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formdata.email)) {
      return displayToastError("Please enter a valid email.");
    }

    try {
      const res = await signIn(formdata);

      const data = await res.json();

      if (res.ok) {
        displayToastSuccess(data.message);
        dispatch(setCurrentUser(data.data));
        console.log(data.data);
        navigate("/");
      } else {
        displayToastError(data.message);
      }
    } catch (error) {
      displayToastError(error.message);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="p-6 border rounded-lg space-y-2">
          <h1 className="text-2xl font-semibold pb-2 text-center">Sign In</h1>
          <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label htmlFor="email">Email</label>
              <input
                className="border rounded px-4 py-2 w-full"
                type="email"
                name="email"
                id="email"
                required
                onChange={(e) => {
                  setFormdata({ ...formdata, email: e.target.value });
                }}
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label htmlFor="password">Password</label>
                <div className="text-indigo-500 flex">
                  {showPassword ? (
                    <FiEye
                      className="cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <FiEyeOff
                      className="cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
              </div>
              <input
                className="border rounded px-4 py-2 w-full"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                required
                onChange={(e) => {
                  setFormdata({ ...formdata, password: e.target.value });
                }}
              />
            </div>

            <button
              type="submit"
              className="mt-4 py-3 px-6 text-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded transition-all"
            >
              Log in
            </button>
          </form>
          <div className="pt-1">
            <p className="text-sm">
              Don&apos;t have an account?
              <Link
                to="/sign-up"
                className="text-indigo-500 ms-1 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
