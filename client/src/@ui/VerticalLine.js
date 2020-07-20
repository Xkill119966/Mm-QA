import styled from 'styled-components';

export const VerticalLine = styled.section`
  position: relative;
  :before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 15px;
    width: 0;
    height: 100%;
    border: 1px solid ${p => p.theme.colors.offwhite};
    z-index: -1;
  }
`;

export default VerticalLine;