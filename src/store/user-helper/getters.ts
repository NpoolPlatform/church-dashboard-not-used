import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { UserState } from './state'
import { UserInfo } from './types'

type UserGetters = {
  getUserInfo (state: UserState): UserInfo
  getLogined (state: UserState): boolean
  getGoogleToken (state: UserState): string
  getUserLoading (state: UserState): boolean
  getUserError (state: UserState): string
}

const getters: GetterTree<UserState, RootState> & UserGetters = {
  getUserInfo: (state: UserState): UserInfo => state.Info,
  getLogined: (state: UserState): boolean => {
    return state.Info.UserID !== ''
  },
  getGoogleToken: (state: UserState): string => state.GoogleToken,
  getUserLoading: (state: UserState): boolean => state.loading,
  getUserError: (state: UserState): string => state.error
}

export { UserGetters, getters }
