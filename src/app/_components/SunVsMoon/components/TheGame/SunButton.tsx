import React from "react";

export function SunButton() {
  function handleSunset() {
    window.document.body.classList.toggle("SUN");
  }
  return (
    <button
      className="absolute bottom-9 left-0 right-0 z-10"
      id="button"
      onClick={handleSunset}
    >
      Click me
    </button>
  );
}
