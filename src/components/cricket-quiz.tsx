"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

export function CricketQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  
  const questions = [
    {
      questionText: "Who holds the record for the most runs in a single World Cup?",
      answerOptions: [
        { answerText: "Sachin Tendulkar", isCorrect: true },
        { answerText: "Ricky Ponting", isCorrect: false },
        { answerText: "Rohit Sharma", isCorrect: false },
        { answerText: "David Warner", isCorrect: false },
      ],
    },
    {
      questionText: "Which team has won the most ICC Cricket World Cups?",
      answerOptions: [
        { answerText: "India", isCorrect: false },
        { answerText: "Australia", isCorrect: true },
        { answerText: "West Indies", isCorrect: false },
        { answerText: "England", isCorrect: false },
      ],
    },
    {
      questionText: "What is the highest team total in ODI cricket?",
      answerOptions: [
        { answerText: "444", isCorrect: false },
        { answerText: "481", isCorrect: false },
        { answerText: "498", isCorrect: true },
        { answerText: "450", isCorrect: false },
      ],
    },
  ];
  
  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };
  
  return (
    <div className="max-w-xl mx-auto p-6 bg-card rounded-xl border border-border shadow-lg">
      {showScore ? (
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold">Your Score: {score} out of {questions.length}</h3>
          <p className="text-muted-foreground">{
            score === questions.length 
              ? "Perfect! You're a cricket expert!" 
              : score >= questions.length / 2 
                ? "Well done! You know your cricket facts." 
                : "Keep learning about cricket history!"
          }</p>
          <Button onClick={resetQuiz}>Try Again</Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center pb-3 border-b">
            <span className="font-medium">Question {currentQuestion + 1}/{questions.length}</span>
            <span className="text-sm text-muted-foreground">Score: {score}</span>
          </div>
          
          <h3 className="text-xl font-semibold">{questions[currentQuestion].questionText}</h3>
          
          <div className="space-y-3">
            {questions[currentQuestion].answerOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option.isCorrect)}
                className="w-full py-3 px-4 text-left rounded-md border border-border hover:bg-muted/50 transition-colors"
              >
                {option.answerText}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 