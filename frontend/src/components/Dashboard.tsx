import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Loader2 } from "lucide-react";

interface ImageData {
  filename: string;
  url: string;
}

export default function Dashboard() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string>("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    } else {
      fetchImages();
    }
  }, [token]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/images", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setImages(data.images);
      } else {
        setError(data.message || "Failed to fetch images");
      }
    } catch (err) {
      setError("An error occurred while fetching images");
    }
    setLoading(false);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setUploadMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setUploadMessage("Image uploaded successfully!");
        setFile(null);
        fetchImages(); // Refresh image list
      } else {
        setUploadMessage(data.message || "Upload failed");
      }
    } catch (error) {
      setUploadMessage("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleAnalyze = (filename: string, url: string) => {
    console.log("Analyzing image:", filename, url);
    navigate(`/analyze?filename=${encodeURIComponent(filename)}`, { state: { imageUrl: url } });
};


  return (
    <div className="flex flex-col items-center justify-center p-12 bg-gray-100">
      {/* Upload Section */}
      <div className="bg-white p-8 mb-10 rounded-xl shadow-lg w-full max-w-md">
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="flex flex-col items-center border-2 border-dashed border-gray-400 p-4 rounded-lg">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input" className="cursor-pointer text-gray-600 text-lg">
              Select an Image
            </label>
            {file && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg shadow-md"
                />
                <p className="text-center text-gray-600 mt-2 truncate w-32">{file.name}</p>
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2"
          >
            {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>

        {uploadMessage && (
          <p className={`mt-4 text-center ${uploadMessage.includes("failed") ? "text-red-500" : "text-green-500"}`}>
            {uploadMessage}
          </p>
        )}
      </div>

      {/* Image List Section */}
      <div className="w-full max-w-7xl min-h-[50vh] bg-white shadow-xl rounded-lg p-8">
        {error && <p className="text-red-600 text-center mb-6">{error}</p>}

        {loading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
          </div>
        ) : images.length === 0 ? (
          <p className="text-center text-lg text-gray-500">No images uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image) => (
              <div
                key={image.filename}
                className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img src={image.url} alt={image.filename} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-4">
                  <p className="font-semibold text-gray-800 truncate">{image.filename}</p>
                  <button
                    onClick={() => handleAnalyze(image.filename,image.url)}
                    className="mt-4 w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none"
                  >
                    Analyze Image
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
