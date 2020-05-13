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
        border: "1px solid #929598",
        background: "transparent",
        padding: "8px",
        fontSize: "12px",
      }}
    >
      {children}
    </button>
  );
}
