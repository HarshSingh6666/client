import React, { useState } from "react";

const Pest = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image!");

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("http://localhost:5000/detect", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data.result || "No pest detected.");
    } catch (error) {
      console.error(error);
      setResult("❌ Error in detection. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-b from-green-100 to-green-200 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-green-800 mb-6">
        🐛 Pest Detection System
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md flex flex-col items-center"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4 border border-green-400 p-2 rounded-lg w-full"
        />
        <button
          type="submit"
          className="bg-green-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-800 transition"
          disabled={loading}
        >
          {loading ? "🔍 Analyzing..." : "Upload & Detect"}
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-white p-6 rounded-xl shadow-lg max-w-2xl">
          <h2 className="text-xl font-bold text-green-900 mb-3">
            🧪 Analysis Result
          </h2>
          <p className="text-gray-700 whitespace-pre-line">{result}</p>
        </div>
      )}
    </div>
  );
};

export default Pest;
