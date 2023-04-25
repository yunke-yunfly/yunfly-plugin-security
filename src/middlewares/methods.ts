import { KoaApp, Context } from '@yunflyjs/yunfly';
import { getErrorCodeAndSetHttpCode } from '../utils';
import { MethodConfig, SecurityConfig } from '../types';

const methodNotAllowHttpCode = 405;

export default function Methods(app: KoaApp, pluginConfig: SecurityConfig): void {
  const methodsConfig = (pluginConfig?.methods || []) as MethodConfig;

  if (!methodsConfig.enable) {
    return;
  }

  app.use(async (ctx: Context, next: () => any) => {
    const method: any = (ctx.req.method || 'GET').toUpperCase();
    if (!methodsConfig.values || !methodsConfig.values.length) {
      return await next();
    }

    if (!(methodsConfig.values || []).includes(method)) {
      ctx.body = {
        code: getErrorCodeAndSetHttpCode(ctx, methodNotAllowHttpCode, true),
        msg: 'Method验证失败，请检查安全配置!',
      };
      return;
    }

    return await next();
  });
}
