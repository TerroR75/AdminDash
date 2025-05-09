"use client"

import React from 'react';

const milestones = [
  "Przygotowanie projektu",
  "Analiza potrzeb",
  "Realizacja designu",
  "Implementacja",
  "Testy",
  "Wdrożenie",
];

const currentStep = 3; // Index etapu, który jest aktualny (0-based)

const ProjectProgress = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 w-full">
      <h1 className="text-lg font-semibold text-gray-800 mb-6">Postęp projektu</h1>

      {/* Pasek postępu */}
      <div className="relative h-2 bg-gray-200 rounded-full mb-10">
        <div
          className="absolute top-0 left-0 h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
          style={{ width: `${(currentStep / (milestones.length - 1)) * 100}%` }}
        />
        
        {/* Kroki */}
        <div className="absolute top-1/2 w-full flex justify-between transform -translate-y-1/2">
          {milestones.map((label, index) => (
            <div key={index} className="flex flex-col items-center w-1/6">
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  index <= currentStep
                    ? 'bg-green-500 border-green-600'
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Etykiety kamieni milowych */}
      <div className="flex justify-between text-xs text-gray-600">
        {milestones.map((label, index) => (
          <span
            key={index}
            className={`text-center w-1/6 ${
              index === currentStep ? 'font-semibold text-green-700' : ''
            }`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectProgress;