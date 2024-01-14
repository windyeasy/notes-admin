import { WBaseFormProps } from '@/base-ui/w-form'

export const FormConfig: WBaseFormProps = {
  formname: 'noteform',

  formItems: [
    {
      type: 'input',
      label: '文章标题',
      prop: 'title',
      labelCol: { span: 2 },
      wrapperCol: { span: 10 },
      placehold: '请输入文章标题',
      rules: [{ required: true, message: '请输入文章标题' }]
    },
    {
      type: 'select',
      label: '菜单类型',
      labelCol: { span: 2 },
      wrapperCol: { span: 10 },
      prop: 'type',
      initValue: 1,
      options: [
        {
          label: '文件类型',
          value: 1
        },
        {
          label: '内容类型',
          value: 2
        }
      ]
    },
    {
      type: 'switch',
      label: '状态',
      prop: 'state',
      initValue: true,
      labelCol: { span: 2 },
      wrapperCol: { span: 10 }
    },
    {
      type: 'upload-file',
      label: '内容文件',
      prop: 'fileId',
      labelCol: { span: 2 },
      wrapperCol: { span: 10 },
      visibleIf: {
        hidden: { type: 2 }
      }
    },
    {
      type: 'markdown-editor',
      label: '菜单内容',
      labelCol: { span: 2 },
      wrapperCol: { span: 24 },
      prop: 'content',
      height: '700px',
      visibleIf: {
        hidden: { type: 1 }
      }
    }
  ]
}
