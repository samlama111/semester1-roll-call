import { DbTeacher } from '../../db/DbTeacher'
import { BaseRequest, BaseResponse } from '../base'

export interface ReqListTeachers extends BaseRequest {
}

export interface ResListTeachers extends BaseResponse {
    teachers: DbTeacher[];
}
