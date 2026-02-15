import CreatePost from "../../features/CreatePost";
import ReviewList from "../../features/ReviewList";
import HeroSection from "./HeroSection";

const Home = () => {
  return (
    <>
      <HeroSection />

      <div className="p-5 md:max-w-7xl mx-auto">
        <div className="flex items-start flex-col-reverse lg:flex-row lg:gap-2">
          <div className="w-full lg:flex-1">
            <ReviewList />
          </div>
          <div className="w-full lg:flex-1 lg:max-w-80">
            <CreatePost />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
