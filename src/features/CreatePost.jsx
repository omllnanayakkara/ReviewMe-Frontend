import { HiOutlineUserCircle } from "react-icons/hi2";
import { FaStar } from "react-icons/fa6";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import { displayToastError, displayToastSuccess } from "../utils/toasts";
import { createReview } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setReviews } from "../state/review/reviewSlice";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [open, setOpen] = useState(false);
  const [selectedRate, setSelectedRate] = useState(0);
  const [formSubmitError, setFormSubmitError] = useState(null);
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const [formdata, setFormdata] = useState({
    title: "",
    author: "",
    rating: 0,
    reviewText: "",
  });

  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.review);

  const resetForm = () => {
    setFormdata({
      title: "",
      author: "",
      rating: 0,
      reviewText: "",
    });
    setSelectedRate(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formdata.rating === 0) {
      setFormSubmitError("Please rate the book");
      displayToastError(formSubmitError);
    }

    try {
      const res = await createReview(formdata);
      const data = await res.json();

      if (res.ok) {
        displayToastSuccess(data.message);
        dispatch(setReviews([data.data, ...reviews]));
        resetForm();
        setOpen(false);
      } else {
        displayToastError(data.message);
      }
    } catch (error) {
      displayToastError(error.message);
    }
  };

  useEffect(() => {
    setFormdata({ ...formdata, rating: selectedRate });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRate]);

  return (
    <div className="pb-5">
      <div className="md:max-w-5xl mx-auto">
        <div className="flex flex-col gap-5 p-5 border rounded">
          {currentUser ? (
            <div className="flex flex-col md:flex-row items-center justify-start gap-4 flex-1">
              <div className="bg-orange-100 p-3.5 rounded">
                {currentUser.firstName.charAt(0)}
                {currentUser.lastName.charAt(0)}
              </div>
              <div className="flex flex-col items-center md:items-start">
                <div className="text-sm">Welcome</div>
                <div className="text-lg font-medium">
                  {currentUser.firstName + " " + currentUser.lastName}
                </div>
                <div></div>
              </div>
            </div>
          ) : (
            <div className="self-center">
              <HiOutlineUserCircle color="gray" size={56} />
            </div>
          )}
          <button
            className="py-3 px-6 w-full bg-indigo-100 hover:bg-indigo-200 border border-indigo-300  text-gray rounded transition-all"
            onClick={() => setOpen(true)}
          >
            Write a Review...
          </button>
        </div>
      </div>

      {/* Create review popup */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <h1 className="text-2xl font-semibold mb-2">Create Review</h1>
        {currentUser ? (
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="border rounded px-4 py-2 w-full"
                id="title"
                placeholder="Book Title"
                value={formdata.title}
                onChange={(e) =>
                  setFormdata({ ...formdata, title: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="author">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="border rounded px-4 py-2 w-full"
                id="author"
                placeholder="Book Author"
                value={formdata.author}
                onChange={(e) =>
                  setFormdata({ ...formdata, author: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="reviewText">
                Rate <span className="text-red-500">*</span>
              </label>
              <div className="flex justify-between px-4">
                <FaStar
                  size={20}
                  className={
                    selectedRate >= 1
                      ? "text-indigo-500 cursor-pointer"
                      : `text-indigo-200 cursor-pointer`
                  }
                  onClick={() => setSelectedRate(1)}
                />
                <FaStar
                  size={20}
                  className={
                    selectedRate >= 2
                      ? "text-indigo-500 cursor-pointer"
                      : `text-indigo-200 cursor-pointer`
                  }
                  onClick={() => setSelectedRate(2)}
                />
                <FaStar
                  size={20}
                  className={
                    selectedRate >= 3
                      ? "text-indigo-500 cursor-pointer"
                      : `text-indigo-200 cursor-pointer`
                  }
                  onClick={() => setSelectedRate(3)}
                />
                <FaStar
                  size={20}
                  className={
                    selectedRate >= 4
                      ? "text-indigo-500 cursor-pointer"
                      : `text-indigo-200 cursor-pointer`
                  }
                  onClick={() => setSelectedRate(4)}
                />
                <FaStar
                  size={20}
                  className={
                    selectedRate >= 5
                      ? "text-indigo-500 cursor-pointer"
                      : `text-indigo-200 cursor-pointer`
                  }
                  onClick={() => setSelectedRate(5)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="reviewText">
                Add your review <span className="text-red-500">*</span>
              </label>
              <textarea
                type="text"
                className="border rounded px-4 py-2 w-full"
                id="reviewText"
                placeholder="write your review"
                value={formdata.reviewText}
                onChange={(e) =>
                  setFormdata({ ...formdata, reviewText: e.target.value })
                }
                required
                rows={5}
              />
            </div>
            <button
              type="submit"
              className="py-3 px-6 text-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded transition-all"
            >
              Publish
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="text-center">Please sign in to create a review</p>

            <button
              className="py-3 px-6 text-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded transition-all"
              onClick={() => {
                setOpen(false);
                navigate("/sign-in");
              }}
            >
              Sign in
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CreatePost;
