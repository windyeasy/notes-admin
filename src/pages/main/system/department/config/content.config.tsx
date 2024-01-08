import { ContentConfig } from '@/base-ui/page-content/type'
import { getEntireDepartments } from '@/services/main/system'
import { checkArrayNotEmpty } from '@/utils/checkValue'

export const contentConfig: ContentConfig = {
  pageName: 'department',
  searchConfig: [
    {
      type: 'input',
      label: '部门名称',
      prop: 'depName',
      placeholder: '请输入部门名称'
    }
  ],
  headerInfo: {
    title: '部门列表',
    btnText: '添加部门'
  },

  tableConfig: {
    api: '/department',
    pagination: false,
    responseConfig: {
      dataIndex: 'data'
    },
    tableConfig: { scroll: { y: 420 } },
    wcolumns: [
      {
        title: '部门名称',
        dataIndex: 'depName',
        width: 300
      },
      {
        title: '排序',
        dataIndex: 'sort',
        width: 100
      },
      {
        title: '部门状态',
        dataIndex: 'state',
        width: 120,
        type: 'tag',
        align: 'center',
        tag: {
          1: { color: 'success', text: '启用' },
          0: { color: 'error', text: '禁用' }
        }
      },
      {
        title: '部门描述',
        dataIndex: 'intro'
      },

      {
        type: 'utcTimer',
        title: '创建时间',
        dataIndex: 'createAt',
        width: 180
      }
    ]
  },
  modalWidth: '40%',
  modalConfig: {
    header: {
      newTitle: '部门添加',
      editTitle: '部门编辑'
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
        type: 'tree-select',
        label: '上级部门',
        prop: 'parentId',
        defaultValueUn: true,

        asyncOptions: () => {
          return new Promise((resolve) => {
            //  遍历生成递归数组
            function _mapCascaderOptions(list: any[]) {
              const options: any[] = []
              for (const item of list) {
                if (item.children && checkArrayNotEmpty(item.children)) {
                  options.push({
                    value: item.id,
                    title: item.depName,
                    children: _mapCascaderOptions(item.children)
                  })
                } else {
                  options.push({
                    value: item.id,
                    title: item.depName
                  })
                }
              }
              return options
            }
            getEntireDepartments().then((res) => {
              const data = _mapCascaderOptions(res.data)
              resolve(data)
            })
          })
        },
        placeholder: '请选择上级部门'
      },
      {
        type: 'input',
        label: '部门名称',
        prop: 'depName',
        placeholder: '请输入部门名称',
        rules: [{ required: true, message: '请输入部门名称' }]
      },
      {
        type: 'input-number',
        label: '部门排序',
        prop: 'sort',
        initValue: 0
      },
      {
        type: 'switch',
        label: '状态',
        prop: 'state',
        initValue: true
      },
      {
        type: 'textarea',
        label: '部门备注',
        prop: 'intro',
        placeholder: '请输入部门备注',
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
