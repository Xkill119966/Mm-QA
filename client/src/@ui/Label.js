import React from "react";
import styled from "styled-components/macro";

const VARIANTS_MAP = {
  "help wanted": "secondary",
  enhancement: "secondary",
  feature: "success",
  bug: "danger"
};

export const StyledLabel = styled.div`
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 50px;
  margin-bottom: 5px;
  width: fit-content;
  line-height: 1;

  ${p => p.theme.variants[p.variant]}
`;

export const StyledBulletLabel = styled(StyledLabel)`
  display: flex;
  border-radius: 5px;
  margin-bottom: 0px;
  width: 100%;
  padding: 10px;
  background-color: transparent;

  .bullet {
    width: 10px;
    height: 10px;
    margin-top: 2px;
    margin-right: 8px;
    border-radius: 50px;
    pointer-events: none;
    &.danger {
      background-color: ${p => p.theme.colors.red};
    }
    &.success {
      background-color: ${p => p.theme.colors.green};
    }
    &.secondary {
      background-color: ${p => p.theme.colors.primary};
    }
  }
`;

export const Label = ({ children, type, ...props }) => {
  return (
    <StyledLabel variant={VARIANTS_MAP[type]} {...props}>
      {children}
    </StyledLabel>
  );
};

export const BulletLabel = ({ type, children }) => {
  return (
    <StyledBulletLabel variant={VARIANTS_MAP[type]}>
      <div className={`bullet ${VARIANTS_MAP[type]}`} />
      {children}
    </StyledBulletLabel>
  );
};

export default Label;
