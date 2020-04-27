/*
 * @文件描述: 首页
 * @公司: 山东大学
 * @作者: 李洪文
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-09 15:40:17
 * @LastEditTime: 2020-04-27 14:50:56
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import {
  EventModel,
  EventEditModel,
  EventSearchProps,
  defaultEventSearchProps,
} from '@/interfaces/event';
import CustomTable from '@/components/CustomTable';
import { compose, withState } from 'recompose';
import { EventService } from '@/services/event.service';
import SearchFilter from './SearchFilter';
import Loading from '@/components/Loading';
import { Divider, Modal } from 'antd';
const CommonModal = React.lazy(() => import('@/components/CommonModal'));
import EventForm from './EventForm';
import { ButtonItem } from '@/interfaces/component';

export interface EventPageProps {
  eventService: EventService;
  selectedRowKeys: string[];
  selectRow: (selectedRowKeys: string[]) => void;

  searchProps: EventSearchProps;
  setSearchProps: (searchProps: EventSearchProps) => void;

  event?: EventEditModel;
  setEvent: (event?: EventEditModel) => void;

  visible: boolean;
  setVisible: (visible: boolean) => void;
}

@inject('eventService')
@observer
class EventPage extends React.Component<EventPageProps> {
  private columns = [
    { title: '比赛项目编码', dataIndex: 'competitionEventCode' },
    { title: '比赛项目名称', dataIndex: 'competitionEventName' },
    { title: '开始时间', dataIndex: 'planStartAt' },
    { title: '结束时间', dataIndex: 'planEndAt' },
    { title: '组别', dataIndex: 'suiteType' },
    { title: '状态', dataIndex: 'status' },
    { title: '创建时间', dataIndex: 'createdAt' },
    { title: '创建人', dataIndex: 'createdBy' },
    { title: '更新时间', dataIndex: 'updatedAt' },
    { title: '更新人', dataIndex: 'updatedBy' },
    {
      title: '操作',
      render: (_: any, record: EventModel) => (
        <>
          <a
            onClick={() => {
              this.props.setEvent({
                ...record,
              });
              this.props.setVisible(true);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              this.handleDelete([record.competitionEventCode]);
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  public componentDidMount() {
    this.props.eventService.fetchPageData(this.props.searchProps);
  }

  public render() {
    const { selectRow, selectedRowKeys, eventService } = this.props;
    const {
      pageData: { list, page, total },
      loading,
    } = eventService.store;

    const buttons: ButtonItem[] = [
      {
        text: '新增',
        icon: 'icon-xinzeng',
        type: 'primary',
        onClick: () => {
          this.props.setEvent(undefined);
          this.props.setVisible(true);
        },
      },
      {
        text: '删除',
        icon: 'icon',
        disabled: this.props.selectedRowKeys.length === 0,
        type: 'default',
        onClick: () => this.handleDelete(this.props.selectedRowKeys),
      },
    ];

    return (
      <>
        <CustomTable
          loading={loading}
          columns={this.columns}
          buttons={buttons}
          dataSource={list}
          current={page}
          total={total}
          genRowKey={(record: EventModel) => `${record.competitionEventCode}`}
          onPagination={(current: number) => {
            const searchProps = {
              ...this.props.searchProps,
              page: current,
            };
            eventService.fetchPageData(searchProps);
          }}
          onRow={(record: EventModel) => ({
            onClick: () => selectRow([`${record.competitionEventCode}`]),
          })}
          rowSelection={{
            columnTitle: '选择',
            selectedRowKeys,
            onChange: (keys: string[]) => selectRow(keys),
          }}
        >
          <SearchFilter
            searchProps={this.props.searchProps}
            changeSearchProps={props => {
              this.props.setSearchProps({
                ...this.props.setSearchProps,
                ...props,
              });
            }}
            onSearch={() => {
              eventService.fetchPageData(this.props.searchProps);
            }}
          />
        </CustomTable>

        <React.Suspense fallback={<Loading />}>
          <CommonModal
            title={!!this.props.event ? '修改比赛项目' : '新增比赛项目'}
            visible={this.props.visible}
            setVisible={this.props.setVisible}
          >
            <EventForm
              saving={loading}
              detailData={this.props.event}
              onClose={() => this.props.setVisible(false)}
              onSubmit={this.handleSave}
            />
          </CommonModal>
        </React.Suspense>
      </>
    );
  }

  private handleDelete = (codeList: string[]) => {
    if (!codeList || codeList.length === 0) {
      return;
    }

    const modal = Modal.confirm({
      centered: true,
      title: `您确定要删除选定的${codeList.length}个部门吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        modal.update({
          okButtonProps: {
            loading: true,
          },
        });
        const result = await this.props.eventService.delete(codeList);
        if (result) {
          this.props.eventService.fetchPageData({
            ...this.props.searchProps,
            page: 1,
          });
          this.props.selectRow([])
        }
      },
    });
  };

  private handleSave = (data: EventEditModel) => {
    let result: Promise<boolean>;
    if (this.props.event) {
      result = this.props.eventService.update({
        ...data,
        competitionEventCode: this.props.event.competitionEventCode,
      });
    } else {
      result = this.props.eventService.add(data);
    }

    result.then(() => {
      this.props.eventService.fetchPageData(this.props.searchProps);
      this.props.setVisible(false);
    });
  };
}


export default compose(
  withState('selectedRowKeys', 'selectRow', []),
  withState('searchProps', 'setSearchProps', defaultEventSearchProps),
  withState('event', 'setEvent', undefined),
  withState('visible', 'setVisible', false),
)(EventPage);
