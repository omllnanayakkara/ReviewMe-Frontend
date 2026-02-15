import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../utils/api";
import { displayToastError, displayToastSuccess } from "../utils/toasts";
import { removeCurrentUser } from "../state/user/userSlics";
import { MdLogout } from "react-icons/md";

const NavBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      const res = await signOut();
      const data = await res.json();
      if (res.ok) {
        displayToastSuccess(data.message);
        dispatch(removeCurrentUser());
        navigate("/sign-in");
      } else {
        displayToastError(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav>
      <div className="w-full p-5">
        <div className="flex justify-between items-center md:max-w-7xl m-auto px-5">
          <Link to={"/"}>
            <h1 className="text-2xl md:text-4xl font-bold">
              Review<span className="text-indigo-500">Me</span>
            </h1>
          </Link>
          <div>
            {currentUser ? (
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-2.5 rounded-lg">
                  {currentUser.firstName.charAt(0)}
                  {currentUser.lastName.charAt(0)}
                </div>
                <button
                  className="hidden md:block py-2 px-6 border border-indigo-500 hover:bg-indigo-600 text-indigo-500 hover:text-white rounded transition-all"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
                <button
                  className=" md:hidden p-3 border border-indigo-500 hover:bg-indigo-600 text-indigo-500 hover:text-white rounded transition-all"
                  onClick={handleSignOut}
                >
                  <MdLogout />
                </button>
              </div>
            ) : (
              <Link to={"/sign-in"}>
                <button className="py-2 px-6 bg-indigo-500 hover:bg-indigo-600 text-white rounded transition-all">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
