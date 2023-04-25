import { Context, KoaApp } from '@yunflyjs/yunfly';

import { isIncludes } from '../utils';
import { SecurityConfig } from '../types';

/**
 * xframe
 * The X-Frame-Options HTTP 响应头是用来给浏览器 指示允许一个页面 可否在 <frame>, <iframe>, <embed> 或者 <object> 中展现的标记。
 * 站点可以通过确保网站没有被嵌入到别人的站点里面，从而避免 clickjacking 攻击。
 * X-Frame-Options 有三个可能的值：deny,sameorigin,allow-from uri
 * @export
 * @param {*} app
 */
export default function Xframe(app: KoaApp, pluginConfig: SecurityConfig): void {
  const xframeConfig = pluginConfig?.xframe || {};

  if (!xframeConfig.enable) {
    return;
  }

  xframeConfig.ignore = xframeConfig.ignore || pluginConfig?.ignore || [];
  xframeConfig.match = xframeConfig.match || pluginConfig?.match || [];

  app.use(async (ctx: Context, next: () => any) => {
    await next();

    const path = ctx.path || ctx.request.url;

    if (
      (xframeConfig.ignore?.length && isIncludes(xframeConfig.ignore, path)) ||
      (xframeConfig.match?.length && !isIncludes(xframeConfig.match, path))
    ) {
      return;
    }

    const value = xframeConfig.value || 'sameorigin';

    ctx.set('x-frame-options', value);
  });
}
