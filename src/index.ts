import { KoaApp } from '@yunflyjs/yunfly';
import Cors from './middlewares/cors';
import Csp from './middlewares/csp';
import Csrf from './middlewares/csrf';
import Hsts from './middlewares/hsts';
import Methods from './middlewares/methods';
import Whitelist from './middlewares/whitelist';
import Xframe from './middlewares/xframe';
import Xss from './middlewares/xss';
import { SecurityConfig } from './types';

export * from './types';

/**
 * security
 *
 * @export
 * @param {*} app
 */
export default function Security(app: KoaApp, pluginConfig: SecurityConfig): void {

  if (!pluginConfig?.enable) {
    return;
  }

  // whitelist
  Whitelist(app, pluginConfig);
  // method
  Methods(app, pluginConfig);
  // csrf
  Csrf(app, pluginConfig);
  // cors
  Cors(app, pluginConfig);
  // xframe
  Xframe(app, pluginConfig);
  // hsts
  Hsts(app, pluginConfig);
  // csp
  Csp(app, pluginConfig);
  // xss
  Xss(app, pluginConfig);
}
