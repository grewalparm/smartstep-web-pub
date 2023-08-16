import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { Link } from "react-router-dom";

const SelectCategoryPage = () => {
  const categories: string[] = [
    "Anatomy",
    "Behavioral sciences",
    "Biochemistry",
    "Biostatistics & Epidemiology",
    "Microbiology",
    "Pathology",
    "Pharmacology",
    "Physiology",
  ];

  return (
    <div className="flex h-screen flex-col bg-blue-200">
      <div className="flex justify-start pl-4 pt-4">
        <Link to={"/"}>
          <Logo className="h-12 w-12" />
        </Link>
      </div>
      <div className="flex flex-grow items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full bg-blue-200">
          <div className="bg-white p-8 relative inline-block rounded-[2rem] shadow-md shadow-slate-400">
            <h2 className="text-4xl font-bold mb-8 text-center">
              What do you want to study today?
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/demo/${encodeURIComponent(category)}`} // Pass category as a URL parameter
                  className="w-full py-2 px-4 text-center text-base font-light bg-blue-700 shadow-md shadow-blue-600 text-white rounded-[2rem] hover:bg-blue-400"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCategoryPage;
