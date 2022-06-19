import { DbStudent } from '../../db/DbStudent'
import { BaseRequest, BaseResponse } from '../base'

export interface ReqListStudents extends BaseRequest {
}

export interface ResListStudents extends BaseResponse {
    students: DbStudent[];
}
