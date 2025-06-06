'use client'
import React from 'react'
import { CheckCircle, Truck, Calendar, MapPin, Shield, AlertTriangle } from 'lucide-react';
export default function ProgressBar() {
    const  currentStep = 3
    const steps = [
      { id: 1, label: "Location", icon: MapPin, color: "from-blue-500 to-cyan-500" },
      { id: 2, label: "Waste Type", icon: AlertTriangle, color: "from-amber-500 to-orange-500" },
      { id: 3, label: "Skip Size", icon: Truck, color: "from-blue-500 to-blue-700" },
      { id: 4, label: "Permits", icon: Shield, color: "from-green-500 to-emerald-500" },
      { id: 5, label: "Schedule", icon: Calendar, color: "from-indigo-500 to-blue-500" },
      { id: 6, label: "Payment", icon: CheckCircle, color: "from-teal-500 to-cyan-500" }
    ];

    return (
     <div className='w-full pt-16 bg-gray-900'>
         <div className="relative max-w-[1280px] mx-auto w-full bg-gray-900  px-4 py-4 ">
     
        <div className="relative flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`
                  relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-500 transform
                  ${isActive ? `bg-gradient-to-r ${step.color} text-white scale-110 shadow-lg` : 
                    isCompleted ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md' : 
                    'bg-gray-100 text-gray-400 hover:bg-gray-200'}
                `}>
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                  )}
                  <Icon size={20} className="relative z-10" />
                </div>
                <div className="ml-3 hidden lg:block">
                  <div className={`text-sm font-semibold transition-colors duration-300 ${
                    isActive ? 'text-blue-900' : isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </div>
                  <div className="text-xs text-gray-400">
                    {isCompleted ? 'Completed' : isActive ? 'Current' : 'Pending'}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 lg:w-16 h-1 mx-4 rounded-full transition-all duration-500 ${
                    isCompleted ? 'bg-gradient-to-r from-green-400 to-emerald-400' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
     </div>
    );
  };


  

  