import { ContentConfig } from '@/base-ui/page-content/type'

export const contentConfig: ContentConfig = {
  pageName: 'demos',
  searchConfig: [
    {
      type: 'input',
      label: '标题',
      prop: 'title',
      placeholder: '请输入标题'
    }
  ],
  headerInfo: {
    title: 'demo列表',
    btnText: 'demo添加'
  },

  tableConfig: {
    api: '/demos',
    wcolumns: [
      {
        type: 'cover',
        title: '封面',
        dataIndex: 'coverUrl',
        width: 200,
        align: 'center'
      },
      {
        title: '标题',
        dataIndex: 'title',
        width: 140,
        align: 'center'
      },
      {
        title: '链接',
        dataIndex: 'link',
        width: 200
      },
      {
        title: '描述',
        dataIndex: 'description',
        ellipsis: true
      },
      {
        type: 'utcTimer',
        title: '创建时间',
        dataIndex: 'createAt',
        width: 160
      }
    ]
  },
  modalWidth: '40%',
  modalConfig: {
    header: {
      newTitle: 'demo添加',
      editTitle: 'demo编辑'
    },
    uiConfig: {
      colConfig: { span: 24 },
      formConfig: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
      }
    },
    formItems: [
      {
        type: 'input',
        label: '标题',
        prop: 'title',
        placeholder: '请输入标题',
        rules: [{ required: true, message: '请输入标题' }]
      },
      {
        type: 'upload-file',
        prop: 'fileId',
        label: '封面',
        uploadProps: {
          listType: 'picture-card'
        }
      },
      {
        type: 'input',
        label: '跳转链接',
        prop: 'link',
        placeholder: '请输入跳转链接'
      },
      {
        type: 'textarea',
        label: '描述',
        prop: 'description',
        placeholder: '请输入描述',
        colConfig: {
          span: 24
        },
        autoSize: {
          minRows: 3,
          maxRows: 5
        }
      }
    ]
  }
}
