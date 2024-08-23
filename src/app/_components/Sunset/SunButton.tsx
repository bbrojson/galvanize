import React from "react";

export function SunButton() {
  function handleSunset() {
    window.document.body.classList.toggle("day");
  }
  return (
    <button id="button" onClick={handleSunset}>
      Click me
    </button>
  );
}
