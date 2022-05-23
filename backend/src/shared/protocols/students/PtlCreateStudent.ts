import { DbStudent } from '../../db/DbStudent'
import { BaseConf, BaseRequest, BaseResponse } from '../base'

export interface ReqCreateStudent extends BaseRequest {
    firstname: string;
    lastname: string;
    email: string;
}

export interface ResCreateStudent extends BaseResponse {
    student: DbStudent;
}

export const conf: BaseConf = {
    
}
