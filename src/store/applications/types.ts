import { ReqMessage } from '../notifications/types'
import { AppRole } from '../user-helper/types'

interface App {
  ID: string
  CreatedBy: string
  Name: string
  Logo: string
  Description: string
  CreateAt: number
}

interface AppControl {
  ID: string
  AppID: string
  SignupMethods: Array<string>
  ExternSigninMethods: Array<string>
  RecaptchaMethod: string
  KycEnable: boolean
  SigninVerifyEnable: boolean
  InvitationCodeMust: boolean
}

interface BanApp {
  ID: string
  AppID: string
  Message: string
}

interface Application {
  App: App
  Ctrl: AppControl
  Ban: BanApp
}

interface GetApplicationsResponse {
  Infos: ReadonlyArray<Application>
}

interface GetApplicationsRequest {
  Message: ReqMessage
}

interface CreateApplicationRequest {
  Info: App
  Message: ReqMessage
}

interface CreateApplicationResponse {
  Info: App
}

interface UpdateApplicationRequest {
  Info: App
  Message: ReqMessage
}

interface UpdateApplicationResponse {
  Info: App
}

interface UpdateAppControlRequest {
  Info: AppControl
  Message: ReqMessage
}

interface UpdateAppControlResponse {
  Info: AppControl
}

interface CreateAppControlRequest {
  TargetAppID: string
  Info: AppControl
  Message: ReqMessage
}

interface CreateAppControlResponse {
  Info: AppControl
}

interface GetAppRolesByOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GetAppRolesByOtherAppResponse {
  Infos: Array<AppRole>
}

interface CreateAppRoleForOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
  Info: AppRole
}

interface CreateAppRoleForOtherAppResponse {
  Info: AppRole
}

interface AppGood {
  ID?: string
  AppID?: string
  GoodID: string
  Price: number
  Online: boolean
  InitAreaStrategy?: string
}

interface GetAppGoodsByOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GetAppGoodsByOtherAppResponse {
  Infos: Array<AppGood>
}

interface AuthorizeAppGoodForOtherAppRequest {
  TargetAppID: string
  Info: AppGood
  Message: ReqMessage
}

interface AuthorizeAppGoodForOtherAppResponse {
  Info: AppGood
}

interface UnauthorizeAppGoodRequest {
  ID: string
  Message: ReqMessage
}

interface UnauthorizeAppGoodResponse {
  Info: AppGood
}

interface Recommend {
  ID: string
  AppID: string
  GoodID: string
  RecommenderID: string
  Message: string
}

interface GetRecommendsByOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GetRecommendsByOtherAppResponse {
  Infos: Array<Recommend>
}

interface CreateRecommendForOtherAppRequest {
  TargetAppID: string
  Info: Recommend
  Message: ReqMessage
}

interface CreateRecommendForOtherAppResponse {
  Info: Recommend
}

interface UpdateRecommendRequest {
  Info: Recommend
  Message: ReqMessage
}

interface UpdateRecommendResponse {
  Info: Recommend
}

interface SetAppGoodPriceForOtherAppRequest {
  TargetAppID: string
  Info: AppGood
  Message: ReqMessage
}

interface SetAppGoodPriceForOtherAppResponse {
  Info: AppGood
}

interface SetAppGoodOnlineForOtherAppRequest {
  TargetAppID: string
  Info: AppGood
  Message: ReqMessage
}

interface SetAppGoodOnlineForOtherAppResponse {
  Info: AppGood
}

interface SetAppGoodOfflineForOtherAppRequest {
  TargetAppID: string
  Info: AppGood
  Message: ReqMessage
}

interface SetAppGoodOfflineForOtherAppResponse {
  Info: AppGood
}

interface AppWithdrawSetting {
  ID?: string
  AppID?: string
  CoinTypeID: string
  WithdrawAutoReviewCoinAmount: number
}

interface GetAppWithdrawSettingsByOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GetAppWithdrawSettingsByOtherAppResponse {
  Infos: Array<AppWithdrawSetting>
}

interface CreateAppWithdrawSettingForOtherAppRequest {
  TargetAppID: string
  Info: AppWithdrawSetting
  Message: ReqMessage
}

interface CreateAppWithdrawSettingForOtherAppResponse {
  Info: AppWithdrawSetting
}

interface UpdateAppWithdrawSettingRequest {
  Info: AppWithdrawSetting
  Message: ReqMessage
}

interface UpdateAppWithdrawSettingResponse {
  Info: AppWithdrawSetting
}

interface AppGoodPromotion {
  ID?: string
  AppID: string
  GoodID: string
  Message: string
  Start: number
  End: string
  Price: string
}

interface CreateAppGoodPromotionForOtherAppRequest {
  TargetAppID: string
  Info: AppGoodPromotion
  Message: ReqMessage
}

interface CreateAppGoodPromotionForOtherAppResponse {
  Info: AppGoodPromotion
}

interface UpdateAppGoodPromotionRequest {
  Info: AppGoodPromotion
  Message: ReqMessage
}

interface UpdateAppGoodPromotionResponse {
  Info: AppGoodPromotion
}

interface GetAppGoodPromotionsByOtherAppRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GetAppGoodPromotionsByOtherAppResponse {
  Infos: Array<AppGoodPromotion>
}

export {
  App,
  AppControl,
  BanApp,
  Application,
  GetApplicationsRequest,
  GetApplicationsResponse,
  CreateApplicationRequest,
  CreateApplicationResponse,
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  UpdateAppControlRequest,
  UpdateAppControlResponse,
  CreateAppControlRequest,
  CreateAppControlResponse,
  GetAppRolesByOtherAppRequest,
  GetAppRolesByOtherAppResponse,
  CreateAppRoleForOtherAppRequest,
  CreateAppRoleForOtherAppResponse,
  AppGood,
  GetAppGoodsByOtherAppRequest,
  GetAppGoodsByOtherAppResponse,
  AuthorizeAppGoodForOtherAppRequest,
  AuthorizeAppGoodForOtherAppResponse,
  UnauthorizeAppGoodRequest,
  UnauthorizeAppGoodResponse,
  Recommend,
  GetRecommendsByOtherAppRequest,
  GetRecommendsByOtherAppResponse,
  CreateRecommendForOtherAppRequest,
  CreateRecommendForOtherAppResponse,
  UpdateRecommendRequest,
  UpdateRecommendResponse,
  SetAppGoodPriceForOtherAppRequest,
  SetAppGoodPriceForOtherAppResponse,
  SetAppGoodOnlineForOtherAppRequest,
  SetAppGoodOnlineForOtherAppResponse,
  SetAppGoodOfflineForOtherAppRequest,
  SetAppGoodOfflineForOtherAppResponse,
  AppWithdrawSetting,
  GetAppWithdrawSettingsByOtherAppRequest,
  GetAppWithdrawSettingsByOtherAppResponse,
  CreateAppWithdrawSettingForOtherAppRequest,
  CreateAppWithdrawSettingForOtherAppResponse,
  UpdateAppWithdrawSettingRequest,
  UpdateAppWithdrawSettingResponse,
  AppGoodPromotion,
  CreateAppGoodPromotionForOtherAppRequest,
  CreateAppGoodPromotionForOtherAppResponse,
  UpdateAppGoodPromotionRequest,
  UpdateAppGoodPromotionResponse,
  GetAppGoodPromotionsByOtherAppRequest,
  GetAppGoodPromotionsByOtherAppResponse
}
