import styled from 'styled-components'

export const FoundWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  background-color: #f5f5f5;
  .content {
    margin-top: 200px;
    text-align: center;
    .content-title {
      font-size: 100px;
      font-weight: bold;
      font-style: italic;
    }
    .content-subtitle {
      font-size: 20px;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.6);
    }
    .content-des {
      font-size: 18px;
      margin-top: 5px;
      color: #9b9b9b;
    }
    .return-home {
      display: inline-block;
      margin-top: 10px;
      padding: 10px 20px 9px;
      color: #fff;
      text-decoration: none;
      border-radius: 20px;
    }
  }
`
