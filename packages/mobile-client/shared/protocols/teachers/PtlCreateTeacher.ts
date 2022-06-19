import { DbTeacher } from '../../db/DbTeacher'
import { BaseRequest, BaseResponse } from '../base'

export interface ReqCreateTeacher extends BaseRequest {
    firstname: string;
    lastname: string;
    email: string;
}

export interface ResCreateTeacher extends BaseResponse {
    teacher: DbTeacher;
}
