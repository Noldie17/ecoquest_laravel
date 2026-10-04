"use client";

export default function AmbientGlows() {
  return (
    <>
      <div
        className="absolute top-[-20%] left-[-15%] w-[50%] h-[50%] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle,rgba(52,211,153,0.07) 0%,transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-[-20%] right-[-15%] w-[50%] h-[50%] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle,rgba(139,92,246,0.08) 0%,transparent 65%)",
        }}
      />
      <div
        className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle,rgba(211,188,142,0.05) 0%,transparent 70%)",
        }}
      />
    </>
  );
}
