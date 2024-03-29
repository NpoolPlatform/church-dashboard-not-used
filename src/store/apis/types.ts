import { ReqMessage } from '../notifications/types'

interface APIBase {
  ID: string
  ServiceName: string
  Method: string
  Path: string
  Exported: boolean
  PathPrefix: string
  Protocol: string
  CreateAt: number
  UpdateAt: number
}

interface API extends APIBase {
  Domains: Array<string>
}

interface ExpandAPI extends APIBase {
  Domains: string
}

interface GetAPIsResponse {
  Infos: ReadonlyArray<API>
}

interface GetAPIsRequest {
  Message: ReqMessage
}

export {
  API,
  ExpandAPI,
  GetAPIsRequest,
  GetAPIsResponse
}
