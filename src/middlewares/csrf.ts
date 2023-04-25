import { Context, KoaApp } from '@yunflyjs/yunfly';
import { CsrfConfig, SecurityConfig } from '../types';
import { getErrorCodeAndSetHttpCode, isIncludes } from '../utils';

const Tokens = require('csrf');
const csrfHttpCode = 400;

/**
 * csrf
 *
 * @export
 * @param {*} app
 */
export default function Csrf(app: KoaApp, pluginConfig: SecurityConfig): void {
  const config = app.context.config || app.config || {};
  const csrfConfig: CsrfConfig = pluginConfig?.csrf || {};

  if (!csrfConfig.enable) {
    return;
  }

  csrfConfig.ignore = csrfConfig.ignore || pluginConfig?.ignore || [];
  csrfConfig.match = csrfConfig.match || pluginConfig?.match || [];

  const resConfig = (config.response || {}) as any;

  const tokens = new Tokens({
    saltLength: csrfConfig.saltLength || 8,
    secretLength: csrfConfig.secretLength || 18,
  });

  /**
   * gen token
   */
  app.use(async (ctx: Context, next: () => any) => {
    if (ctx.req.url === '/csrf/token') {
      let secret = ctx.session.secret || null;
      if (!secret) {
        secret = tokens.secretSync();
        ctx.session.secret = secret;
      }
      const token = tokens.create(secret);
      ctx.cookies.set(csrfConfig.keyName as string, token);
      ctx.body = { code: resConfig.succCode || 0, data: token };
      return;
    }
    await next();
  });

  /**
   *verify token
   */
  app.use(async (ctx: Context, next: () => any) => {
    const method = ctx.req.method as string;
    const path = ctx.path || ctx.request.url;

    if (
      csrfConfig.ignoreMethods?.includes(method) ||
      (csrfConfig.ignore?.length && isIncludes(csrfConfig.ignore, path)) ||
      (csrfConfig.match?.length && !isIncludes(csrfConfig.match, path))
    ) {
      return await next();
    }

    const request =
      (method === 'POST' ? (ctx.request as any).body : (ctx.request as any).query) || {};

    const bodyToken = request[csrfConfig.bodyName as string] || null;
    const token =
      bodyToken ||
      ctx.get(csrfConfig.keyName as string) ||
      ctx.cookies.get(csrfConfig.keyName as string) ||
      '';
    const errCode = getErrorCodeAndSetHttpCode(ctx, csrfHttpCode);

    if (!token) {
      ctx.body = { code: errCode, msg: 'CSRF token is undefined!' };
      return;
    }

    if (!tokens.verify(ctx.session.secret, token)) {
      ctx.body = { code: errCode, msg: 'Invalid CSRF token!' };
      return;
    }

    return await next();
  });
}
