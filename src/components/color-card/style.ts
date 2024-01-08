import styled from 'styled-components'

export const ColorCardWrapper = styled.div`
  border-radius: 2px;
  display: inline-block;
  margin-right: 8px;
  margin-bottom: 8px;
  position: relative;
  cursor: pointer;
  border: 1px solid #ccc;
  &:last-child {
    margin-right: 0;
  }
  .checked {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    color: rgba(192, 192, 192, 1);
    font-size: 13px;
    display: flex;
    align-items: center;
    font-weight: bold;
    justify-content: center;
  }
`
