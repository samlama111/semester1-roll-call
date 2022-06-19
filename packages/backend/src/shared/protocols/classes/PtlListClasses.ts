import { DbClass } from '../../db/DbClass'
import { BaseRequest, BaseResponse } from '../base'

export interface ReqListClasses extends BaseRequest {
}

export interface ResListClasses extends BaseResponse {
    classes: DbClass[];
}
