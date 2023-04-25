import { KoaApp, Context } from '@yunflyjs/yunfly';

export interface AnyObject {
  [props: string]: any;
}

export interface SecurityOption {
  koaApp: KoaApp;
  pluginConfig: SecurityConfig;
}

export interface SecurityConfig {
  enable: boolean;
  match?: string[];
  ignore?: string[];
  whitelist?: WhitelistConfig;
  csrf?: CsrfConfig;
  xframe?: XframeConfig;
  hsts?: HstsConfig;
  cors?: CorsOptions;
  methods?: MethodConfig;
  csp?: CspConfig;
  xss?: XssConfig;
}

export interface WhitelistConfig {
  enable?: boolean;
  values?: string[];
}

export interface CsrfConfig {
  enable?: boolean;
  match?: string[];
  ignore?: string[];
  ignoreMethods?: string[];
  keyName?: string;
  bodyName?: string;
  saltLength?: number;
  secretLength?: number;
}

export interface XframeConfig {
  enable?: boolean;
  match?: string[];
  ignore?: string[];
  value?: string;
}

export interface HstsConfig {
  enable?: boolean;
  match?: string[];
  ignore?: string[];
  maxAge?: number;
  includeSubDomains?: boolean;
}

export interface CorsOptions {
  enable?: boolean;
  origin?: string | ((ctx: Context) => boolean | string);
  exposeHeaders?: string[];
  maxAge?: number;
  credentials?: boolean;
  allowMethods?: string[];
  allowHeaders?: string[];
}

export interface MethodConfig {
  enable?: boolean;
  values?: Array<'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE'>;
}

export interface CspConfig {
  enable?: boolean;
  match?: string[];
  ignore?: string[];
  reportOnly?: boolean;
  directives?: DirectivesConfig;
}

export interface XssConfig {
  enable?: boolean;
  match?: string[];
  ignore?: string[];
  value?: '0' | '1' | '1;mode=block';
}

export interface DirectivesConfig {
  [propkey: string]: string[];
}

export interface AnyOptionConfig {
  [props: string]: any;
}
