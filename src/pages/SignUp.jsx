import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { displayToastError, displayToastSuccess } from "../utils/toasts";
import { validateEmail, validatePassword } from "../utils/validations";
import { signUp } from "../utils/api";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formdata, setFormdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call for email validation
    if (!validateEmail(formdata.email)) {
      return displayToastError("Please enter a valid email.");
    }

    // Call for password validation
    const passwordError = validatePassword(formdata.password);
    if (passwordError) {
      return displayToastError(passwordError);
    }

    try {
      const res = await signUp(formdata);

      const data = await res.json();

      if (res.ok) {
        displayToastSuccess(data.message);
        navigate("/sign-in");
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
          <h1 className="text-2xl font-semibold pb-2 text-center">Welcome</h1>
          <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label htmlFor="firstName">First Name</label>
              <input
                className="border rounded px-4 py-2 w-full"
                type="firstName"
                name="firstName"
                id="firstName"
                required
                onChange={(e) => {
                  setFormdata({ ...formdata, firstName: e.target.value });
                }}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="lastName">Last Name</label>
              <input
                className="border rounded px-4 py-2 w-full"
                type="lastName"
                name="lastName"
                id="lastName"
                required
                onChange={(e) => {
                  setFormdata({ ...formdata, lastName: e.target.value });
                }}
              />
            </div>

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
              Create account
            </button>
          </form>
          <div className="pt-1">
            <p className="text-sm">
              Already have an account?
              <Link
                to="/sign-in"
                className="text-indigo-500 ms-1 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
