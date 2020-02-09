import React, { useEffect } from "react";
import "./Tech.css";

export function Tech(props) {
  useEffect(() => {
    SetElement(props.name);
    ToggleIcon(props.name);
    ElementHover(props)
  });

  return (
    <div className="techIcon">
      <img className="techImg" key={props.icon} src={props.icon} id={props.icon} alt={props.icon}/>
      <div className="iconOverlay" id="iconOverlay">
        <div className="techName">{props.name}</div>
      </div>
    </div>
  );
}

function ToggleIcon(key) {
  const id = document.getElementById(key);
  const randTime = Math.floor(Math.random() * 10000) + 5000;

  const toggleIcon = setInterval(() => {
    if (id.style.height === "100%") {
      id.style.height = "0%";
    } else {
      id.style.height = "100%";
    }
  }, randTime);
  return () => clearInterval(toggleIcon);
}

function SetElement(id) {
  document.getElementById("iconOverlay").id = id;
  document.getElementById(id).style.height = "100%";
}

function ElementHover(props) {
    const icon = document.getElementById(props.icon)
  
    icon.addEventListener("mouseover", (e) => {
        const overlay = document.getElementById(props.name)
        overlay.style.height="100%"
    })
}