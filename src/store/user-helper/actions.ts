import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { UserMutations } from './mutations'
import { UserState } from './state'
import { api } from 'src/boot/axios'
import { LoginRequest, LoginResponse } from './types'
import { API } from './const'
import { useReCaptcha } from 'vue-recaptcha-v3'

interface UserActions {
  [ActionTypes.Login]({
    commit
  }: AugmentedActionContext<
    UserState,
    RootState,
    UserMutations<UserState>>,
    req: LoginRequest): void

  [ActionTypes.GetGoogleToken]({
    commit
  }: AugmentedActionContext<
    UserState,
    RootState,
    UserMutations<UserState>>,
    req: string): void
}

const actions: ActionTree<UserState, RootState> = {
  [ActionTypes.Login] ({ commit }, req: LoginRequest) {
    commit(MutationTypes.SetLoading, true)
    api
      .post<LoginRequest, LoginResponse>(API.LOGIN, req)
      .then((response: LoginResponse) => {
        commit(MutationTypes.SetUserInfo, response.Info)
        commit(MutationTypes.SetError, '')
        commit(MutationTypes.SetLoading, false)
      })
      .catch((err: Error) => {
        commit(MutationTypes.SetError, err.message)
        commit(MutationTypes.SetLoading, false)
      })
  },

  [ActionTypes.GetGoogleToken] ({ commit }, req: string) {
    const recaptcha = useReCaptcha()

    if (recaptcha) {
      const { executeRecaptcha, recaptchaLoaded } = recaptcha
      commit(MutationTypes.SetLoading, true)
      recaptchaLoaded()
        .then((loaded: boolean) => {
          if (loaded) {
            void executeRecaptcha(req)
              .then((token) => {
                commit(MutationTypes.SetGoogleToken, token)
                commit(MutationTypes.SetError, '')
                commit(MutationTypes.SetLoading, false)
              })
          }
        })
        .catch((err: Error) => {
          console.log(err)
          commit(MutationTypes.SetError, err.message)
          commit(MutationTypes.SetLoading, false)
        })
    }
  }
}

export { actions, UserActions }
