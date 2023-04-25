import { KoaApp, Context } from '@yunflyjs/yunfly';
import { isIncludes } from '../utils';
import { SecurityConfig } from '../types';

/**
 * xss
 *
 * @export
 * @param {*} app
 * @return {*}
 */
export default function Xss(app: KoaApp, pluginConfig: SecurityConfig): void {
  const xssConfig = pluginConfig?.xss || {};

  if (!xssConfig.enable) {
    return;
  }

  xssConfig.ignore = xssConfig.ignore || pluginConfig?.ignore || [];
  xssConfig.match = xssConfig.match || pluginConfig?.match || [];

  app.use(async (ctx: Context, next: () => any) => {
    await next();

    const path = ctx.path || ctx.request.url;

    if (
      (xssConfig.ignore?.length && isIncludes(xssConfig.ignore, path)) ||
      (xssConfig.match?.length && !isIncludes(xssConfig.match, path))
    ) {
      return;
    }

    const value: string | string[] = xssConfig.value || '1';

    ctx.set('x-xss-protection', value);
  });
}
