import { SecurityOption } from './types';
import Security from './index';

/**
 * yunfly security plugin
 *
 * @export
 * @param {*} { app }
 */
export default function yunflySecurityPlugin({ koaApp, pluginConfig }: SecurityOption): void {
  Security(koaApp, pluginConfig);
}
