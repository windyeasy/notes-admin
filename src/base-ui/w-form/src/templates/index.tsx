import React, { useEffect, useState } from 'react'
import {
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect
} from 'antd'
import type { ExtendFormItem } from '../type'
import type { WBaseFormItem } from '..'
import FormTree from '../components/form-tree'
import { checkArrayNotEmpty } from '@/utils/checkValue'

export type WFormItemType =
  | 'input'
  | 'select'
  | 'rangePicker'
  | 'password'
  | 'textarea'
  | 'cascader'
  | 'input-number'
  | 'switch'
  | 'tree-select'
  | 'tree'
  | 'radio-group'
  | 'custom'
type NewExtendFormItem = ExtendFormItem<WBaseFormItem>

const { RangePicker } = DatePicker
export const extendFormItems: NewExtendFormItem[] = [
  {
    type: 'input',
    render: (item) => {
      return (
        <Form.Item
          label={item.label}
          name={item.prop}
          labelCol={item.labelCol}
          wrapperCol={item.wrapperCol}
          rules={item.rules}
        >
          <Input placeholder={item.placeholder} disabled={item.disabled} />
        </Form.Item>
      )
    }
  },
  {
    type: 'select',
    render: (item) => {
      const [options, setOptions] = useState(item.options || [])
      useEffect(() => {
        if (item.asyncOptions && !item.options) {
          item.asyncOptions().then((options: any) => {
            setOptions(options)
          })
        }
      }, [])
      return (
        <Form.Item
          label={item.label}
          name={item.prop}
          labelCol={item.labelCol}
          wrapperCol={item.wrapperCol}
          rules={item.rules}
        >
          <Select placeholder={item.placeholder} options={options} disabled={item.disabled} />
        </Form.Item>
      )
    }
  },
  {
    type: 'rangePicker',
    render: (item) => {
      return (
        <Form.Item
          label={item.label}
          labelCol={item.labelCol}
          wrapperCol={item.wrapperCol}
          name={item.prop}
          rules={item.rules}
        >
          <RangePicker />
        </Form.Item>
      )
    }
  },
  {
    type: 'password',
    render: (item) => {
      return (
        <Form.Item
          label={item.label}
          labelCol={item.labelCol}
          wrapperCol={item.wrapperCol}
          name={item.prop}
        >
          <Input.Password placeholder={item.placeholder} disabled={item.disabled} />
        </Form.Item>
      )
    }
  },
  {
    type: 'custom',
    render: (item) => {
      if (item.render) {
        return item.render(item)
      } else {
        return <></>
      }
    }
  },
  {
    type: 'textarea',
    render: (item) => {
      return (
        <Form.Item
          label={item.label}
          labelCol={item.labelCol}
          wrapperCol={item.wrapperCol}
          name={item.prop}
        >
          <Input.TextArea
            placeholder={item.placeholder}
            autoSize={item.autoSize}
            disabled={item.disabled}
          />
        </Form.Item>
      )
    }
  },
  // 级联选择器
  {
    type: 'cascader',
    render: (item) => {
      const [options, setOptions] = useState(item.options || [])
      useEffect(() => {
        if (item.asyncOptions) {
          item.asyncOptions().then((options: any) => {
            setOptions(options)
          })
        }
      }, [item.asyncOptions])
      return (
        <Form.Item
          label={item.label}
          name={item.prop}
          labelCol={item.labelCol}
          wrapperCol={item.wrapperCol}
          rules={item.rules}
        >
          <Cascader
            placeholder={item.placeholder}
            options={item.options || options}
            disabled={item.disabled}
          />
        </Form.Item>
      )
    }
  },
  {
    type: 'input-number',
    render: (item) => {
      return (
        <Form.Item
          label={item.label}
          name={item.prop}
          labelCol={item.labelCol}
          wrapperCol={item.wrapperCol}
          rules={item.rules}
        >
          <InputNumber
            placeholder={item.placeholder}
            min={item.min}
            max={item.max}
            defaultValue={item.defaultValue}
            disabled={item.disabled}
          />
        </Form.Item>
      )
    }
  },
  {
    type: 'switch',
    render: (item) => {
      return (
        <Form.Item
          label={item.label}
          name={item.prop}
          labelCol={item.labelCol}
          wrapperCol={item.wrapperCol}
          rules={item.rules}
          valuePropName="checked"
        >
          <Switch disabled={item.disabled} />
        </Form.Item>
      )
    }
  },
  // 树选择器
  {
    type: 'tree-select',
    render: (item) => {
      const [options, setOptions] = useState(item.options || [])
      useEffect(() => {
        if (item.asyncOptions && !item.options) {
          item.asyncOptions().then((options: any) => {
            setOptions(options)
          })
        }
      }, [])

      return (
        <Form.Item
          label={item.label}
          name={item.prop}
          labelCol={item.labelCol}
          wrapperCol={item.wrapperCol}
          rules={item.rules}
        >
          <TreeSelect
            showSearch
            style={{ width: '100%' }}
            placeholder={item.placeholder}
            allowClear
            treeData={options}
            disabled={item.disabled}
          />
        </Form.Item>
      )
    }
  },
  // 树形控件
  {
    type: 'tree',
    render: (item) => {
      const [options, setOptions] = useState(item.options || [])
      useEffect(() => {
        if (item.asyncOptions && !item.options) {
          item.asyncOptions().then((options: any) => {
            setOptions(options)
          })
        } else {
          // 当是page-modal里面处理异步数据时，这里需要监听数据变化
          Object.defineProperty(item, 'options', {
            set() {
              if (item.options && checkArrayNotEmpty(item.options)) {
                const options = [...item.options]
                setOptions(options)
              }
            }
          })
        }
      }, [])

      return (
        <>
          {options.length && (
            <Form.Item
              label={item.label}
              name={item.prop}
              labelCol={item.labelCol}
              wrapperCol={item.wrapperCol}
              rules={item.rules}
            >
              <FormTree checkable={item.checkable} style={{ width: '100%' }} treeData={options} />
            </Form.Item>
          )}
        </>
      )
    }
  },
  {
    type: 'radio-group',
    render: (item) => {
      return (
        <Form.Item
          label={item.label}
          name={item.prop}
          labelCol={item.labelCol}
          wrapperCol={item.wrapperCol}
          rules={item.rules}
        >
          <Radio.Group>
            {item?.options?.map((radioItem: any) => {
              return (
                <Radio value={radioItem.value} key={radioItem.value} disabled={item.disabled}>
                  {radioItem.label}
                </Radio>
              )
            })}
          </Radio.Group>
        </Form.Item>
      )
    }
  }
]
