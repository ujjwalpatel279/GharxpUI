const envSettings = window as any;
export class Config {
  static lookupService: string = envSettings.REACT_APP_LOOKUP_SERVICE_URL ?? process.env.REACT_APP_LOOKUP_SERVICE_URL;
  static productService: string =
    envSettings.REACT_APP_PRODUCT_SERVICE_URL ?? process.env.REACT_APP_PRODUCT_SERVICE_URL;
   
  static accountService: string =
    envSettings.REACT_APP_ACCOUNT_SERVICE_URL ?? process.env.REACT_APP_ACCOUNT_SERVICE_URL;
  static applicationService: string =
    envSettings.REACT_APP_APPLICATION_SERVICE_URL ?? process.env.REACT_APP_APPLICATION_SERVICE_URL;
  static tenantGuid: string = envSettings.REACT_APP_TENANT_GUID ?? process.env.REACT_APP_TENANT_GUID;
  static clientId: string = envSettings.REACT_APP_CLIENT_ID ?? process.env.REACT_APP_CLIENT_ID;
  static domainUrl: string = envSettings.REACT_APP_DOMAIN_URL ?? process.env.REACT_APP_DOMAIN_URL;
  static tenantUrl: string = envSettings.REACT_APP_TENANT_URL ?? process.env.REACT_APP_TENANT_URL;
  static b2CPolicy: string = envSettings.REACT_APP_B2C_POLICY ?? process.env.REACT_APP_B2C_POLICY;
  static redirect: string = envSettings.REACT_APP_REDIRECT_PATH ?? process.env.REACT_APP_REDIRECT_PATH;
  static scopes: string = envSettings.REACT_APP_SCOPES ?? process.env.REACT_APP_SCOPES;
}
