import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg"; // Replace with your logo
import heroImage from "../../images/hero.jpg"; // Replace with the path to your image
import { ReactComponent as Logo } from "../../images/logo.svg";

const LandingPage = () => {
  return (
    <div className="bg-blue-200 p-[5rem]">
      <div className="grid grid-cols-2">
        <div className="flex flex-col rounded-l-[2rem] bg-white pr-32 px-20">
          <div className="py-20">
            <Logo className="h-14 w-14" />
          </div>
          <div className="grid grid-cols-1 gap-10">
            <h1 className="text-6xl font-extrabold">
              An AI Tutor for the STEP Exam
            </h1>
            <p className="text-slate-500">
              Prepare for STEP exam success with an AI-powered study partner,
              providing personalized guidance and comprehensive support.
            </p>
            <div className="pt-2 pb-5">
              <Link
                to="/demo"
                className="rounded-full bg-green-500 text-white px-6 py-3 shadow-lg shadow-green-700 w-40"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
        <div className="p-3 bg-white rounded-r-[2rem]">
          <div className="relative">
            <div className="flex bg-blue-200 rounded-[2rem] p-10">
              <Logo className="h-fit" />
            </div>
            <div className="absolute top-0 right-0 p-6 bg-white rounded-bl-[2rem]">
              <Link
                to="/demo"
                className="rounded-full bg-blue-600 text-white px-6 py-3 shadow-md shadow-blue-700 w-40"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
