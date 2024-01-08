import { FollowFieldsChangeModifyValueInfoType } from '../core'

export function fetchFollowFieldsInfo(
  key: string,
  followFieldsChangeModifyValueInfo: FollowFieldsChangeModifyValueInfoType
) {
  if (followFieldsChangeModifyValueInfo) {
    const infoKeys = Object.keys(followFieldsChangeModifyValueInfo)
    for (const infoKey of infoKeys) {
      const modifyInfos = followFieldsChangeModifyValueInfo[infoKey]
      return modifyInfos.find((item) => item.followKey === key)
    }
  }

  return {}
}
