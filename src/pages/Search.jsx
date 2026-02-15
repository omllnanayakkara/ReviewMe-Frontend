import { useSearchParams } from "react-router-dom";
import ReviewCard from "../features/Cards/ReviewCard";
import { useEffect, useState } from "react";
import { getReviews } from "../utils/api";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "10px auto",
  borderColor: "blue",
};

const Search = () => {
  const [reviews, setReviews] = useState([]);
  const [searchQuery] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({
    sortField: "",
    sortDirection: "",
    startIndex: 0,
    pageSize: 10,
    userId: "",
    title: "",
    author: "",
    searchTerm: searchQuery.get("searchTerm"),
  });

  useEffect(() => {
    setQuery({
      searchTerm: searchQuery.get("searchTerm"),
    });
  }, [searchQuery]);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await getReviews(query);
        const data = await res.json();
        if (res.ok) {
          setReviews(data.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="w-full p-5 h-full">
      <div className="md:max-w-5xl mx-auto">
        <h1 className="text-2xl font-medium mb-4">
          Search Result ({!loading && reviews.length})
        </h1>
        {loading && (
          <div className="w-full h-80 flex items-center justify-center">
            <ClipLoader
              color={"indigo"}
              loading={loading}
              cssOverride={override}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        {!loading &&
          reviews &&
          reviews.map((review) => {
            return <ReviewCard key={review._id} review={review} />;
          })}

        {!loading && reviews.length === 0 && (
          <h1 className="text-center text-gray-500 text-2xl my-52">
            No Reviews Found
          </h1>
        )}
      </div>
    </div>
  );
};

export default Search;
