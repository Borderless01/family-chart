import React from "react";
import { createRoot } from "react-dom/client";
import FamilyTree from "./Components/familyTree.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <div>
    <h1>My Family Tree</h1>
    <FamilyTree />
  </div>
);
