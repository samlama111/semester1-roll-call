import { DbTeacher } from '../../db/DbTeacher'
import { BaseConf, BaseRequest, BaseResponse } from '../base'

export interface ReqListTeachers extends BaseRequest {
}

export interface ResListTeachers extends BaseResponse {
    teachers: DbTeacher[];
}

export const conf: BaseConf = {
    
}
