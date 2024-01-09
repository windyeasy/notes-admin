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
      type: 'textarea',
      label: '菜单内容',
      defaultValueUn: true,
      labelCol: { span: 2 },
      prop: 'content',
      placehold: '请输入菜单内容',
      visibleIf: {
        hidden: { type: 1 }
      }
    }
  ]
}
