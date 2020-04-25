/*
 * @作者: 徐瑞
 * @公司: 山东大学
 * @文件描述: file content
 * @LastEditors: Please set LastEditors
 * @Date: 2019-09-13 07:27:24
 * @LastEditTime: 2020-04-18 18:01:24
 */
import { observable } from 'mobx';
import { EventModel } from '@/interfaces/event';

import { Pagination, initalPaginationValue } from '@/interfaces/common';

export class EventStore {
  // 正在获取数据状态
  @observable
  public loading: boolean;

  // 部门分页列表数据
  @observable
  public pageData: Pagination<EventModel> = initalPaginationValue;

}
