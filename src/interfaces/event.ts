import { PAGE_SIZE } from './common';

/*
 * @Author: 徐瑞
 * @Date: 2020-04-06 20:32:06
 * @LastEditTime: 2020-04-23 23:29:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \labs-fronted\src\interfaces\event.ts
 */
export interface EventModel {
  // 比赛项目编码
  eventCode: string;
  // 比赛项目名称
  eventName: string;
  // 开始时间
  planStartAt: string;
  // 结束时间
  planEndAt: number;
  // 组别
  suitType: number;
  // 组别名称
  suitTypeDesc: string;
  // 状态
  status: number;
  // 状态描述
  statusDesc: string;
  // 创建时间
  createdAt: string;
  // 创建人
  createdBy: string;
  // 更新时间
  updatedAt: string;
  // 更新人
  updatedBy: string;
}

export interface EventEditModel {
  // 比赛项目名称
  eventName?: string;
  // 开始时间
  planStartAt?: string;
  // 结束时间
  planEndAt?: number;
  // 组别
  suitType?: number;
  // 状态
  status?: number;
}

export interface EventSearchProps {
  // 比赛项目名称
  eventName?: string;
  // 比赛项目编码
  eventCode?: string;

  page?: number;
  pageSize?: number;
}

export const defaultEventSearchProps: EventSearchProps = {
  eventName: undefined,
  eventCode: undefined,
  page: 1,
  pageSize: PAGE_SIZE,
};

