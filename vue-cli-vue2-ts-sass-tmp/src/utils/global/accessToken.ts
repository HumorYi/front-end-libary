import {
  getAccessToken as getAccessTokenBySession,
  setAccessToken as setAccessTokenBySession,
  delAccessToken as delAccessTokenBySession
} from '@globalUtils/sessionStorage'

import {
  getAccessToken as getAccessTokenByLocal,
  setAccessToken as setAccessTokenByLocal,
  delAccessToken as delAccessTokenByLocal
} from '@globalUtils/localStorage'

export const getAccessToken = () => {
  return getAccessTokenBySession()
    ? getAccessTokenBySession()
    : getAccessTokenByLocal()
}

export const setAccessToken = (token: string, isRemember = false) =>
  isRemember ? setAccessTokenBySession(token) : setAccessTokenByLocal(token)

export const delAccessToken = (isRemember = false) => {
  if (isRemember) {
    delAccessTokenByLocal()
  }

  delAccessTokenBySession()
}

export const invalidAccessToken = () => {
  const sessionAccessToken = getAccessTokenBySession()

  delAccessToken(
    !sessionAccessToken || sessionAccessToken === getAccessTokenByLocal()
  )
}
