import React from "react";

const LocationSearchPanel = ({
  suggestions = [],
  setPickup,
  setDestination,
  activeField,
  isLoading,
  error,
}) => {
  const handleSuggestionClick = (suggestion) => {
    const locationText = suggestion.description;
    console.log("Selected:", locationText);

    if (activeField === "pickup") {
      setPickup(locationText);
    } else if (activeField === "destination") {
      setDestination(locationText);
    }
  };

  return (
    <div className="px-4 py-3 text-white min-h-[200px] overflow-y-auto scrollbar-hide space-y-3">
        {isLoading && (
            <p className="text-gray-400 py-4 text-center">Loading suggestions...</p>
        )}

        {error && (
            <p className="text-red-500 py-4 text-center">{error}</p>
        )}

        {!isLoading && !error && suggestions.length === 0 && (
            <p className="text-gray-500 py-4 text-center">No results found. Try typing more.</p>
        )}

        <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {suggestions.map((ln, idx) => (
            <div
                key={idx}
                onClick={() => handleSuggestionClick(ln)}
                className="flex items-center gap-4 p-4 bg-[#1e1e1e] hover:bg-[#2c2c2c] border border-gray-700 rounded-2xl cursor-pointer transition"
            >
                <div className="h-10 w-10 min-w-[40px] flex-shrink-0 flex items-center justify-center bg-gray-800 text-white rounded-full text-lg">
                <i className="ri-map-pin-fill"></i>
                </div>
                <h4 className="font-medium text-sm leading-snug">
                {ln.description}
                </h4>
            </div>
            ))}
        </div>
    </div>
  );
};

export default LocationSearchPanel;
