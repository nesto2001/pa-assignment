import React from "react";

const ChartLegend = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="legend self-center mt-4 border border-body p-4 rounded-lg">
      <div className="title text-center text-base font-bold mb-2">{title}</div>
      {children}
    </div>
  );
};

export default ChartLegend;
