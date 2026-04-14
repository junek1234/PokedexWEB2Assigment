import {useState} from "react"

export default function TableBtn({ direction, onClick}) {
  const isLeft = direction === "left";
  const label = isLeft ? "Previous" : "Next";
  const icon = isLeft ? "<" : ">";

  return (
    <button
      type="button"
      className={`table-btn table-btn--${isLeft ? "left" : "right"}`}
      aria-label={label}
      onClick={onClick}
    >
      <div className="table-btn__text">{label}</div>
    </button>
  );
}
