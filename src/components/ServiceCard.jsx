import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ title, link }) => {
  return (
    <div className="service-card border rounded-lg shadow-md p-4 hover:shadow-xl transition">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <Link to={link} className="text-green-600 font-medium hover:underline">
        Explore →
      </Link>
    </div>
  );
};

export default ServiceCard;
