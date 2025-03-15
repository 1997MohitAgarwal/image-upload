import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleExplore = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-center p-6">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://source.unsplash.com/random")' }}
      ></div>

      {/* Container with opacity */}
      <div className="relative z-10 px-6 py-12 text-white">
        <h1 className="text-5xl font-extrabold text-gray-100 mb-6 animate__animated animate__fadeIn">
          Welcome to Image Analyzer
        </h1>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto animate__animated animate__fadeIn animate__delay-1s">
          Upload an image and get deep insights using AI-powered analysis.
          Experience the future of image understanding with our cutting-edge
          technology.
        </p>
        <button
          onClick={handleExplore}
          className="px-8 py-4 bg-green-600 text-white font-semibold text-xl rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:bg-green-700 focus:outline-none"
        >
          Explore
        </button>
      </div>

      {/* Features Section */}
      <section className="bg-gray-100 py-12 w-full">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose Image Analyzer?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                AI-Powered Insights
              </h3>
              <p className="text-gray-600 text-lg">
                Our AI analyzes images deeply to provide valuable insights in
                seconds, making your image understanding faster and smarter.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Fast and Efficient
              </h3>
              <p className="text-gray-600 text-lg">
                Get instant results. Our system processes images quickly and
                delivers precise feedback within moments.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Easy to Use
              </h3>
              <p className="text-gray-600 text-lg">
                Our user-friendly interface makes it easy to upload images and
                explore powerful analytics with just a few clicks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
