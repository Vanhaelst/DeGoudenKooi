"use client";

import React from "react";
import ScriptInjector from "./ScriptInjector";

export default function Planner({ locale }) {
  return (
    <ScriptInjector
      id="plan2book"
      src={`https://app.plan2book.be/cdn/plan2book-weblib/plan2book-weblib-3.0.0.min.js?customer=f4J1eLI23IFoXyCh2ACV&lang=${locale}&startPlanning=true`}
    />
  );
}
