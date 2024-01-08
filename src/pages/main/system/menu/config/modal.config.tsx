import { PageModalConfig } from '@/base-ui/page-modal/type'
import { getEntireMenuList } from '@/services/main/system'
import { checkArrayNotEmpty } from '@/utils/checkValue'

export const modalConfig: PageModalConfig = {
  header: {
    newTitle: '菜单添加',
    editTitle: '菜单编辑'
  },

  formItems: [
    {
      type: 'tree-select',
      label: '上级菜单',
      prop: 'parentId',
      defaultValueUn: true,
      placeholder: '请选择上级菜单',
      asyncOptions: () => {
        return new Promise((resolve) => {
          //  遍历生成递归数组
          function _mapCascaderOptions(list: any[]) {
            const options: any[] = []
            for (const item of list) {
              if (item.children && checkArrayNotEmpty(item.children)) {
                options.push({
                  value: item.id,
                  title: item.menuName,
                  children: _mapCascaderOptions(item.children)
                })
              } else {
                options.push({
                  value: item.id,
                  title: item.menuName
                })
              }
            }
            return options
          }
          getEntireMenuList().then((res) => {
            const data = _mapCascaderOptions(res.data)
            resolve(data)
          })
        })
      },
      colConfig: {
        span: 24
      },
      labelCol: { span: 3 },
      wrapperCol: { span: 21 }
    },
    {
      type: 'radio-group',
      label: '菜单类型',
      prop: 'menuType',
      initValue: 1,
      rules: [{ required: true, message: '请选择菜单类型' }],
      options: [
        {
          value: 1,
          label: '菜单'
        },
        {
          value: 2,
          label: '按钮'
        }
      ],
      colConfig: {
        span: 24
      },
      labelCol: { span: 3 },
      wrapperCol: { span: 21 }
    },
    {
      type: 'input',
      label: '菜单名称',
      prop: 'menuName',
      placeholder: '请输入菜单名称',
      rules: [{ required: true, message: '请输入菜单名称' }]
    },
    {
      type: 'input-number',
      label: '排序',
      prop: 'sort',
      initValue: 0
    },
    {
      type: 'input',
      label: '路由地址',
      prop: 'url',
      placeholder: '请输入路由地址',
      visibleIf: {
        hidden: { menuType: 2 }
      }
    },
    {
      type: 'input',
      label: '重定向地址',
      prop: 'redirectUrl',
      placeholder: '请输入重定向地址',
      visibleIf: {
        hidden: { menuType: 2 }
      }
    },
    {
      type: 'input',
      label: '图标',
      prop: 'icon',
      placeholder: '请输入图标',
      visibleIf: {
        hidden: { menuType: 2 }
      }
    },
    {
      type: 'input',
      label: '链接地址',
      prop: 'link',
      placeholder: '请输入链接地址',
      visibleIf: {
        hidden: { menuType: 2 },
        disabled: {
          isLink: 0
        }
      }
    },
    {
      type: 'input',
      label: '权限标识',
      prop: 'permission',
      placeholder: '请输入权限标识',
      visibleIf: {
        hidden: { menuType: 1 }
      }
    },
    {
      type: 'radio-group',
      label: '是否外链',
      prop: 'isLink',
      visibleIf: {
        hidden: { menuType: 2 },
        disabled: { isIframe: 1 }
      },
      // 追踪其它字段变化修改当前字段值
      followFieldsChangeModifyValue: [
        {
          followKey: 'isIframe', // 跟踪字段索引
          followKeyValue: 1, // 跟踪的字段值
          modifyValue: 1 // 修改当前字段的值
        }
      ],
      initValue: 0,
      options: [
        {
          value: 1,
          label: '是'
        },
        {
          value: 0,
          label: '否'
        }
      ]
    },
    {
      type: 'radio-group',
      label: '是否内嵌',
      prop: 'isIframe',
      initValue: 0,
      visibleIf: {
        hidden: { menuType: 2 }
      },
      options: [
        {
          value: 1,
          label: '是'
        },
        {
          value: 0,
          label: '否'
        }
      ]
    }
  ]
}
