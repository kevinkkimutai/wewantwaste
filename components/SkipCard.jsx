import { AlertTriangle, Award, Calendar, CheckCircle,  Star,  } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export default function SkipCard({
  skip,
  index,
  calculateTotalPrice,
  setSelectedSkip,
  selectedSkip,
  hoveredSkip,
}) {
  const totalPrice = calculateTotalPrice(skip.price_before_vat, skip.vat);
  const isSelected = selectedSkip?.id === skip.id;
  const isHovered = hoveredSkip === skip.id;


  return (
    <div 
    key={index}
    className={`
      relative group  rounded-3xl shadow hover:shadow-lg transition-all duration-500 cursor-pointer overflow-hidden
              ${ isSelected 
            ? 'scale-105 rotate-1 shadow shadow-gray-50/25 bg-green-950' 
            : 'hover:scale-105 hover:-rotate-1 shadow hover:shadow-md bg-gray-900'
        }
      ${isHovered ? 'z-10' : ''}
    `}
    onClick={() => setSelectedSkip(skip)}

  >
    {/* Popularity Badge */}

      <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
      📬  {"  "}
        {skip.postcode}
      </div>
   
  
    {/* Selection Indicator */}
    {isSelected && (
      <div className="absolute top-4 right-4 z-20 bg-green-500 text-white p-2 rounded-full shadow-lg">
        <CheckCircle size={16} />
      </div>
    )}
  
    <div className="p-6 pb-8">
      {/* Skip Visual */}
      <div className={`
        relative h-56 bg-gradient-to-br  rounded-2xl mb-6 overflow-hidden
        transition-all duration-500 ${isHovered ? 'scale-105' : ''}
      `}>
      
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10"></div>
        <Image 
  src={
    skip.size === 4
      ? 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg'
      : skip.size === 20
      ? 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/20-yarder-skip.jpg'
      : skip.size === 40
      ? "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/40-yarder-skip.jpg"
      : 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/5-yarder-skip.jpg'
  }
  alt={`${skip.size} yard skip`}
  width={1000}
  height={1000}
  className="w-full h-full object-cover"
/>

  
        {/* Size indicator */}
        <div className="absolute top-6 right-6 bg-white/95  backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg ">
          <span className="text-lg font-black text-gray-800">{skip.size}</span>
          <span className="text-sm font-medium text-gray-600 ml-1">Yards</span>
        </div>
  
        {/* Price display */}
        <div className="absolute bottom-6 left-6 text-white">
          <div className="text-3xl font-black tracking-tight">£{totalPrice}</div>
          <div className="text-sm opacity-90 font-medium">Inc. VAT</div>
        </div>
      </div>
  
      {/* Skip Details */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className={`flex items-center gap-2  rounded-xl p-3 ${isSelected ? "bg-gray-300" : "bg-gray-50"}`}>
            <Calendar size={16} className="text-blue-500" />
            <div>
              <div className="font-semibold text-gray-800">{skip.hire_period_days} days</div>
              <div className="text-gray-500 text-xs">Hire period</div>
            </div>
          </div>

        </div>
  
        {/* Permission indicators */}
        <div className="space-y-3">
          <div className={`flex items-center gap-3 p-3 rounded-xl  ${isSelected ? "bg-gray-300" : "bg-gradient-to-r from-gray-50 to-gray-100"}`}>
            {skip.allowed_on_road ? (
              <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
            ) : (
              <AlertTriangle size={18} className="text-amber-500 flex-shrink-0" />
            )}
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-800">
                {skip.allowed_on_road ? 'Road placement permitted' : 'Private property only'}
              </span>
              {skip.allowed_on_road && (
                <div className="text-xs text-green-600 mt-0.5">No permit fees required</div>
              )}
            </div>
          </div>
  
          <div className={`flex items-center gap-3 p-3 rounded-xl  ${isSelected ? "bg-gray-300" : "bg-gradient-to-r from-gray-50 to-gray-100"}`}>
            {skip.allows_heavy_waste ? (
              <Award size={18} className="text-blue-500 flex-shrink-0" />
            ) : (
              <AlertTriangle size={18} className="text-amber-500 flex-shrink-0" />
            )}
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-800">
                {skip.allows_heavy_waste ? 'Heavy materials accepted' : 'Light waste only'}
              </span>
              <div className="text-xs text-gray-500 mt-0.5">
                {skip.allows_heavy_waste ? 'Concrete, soil, rubble OK' : 'No heavy construction waste'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
}

