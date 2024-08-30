import React from "react";

export function Button({
  children,
  className,
  variant = "sun",
  onClick,
}: {
  children: React.ReactNode;
  className: string;
  variant?: "sun" | "moon";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const color =
    variant === "sun"
      ? "border-[#ff8603] bg-transparent text-[#ff8603] hover:bg-[#ff8603] hover:text-white"
      : "border-[#f1c40f] bg-transparent text-[#f1c40f] hover:bg-[#f1c40f] hover:text-white";

  return (
    <button
      onClick={onClick}
      className={`${className} ${color} mx-auto block w-full max-w-[200px] transform rounded-full border-2 px-5 py-5 text-center font-sans text-[16px] font-bold uppercase tracking-[3px] transition-all duration-200 ease-in-out active:scale-95`}
    >
      {children}
    </button>
  );
}
