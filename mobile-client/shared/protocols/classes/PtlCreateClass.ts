import { DbClass } from '../../db/DbClass'
import { BaseConf, BaseRequest, BaseResponse } from '../base'

export interface ReqCreateClass extends BaseRequest {
    name: string;
}

export interface ResCreateClass extends BaseResponse {
    class: DbClass;
}   

export const conf: BaseConf = {
    
}
