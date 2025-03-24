"use client";
import React, { useState, useTransition } from "react";
import { askJarvis } from "../utils/askJarvisChef";
import CoachAdvice from "./CoachAdvice";

const Jarvis = () => {
  const [inputValue, setInputValue] = useState("");
  const [fitnessMessage, setFitnessMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleInputChange = async (e) => {
    setFitnessMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      const jarvis_response = await askJarvis(fitnessMessage);
      // console.log("Jarvis response in handle submit : ", jarvis_response);
      startTransition(() => {
        setInputValue(jarvis_response);
      });
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center my-24 p-6 bg-gray-100 rounded-lg shadow-lg max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-sky-700 mb-6 font-sans">
          Your AI Fitness Coach
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            type="text"
            value={fitnessMessage}
            onChange={handleInputChange}
            placeholder="Enter your goal..."
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-500 w-full"
          />
          <button className="bg-sky-600 transition hover:scale-105 cursor-pointer text-white font-semibold py-2 rounded-lg hover:bg-sky-700  duration-200 w-full">
            {isPending ? "Asking...." : "Ask"}
          </button>
          <p className="text-center font-serif text-green-700">
            It will make a best plan based on your goal
          </p>
        </form>
      </div>
      {/* Passing response to coaching component */}
      <div>
        <CoachAdvice coachingadvice={inputValue} />
      </div>
    </>
  );
};

export default Jarvis;
