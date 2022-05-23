import { DbStudent } from '../../db/DbStudent'
import { BaseConf, BaseRequest, BaseResponse } from '../base'

export interface ReqListStudents extends BaseRequest {
}

export interface ResListStudents extends BaseResponse {
    students: DbStudent[];
}

export const conf: BaseConf = {
    
}
