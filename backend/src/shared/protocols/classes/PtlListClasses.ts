import { DbClass } from '../../db/DbClass'
import { BaseConf, BaseRequest, BaseResponse } from '../base'

export interface ReqListClasses extends BaseRequest {
}

export interface ResListClasses extends BaseResponse {
    classes: DbClass[];
}

export const conf: BaseConf = {
    
}
