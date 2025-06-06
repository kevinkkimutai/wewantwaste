'use client'
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Check, Truck, Calendar, Shield, Info, Zap, Star, ArrowRight, Sparkles } from 'lucide-react';
import ProgressBar from '@/components/ProgressBar';
import SkipCard from '@/components/SkipCard';

const SkipSelectionPage = () => {
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [skipData, setSkipData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredSkip, setHoveredSkip] = useState(null);
  const [mockSkipData, setMockSkipData] = useState([]);
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');
        const data = await response.json();
        setMockSkipData(data);
        setSkipData(data); // ✅ Set skipData after data is fetched
        setLoading(false);
      } catch (error) {
        console.error('API fetch error:', error);
        setLoading(false);
      }
    };
  
    fetchData();
    setTimeout(() => setIsLoaded(true), 100);
  }, []);


  console.log("mockSkipData", mockSkipData);
  
  const calculateTotalPrice = (priceBeforeVat, vat) => {
    return Math.round(priceBeforeVat * (1 + vat / 100));
  };

  const getFilteredSkips = () => {
    if (filter === 'road-legal') return skipData.filter(skip => skip.allowed_on_road);
    if (filter === 'heavy-waste') return skipData.filter(skip => skip.allows_heavy_waste);
    return skipData;
  };
  


  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-blue-400 rounded-full animate-spin mx-auto" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Your Skip Options</h2>
          <p className="text-white/70">Finding the perfect waste solution for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">

      {/* Header */}
      <div className=" fixed w-full top-0 z-20 bg-gray-900 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 ">
            <button className="flex items-center gap-3 text-white/80 hover:text-white transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </div>
              <span className="font-medium">Back to Waste Type</span>
            </button>
            <div className="text-white/60 font-medium max-md:text-center">
              Step 3 of 6 • Skip Selection
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" ref={containerRef}>
        <div className="text-center mb-16">

          {/*Filters*/}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { id: 'all', label: 'All Skips', icon: '🏠' },
              { id: 'road-legal', label: 'Road Legal', icon: '🛣️' },
              { id: 'heavy-waste', label: 'Heavy Duty', icon: '⚡' }
            ].map((filterOption) => (
              <button
                key={filterOption.id}
                onClick={() => setFilter(filterOption.id)}
                className={`group px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 backdrop-blur-sm ${
                  filter === filterOption.id
                    ? 'bg-white text-gray-900 shadow-2xl shadow-white/25 scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'
                }`}
              >
                <span className="mr-2">{filterOption.icon}</span>
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skip cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {getFilteredSkips().map((skip, index) => (
            <SkipCard key={skip.id} skip={skip} index={index} calculateTotalPrice={calculateTotalPrice} setSelectedSkip={setSelectedSkip} selectedSkip={selectedSkip} hoveredSkip={hoveredSkip} setHoveredSkip={setHoveredSkip} isLoaded={isLoaded} />
          ))}
        </div>

      

        {/* Action Section */}
        <div className="text-center">
          <button
            disabled={!selectedSkip}
            className={`group relative px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-500 transform ${
              selectedSkip
                ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105'
                : 'bg-white/10 text-white/50 cursor-not-allowed'
            }`}
          >
            <span className="flex items-center gap-3">
              {selectedSkip ? (
                <>
                  Continue with {selectedSkip.size} Yard Skip
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </>
              ) : (
                'Select a Skip to Continue'
              )}
            </span>
            
            {selectedSkip && (
              <div className="absolute inset-0 rounded-2xl bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            )}
          </button>
          
          {selectedSkip && (
            <p className="text-white/60 mt-4 animate-pulse items-center">
            <span className='font-bold text-2xl text-white'>£{calculateTotalPrice(selectedSkip.price_before_vat, selectedSkip.vat)} </span> including VAT • No hidden fees
            </p>
          )}
        </div>
      </div>

      {/* Mobile bottom bar */}
      {selectedSkip && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 p-6 md:hidden z-50">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-lg">{selectedSkip.size} Yard Skip</div>
              <div className="text-white/70">
               <span className='font-bold text-lg text-white'> £{calculateTotalPrice(selectedSkip.price_before_vat, selectedSkip.vat)}</span> {" "} inc. VAT
              </div>
            </div>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg">
              Continue
            </button>
          </div>
        </div>
      )}

     
    </div>
  );
};

export default SkipSelectionPage;