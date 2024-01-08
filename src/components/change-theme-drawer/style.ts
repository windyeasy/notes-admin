import styled from 'styled-components'

export const ThemeDrawerWrapper = styled.div`
  position: sticky;
  top: 190px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  .set-theme {
    position: absolute;
    inset-inline-end: 0px;
    font-size: 20px;
    color: #fff;
    width: 48px;
    height: 48px;
    border-radius: 5px 0 0 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 0;
    cursor: pointer;
  }
`
