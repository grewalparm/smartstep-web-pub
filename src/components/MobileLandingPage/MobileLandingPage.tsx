import React from "react";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { Link } from "react-router-dom";

const MobileLandingPage: React.FC = () => {
  return (
    <div className="h-screen bg-gradient-to-t from-blue-200 to-blue-50">
      <div className="flex flex-row items-center p-3">
        <Logo className="scale-x-[-1] h-8 w-8" />
        <div className="font-medium">SmartStepAI</div>
      </div>
      <div className="flex justify-center items-center pt-36">
        <Logo className="w-80 h-80 aspect-square bg-white rounded-[2rem]" />
      </div>
      <h1 className="flex justify-center items-center font-semibold text-xl py-5">
        An AI Tutor for the STEP exam
      </h1>
      <p className="flex justify-center text-center text-sm text-slate-500 px-5">
        Prepare for STEP exam success with an AI-powered study partner,
        providing personalized guidance and comprehensive support.
      </p>
      <div className="px-5 py-5">
        <Link
          to="/categories"
          className="flex justify-center rounded-full bg-green-600 text-white px-6 py-2 shadow-md"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default MobileLandingPage;
