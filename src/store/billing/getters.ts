import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { BillingsState } from './state'
import { CoinAccountTransaction, Payment, PlatformBenefit, UserBenefit, UserWithdraw } from './types'

type BillingGetters = {
  getPlatformBenefits (state: BillingsState): Array<PlatformBenefit>
  getUserBenefits (state: BillingsState): Array<UserBenefit>
  getCoinAccountTransactions (state: BillingsState): Array<CoinAccountTransaction>
  getUserWithdraws (state: BillingsState): Array<UserWithdraw>
  getPayments (state: BillingsState): Array<Payment>
}

const getters: GetterTree<BillingsState, RootState> & BillingGetters = {
  getPlatformBenefits: (state: BillingsState): Array<PlatformBenefit> => state.PlatformBenefits,
  getUserBenefits: (state: BillingsState): Array<UserBenefit> => state.UserBenefits,
  getCoinAccountTransactions: (state: BillingsState): Array<CoinAccountTransaction> => state.Transactions,
  getUserWithdraws: (state: BillingsState): Array<UserWithdraw> => state.UserWithdraws,
  getPayments: (state: BillingsState): Array<Payment> => state.Payments
}

export { BillingGetters, getters }
