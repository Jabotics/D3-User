import React from "react";

// SPORTS
import Cricket from "./sports/cricket";
import Football from "./sports/football";
// import Basketball from "./sports/basketball";

const componentsMap: { [key: string]: React.ComponentType } = {
  cricket: Cricket,
  football: Football,
  // basketball: Basketball,
};

const LiveUpdates = ({ sports }: { sports: string }) => {
  const SportsComponent = componentsMap[sports.toLowerCase()];

  if (!SportsComponent) {
    return <div>Sport not supported</div>;
  }

  return (
    <div className="w-5/6 h-5/6 flex flex-col gap-5 mt-16 relative">
      <SportsComponent />
    </div>
  );
};

export default LiveUpdates;
