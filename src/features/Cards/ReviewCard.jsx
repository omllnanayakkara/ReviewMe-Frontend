/* eslint-disable react/prop-types */
import { FaRegCommentDots, FaStar } from "react-icons/fa";
import RatingStart from "../RatingStart";
import Modal from "../Modal";
import { useEffect, useState } from "react";
import { deleteReview, updateReview } from "../../utils/api";
import { displayToastError, displayToastSuccess } from "../../utils/toasts";
import { useDispatch, useSelector } from "react-redux";
import { setReviews } from "../../state/review/reviewSlice";
import moment from "moment/moment";

const ReviewCard = ({ review }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRate, setSelectedRate] = useState(review.rating);
  const [showMore, setShowMore] = useState(true);
  const [formdata, setFormdata] = useState({
    title: review.title,
    author: review.author,
    rating: review.rating,
    reviewText: review.reviewText,
  });

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.review);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateReview(review._id, formdata);
      const data = await res.json();

      if (res.ok) {
        displayToastSuccess(data.message);
        dispatch(
          setReviews(reviews.map((r) => (r._id === review._id ? data.data : r)))
        );
        setEditModalOpen(false);
      } else {
        displayToastError(data.message);
      }
    } catch (error) {
      displayToastError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await deleteReview(review._id);
      const data = await res.json();

      if (res.ok) {
        displayToastSuccess(data.message);
        dispatch(setReviews(reviews.filter((r) => r._id !== review._id)));
        setDeleteModalOpen(false);
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
    <div className="flex flex-col p-4 my-4 border rounded">
      <div className="flex items-start gap-4 flex-1">
        <div className="p-4 mt-2 bg-indigo-100 rounded-full">
          <FaRegCommentDots className="text-indigo-500" size={24} />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <h1 className="font-semibold text-lg md:text-xl">{review.title}</h1>
            <p className="text-sm opacity-70">
              Posted {moment(review.createdAt).fromNow()}
            </p>
          </div>
          <p className="text-sm">By {review.author}</p>
          <RatingStart rating={review.rating} />
          <p>
            {
              review.reviewText.length > 400 && showMore
                ? `${review.reviewText.substring(0, 400)}...`
                : review.reviewText
            }
            {
              review.reviewText.length > 400
                ? (
                  <button
                    className="text-indigo-500 font-medium"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {
                      showMore
                        ? "Show more"
                        : "Show less"
                    }
                  </button>
                )
                : null
            }
            </p>

          {currentUser && currentUser._id === review.userId && (
            <div className="flex gap-4 text-sm justify-end">
              <button
                className="text-indigo-500 font-medium"
                onClick={() => setEditModalOpen(true)}
              >
                Edit
              </button>
              <button
                className="text-red-500 font-medium"
                onClick={() => setDeleteModalOpen(true)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit popup */}
      <Modal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
        }}
      >
        <h1 className="text-2xl font-semibold mb-2">Edit Review</h1>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="border rounded px-4 py-2 w-full"
              id="title"
              value={formdata.title}
              placeholder="Book Title"
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
      </Modal>

      {/* Delete popup */}
      <Modal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
        }}
      >
        <h1 className="text-2xl font-semibold mb-2">Delete Review</h1>
        <p>Are you sure you want to delete this review?</p>
        <div className="flex justify-end gap-2 pt-4">
          <button
            className="py-2 px-6 bg-gray-100 hover:bg-gray-200 rounded transition-all"
            onClick={() => setDeleteModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="py-2 px-6 bg-red-500 hover:bg-red-600 text-white rounded transition-all"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ReviewCard;
