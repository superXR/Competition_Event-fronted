/*
 * @作者: 李洪文
 * @公司: thundersdata
 * @文件描述: 部门信息表单
 * @LastEditors: Please set LastEditors
 * @Date: 2019-10-05 22:46:43
 * @LastEditTime: 2020-05-03 17:47:28
 */
import * as React from 'react';
import Form, { FormComponentProps } from 'antd/lib/form';
import { FILTER_FORM_LAYOUT } from '@/constant';
import { Input, Select } from 'antd';
import styles from './index.scss';

import { compose, withState } from 'recompose';
import { EventEditModel } from '@/interfaces/event';
import ModalButtons from '@/components/ModalButtons';



export interface UserFormProps extends FormComponentProps {
  saving: boolean;
  detailData?: EventEditModel;
  onClose: () => void;
  onSubmit: (data: EventEditModel) => void;
}

class UserForm extends React.PureComponent<UserFormProps> {

  public componentDidMount() {
    const { detailData } = this.props;
    if (detailData) {
      this.props.form.setFieldsValue(detailData);
    }
  }

  public handleSubmit = () => {
    this.props.form.validateFields({ force: true }, (error: Error, values: EventEditModel) => {
      if (error) {
        return;
      }
      this.props.onSubmit(values);
    });
  };

  public render() {
    const { Option } = Select;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="horizontal" className={styles.form}>
        <Form.Item label="比赛项目名称" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('competitionEventName', {
            rules: [
              {
                required: true,
                message: '请输入比赛项目名称',
              },
            ],
          })(<Input placeholder="请输入" />
          )}
        </Form.Item>

        <Form.Item label="开始时间" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('planStartAt', {
            rules: [
              {
                required: true,
                message: '请输入开始时间',
              },
            ],
          })(<Input placeholder="请输入" />)}
        </Form.Item>

        <Form.Item label="结束时间" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('planEndAt', {
            rules: [
              {
                required: true,
                message: '请输入结束时间',
              },
            ],
          })(<Input placeholder="请输入" />)}
        </Form.Item>

        <Form.Item label="组别" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('suiteType', {
            rules: [
              {
                required: true,
                message: '请选择组别',
              },
            ],
          })(<Select style={{ width: 120 }}>
            <Option value="成年组">成年组</Option>
            <Option value="青少年组">青少年组</Option>
            <Option value="老年组">老年组</Option>
          </Select>)}
        </Form.Item>

        <Form.Item label="状态" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('status', {
            rules: [
              {
                required: true,
                message: '请输入状态',
              },
            ],
          })(<Select style={{ width: 120 }}>
            <Option value="未开始">未开始</Option>
            <Option value="进行中">进行中</Option>
            <Option value="已结束">已结束</Option>
          </Select>)}
        </Form.Item>

        <ModalButtons
          onCancel={this.props.onClose}
          onOk={this.handleSubmit}
          loading={this.props.saving}
        />
      </Form>
    );
  }
}

export default compose<
  {},
  {
    saving: boolean;
    detailData?: EventEditModel;
    onClose: () => void;
    onSubmit: (data: EventEditModel) => void;
  }
>(withState('vehicleList', 'changeVehicleList', []))(Form.create()(UserForm));
