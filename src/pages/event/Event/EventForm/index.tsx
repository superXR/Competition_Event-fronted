/*
 * @作者: 李洪文
 * @公司: thundersdata
 * @文件描述: 部门信息表单
 * @LastEditors: Please set LastEditors
 * @Date: 2019-10-05 22:46:43
 * @LastEditTime: 2020-04-26 21:04:26
 */
import * as React from 'react';
import Form, { FormComponentProps } from 'antd/lib/form';
import { FILTER_FORM_LAYOUT } from '@/constant';
import { Input } from 'antd';
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
          })(<Input placeholder="请输入" />)}
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
                message: '请输入组别',
              },
            ],
          })(<Input placeholder="请输入" />)}
        </Form.Item>

        <Form.Item label="状态" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('status', {
            rules: [
              {
                required: true,
                message: '请输入状态',
              },
            ],
          })(<Input placeholder="请输入" />)}
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
