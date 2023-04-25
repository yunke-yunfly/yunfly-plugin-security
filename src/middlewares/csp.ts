import { Context, KoaApp } from '@yunflyjs/yunfly';

import { isIncludes } from '../utils';
import { SecurityConfig } from '../types';

/**
 * csp
 *
 * @export
 * @param {*} app
 */
export default function Csp(app: KoaApp, pluginConfig: SecurityConfig): void {
  const cspConfig = pluginConfig?.csp || {};

  if (!cspConfig.enable) {
    return;
  }

  cspConfig.ignore = cspConfig.ignore || pluginConfig?.ignore || [];
  cspConfig.match = cspConfig.match || pluginConfig?.match || [];

  app.use(async (ctx: Context, next: { (): any; (err?: any): Promise<any> }) => {
    await next();

    const path = ctx.path || ctx.request.url;

    if (
      (cspConfig.ignore?.length && isIncludes(cspConfig.ignore, path)) ||
      (cspConfig.match?.length && !isIncludes(cspConfig.match, path))
    ) {
      return;
    }

    const directives = cspConfig.directives || {};

    if (!Object.keys(directives).length) {
      return;
    }

    let headerString: string = '';

    for (const key in directives) {
      const val = directives[key] || [];
      headerString += `${val} ${val.join(' ')};`;
    }

    const policy = cspConfig.reportOnly
      ? 'content-security-policy-report-only'
      : 'content-security-policy';
    ctx.set(policy, headerString);
  });
}
