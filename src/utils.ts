import * as path from 'path';

import { AnyObject } from './types';

// package.json 配置
export const PACKAGE_JSON_CONFIG = path.join(process.cwd(), './package.json').replace(/\\/g, '//');

/**
 * 获得运行目录的package.json配置
 *
 * @return {*}  {AnyObject}
 */
export const getPackageJson = (): AnyObject => require(PACKAGE_JSON_CONFIG);

/**
 *
 *
 * @param {string[]} times
 * @param {string} item
 * @return {*}
 */
export const isIncludes = (times: string[], _item: string) => {
  if (!times || !times.length || !_item) {
    return false;
  }
  const result = times.filter((item: any) => item.indexOf(_item) > -1) || [];
  return !!result.length;
};

export const getErrorCodeAndSetHttpCode = (
  ctx: any,
  httpCode: number,
  sameCode: boolean = false,
) => {
  const errorConfig = ctx?.config?.error;

  if (errorConfig?.enableHttpCode) {
    // 加判断逻辑
    ctx.status = httpCode;
  }

  if (sameCode) return httpCode;
  const code = getConfigErrorCodeNumber(errorConfig?.errCode);
  return code;
};

// 获取配置的数字类型
export type Key = number | string;
export type ErrorCode = number | true | Record<Key, Key>;
export function getConfigErrorCodeNumber(errorCode?: ErrorCode) {
  const defaultCode = 2;
  if (typeof errorCode === 'number') return errorCode;
  if (errorCode && typeof errorCode === 'object' && errorCode['*']) return errorCode['*'];
  return defaultCode;
}
