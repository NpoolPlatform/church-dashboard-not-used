import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { InspiresState } from './state'
import { Activity, CouponAllocated, CouponPool, DiscountPool, UserInvitationCode, UserSpecialReduction } from './types'

type InspireMutations<S = InspiresState> = {
  [MutationTypes.SetUserInvitationCodes] (state: S, payload: Array<UserInvitationCode>): void
  [MutationTypes.AppendUserInvitationCode] (state: S, payload: UserInvitationCode): void
  [MutationTypes.SetActivities] (state: S, payload: Array<Activity>): void
  [MutationTypes.AppendActivity] (state: S, payload: Activity): void
  [MutationTypes.SetCouponPools] (state: S, payload: Array<CouponPool>): void
  [MutationTypes.AppendCouponPool] (state: S, payload: CouponPool): void
  [MutationTypes.SetDiscountPools] (state: S, payload: Array<DiscountPool>): void
  [MutationTypes.AppendDiscountPool] (state: S, payload: DiscountPool): void
  [MutationTypes.SetUserSpecialReductions] (state: S, payload: Array<UserSpecialReduction>): void
  [MutationTypes.AppendUserSpecialReduction] (state: S, payload: UserSpecialReduction): void
  [MutationTypes.SetCouponsAllocated] (state: S, payload: Array<CouponAllocated>): void
  [MutationTypes.AppendCouponAllocated] (state: S, payload: CouponAllocated): void
  [MutationTypes.SetInspireSelectedAppID] (state: S, payload: string): void
}

const mutations: MutationTree<InspiresState> & InspireMutations = {
  [MutationTypes.SetUserInvitationCodes] (state: InspiresState, payload: Array<UserInvitationCode>) {
    if (payload.length > 0) {
      state.InvitationCodes.set(payload[0].AppID, payload)
    }
  },
  [MutationTypes.AppendUserInvitationCode] (state: InspiresState, payload: UserInvitationCode): void {
    let codes = state.InvitationCodes.get(payload.AppID)
    if (!codes) {
      codes = [] as Array<UserInvitationCode>
    }
    codes.push(payload)
    state.InvitationCodes.set(payload.AppID, codes)
  },
  [MutationTypes.SetActivities] (state: InspiresState, payload: Array<Activity>) {
    if (payload.length > 0) {
      state.Activities.set(payload[0].AppID, payload)
    }
  },
  [MutationTypes.AppendActivity] (state: InspiresState, payload: Activity): void {
    let acts = state.Activities.get(payload.AppID)
    if (!acts) {
      acts = [] as Array<Activity>
    }
    acts.push(payload)
    state.Activities.set(payload.AppID, acts)
  },
  [MutationTypes.SetCouponPools] (state: InspiresState, payload: Array<CouponPool>) {
    if (payload.length > 0) {
      state.CouponPools.set(payload[0].AppID, payload)
    }
  },
  [MutationTypes.AppendCouponPool] (state: InspiresState, payload: CouponPool): void {
    let coupons = state.CouponPools.get(payload.AppID)
    if (!coupons) {
      coupons = [] as Array<CouponPool>
    }
    coupons.push(payload)
    state.CouponPools.set(payload.AppID, coupons)
  },
  [MutationTypes.SetDiscountPools] (state: InspiresState, payload: Array<DiscountPool>) {
    if (payload.length > 0) {
      state.DiscountPools.set(payload[0].AppID, payload)
    }
  },
  [MutationTypes.AppendDiscountPool] (state: InspiresState, payload: DiscountPool): void {
    let coupons = state.DiscountPools.get(payload.AppID)
    if (!coupons) {
      coupons = [] as Array<DiscountPool>
    }
    coupons.push(payload)
    state.DiscountPools.set(payload.AppID, coupons)
  },
  [MutationTypes.SetUserSpecialReductions] (state: InspiresState, payload: Array<UserSpecialReduction>) {
    if (payload.length > 0) {
      state.UserSpecialReductions.set(payload[0].AppID, payload)
    }
  },
  [MutationTypes.AppendUserSpecialReduction] (state: InspiresState, payload: UserSpecialReduction): void {
    let coupons = state.UserSpecialReductions.get(payload.AppID)
    if (!coupons) {
      coupons = [] as Array<UserSpecialReduction>
    }
    coupons.push(payload)
    state.UserSpecialReductions.set(payload.AppID, coupons)
  },
  [MutationTypes.SetCouponsAllocated] (state: InspiresState, payload: Array<CouponAllocated>) {
    if (payload.length > 0) {
      state.CouponsAllocated.set(payload[0].AppID as string, payload)
    }
  },
  [MutationTypes.AppendCouponAllocated] (state: InspiresState, payload: CouponAllocated): void {
    let coupons = state.CouponsAllocated.get(payload.AppID as string)
    if (!coupons) {
      coupons = [] as Array<CouponAllocated>
    }
    coupons.push(payload)
    state.CouponsAllocated.set(payload.AppID as string, coupons)
  },
  [MutationTypes.SetInspireSelectedAppID] (state: InspiresState, payload: string): void {
    state.SelectedAppID = payload
  }
}

export { InspireMutations, mutations }
