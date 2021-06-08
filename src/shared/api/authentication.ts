import { AuthResponse } from 'msal/lib-commonjs/AuthResponse';
import { UserAgentApplication } from 'msal/lib-commonjs/UserAgentApplication';
import { Config } from '../../config/config';

const MsalUserAgent: UserAgentApplication = new UserAgentApplication({
  auth: {
    clientId: Config.clientId || '',
    authority: `https://${Config.domainUrl}/${Config.tenantUrl}/${Config.b2CPolicy}`,
    validateAuthority: false,
    redirectUri: Config.redirect,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true,
  },
});

const MsalGlobalUserAgent: UserAgentApplication = new UserAgentApplication({
  auth: {
    clientId: Config.clientId || '',
    redirectUri: Config.redirect,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true,
  },
});

let userAgentApplication = MsalUserAgent;
let authenticationToken: AuthResponse = undefined;

const useGlobal = () => {
  userAgentApplication = MsalGlobalUserAgent;
};

const getAppScope = (scopes: string[]) => {
  return scopes.map((scope) => `https://${Config.tenantUrl}/${Config.clientId}/${scope}`);
};

const getTokenSilent = (targetScopes?: string[]) => {
  return userAgentApplication
    .acquireTokenSilent({
      scopes: targetScopes || getAppScope(Config.scopes.split(',')),
    })
    .catch((error) => {
      signIn(targetScopes);
    })
    .then((result) => {
      authenticationToken = result as AuthResponse;
      return result;
    });
};

const signIn = (targetScopes?: string[]) => {
  // userAgentApplication.loginRedirect({
  //   scopes: targetScopes || getAppScope(Config.scopes.split(',')),
  //   prompt: 'consent',
  // });
};

const signOut = () => {
  userAgentApplication.logout();
};

const getBrokerId = async () => {
  if (
    authenticationToken === undefined ||
    authenticationToken?.uniqueId.length < 1 ||
    authenticationToken.expiresOn.getTime() <= new Date(new Date().toUTCString()).getTime()
  )
    await getTokenSilent();
  return authenticationToken?.uniqueId.length < 1
    ? authenticationToken?.account?.accountIdentifier ?? ''
    : authenticationToken.uniqueId;
};

const getUserName = () => {
  if (
    authenticationToken === undefined ||
    authenticationToken?.uniqueId.length < 1 ||
    authenticationToken.expiresOn.getTime() <= new Date(new Date().toUTCString()).getTime()
  )
    getTokenSilent();
  return authenticationToken?.account?.userName ?? authenticationToken?.idTokenClaims?.emails[0] ?? '';
};

const getToken = async () => {
  if (
    authenticationToken === undefined ||
    authenticationToken.expiresOn.getTime() <= new Date(new Date().toUTCString()).getTime()
  )
    await getTokenSilent();
  return authenticationToken.accessToken;
};

const getAccount = () => {
  let account;
  const accounts = userAgentApplication.getAllAccounts();
  if (accounts?.length ?? 0 > 0) account = accounts[0];
  if (account === undefined) account = userAgentApplication.getAccount();
  if (account !== undefined && authenticationToken === undefined) getTokenSilent();
  return {}; //account;
};

const isAuth = () => {
  // const hasAccount = userAgentApplication.getAllAccounts().length > 0 || userAgentApplication.getAccount() !== null;
  // if (hasAccount) getTokenSilent();
  // return hasAccount;
  return true;
};

export { getBrokerId, getUserName, getToken, getAccount, useGlobal, signOut, signIn, isAuth };
