import { useAppDispatch } from '@/store'
import { changeFormDataAction, changeIsNewAction, changeIsOpenAction } from '../store'

export function usePageModal() {
  const dispatch = useAppDispatch()
  // 打开关闭模态框
  function changeModalOpen(open: boolean) {
    dispatch(changeIsOpenAction(open))
  }
  // 处理改变，modal数据
  function changeModalData(data: any) {
    dispatch(changeFormDataAction(data))
  }
  // 设置modal内容, isNew: 代表，是否添加
  function setModalContent(isNew = true, editInfo: any = {}) {
    dispatch(changeIsNewAction(isNew))
    // 设置展示
    changeModalOpen(true)
    changeModalData(editInfo)
  }
  return {
    changeModalOpen,
    changeModalData,
    setModalContent
  }
}
