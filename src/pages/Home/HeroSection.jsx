import { hero } from "../../assets/assets.js";

const HeroSection = () => {
  return (
    <>
      <div className="w-full h-60 relative">
        <img
          src={hero}
          alt="Hero image"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-indigo-300 opacity-50"></div>
      </div>
      <div className="p-5 pb-0">
        <div className="md:px-0 md:max-w-7xl mx-auto">
          <h1 className="text-2xl font-medium px-5">
            Share Stories, Rate Reads, Discover Your Next Favorite Book
          </h1>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
