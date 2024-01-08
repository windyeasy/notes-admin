import styled from 'styled-components'

export const DisplayIframeWrapper = styled.div`
  .loading {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(127, 127, 127, 0.5);
  }
  .iframe {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
  }
`
