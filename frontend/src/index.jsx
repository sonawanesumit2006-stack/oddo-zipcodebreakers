import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";

// Apply persisted theme on load
try {
  const raw = localStorage.getItem('gt_settings');
  const parsed = raw ? JSON.parse(raw) : null;
  if (parsed?.theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
} catch (e) {
  // ignore
}

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
