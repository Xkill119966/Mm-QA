import styled from 'styled-components/macro';

const LoginWrapper = styled.div`
  /* for centering Toast */
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 30px 0;

  .logo {
    width: 100px;
    margin: 5px 0;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    margin-top: ${p => p.theme.spacings.my};
  }

  .chip {
    padding: 10px 15px;
    font-size: 16px;

    a {
      font-size: 16px;
      color: ${p => p.theme.colors.black};
      :hover {
        color: ${p => p.theme.colors.primary};
      }
    }
  }

  @media screen and (${p => p.theme.media.tablet}) {
    margin-top: ${p => p.theme.spacings.top}px;
    margin-bottom: ${p => p.theme.spacings.bottom}px;
  }
`;

export default LoginWrapper;
