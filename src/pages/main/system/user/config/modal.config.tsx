import { PageModalConfig } from '@/base-ui/page-modal/type'
import { getEntireDepartments, getEntireRoles } from '@/services/main/system'
import { checkArrayNotEmpty } from '@/utils/checkValue'
import { fetchAsyncOptions } from '@/utils/fetch-async-options'

export const modalConfig: PageModalConfig = {
  header: {
    newTitle: '用户添加',
    editTitle: '用户编辑'
  },
  editHidden: ['password'],

  formItems: [
    {
      type: 'input',
      label: '用户名',
      prop: 'username',
      placeholder: '请输入用户名',
      rules: [{ required: true, message: '请输入用户名' }]
    },

    {
      type: 'input',
      label: '用户昵称',
      prop: 'nickname',
      placeholder: '请输入用户昵称'
    },
    {
      type: 'switch',
      label: '状态',
      prop: 'state',
      initValue: true
    },
    {
      type: 'password',
      label: '登录密码',
      prop: 'password',
      placeholder: '请输入登录密码',
      colConfig: {
        span: 24
      },
      labelCol: { span: 3 },
      wrapperCol: { span: 21 }
    },
    {
      type: 'input',
      label: '邮箱',
      prop: 'email',
      placeholder: '请输入邮箱'
    },
    {
      type: 'input',
      label: '手机号码',
      prop: 'telephone',
      placeholder: '请输入手机号码'
    },

    {
      type: 'select',
      label: '选择角色',
      prop: 'roleId',
      placeholder: '请选择角色',
      defaultValueUn: true,
      asyncOptions: fetchAsyncOptions(getEntireRoles(), {
        dataIndex: 'data',
        labelIndex: 'roleName'
      })
    },
    {
      type: 'tree-select',
      label: '选择部门',
      prop: 'departmentId',
      placeholder: '请选择部门',
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
      }
    },

    {
      type: 'textarea',
      label: '介绍',
      prop: 'intro',
      placeholder: '请输入介绍',
      colConfig: {
        span: 24
      },
      autoSize: {
        minRows: 3,
        maxRows: 5
      },
      labelCol: { span: 3 },
      wrapperCol: { span: 21 }
    }
  ]
}
