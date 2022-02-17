export enum ActionTypes {
  GetApplications = 'GET_APPLICATIONS',
  CreateApplication = 'CREATE_APPLICATION',
  UpdateApplication = 'UPDATE_APPLICATION',
  UpdateAppControl = 'UPDATE_APPLICATION_CONTROL',
  CreateAppControl = 'CREATE_APPLICATION_CONTROL',
  GetAppRolesByOtherApp = 'GET_APP_ROLES_BY_OTHER_APP',
  CreateAppRoleForOtherApp = 'CREATE_APP_ROLE_FOR_OTHER_APP',
  GetAppGoodsByOtherApp = 'GET_APP_GOODS_BY_OTHER_APP',
  AuthorizeAppGoodForOtherApp = 'AUTHORIZE_APP_GOOD_FOR_OTHER_APP',
  UnauthorizeAppGood = 'UNAUTHORIZE_APP_GOOD',
  GetRecommendsByOtherApp = 'GET_RECOMMENDS_BY_OTHER_APP',
  CreateRecommendForOtherApp = 'CREATE_RECOMMEND_FOR_OTHER_APP',
  SetAppGoodPriceForOtherApp = 'SET_APP_GOOD_PRICE_FOR_OTHER_APP',
  OnsaleAppGoodForOtherApp = 'ONSALE_APP_GOOD_FOR_OTHER_APP',
  OffsaleAppGoodForOtherApp = 'OFFSALE_APP_GOOD_FOR_OTHER_APP'
}
