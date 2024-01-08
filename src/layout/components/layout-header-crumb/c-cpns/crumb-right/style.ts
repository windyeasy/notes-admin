import styled from 'styled-components'

export const CrumbRightWrapper = styled.div`
  display: flex;
  align-items: center;

  .screen-full {
    font-size: 18px;
  }
  .user-operate {
    height: 50px;
    display: flex;
    align-items: center;
    margin-left: 14px;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 4px;
      border: 1px solid #ccc;
      background-color: #fff;
    }
    .user-name {
      font-size: 14px;
      font-weight: normal;
      line-height: 1.4;
    }
    &:hover {
      color: none;
    }
  }
`
