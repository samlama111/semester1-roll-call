import { DbClass } from '../../db/DbClass'
import { BaseRequest, BaseResponse } from '../base'

export interface ReqGetClasses extends BaseRequest {
}

export interface ResGetClasses extends BaseResponse {
    classes: DbClass[];
}
