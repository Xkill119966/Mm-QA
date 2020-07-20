import React from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VariantTypes } from "./colorVariants";

// interface StyledCircleProps {
//   variant: VariantTypes;
//   size?: string | undefined;
// }
export const StyledCircleIcon = styled.div`
  font-size: 14px;
  border-radius: 50px;
  ${({ size = "40px" }) => css`
    min-width: ${size};
    min-height: ${size};
    max-width: ${size};
    max-height: ${size};
  `}
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  ${p => p.theme.variants[p.variant]}
`;

// interface CircleIconProps {
//   variant?: VariantTypes;
//   icon: any;
//   size?: string;
//   [x: string]: any;
// }
export const CircleIcon = ({ icon, variant = "secondary", size, ...props }) => {
  return (
    <StyledCircleIcon size={size} variant={variant} {...props}>
      <FontAwesomeIcon icon={icon} />
    </StyledCircleIcon>
  );
};

export default CircleIcon;
