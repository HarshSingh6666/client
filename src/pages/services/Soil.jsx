import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "./Soil.css";

const Soil = () => {
  const [mode, setMode] = useState("manual");
  const [formData, setFormData] = useState({
    soilType: "",
    area: "",
    previousCrop: "",
    extraInfo: "",
    shcFile: null,
  });
  const [result, setResult] = useState(null);

  const fakeAnalysis = [
    { label: "Nitrogen Content", value: "Moderate (55 kg/ha)" },
    { label: "Phosphorus Content", value: "Low (15 kg/ha)" },
    { label: "Potassium Content", value: "High (80 kg/ha)" },
    { label: "Soil pH", value: "6.8 (Neutral)" },
    { label: "Organic Carbon", value: "0.75%" },
    { label: "Moisture Retention", value: "Good" },
    { label: "Soil Texture", value: "Loamy" },
    { label: "Salinity Level", value: "Normal" },
    { label: "Sulphur Content", value: "Adequate" },
    { label: "Micronutrients (Zn, Fe, Mn)", value: "Sufficient" },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(fakeAnalysis);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("🌱 Soil Analysis Report", 20, 20);

    if (mode === "manual") {
      doc.setFontSize(12);
      doc.text(`Soil Type: ${formData.soilType}`, 20, 40);
      doc.text(`Area of Land: ${formData.area}`, 20, 50);
      doc.text(`Previous Crop: ${formData.previousCrop}`, 20, 60);
      doc.text(`Extra Info: ${formData.extraInfo}`, 20, 70);
    } else {
      doc.text(`Uploaded SHC File: ${formData.shcFile?.name}`, 20, 40);
    }

    doc.text("Analysis Results:", 20, 90);
    result.forEach((item, i) => {
      doc.text(`${i + 1}. ${item.label}: ${item.value}`, 20, 100 + i * 10);
    });

    doc.save("soil_analysis_report.pdf");
  };

  return (
    <div className="p-10 bg-gradient-to-b from-green-100 via-amber-50 to-green-200 min-h-screen">
      {/* Header */}
      <h1 className="text-5xl font-extrabold text-green-800 mb-6 text-center drop-shadow-lg flex items-center justify-center gap-3">
        🌿 Soil Testing & Analysis
      </h1>
      <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-10">
        Enter your soil details or upload your <strong>Soil Health Card (SHC)</strong> 
        to get a quick AI-powered soil analysis with recommendations.
      </p>

      {/* Mode Selection */}
      <div className="flex justify-center gap-8 mb-10">
        <button
          className={`btn1 px-8 py-3 rounded-xl font-semibold shadow-md transition transform hover:scale-105 ${
            mode === "manual"
              ? "bg-green-700 text-white hover:bg-green-800"
              : "bg-white border-2 border-green-700 text-green-700 hover:bg-green-100"
          }`}
          onClick={() => setMode("manual")}
        >
          ✍️ Manual Entry
        </button>
        <button
          className={` btn2 px-8 py-3 rounded-xl font-semibold shadow-md transition transform hover:scale-105 ${
            mode === "shc"
              ? "bg-green-700 text-white hover:bg-green-800"
              : "bg-white border-2 border-green-700 text-green-700 hover:bg-green-100"
          }`}
          onClick={() => setMode("shc")}
        >
          📄 Upload SHC
        </button>
      </div>

      {/* Form */}
      <form
        className="bg-white/90 p-8 rounded-3xl shadow-xl max-w-xl mx-auto border border-green-200 backdrop-blur-sm"
        onSubmit={handleSubmit}
      >
        {mode === "manual" ? (
          <>
            {/* Soil Type */}
            <div className="mb-5">
              <label className="block mb-2 font-semibold text-green-800">
                🌱 Soil Type
              </label>
              <input
                type="text"
                name="soilType"
                value={formData.soilType}
                onChange={handleChange}
                className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="e.g., Loamy, Sandy"
                required
              />
            </div>
            {/* Area */}
            <div className="mb-5">
              <label className="block mb-2 font-semibold text-green-800">
                🌍 Area of Land
              </label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="e.g., 5 acres"
                required
              />
            </div>
            {/* Previous Crop */}
            <div className="mb-5">
              <label className="block mb-2 font-semibold text-green-800">
                🌾 Previous Crop
              </label>
              <input
                type="text"
                name="previousCrop"
                value={formData.previousCrop}
                onChange={handleChange}
                className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="e.g., Wheat, Rice"
                required
              />
            </div>
            {/* Extra Info */}
            <div className="mb-5">
              <label className="block mb-2 font-semibold text-green-800">
                📝 Extra Info
              </label>
              <textarea
                name="extraInfo"
                value={formData.extraInfo}
                onChange={handleChange}
                className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Any additional details..."
              />
            </div>
          </>
        ) : (
          <div className="mb-5">
            <label className="block mb-2 font-semibold text-green-800">
              📄 Upload SHC (PDF only)
            </label>
            <input
              type="file"
              name="shcFile"
              accept="application/pdf"
              onChange={handleChange}
              className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition transform hover:scale-105"
        >
          🔍 Analyze Soil
        </button>
      </form>

      {/* Results */}
      {result && (
        <div className="bg-white/95 p-8 rounded-3xl shadow-2xl max-w-3xl mx-auto mt-12 border border-green-300 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-green-900 mb-6 flex items-center gap-2">
            🧪 Soil Analysis Results
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {result.map((item, index) => (
              <li key={index} className="text-lg">
                <strong>{item.label}:</strong> {item.value}
              </li>
            ))}
          </ul>

          <button
            onClick={downloadPDF}
            className="mt-8 px-6 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition transform hover:scale-105"
          >
            📥 Download PDF Report
          </button>
        </div>
      )}
    </div>
  );
};

export default Soil;
