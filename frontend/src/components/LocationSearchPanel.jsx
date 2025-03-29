import React from "react";

const LocationSearchPanel = (props) => {
  //smaple array of locations
  const locations = [
    "24B, Near Kapoor's Cafe, Shreyian Coding School, Bhopal",
    "22B, Near Khandelwal's Cafe, Shreyian Coding School, Delhi",
    "28B, Near Singh's Cafe, Shreyian Coding School, Mumbai",
    "26B, Near Sharma's Cafe, Shreyian Coding School, Gurgoan",
  ];

  return (
    <div>
      {locations.map(function (ln, idx) {
        return (
          <div key = {idx}
            onClick={() => {
              props.setVehiclePanel(true);
              props.setPanelOpen(false);
            }}
            className="flex items-center justify-start border-2 border-gray-50 active:border-black p-3 rounded-xl gap-4 mb-2"
          >
            <h2 className="bg-[#eee] h-10 w-16 flex items-center justify-center rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="fond-medium">{ln}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
