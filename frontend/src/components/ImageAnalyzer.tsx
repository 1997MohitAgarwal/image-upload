import { useState } from "react";
import { Send, Loader } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function ImageAnalyzer() {
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const imageUrl = location.state?.imageUrl || "";

  // API Key Configuration
  const apiKey=""
  
  // Image Analysis Function (No Streaming)
  const analyzeImage = async () => {
    if (!imageUrl) return;

    setIsLoading(true);
    setAnalysis("");

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "Analyze the given image and provide structured insights in well-formatted paragraphs.",
            },
            {
              role: "user",
              content: [
                { type: "text", text: "Analyze this image and describe it:" },
                { type: "image_url", image_url: { url: imageUrl } },
              ],
            },
          ],
          max_tokens: 500,
        }),
      });

      if (!response.ok) throw new Error("Failed to analyze image");

      const data = await response.json();
      setAnalysis(data.choices?.[0]?.message?.content || "No response received.");
    } catch (error) {
      console.error("Error:", error);
      setAnalysis("Error: Unable to analyze image.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 my-12 mx-6 bg-gray-300 shadow-lg rounded-xl">

      {imageUrl && (
        <img src={imageUrl} alt="User provided" className="w-full lg:w-1/3 mx-auto h-60 object-cover rounded-lg mb-4" />
      )}

      <button
        onClick={analyzeImage}
        disabled={!imageUrl || isLoading}
        className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
      >
        {isLoading ? <Loader className="animate-spin" size={18} /> : <Send size={18} />}
        Analyze Image
      </button>

      {analysis && (
        <div className="mt-4 min-w-[70vw] p-4 bg-gray-100 rounded-lg text-sm">
          <h3 className="font-bold mb-2">Analysis:</h3>
          <p className="whitespace-pre-wrap">{analysis}</p>
        </div>
      )}
    </div>
  );
}
