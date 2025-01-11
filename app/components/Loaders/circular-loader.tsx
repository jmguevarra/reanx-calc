"use client";

const CircularLoader = () => {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center bg-black">
      <div className="relative h-20 w-20 animate-spin rounded-full">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
        <div className="absolute inset-[4px] rounded-full bg-black"></div>
      </div>
      <h1 className="text-white mt-4 text-2xl">Reanx Calculator</h1>
    </div>
  );
};

export default CircularLoader;
