import { DbStudent } from '../../db/DbStudent'
import { BaseRequest, BaseResponse } from '../base'

export interface ReqCreateStudent extends BaseRequest {
    firstname: string;
    lastname: string;
    email: string;
}

export interface ResCreateStudent extends BaseResponse {
    student: DbStudent;
}
