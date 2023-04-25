import { Config } from '@yunflyjs/yunfly';

/**
 * 包内置默认配置项
 *
 * @export
 * @param {KoaApp} app
 * @returns
 */
export default function config(): Config {
  const config: Config = {};

  config.security = {
    enable: true,
    match: [],
    ignore: [],
    methods: {
      enable: false,
      values: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    },
    csrf: {
      enable: false,
      match: [],
      ignore: [],
      ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
      keyName: 'x-csrf-token',
      bodyName: '_csrf',
      saltLength: 8,
      secretLength: 18,
    },
    xframe: {
      enable: true,
      value: 'sameorigin',
      match: [],
      ignore: [],
    },
    hsts: {
      enable: true,
      maxAge: 15552000,
      includeSubDomains: true,
      match: [],
      ignore: [],
    },
    cors: {
      enable: false,
      origin: () => '*',
      maxAge: 3600,
      credentials: true,
      exposeHeaders: [],
      // allowMethods: ['GET', 'POST', 'OPTIONS'],
      // allowHeaders: [
      //   'Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'trace-branch',
      //   'Cookie', 'token-test', "userName", "token", 'x-timestamp', 'x-autho-token'
      // ],
    },
    csp: {
      enable: false,
      reportOnly: false,
      directives: {},
      match: [],
      ignore: [],
    },
    xss: {
      enable: true,
      match: [],
      ignore: [],
      value: '1',
    },
  };

  return config;
}
