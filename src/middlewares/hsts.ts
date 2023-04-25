import { Context, KoaApp } from '@yunflyjs/yunfly';

import { isIncludes } from '../utils';
import { SecurityConfig } from '../types';

export default function Hsts(app: KoaApp, pluginConfig: SecurityConfig): void {
  const hstsConfig = pluginConfig?.hsts || {};

  if (!hstsConfig.enable) {
    return;
  }

  hstsConfig.ignore = hstsConfig.ignore || pluginConfig?.ignore || [];
  hstsConfig.match = hstsConfig.match || pluginConfig?.match || [];

  app.use(async (ctx: Context, next: () => any) => {
    await next();

    const path = ctx.path || ctx.request.url;

    if (
      (hstsConfig.ignore?.length && isIncludes(hstsConfig.ignore, path)) ||
      (hstsConfig.match?.length && !isIncludes(hstsConfig.match, path))
    ) {
      return;
    }

    const maxAge = hstsConfig.maxAge || 15552000;
    let val = `max-age=${maxAge}`;

    if (hstsConfig.includeSubDomains) {
      val += '; includeSubdomains';
    }

    ctx.set('strict-transport-security', val);
  });
}
