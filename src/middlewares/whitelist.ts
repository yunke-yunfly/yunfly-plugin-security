import { KoaApp, Context } from '@yunflyjs/yunfly';
import { SecurityConfig } from '../types';
import { getErrorCodeAndSetHttpCode } from '../utils';

const whitelistNotAllowHttpCode = 403;

export default function Whitelist(app: KoaApp, pluginConfig: SecurityConfig): void {
  const whitelist = pluginConfig.whitelist || {};

  if (!whitelist.enable) {
    return;
  }

  const values = whitelist.values || [];
  let pass = !values.length;
  values.forEach((val) => {
    if (val === '*') {
      pass = true;
    }
  });
  if (pass) {
    return;
  }

  app.use(async (ctx: Context, next: () => any) => {

    const host = ctx.hostname;
    if (host === '127.0.0.1' || host === 'localhost') {
      return await next();
    }
    if (!values.includes(host)) {
      ctx.body = {
        code: getErrorCodeAndSetHttpCode(ctx, whitelistNotAllowHttpCode, true),
        msg: 'Whitelist验证失败，请检查安全配置!',
      };
      return;
    }

    return await next();
  });
}
