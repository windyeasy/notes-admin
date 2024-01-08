import styled from 'styled-components'

export const LayoutModeWrapper = styled.div`
  display: flex;
  margin: 0 -10px;
  .layout-mode-wrap {
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    margin: 0 10px;
    cursor: pointer;
    width: 110px;
    height: 80px;
    background-color: #f5f5f5;
    display: flex;
    .w-main {
      flex: 1;
    }
    .w-header {
      height: 20px;
      background-color: #b3c0d1;
    }
    .w-silder {
      width: 35px;
      height: 100%;
      background-color: #d3dce6;
    }
  }

  .layout-mode-2 {
    flex-direction: column;
    .w-main {
      display: flex;
    }
  }
  .checked {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    color: dodgerblue;
    font-size: 30px;
    display: flex;
    align-items: center;
    font-weight: bold;
    justify-content: center;
  }
`
