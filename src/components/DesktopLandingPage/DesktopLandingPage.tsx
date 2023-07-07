import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../images/logo.svg";

const DesktopLandingPage = () => {
  return (
    <div className="flex h-full justify-center bg-blue-200 p-[5rem]">
      <div className="grid grid-cols-2">
        <div className="flex flex-col rounded-l-[2rem] bg-white pr-32 px-20">
          <div className="flex flex-row items-center text-xl py-20">
            <Logo className="h-14 w-14" />
            <h1>SmartStepAI</h1>
          </div>
          <div className="grid grid-cols-1">
            <h1 className="flex py-20 text-6xl font-extrabold">
              An AI Tutor for the STEP Exam
            </h1>
            <p className="flex-grow py-15 text-slate-500">
              Prepare for STEP exam success with an AI-powered study partner,
              providing personalized guidance and comprehensive support.
            </p>
            <div className="py-20 pb-10">
              <Link
                to="/demo"
                className="rounded-full bg-green-600 text-white px-6 py-3 shadow-lg shadow-green-500 w-40"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-grow p-3 bg-white rounded-r-[2rem]">
          <div className="relative h-full">
            <div className="flex h-full justify-center items-center bg-blue-200 rounded-[2rem] p-10">
              <Logo className="flex-grow" />
            </div>
            <div className="absolute top-0 right-0 p-6 pb-8 bg-white rounded-bl-[2rem]">
              <Link
                to="/demo"
                className="rounded-full bg-blue-700 text-white px-6 py-3 shadow-md shadow-blue-600 w-40"
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

export default DesktopLandingPage;
