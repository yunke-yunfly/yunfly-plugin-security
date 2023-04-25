import { KoaApp } from '@yunflyjs/yunfly';
import { SecurityConfig } from '../types';

const cors = require('koa2-cors');

export default function Cors(app: KoaApp, pluginConfig: SecurityConfig): void {
  const corsConfig = pluginConfig?.cors || {};

  if (!corsConfig.enable) {
    return;
  }

  app.use(cors(corsConfig));
}
