/** @jsx jsx */

import { jsx } from "@emotion/core";
import React, { useState } from "react";

import { css } from "@emotion/core";
export default function NavButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      css={{
        display: "inline-block",
        cursor: "pointer",
        padding: "0.5em 1em",
        margin: "0 0.1em 0.1em 0",
        border: "0.16em solid rgba(255, 255, 255, 0)",
        borderRadius: "1em",
        boxSizing: "border-box",
        textDecoration: "none",
        backgroundColor: "#e2e2e2",
        color: "#436d59",
        textShadow: "0 0.04em 0.04em rgba(0, 0, 0, 0.35)",
        textAlign: "center",
        transition: "all 0.2s",
      }}
    >
      {children}
    </button>
  );
}
