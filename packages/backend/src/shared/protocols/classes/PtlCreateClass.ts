import { DbClass } from '../../db/DbClass'
import { BaseRequest, BaseResponse } from '../base'

export interface ReqCreateClass extends BaseRequest {
    name: string;
}

export interface ResCreateClass extends BaseResponse {
    class: DbClass;
}   
