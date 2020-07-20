import styled, { css } from "styled-components/macro";

export const Grid = styled.div(
  ({ columns, justify, justifyItems, align, gap = "none" }) => css`
    display: grid;
    grid-template-columns: ${columns.desktop};
    grid-gap: ${p => p.theme.space[gap]}px;
    align-items: ${align.desktop};
    justify-content: ${justify.desktop};
    justify-items: ${justifyItems.desktop};

    /* used media.desktop because its the max-width 1024 */
    @media screen and (${p => p.theme.media.desktop}) {
      align-items: ${align.tablet};
      justify-content: ${justify.tablet};
      justify-items: ${justifyItems.tablet};
      grid-template-columns: ${columns.tablet};
    }
    @media screen and (${p => p.theme.media.mobile}) {
      align-items: ${align.mobile};
      justify-content: ${justify.mobile};
      justify-items: ${justifyItems.mobile};
      grid-template-columns: ${columns.mobile};
    }
  `
);

export default Grid;
