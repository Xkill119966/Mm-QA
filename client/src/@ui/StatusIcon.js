import React from "react";
import CircleIcon from "./CircleIcon";

export const StatusIcon = ({ isOpen, referred, ...props }) => (
  <div {...props}>
    <CircleIcon
      size="30px"
      variant={isOpen ? "success" : referred ? "primary" : "danger"}
      icon={isOpen ? "exclamation" : referred ? "retweet" : "ban"}
    />
  </div>
);

export default StatusIcon;
