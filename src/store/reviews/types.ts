import { ReqMessage } from '../notifications/types'
import { KYC } from '../kycs/types'
import { Good } from '../goods/types'

interface Review {
  ID: string
  AppID: string
  ObjectType: string
  ReviewerID: string
  State: string
  Message: string
  ObjectID: string
  Domain: string
}

interface KYCReview {
  KYC: KYC
  Review: Review
}

interface GetKYCReviewsResponse {
  Infos: ReadonlyArray<KYCReview>
}

interface GetKYCReviewsRequest {
  AppID: string
  Message: ReqMessage
}

interface GoodReview {
  Good: Good
  Review: Review
}

interface GetGoodReviewsRequest {
  Message: ReqMessage
}

interface GetGoodReviewsResponse {
  Infos: ReadonlyArray<GoodReview>
}

export {
  Review,
  KYCReview,
  GetKYCReviewsRequest,
  GetKYCReviewsResponse,
  GoodReview,
  GetGoodReviewsRequest,
  GetGoodReviewsResponse
}
