import React from 'react';

const QuoteCard = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:mx-5 mb-24">
      <div className="flex justify-center items-center lg:h-64 lg:w-1/2 bg-block rounded-xl">
        <div className="text-center rounded-xl p-10">
          <h1 className="font-semibold inline-block bg-gradient-to-r from-primary via-[#28cee4] to-secondary bg-clip-text text-xl lg:text-3xl text-transparent">
            Greater satisfaction comes from sharing with others
          </h1>
        </div>
      </div>
      <div className="flex justify-center items-center lg:h-64 lg:w-1/2 bg-block rounded-xl">
        <div className="text-center rounded-lg p-10">
          <h1 className="font-semibold inline-block bg-gradient-to-r from-primary via-[#28cee4] to-secondary bg-clip-text text-xl lg:text-3xl text-transparent">
            The more we share the more we have
          </h1>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
