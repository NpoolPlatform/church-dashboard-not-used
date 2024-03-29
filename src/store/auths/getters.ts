import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { AuthsState } from './state'
import { Auth, AuthHistory } from './types'

type AuthGetters = {
  getAuthsByApp (state: AuthsState): (appID: string) => Array<Auth>
  getAuthsByAppUser (state: AuthsState): (appID: string, userID: string) => Array<Auth>
  getAuthsByAppRole (state: AuthsState): (appID: string, roleID: string) => Array<Auth>
  getAuthHitoriesByAppID (state: AuthsState): (appID: string) => Array<AuthHistory>
  getAuthSelectedAppID (state: AuthsState): string
}

const getters: GetterTree<AuthsState, RootState> & AuthGetters = {
  getAuthsByApp: (state: AuthsState): (appID: string) => Array<Auth> => {
    const auths = [] as Array<Auth>
    return (appID: string) => {
      state.AppAuths.get(appID)?.forEach((auth) => {
        if (auth.RoleID === '' && auth.UserID === '') {
          auths.push(auth)
        }
      })
      return auths
    }
  },
  getAuthHitoriesByAppID: (state: AuthsState): (appID: string) => Array<AuthHistory> => {
    return (appID: string) => {
      return state.AuthHistories.get(appID) as Array<AuthHistory>
    }
  },
  getAuthsByAppUser: (state: AuthsState): (appID: string, userID: string) => Array<Auth> => {
    const auths = [] as Array<Auth>
    return (appID: string, userID: string) => {
      state.AppAuths.get(appID)?.forEach((auth) => {
        if (auth.UserID === userID) {
          auths.push(auth)
        }
      })
      return auths
    }
  },
  getAuthsByAppRole: (state: AuthsState): (appID: string, roleID: string) => Array<Auth> => {
    const auths = [] as Array<Auth>
    return (appID: string, roleID: string) => {
      state.AppAuths.get(appID)?.forEach((auth) => {
        if (auth.RoleID === roleID) {
          auths.push(auth)
        }
      })
      return auths
    }
  },
  getAuthSelectedAppID: (state: AuthsState): string => state.SelectedAppID as string
}

export { AuthGetters, getters }
