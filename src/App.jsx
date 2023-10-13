import React from "react";
import ReactDOM from "react-dom/client";
import QuranData from "./Components/QuranData.jsx";

function App() {
  return (
    <>
      <QuranData />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
