import { ReqMessage } from '../notifications/types'

interface Language {
  ID: string
  Lang: string
  Logo: string
  Name: string
  Short: string
}

interface GetLanguagesResponse {
  Infos: ReadonlyArray<Language>
}

interface GetLanguagesRequest {
  Message: ReqMessage
}

interface AppLanguage {
  ID: string
  AppID: string
  LangID: string
}

interface AppLangInfo {
  AppLang: AppLanguage
  Lang: Language
}

interface GetAppLangInfosRequest {
  AppID: string
  Message: ReqMessage
}

interface GetAppLangInfosResponse {
  Infos: Array<AppLangInfo>
}

export {
  Language,
  GetLanguagesRequest,
  GetLanguagesResponse,
  AppLangInfo,
  GetAppLangInfosRequest,
  GetAppLangInfosResponse
}
