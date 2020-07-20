import React from 'react';
import Logo from "../assets/svg/BugVilla.svg"
export const BugVillaLogo = ({ width }) => (
  <img
    style={{ width: width }}
    className="logo"
    src={Logo}
    alt="BugVilla Logo"
  />
);

export default BugVillaLogo;
