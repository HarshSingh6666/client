import React from "react";
import "./Market.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Fake Data for 50 crops
const cropsData = [
  { name: "Wheat", price: 2000 },
  { name: "Rice", price: 2200 },
  { name: "Maize", price: 1800 },
  { name: "Barley", price: 1700 },
  { name: "Soybean", price: 4000 },
  { name: "Sugarcane", price: 3000 },
  { name: "Cotton", price: 5000 },
  { name: "Mustard", price: 4500 },
  { name: "Groundnut", price: 4200 },
  { name: "Pulses", price: 3500 },
  { name: "Jowar", price: 2000 },
  { name: "Bajra", price: 2100 },
  { name: "Sunflower", price: 3700 },
  { name: "Potato", price: 1200 },
  { name: "Onion", price: 1500 },
  { name: "Tomato", price: 1400 },
  { name: "Chilli", price: 6000 },
  { name: "Turmeric", price: 7000 },
  { name: "Ginger", price: 6500 },
  { name: "Garlic", price: 5500 },
  { name: "Grapes", price: 7500 },
  { name: "Papaya", price: 3500 },
  { name: "Strawberry", price: 10000 },
  { name: "Carrot", price: 1600 },
  { name: "Cabbage", price: 1200 },
  { name: "Cauliflower", price: 1300 },
  { name: "Brinjal", price: 1400 },
  { name: "Peas", price: 2000 },
  { name: "Capsicum", price: 3000 },
  { name: "Cucumber", price: 1300 },
];

// Pie chart colors
const COLORS = [
  "#4CAF50", "#FF9800", "#2196F3", "#9C27B0", "#FF5722", "#795548", "#607D8B",
  "#FFC107", "#8BC34A", "#00BCD4",
];

const Market = () => {
  return (
    <div className="market-page p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-6">Market Price Updates</h1>
      <p className="text-gray-600 mb-6">
        Here are the latest market prices for major crops.
      </p>

      {/* Bar Chart */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Crop Prices (Bar Chart)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={cropsData}>
            <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="price" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className=" piechart bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Crop Price Distribution</h2>
        <ResponsiveContainer width="100%" height={600}>
          <PieChart>
            <Pie
              data={cropsData}
              dataKey="price"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              label
            >
              {cropsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Market;
